import { StyleSheet } from 'react-native';

import variables from '~/styles/variables';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  label: {
    fontSize: 16,
    color: variables.colors.lightBlue,
    fontFamily: variables.fonts.medium,
  },

  focusedLabel: {
    color: variables.colors.brightBlueOnHover,
  },

  labelWithAlert: {
    color: variables.colors.lightRed,
  },

  input: {
    color: variables.colors.darkBlue,
    fontSize: 16,
    borderStyle: 'solid',
  },

  inputWithAlert: {
    borderColor: variables.colors.lightRed,
  },

  normalInput: {
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: variables.borderRadius,
    borderWidth: 1,
    borderColor: variables.colors.lightBlueDim,
  },

  normalFocusedInput: {
    borderColor: variables.colors.brightBlue,
  },

  outlineInput: {
    paddingVertical: 6,
    borderColor: variables.colors.lightBlueDim,
    borderBottomWidth: 1,
  },

  outlineFocusedInput: {
    borderColor: variables.colors.brightBlue,
  },

  alertContainer: {
    marginTop: 6,
  },
});

export default styles;
