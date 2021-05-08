import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAccount } from '~/contexts/AccountContext';
import { Container } from '~/styles/pages/DashboardPageStyles';

const DashboardPage = ({ navigation }) => {
  const { accountData } = useAccount();

  return (
    <Container>
      <Text>
        {accountData && `${accountData?.firstName} ${accountData?.lastName}`}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text>Retornar para a Página de Login</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default DashboardPage;
