import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import {
  Container,
  ContentWrapper,
  Label,
  LoadingIconWrapper,
  LoadingIcon,
  IconWrapper,
} from '~/styles/components/common/ButtonStyles';
import variables from '~/styles/variables';

const Button = ({ label, icon, loading: isLoading, ...rest }) => {
  const animationReferenceValue = useRef(new Animated.Value(0)).current;

  const rotatingAnimation = useMemo(
    () =>
      Animated.loop(
        Animated.timing(animationReferenceValue, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ),
    [animationReferenceValue],
  );

  useEffect(() => {
    if (isLoading) {
      rotatingAnimation.start();
    } else {
      rotatingAnimation.stop();
    }
  }, [isLoading, rotatingAnimation]);

  const rotateValue = useMemo(
    () =>
      animationReferenceValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [animationReferenceValue],
  );

  return (
    <Container dim={isLoading} disabled={isLoading} {...rest}>
      <ContentWrapper>
        <Label hidden={isLoading}>{label}</Label>
        {icon && (
          <IconWrapper hidden={isLoading} spaced={!!label}>
            {icon}
          </IconWrapper>
        )}
      </ContentWrapper>

      {isLoading && (
        <LoadingIconWrapper style={{ transform: [{ rotate: rotateValue }] }}>
          <LoadingIcon fill={variables.colors.white} />
        </LoadingIconWrapper>
      )}
    </Container>
  );
};

export default Button;
