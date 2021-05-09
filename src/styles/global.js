import styled from 'styled-components/native';

import variables from './variables';

export const StatusBar = styled.StatusBar.attrs(({ variant }) => {
  switch (variant) {
    case 'light':
      return {
        barStyle: 'dark-content',
        backgroundColor: variables.colors.white,
      };
    case 'dark':
      return {
        barStyle: 'light-content',
        backgroundColor: variables.colors.darkBlue,
      };
    default:
      return {};
  }
})``;
