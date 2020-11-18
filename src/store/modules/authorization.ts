import router from '../../router';
import { apiLogin } from '../../services/Api';

export default {
  actions: {
    // dev@dev.local
    // pass
    login: (context, payload) => {
      apiLogin(JSON.stringify(payload))
        .then((response) => {
          router.push({ path: 'analytics' });
          const { data } = response;
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          const dateNow = Math.round(new Date().getTime() / 1000);
          localStorage.setItem('expires_in', parseInt(data.expires_in, 10).toString() + dateNow);
          context.commit('isLogin', true);
          context.commit('setIsLocked', false);
        });
    },
    logOut: (context) => {
      localStorage.clear();
      context.commit('isLogin', false);
      router.push({ path: '/' });
    },
    // getRefresh: async (context) => {
    //   // getRefreshToken(context);
    // },
    lockedApiQuery: async (context, payload) => {
      console.log(payload, 'мутация, которая меняет состояние LockedApiQuery')
      context.commit('setIsLocked', payload);
    },
  },
  mutations: {
    isLogin: (state, payload) => {
      state.isLogin = payload;
    },
    setIsLocked: (state, payload) => {
      state.isLocked = payload;
    },
  },

  state: {
    isLogin: false,
    isLocked: false,
  },
  getters: {
    isLogged: state => state.isLogin,
    isLocked: state => state.isLocked,
  },
};

