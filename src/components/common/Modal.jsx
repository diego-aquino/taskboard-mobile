import React from 'react';

import {
  ChildrenWrapper,
  ClickableBackground,
  Container,
} from '~/styles/components/common/ModalStyles';

const Modal = ({
  active: isActive = false,
  unmountChildrenWhenInactive = true,
  onClose,
  children,
  ...rest
}) => (
  <Container active={isActive} {...rest}>
    <ChildrenWrapper>
      {(isActive || !unmountChildrenWhenInactive) && children}
    </ChildrenWrapper>
    <ClickableBackground onPress={onClose}>
      <></>
    </ClickableBackground>
  </Container>
);

export default Modal;
