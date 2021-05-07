import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAccount } from '~/contexts/AccountContext';
import styles from '~/styles/pages/DashboardPageStyles';

const DashboardPage = ({ navigation }) => {
  const { accountData } = useAccount();

  return (
    <View style={styles.container}>
      <Text>
        {accountData && `${accountData?.firstName} ${accountData?.lastName}`}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text>Retornar para a Página de Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardPage;
