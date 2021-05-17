import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import {
  TrashIcon as BaseTrashIcon,
  ChevronIcon as BaseChevronIcon,
} from '~/assets';
import { Input as BaseInput } from '~/components/common';
import variables from '~/styles/variables';

export const Container = styled.View`
  width: ${Dimensions.get('screen').width - 64}px;
  padding: 8px;
`;

export const FirstLineContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Input = styled(BaseInput).attrs(({ fullWidth }) => ({
  containerStyle: {
    width: fullWidth ? '100%' : Dimensions.get('screen').width - 128,
  },
}))`
  font-size: 20px;
  padding: 8px 0 12px;
`;

export const RemoveTaskButton = styled.TouchableHighlight.attrs({
  underlayColor: variables.colors.lightRedDim,
})`
  width: 40px;
  height: 40px;
  padding: 8px;
  margin-left: 8px;

  background-color: ${variables.colors.veryLightBlue};
  border-radius: 20px;
`;

export const TrashIcon = styled(BaseTrashIcon).attrs(({ active }) => ({
  stroke: active ? variables.colors.lightRed : variables.colors.lightBlue,
}))``;

export const ChevronIcon = styled(BaseChevronIcon).attrs({
  width: 24,
  height: 24,
})``;
