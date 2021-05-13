import React, {
  forwardRef,
  useCallback,
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
    ...inputRestProps
  },
  ref,
) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);

  const [alertMessage, setAlertMessage] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const abortNextValidation = useRef(false);

  const executeValidation = useCallback(async () => {
    if (!validate) return true;

    try {
      await validate(value);
      if (abortNextValidation.current) return false;

      setAlertMessage(null);
      return true;
    } catch (validationError) {
      if (abortNextValidation.current) return false;

      setAlertMessage(validationError.message);
      return false;
    } finally {
      abortNextValidation.current = false;
    }
  }, [validate, value]);

  useImperativeHandle(
    ref,
    () => ({
      get value() {
        return value;
      },
      set value(newValue) {
        setValue(newValue);
      },
      isValid: !alertMessage,
      validate: executeValidation,
      setCustomAlert: (message) => setAlertMessage(message),
      clearAlert: () => {
        abortNextValidation.current = true;
        setAlertMessage(null);
      },
      clear: () => inputRef.current?.clear(),
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
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
        value={value}
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
