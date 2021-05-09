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

  const authenticateUser = useCallback(async () => {
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

  const logoutUser = async () => {
    await makeAuthenticatedRequest((accessToken) =>
      accountsServices.logout(accessToken),
    );
    await AsyncStorage.removeItem(storageKeys.REFRESH_TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{
        tokens,
        isLoading,
        isAuthenticated,
        setTokens,
        setAccessToken,
        setRefreshToken,
        authenticateUser,
        requestAndApplyNewAccessToken,
        makeAuthenticatedRequest,
        logoutUser,
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
  const {
    tokens,
    isLoading,
    isAuthenticated,
    setTokens,
    authenticateUser,
    makeAuthenticatedRequest,
    logoutUser,
  } = useAuthContext();

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return {
    tokens,
    isLoading,
    isAuthenticated,
    setTokens,
    makeAuthenticatedRequest,
    logoutUser,
  };
}
