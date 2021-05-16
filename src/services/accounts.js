import api from '~/api';

const accountsServices = {
  async signUp(accountData) {
    const signUpResponse = await api.post('/accounts/signup', accountData);
    const signUpData = signUpResponse.data;

    return signUpData;
  },

  async login(email, password) {
    const loginCredentials = { email, password };
    const loginResponse = await api.post('/accounts/login', loginCredentials);
    const loginData = loginResponse.data;

    return loginData;
  },

  async token(refreshToken) {
    const tokenResponse = await api.post('/accounts/token', { refreshToken });
    const { accessToken } = tokenResponse.data;

    return accessToken;
  },

  async logout(accessToken) {
    await api.post(
      '/accounts/logout',
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
  },

  async details(accessToken) {
    const detailsResponse = await api.get('/accounts/details', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { account: accountData } = detailsResponse.data;

    return accountData;
  },
};

export default accountsServices;
