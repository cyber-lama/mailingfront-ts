import axios from 'axios';

export default {
  actions: {
    async setInfoMessage(context, payload) {
      context.commit('updateInfoMessage', payload);
    },
  },
  mutations: {
    updateInfoMessage: (state, payload) => { // обновляем список шаблонов
      state.infoMessage = payload;
    },
  },
  state: {
    infoMessage: "Нет сообщений",
  },
  getters: {
    getInfoMessage: state => state.infoMessage,
  },
};
