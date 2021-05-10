import styled from 'styled-components/native';

import { LoadingIcon as BaseLoadingIcon } from '~/assets';
import variables from '~/styles/variables';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  align-items: center;
  justify-content: center;

  background-color: ${variables.colors.darkBlue};

  z-index: 9999;
`;

export const LoadingIcon = styled(BaseLoadingIcon).attrs({
  containerStyle: {
    width: '15%',
    height: '15%',
    opacity: 0.8,
  },
})``;
