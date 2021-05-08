import React from 'react';

import {
  Container,
  AlertIcon,
  Message,
} from '~/styles/components/common/AlertStyles';

const Alert = ({ message, ...rest }) => (
  <Container {...rest}>
    <AlertIcon />
    <Message>{message}</Message>
  </Container>
);

export default Alert;
