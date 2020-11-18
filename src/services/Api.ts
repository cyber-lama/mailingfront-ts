import axios from 'axios';
import store from '../store';
import router from '../router';

const api = (url, method, headers = {}, data = {}, responseType = null) => {
    let BASE_URL;
    switch (process.env.NODE_ENV) {
        case 'development':
            BASE_URL = 'https://mailing.dev.dengisrazy.ru/';
            break;
        case 'production':
            BASE_URL = 'https://mailing.dev.dengisrazy.ru/';
            break;
        default:
            'https://mailing.dev.dengisrazy.ru/';
    }
    return axios.request({

        url: BASE_URL + url,
        method,
        headers,
        responseType,
        data,
    }).then((response) => {
        const realResponse = response;
        if (Object.keys(realResponse).length != 0 && realResponse.status === 200) {
            return response;
        }
    });
};

export function getRefreshToken(context = null) {
  const dateNow = Math.round(new Date().getTime() / 1000);
  const expires = localStorage.getItem('expires_in');
  // console.log(dateNow > parseInt(expires, 10), parseInt(expires, 10) - dateNow, 'TIME');
  // if (dateNow > parseInt(expires, 10)) {
  const DATA = { refresh_token: localStorage.getItem('refreshToken') };
  return api('refresh-token', 'post', {}, DATA, '');
}

const getAccessToken = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}` });

export const apiLogin = data => api('login', 'post', { 'Content-Type': 'application/json;' }, data);

export const apiGetMailingList = () => api('mailing', 'get', getAccessToken());
export const apiGetChannels = () => api('channel/all', 'get', getAccessToken());
export const apiGetFilters = () => api('mailing/filter/actions', 'get', getAccessToken());
export const apiGetInterval = () => api('mailing/event/interval', 'get', getAccessToken());
export const apiGetEndingTypes = () => api('mailing/ending/types', 'get', getAccessToken());
export const apiGetFiltersScopes = () => api('mailing/filter/scopes', 'get', getAccessToken());
export const apiGetProjects = () => api('project', 'get', getAccessToken());
export const apiGetTemplates = () => api('template', 'get', getAccessToken());

axios.interceptors.response.use((response => response),
  (error) => {
    if (error.request.status === 403) {
      store.dispatch('lockedApiQuery', true);
      getRefreshToken()
        .then((response) => {
          const refreshData = response.data;
          localStorage.setItem('accessToken', refreshData.access_token);
          localStorage.setItem('refreshToken', refreshData.refresh_token);
          const dateNow = Math.round(new Date().getTime() / 1000);
          localStorage.setItem('expires_in', parseInt(refreshData.expires_in, 10).toString() + dateNow);
          // eslint-disable-next-line no-param-reassign
          error.config.headers.Authorization = getAccessToken().Authorization;
          store.dispatch('lockedApiQuery', false);
          // if (router.currentRoute.fullPath === '/mailing') {
          //   store.dispatch('getAllData');
          // }
          return axios(error.config);
        });
    }
  });
