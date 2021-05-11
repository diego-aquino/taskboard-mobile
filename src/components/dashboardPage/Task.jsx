import React, { useCallback, useMemo, useState } from 'react';

import {
  Checkbox,
  CheckboxContainer,
  ClickableArea,
  Container,
  Name,
} from '~/styles/components/dashboardPage/TaskStyles';

const Task = ({
  id,
  name,
  priority,
  checked = false,
  onTaskPress,
  onCheck,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isPressed, setIsPressed] = useState(false);

  const taskData = useMemo(
    () => ({
      id,
      name,
      priority,
      isChecked,
    }),
    [id, name, isChecked, priority],
  );

  const toggleCheckedState = useCallback(() => {
    setIsChecked((currentCheckedState) => {
      const newCheckedState = !currentCheckedState;
      onCheck?.({ ...taskData, isChecked: newCheckedState });
      return newCheckedState;
    });
  }, [onCheck, taskData]);

  const handleTaskPress = useCallback(() => {
    onTaskPress?.(taskData);
  }, [onTaskPress, taskData]);

  return (
    <Container pressed={isPressed} {...rest}>
      <CheckboxContainer onPress={toggleCheckedState}>
        <Checkbox
          priority={priority}
          checked={isChecked}
          onCheckChange={toggleCheckedState}
        />
      </CheckboxContainer>

      <Name lineThrough={isChecked} dim={isChecked}>
        {name}
      </Name>
      <ClickableArea
        onPress={handleTaskPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <></>
      </ClickableArea>
    </Container>
  );
};

export default Task;
