import React from 'react';

import {
  Container,
  Option,
  OptionLabel,
} from '~/styles/components/common/SwitchButtonStyles';

const SwitchButton = ({ value, options = [], onChange }) => (
  <Container>
    {options.map((option) => (
      <Option
        key={option.value}
        active={option.value === value}
        onPress={() => onChange?.(option.value)}
      >
        <OptionLabel active={option.value === value}>
          {option.label}
        </OptionLabel>
      </Option>
    ))}
  </Container>
);

export default SwitchButton;
