import React from 'react';
import { Text, View } from 'react-native';

import { AlertIcon } from '~/assets';
import styles from '~/styles/components/common/AlertStyles';

const Alert = ({ message, style, ...rest }) => (
  <View style={[styles.container, style]} {...rest}>
    <AlertIcon style={styles.alertIcon} />
    <Text style={styles.message}>{message}</Text>
  </View>
);

export default Alert;
