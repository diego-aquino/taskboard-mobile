import { StyleSheet } from 'react-native';

import variables from '~/styles/variables';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    borderRadius: variables.borderRadius,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: variables.colors.brightBlue,
  },

  loading: {
    opacity: 0.7,
  },

  label: {
    color: variables.colors.white,
    fontFamily: variables.fonts.medium,
  },

  loadingLabel: {
    opacity: 0,
  },

  loadingIconContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    bottom: 12,
    right: 12,
  },

  loadingIcon: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default styles;
