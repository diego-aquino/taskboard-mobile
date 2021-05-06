import React, { useEffect, useMemo, useRef } from 'react';
import { TouchableOpacity, Text, Animated, Easing } from 'react-native';

import { LoadingIcon } from '~/assets';
import styles from '~/styles/components/common/ButtonStyles';
import variables from '~/styles/variables';

const Button = ({ label, loading: isLoading, style, ...rest }) => {
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
    <TouchableOpacity
      style={[styles.container, isLoading && styles.loading, style]}
      disabled={isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.label, isLoading && styles.loadingLabel]}>
        {label}
      </Text>

      {isLoading && (
        <Animated.View
          style={[
            styles.loadingIconContainer,
            { transform: [{ rotate: rotateValue }] },
          ]}
        >
          <LoadingIcon
            style={styles.loadingIcon}
            fill={variables.colors.white}
          />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
