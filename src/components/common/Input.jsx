import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Text, TextInput, View } from 'react-native';

import styles from '~/styles/components/common/InputStyles';
import variables from '~/styles/variables';

import Alert from './Alert';

const Input = (
  {
    label,
    validate,
    variant = 'normal',
    initialValue = '',
    style,
    onChangeText,
    onEndEditing,
    onSubmitEditing,
    ...rest
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
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            isFocused && styles.focusedLabel,
            alertMessage && styles.labelWithAlert,
          ]}
        >
          {label}
        </Text>
      )}

      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          styles[`${variant}Input`],
          isFocused && styles[`${variant}FocusedInput`],
          alertMessage && styles.inputWithAlert,
        ]}
        onChangeText={handleTextChange}
        placeholderTextColor={variables.colors.lightBlueDim}
        onFocus={handleFocus}
        onEndEditing={handleEndEditing}
        onSubmitEditing={handleSubmitEditing}
        {...rest}
      />

      {alertMessage && (
        <Alert style={styles.alertContainer} message={alertMessage} />
      )}
    </View>
  );
};

export default forwardRef(Input);
