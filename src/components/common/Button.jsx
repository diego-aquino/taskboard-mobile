import React, { useEffect, useMemo, useRef } from 'react';
import { TouchableOpacity, Text, Animated, Easing, View } from 'react-native';

import { LoadingIcon } from '~/assets';
import styles from '~/styles/components/common/ButtonStyles';
import variables from '~/styles/variables';

const Button = ({ label, icon, loading: isLoading, style, ...rest }) => {
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
      <View style={styles.contentWrapper}>
        <Text style={[styles.label, isLoading && styles.loadingLabel]}>
          {label}
        </Text>
        {icon && <View style={label && { marginLeft: 8 }}>{icon}</View>}
      </View>

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
