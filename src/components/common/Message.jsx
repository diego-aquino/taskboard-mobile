import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';

import {
  ClickableBackground,
  Container,
  ContentWrapper,
} from '~/styles/components/common/MessageStyles';

import Button from './Button';

const Message = ({
  text,
  closeAfterDelay = 1000,
  actionButtonLabel,
  onActionButtonPress,
  onClose,
  style,
  ...rest
}) => {
  const windowDimensions = useWindowDimensions();
  const containerHeight = useRef(windowDimensions.height);

  const handleContainerLayout = useCallback((event) => {
    containerHeight.current = event.nativeEvent.layout.height;
  }, []);

  const translateYProgress = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(
    (referenceValue, { toValue }) => {
      const handleCompletion = () => {
        if (toValue !== 0) return;
        onClose?.();
      };

      return Animated.timing(referenceValue, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }).start(handleCompletion);
    },
    [onClose],
  );

  const showMessage = useCallback(() => {
    startAnimation(translateYProgress, { toValue: 1 });
  }, [startAnimation, translateYProgress]);

  const hideMessage = useCallback(() => {
    startAnimation(translateYProgress, { toValue: 0 });
  }, [startAnimation, translateYProgress]);

  useEffect(() => {
    if (!text) {
      hideMessage();
      return;
    }

    showMessage();
    const closeTimeout = setTimeout(hideMessage, closeAfterDelay);

    return () => clearTimeout(closeTimeout); // eslint-disable-line consistent-return
  }, [text, closeAfterDelay, showMessage, hideMessage]);

  const translateY = useMemo(
    () =>
      translateYProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [containerHeight.current, 0],
      }),
    [translateYProgress],
  );

  return (
    <Container
      style={[{ transform: [{ translateY }] }, style]}
      onLayout={handleContainerLayout}
      {...rest}
    >
      <ContentWrapper>{text}</ContentWrapper>
      {actionButtonLabel && (
        <Button label={actionButtonLabel} onPress={onActionButtonPress} />
      )}

      <ClickableBackground onPress={hideMessage}>
        <></>
      </ClickableBackground>
    </Container>
  );
};

export default Message;
