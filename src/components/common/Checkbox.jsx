import React from 'react';

import { CheckMarkIcon } from '~/assets';
import { Container } from '~/styles/components/common/CheckboxStyles';

const Checkbox = ({
  checked,
  onCheckChange,
  uncheckedColor,
  checkedColor,
  ...rest
}) => (
  <Container
    checked={checked}
    onPress={() => onCheckChange?.(!checked)}
    uncheckedColor={uncheckedColor}
    checkedColor={checkedColor}
    {...rest}
  >
    {checked && <CheckMarkIcon />}
  </Container>
);

export default Checkbox;
