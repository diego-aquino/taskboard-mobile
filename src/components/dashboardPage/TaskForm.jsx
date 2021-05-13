import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { ChevronIcon } from '~/assets';
import { Button, SingleChoiceCheckboxesInput } from '~/components/common';
import {
  Container,
  Input,
} from '~/styles/components/dashboardPage/TaskFormStyles';
import validate from '~/utils/validation';

const PRIORITY_OPTIONS = [
  { value: 'high', icon: <ChevronIcon direction="up" />, label: 'Alta' },
  { value: 'low', icon: <ChevronIcon direction="down" />, label: 'Baixa' },
];

const TaskForm = (
  { initialName = '', initialPriority = 'low', onSubmit },
  ref,
) => {
  const nameInputRef = useRef(initialName);
  const [priority, setPriority] = useState(initialPriority);

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setPriority(initialPriority);

        if (!nameInputRef.current) return;
        nameInputRef.current.value = initialName;
        nameInputRef.current.clearAlert();
      },
      blurInput: () => nameInputRef.current?.blur(),
    }),
    [initialName, initialPriority],
  );

  const handleSubmit = useCallback(async () => {
    const nameIsValid = await nameInputRef.current?.validate();
    if (!nameIsValid) return;

    onSubmit?.({
      name: nameInputRef.current?.value,
      priority,
    });
  }, [onSubmit, priority]);

  return (
    <Container>
      <Input
        ref={nameInputRef}
        variant="outline"
        initialValue={initialName}
        placeholder="Nome..."
        validate={validate.requiredTextField}
      />
      <SingleChoiceCheckboxesInput
        value={priority}
        options={PRIORITY_OPTIONS}
        onChange={setPriority}
      />
      <Button label="Criar" onPress={handleSubmit} />
    </Container>
  );
};

export default forwardRef(TaskForm);
