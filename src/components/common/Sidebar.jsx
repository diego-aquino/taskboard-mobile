import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Animated, useWindowDimensions } from 'react-native';

import { Container } from '~/styles/components/common/SidebarStyles';

const Sidebar = ({ style, children, ...rest }, ref) => {
  const windowDimensions = useWindowDimensions();

  const translateXProgress = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(
    (referenceValue, { toValue }) =>
      Animated.timing(referenceValue, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }).start(),
    [],
  );

  const openSidebar = useCallback(() => {
    startAnimation(translateXProgress, { toValue: 1 });
  }, [startAnimation, translateXProgress]);

  const closeSidebar = useCallback(() => {
    startAnimation(translateXProgress, { toValue: 0 });
  }, [startAnimation, translateXProgress]);

  useImperativeHandle(ref, () => ({
    open: openSidebar,
    close: closeSidebar,
  }));

  const translateX = useMemo(
    () =>
      translateXProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [-windowDimensions.width, 0],
      }),
    [translateXProgress, windowDimensions.width],
  );

  return (
    <Container style={[{ transform: [{ translateX }] }, style]} {...rest}>
      {children}
    </Container>
  );
};

export default forwardRef(Sidebar);
