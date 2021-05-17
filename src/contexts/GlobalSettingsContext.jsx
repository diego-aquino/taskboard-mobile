import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { storageKeys } from '~/utils/local';

import { useAuthContext } from './AuthContext';

const GlobalSettingsContext = createContext({});

export const GlobalSettingsContextProvider = ({ children }) => {
  const [isFirstAccess, setIsFirstAccess] = useState(true);
  const [isLoadingFirstAccess, setIsLoadingFirstAccess] = useState(true);

  return (
    <GlobalSettingsContext.Provider
      value={{
        isFirstAccess,
        setIsFirstAccess,
        isLoadingFirstAccess,
        setIsLoadingFirstAccess,
      }}
    >
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export function useGlobalSettingsContext() {
  return useContext(GlobalSettingsContext);
}

export function useGlobalSettings() {
  const { authenticate } = useAuthContext();

  const globalSettings = useGlobalSettingsContext();
  const { setIsFirstAccess, setIsLoadingFirstAccess } = globalSettings;

  useEffect(() => {
    const checkIfFirstAccess = async () => {
      const hasAccessedBefore = await AsyncStorage.getItem(
        storageKeys.HAS_ACCESSED_BEFORE,
      );

      setIsFirstAccess(!hasAccessedBefore);
      setIsLoadingFirstAccess(false);

      if (hasAccessedBefore) {
        authenticate();
      }
    };

    checkIfFirstAccess();
  }, [authenticate, setIsFirstAccess, setIsLoadingFirstAccess]);

  return globalSettings;
}
