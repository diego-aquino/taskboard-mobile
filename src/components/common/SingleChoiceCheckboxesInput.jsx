import React from 'react';

import {
  CheckboxOption,
  CheckboxOptionLabel,
  Container,
} from '~/styles/components/common/SingleChoiceCheckboxesInputStyles';

import Checkbox from './Checkbox';

const SingleChoiceCheckboxesInput = ({ value, options = [], onChange }) => (
  <Container>
    {options.map((option, index) => (
      <CheckboxOption
        key={option.value}
        onPress={() => onChange?.(option.value)}
        disabled={value === option.value}
        spaced={index > 0}
      >
        {option.icon}
        <CheckboxOptionLabel>{option.label}</CheckboxOptionLabel>
        <Checkbox
          checked={value === option.value}
          disabled={value === option.value}
          onCheckChange={() => onChange?.(option.value)}
        />
      </CheckboxOption>
    ))}
  </Container>
);

export default SingleChoiceCheckboxesInput;
