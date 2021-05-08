import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import variables from '~/styles/variables';

const LoadingIcon = ({
  fill = variables.colors.white,
  animated: isAnimated,
  containerStyle,
  ...rest
}) => {
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
    if (isAnimated) {
      rotatingAnimation.start();
    } else {
      rotatingAnimation.stop();
    }
  }, [isAnimated, rotatingAnimation]);

  const rotateValue = useMemo(
    () =>
      animationReferenceValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [animationReferenceValue],
  );

  return (
    <Animated.View
      style={[{ transform: [{ rotate: rotateValue }] }, containerStyle]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <Path
          fill={fill}
          d="M9.648 5.352A.351.351 0 019.297 5 4.301 4.301 0 005 .703.351.351 0 115 0c.675 0 1.33.132 1.946.394A4.991 4.991 0 0110 5a.35.35 0 01-.35.352z"
        />
      </Svg>
    </Animated.View>
  );
};

export default LoadingIcon;
