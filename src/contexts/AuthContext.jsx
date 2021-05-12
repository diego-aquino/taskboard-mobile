import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import accountsServices from '~/services/accounts';
import { storageKeys } from '~/utils/local';
import network from '~/utils/network';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!tokens.accessToken;

  const setAccessToken = useCallback((newAccessToken) => {
    setTokens((currentTokens) => ({
      ...currentTokens,
      accessToken: newAccessToken,
    }));
  }, []);

  const setRefreshToken = useCallback((newRefreshToken) => {
    setTokens((currentTokens) => ({
      ...currentTokens,
      refreshToken: newRefreshToken,
    }));
  }, []);

  const isRequestingAuthentication = useRef(false);

  const authenticate = useCallback(async () => {
    if (isAuthenticated || isRequestingAuthentication.current) return;

    isRequestingAuthentication.current = true;
    setIsLoading(true);

    const refreshToken =
      tokens.refreshToken ||
      (await AsyncStorage.getItem(storageKeys.REFRESH_TOKEN));

    if (!refreshToken) {
      setIsLoading(false);
      isRequestingAuthentication.current = false;
      return;
    }

    try {
      const accessToken = await accountsServices.token(refreshToken);
      setTokens({ accessToken, refreshToken });
      await AsyncStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);
    } catch {
      // eslint-disable-line no-empty
    } finally {
      setIsLoading(false);
      isRequestingAuthentication.current = false;
    }
  }, [tokens.refreshToken, isAuthenticated]);

  const requestAndApplyNewAccessToken = useCallback(
    async (refreshToken) => {
      const newAccessToken = await accountsServices.token(refreshToken);
      setAccessToken(newAccessToken);
      return newAccessToken;
    },
    [setAccessToken],
  );

  const makeAuthenticatedRequest = useCallback(
    async (fetcher) => {
      const { accessToken, refreshToken } = tokens;

      if (!isAuthenticated) {
        return Promise.reject();
      }

      try {
        const response = await fetcher(accessToken);
        return response;
      } catch (error) {
        const errorType = network.getErrorType(error.response);

        if (errorType !== network.errorTypes.ACCESS_TOKEN_EXPIRED) {
          throw error;
        }

        const newAccessToken = await requestAndApplyNewAccessToken(
          refreshToken,
        );
        return fetcher(newAccessToken);
      }
    },
    [tokens, isAuthenticated, requestAndApplyNewAccessToken],
  );

  const login = useCallback(
    async (email, password) => {
      const responseData = await accountsServices.login(email, password);
      const { accessToken, refreshToken } = responseData;

      setTokens({ accessToken, refreshToken });
      await AsyncStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    [setTokens],
  );

  const logout = useCallback(async () => {
    await Promise.all([
      makeAuthenticatedRequest(accountsServices.logout),
      AsyncStorage.removeItem(storageKeys.REFRESH_TOKEN),
      AsyncStorage.removeItem(storageKeys.SORTING_PREFERENCES),
    ]);
    setTokens({ accessToken: null, refreshToken: null });
  }, [makeAuthenticatedRequest]);

  return (
    <AuthContext.Provider
      value={{
        tokens,
        isLoading,
        isAuthenticated,
        setTokens,
        setAccessToken,
        setRefreshToken,
        authenticate,
        requestAndApplyNewAccessToken,
        makeAuthenticatedRequest,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAuth() {
  const context = useAuthContext();
  const { authenticate } = context;

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return context;
}
