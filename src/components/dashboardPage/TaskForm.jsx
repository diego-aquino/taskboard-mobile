import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button, SingleChoiceCheckboxesInput } from '~/components/common';
import {
  Container,
  FirstLineContainer,
  Input,
  RemoveTaskButton,
  TrashIcon,
  ChevronIcon,
} from '~/styles/components/dashboardPage/TaskFormStyles';
import validate from '~/utils/validation';

const PRIORITY_OPTIONS = [
  { value: 'high', icon: <ChevronIcon direction="up" />, label: 'Alta' },
  { value: 'low', icon: <ChevronIcon direction="down" />, label: 'Baixa' },
];

const TaskForm = ({
  initialName = '',
  initialPriority = 'low',
  submitButtonLabel,
  showRemoveButton,
  autoFocusInput,
  onRemoveTask,
  onSubmit,
  ...rest
}) => {
  const nameInputRef = useRef(initialName);
  const [priority, setPriority] = useState(initialPriority);

  const [removeButtonIsPressed, setRemoveButtonIsPressed] = useState(false);

  useEffect(() => {
    if (!nameInputRef.current) return;
    nameInputRef.current.value = initialName;
  }, [initialName]);

  useEffect(() => {
    setPriority(initialPriority);
  }, [initialPriority]);

  const handleSubmit = useCallback(async () => {
    const nameIsValid = await nameInputRef.current?.validate();
    if (!nameIsValid) return;

    onSubmit?.({
      name: nameInputRef.current?.value,
      priority,
    });
  }, [onSubmit, priority]);

  return (
    <Container {...rest}>
      <FirstLineContainer>
        <Input
          ref={nameInputRef}
          variant="outline"
          initialValue={initialName}
          placeholder="Nome..."
          validate={validate.requiredTextField}
          fullWidth={!showRemoveButton}
          autoFocus={autoFocusInput}
        />
        {showRemoveButton && (
          <RemoveTaskButton
            onPress={onRemoveTask}
            onPressIn={() => setRemoveButtonIsPressed(true)}
            onPressOut={() => setRemoveButtonIsPressed(false)}
          >
            <TrashIcon active={removeButtonIsPressed} />
          </RemoveTaskButton>
        )}
      </FirstLineContainer>

      <SingleChoiceCheckboxesInput
        value={priority}
        options={PRIORITY_OPTIONS}
        onChange={setPriority}
      />
      <Button label={submitButtonLabel} onPress={handleSubmit} />
    </Container>
  );
};

export default TaskForm;
