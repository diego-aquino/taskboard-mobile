import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback } from 'react';

import { Logo, PersonsWithTasks } from '~/assets';
import { useAuthContext } from '~/contexts/AuthContext';
import { useGlobalSettingsContext } from '~/contexts/GlobalSettingsContext';
import {
  Container,
  Description,
  Footer,
  FooterBottomDetail,
  LogoWrapper,
  ThemeImageWrapper,
  NextButton,
  Title,
  ChevronIcon,
} from '~/styles/pages/WelcomePageStyles';
import { storageKeys } from '~/utils/local';

const WelcomePage = () => {
  const { authenticate } = useAuthContext();
  const { setIsFirstAccess } = useGlobalSettingsContext();

  const handleNext = useCallback(async () => {
    setIsFirstAccess(false);
    authenticate();
    await AsyncStorage.setItem(storageKeys.HAS_ACCESSED_BEFORE, 'true');
  }, [authenticate, setIsFirstAccess]);

  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <Title>
        Gerencie
        {'\n'}
        as suas tarefas de
        {'\n'}
        forma eficiente
      </Title>

      <ThemeImageWrapper>
        <PersonsWithTasks />
      </ThemeImageWrapper>

      <Description>
        Organize todos os seus afazeres em um só lugar de acordo com a sua
        prioridade, e nunca esqueça nenhum deles.
      </Description>

      <Footer>
        <NextButton
          icon={<ChevronIcon direction="right" />}
          onPress={handleNext}
        />
        <FooterBottomDetail />
      </Footer>
    </Container>
  );
};

export default WelcomePage;
