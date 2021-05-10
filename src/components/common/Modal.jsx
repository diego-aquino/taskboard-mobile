import React from 'react';

import {
  ChildrenWrapper,
  ClickableBackground,
  Container,
} from '~/styles/components/common/ModalStyles';

const Modal = ({ active: isActive = false, onClose, children, ...rest }) => (
  <Container active={isActive} {...rest}>
    <ChildrenWrapper>{children}</ChildrenWrapper>
    <ClickableBackground onPress={onClose}>
      <></>
    </ClickableBackground>
  </Container>
);

export default Modal;
