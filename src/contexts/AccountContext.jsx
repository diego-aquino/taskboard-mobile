import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import accountsServices from '~/services/accounts';

import { useAuth, useAuthContext } from './AuthContext';

const AccountContext = createContext({});

export const AccountContextProvider = ({ children }) => {
  const [accountData, setAccountData] = useState(null);
  const { makeAuthenticatedRequest } = useAuthContext();

  const isRequestingAccountData = useRef(false);

  const requestAndApplyAccountData = useCallback(async () => {
    if (isRequestingAccountData.current) return;

    isRequestingAccountData.current = true;
    setAccountData(null);

    const data = await makeAuthenticatedRequest(accountsServices.details);
    setAccountData(data);
    isRequestingAccountData.current = false;
  }, [makeAuthenticatedRequest]);

  return (
    <AccountContext.Provider
      value={{ accountData, setAccountData, requestAndApplyAccountData }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export function useAccountContext() {
  return useContext(AccountContext);
}

export function useAccount() {
  const context = useAccountContext();
  const { tokens, isAuthenticated } = useAuth();

  const { requestAndApplyAccountData } = context;

  useEffect(() => {
    if (isAuthenticated) {
      requestAndApplyAccountData();
    }
  }, [tokens.refreshToken, isAuthenticated, requestAndApplyAccountData]);

  return context;
}
