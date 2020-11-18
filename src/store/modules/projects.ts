import axios from 'axios';
import { apiGetProjects } from '../../services/Api';

export default {
  actions: {
    addProject: async (context, payload, dispatch) => {
      const dateNow = Math.round(new Date().getTime() / 1000);
      const expires = localStorage.getItem('expires_in');
      if (dateNow >= parseInt(expires, 10)) {
        dispatch('getRefresh');
      } else {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };
        axios.post('https://mailing.dev.dengisrazy.ru/project/create', payload, config)
          .then((response) => {
            const responseData = response.data;
            console.log(responseData);
          });
      }
    },

    setProjectsList: (context, payload) => {
      context.commit('setProjectsList', payload);
    },

    getProjects: async (context) => {
      apiGetProjects()
        .then((response) => {
          context.commit('setProjectsList', response.data);
        });
    },
  },
  mutations: {
    setProjectsList: (state, payload) => {
      state.projectsList = payload.data;
    },
  },
  state: {
    projectsList: [],
  },
  getters: {
    projectsList: state => state.projectsList,
  },
};

