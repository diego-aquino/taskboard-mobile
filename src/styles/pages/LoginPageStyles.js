import { StyleSheet } from 'react-native';

import variables from '~/styles/variables';

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  header: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerRightSection: {
    height: 25,
    width: 90,
    justifyContent: 'flex-end',
  },

  headerLinkText: {
    paddingVertical: 8,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: 'transparent',
    fontSize: 18,
    fontFamily: variables.fonts.bold,
    color: variables.colors.darkBlue,
  },

  activeHeaderLinkText: {
    color: variables.colors.brightBlue,
    borderBottomColor: variables.colors.brightBlue,
  },

  main: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 48,
    flex: 1,
  },

  loginForm: {
    flex: 1,
  },

  pageTitle: {
    color: variables.colors.darkBlue,
    fontFamily: variables.fonts.bold,
    fontSize: 36,
    marginBottom: 12,
  },

  pageDescription: {
    marginBottom: 36,
    color: variables.colors.lightBlue,
    fontSize: 18,
  },

  globalAlertMessage: {
    marginTop: 24,
    justifyContent: 'center',
  },

  footer: {
    width: '100%',
  },

  registerAccountLink: {
    alignSelf: 'flex-start',
  },

  registerAccountLinkText: {
    marginBottom: 16,
    paddingHorizontal: 24,
    color: variables.colors.brightBlue,
    fontSize: 14,
  },

  arrowIcon: {
    marginTop: 1,
  },

  footerBottomDetail: {
    height: 64,
    backgroundColor: variables.colors.darkBlue,
    zIndex: -1,
  },

  submitButton: {
    position: 'absolute',
    right: 24,
    bottom: '66%',
    padding: 14,
  },
});

export default styles;
