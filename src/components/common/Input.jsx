import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
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
    ...rest
  },
  ref,
) => {
  const [value, setValue] = useState(initialValue);
  const [alertMessage, setAlertMessage] = useState(null);

  const [isFocused, setIsFocused] = useState(false);

  const executeValidation = useCallback(
    async (valueToValidate) => {
      if (!validate) return true;

      try {
        await validate(valueToValidate);
        setAlertMessage(null);
        return true;
      } catch (validationError) {
        setAlertMessage(validationError.message);
        return false;
      }
    },
    [validate],
  );

  useImperativeHandle(
    ref,
    () => ({
      value,
      isValid: !alertMessage,
      validate: () => executeValidation(value),
      setCustomAlertMessage: (customAlertMessage) =>
        setAlertMessage(customAlertMessage),
      clear: () => setValue(''),
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
      executeValidation(event.nativeEvent.text);
      onEndEditing?.(event);
    },
    [executeValidation, onEndEditing],
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
        style={[
          styles.input,
          styles[`${variant}Input`],
          isFocused && styles[`${variant}FocusedInput`],
          alertMessage && styles.inputWithAlert,
        ]}
        placeholderTextColor={variables.colors.lightBlueDim}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onEndEditing={handleEndEditing}
        {...rest}
      />

      {alertMessage && (
        <Alert style={styles.alertContainer} message={alertMessage} />
      )}
    </View>
  );
};

export default forwardRef(Input);
