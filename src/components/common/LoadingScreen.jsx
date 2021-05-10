import React from 'react';

import {
  Container,
  LoadingIcon,
} from '~/styles/components/common/LoadingScreenStyles';
import { StatusBar } from '~/styles/global';

const LoadingScreen = () => (
  <Container>
    <StatusBar variant="dark" />
    <LoadingIcon animated />
  </Container>
);

export default LoadingScreen;
