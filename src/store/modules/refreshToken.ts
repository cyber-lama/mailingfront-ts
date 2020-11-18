import axios from 'axios';
import store from '../index';

export default {
  actions: {
    getRefresh: async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      axios.post('https://mailing.dev.dengisrazy.ru/refresh-token', { refresh_token: refreshToken })
        .then((response) => {
          const responseData = response.data;
          localStorage.setItem('accessToken', responseData.access_token);
          localStorage.setItem('refreshToken', responseData.refresh_token);
          const dateNow = Math.round(new Date().getTime() / 1000);
          localStorage.setItem('expires_in', parseInt(responseData.expires_in, 10) + dateNow);
        });
    },
  },
};
