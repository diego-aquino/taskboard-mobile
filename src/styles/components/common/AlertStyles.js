import { StyleSheet } from 'react-native';

import variables from '~/styles/variables';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  alertIcon: {
    marginRight: 6,
  },

  message: {
    color: variables.colors.lightRed,
    fontFamily: variables.fonts.medium,
    fontSize: 14,
  },
});

export default styles;
