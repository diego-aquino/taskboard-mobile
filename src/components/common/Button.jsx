import React from 'react';

import {
  Container,
  ContentWrapper,
  Label,
  LoadingIconWrapper,
  LoadingIcon,
  IconWrapper,
} from '~/styles/components/common/ButtonStyles';

const Button = ({ label, icon, loading: isLoading, ...rest }) => (
  <Container dim={isLoading} disabled={isLoading} {...rest}>
    <ContentWrapper>
      <Label hidden={isLoading}>{label}</Label>
      {icon && (
        <IconWrapper hidden={isLoading} spaced={!!label}>
          {icon}
        </IconWrapper>
      )}
    </ContentWrapper>

    {isLoading && (
      <LoadingIconWrapper>
        <LoadingIcon animated={isLoading} />
      </LoadingIconWrapper>
    )}
  </Container>
);

export default Button;
