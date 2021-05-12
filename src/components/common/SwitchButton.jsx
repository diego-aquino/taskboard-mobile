import React from 'react';

import {
  Container,
  Option,
  OptionLabel,
} from '~/styles/components/common/SwitchButton';

const SwitchButton = ({ options = [], selectedOptionName, onChange }) => (
  <Container>
    {options.map((option) => (
      <Option
        key={option.name}
        active={option.name === selectedOptionName}
        onPress={() => onChange?.(option.name)}
      >
        <OptionLabel active={option.name === selectedOptionName}>
          {option.label}
        </OptionLabel>
      </Option>
    ))}
  </Container>
);

export default SwitchButton;
