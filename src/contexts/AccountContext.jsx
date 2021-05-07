import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import accountsServices from '~/services/accounts';

import { useAuth } from './AuthContext';

const AccountContext = createContext({});

export const AccountContextProvider = ({ children }) => {
  const [accountData, setAccountData] = useState(null);

  return (
    <AccountContext.Provider value={{ accountData, setAccountData }}>
      {children}
    </AccountContext.Provider>
  );
};

export function useAccountContext() {
  return useContext(AccountContext);
}

export function useAccount() {
  const { accountData, setAccountData } = useAccountContext();
  const { tokens, isAuthenticated, makeAuthenticatedRequest } = useAuth();

  const isRequestingAccountData = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || isRequestingAccountData.current) return;

    const requestAndApplyAccountData = async () => {
      isRequestingAccountData.current = true;
      setAccountData(null);

      const requestedAccountData = await makeAuthenticatedRequest(
        (accessToken) => accountsServices.details(accessToken),
      );
      setAccountData(requestedAccountData);

      isRequestingAccountData.current = false;
    };

    requestAndApplyAccountData();
  }, [
    tokens.refreshToken,
    isAuthenticated,
    makeAuthenticatedRequest,
    setAccountData,
  ]);

  return { accountData, setAccountData };
}
