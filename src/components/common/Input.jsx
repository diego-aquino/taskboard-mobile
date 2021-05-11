import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  Container,
  Label,
  TextInput,
  Alert,
} from '~/styles/components/common/InputStyles';

const Input = (
  {
    label,
    validate,
    variant = 'normal',
    initialValue = '',
    onChangeText,
    onEndEditing,
    onSubmitEditing,
    containerStyle,
    twoInput,
    ...inputRestProps
  },
  ref,
) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const [alertMessage, setAlertMessage] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const executeValidation = useCallback(async () => {
    if (!validate) return true;

    try {
      await validate(value);
      setAlertMessage(null);
      return true;
    } catch (validationError) {
      setAlertMessage(validationError.message);
      return false;
    }
  }, [validate, value]);

  useImperativeHandle(
    ref,
    () => ({
      value,
      isValid: !alertMessage,
      validate: executeValidation,
      setCustomAlert: (message) => setAlertMessage(message),
      clearAlert: () => setAlertMessage(null),
      clear: () => inputRef.current?.clear(),
      focus: () => inputRef.current?.focus(),
    }),
    [value, alertMessage, executeValidation],
  );

  const handleTextChange = useCallback(
    (text) => {
      setValue(text);
      onChangeText?.(text);
    },
    [onChangeText],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleEndEditing = useCallback(
    async (event) => {
      setIsFocused(false);
      executeValidation();
      onEndEditing?.(event);
    },
    [executeValidation, onEndEditing],
  );

  const handleSubmitEditing = useCallback(
    async (event) => {
      setIsFocused(false);
      executeValidation();
      onSubmitEditing?.(event);
    },
    [executeValidation, onSubmitEditing],
  );

  return (
    <Container style={containerStyle}>
      {label && (
        <Label focused={isFocused} withAlert={!!alertMessage}>
          {label}
        </Label>
      )}

      <TextInput
        ref={inputRef}
        variant={variant}
        focused={isFocused}
        withAlert={!!alertMessage}
        onFocus={handleFocus}
        onChangeText={handleTextChange}
        onEndEditing={handleEndEditing}
        onSubmitEditing={handleSubmitEditing}
        {...inputRestProps}
      />

      {alertMessage && <Alert message={alertMessage} />}
    </Container>
  );
};

export default forwardRef(Input);
