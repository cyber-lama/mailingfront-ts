import axios from 'axios';
import {
  apiGetMailingList,
  apiGetChannels,
  apiGetFilters,
  apiGetInterval,
  apiGetEndingTypes, apiGetFiltersScopes,
} from '../../services/Api';
import store from '../../store';

export default {
  actions: {

    getAllData() {
      console.log('запуск метода getAllData');
      const arrayApi = [
        { name: 'mailings', apiFunction: apiGetMailingList },
        { name: 'channels', apiFunction: apiGetChannels },
        { name: 'filters', apiFunction: apiGetFilters },
        { name: 'interval', apiFunction: apiGetInterval },
        { name: 'endingTypes', apiFunction: apiGetEndingTypes },
        { name: 'filtersScopes', apiFunction: apiGetFiltersScopes },
      ];
      // перебираем массив с api
      const requests = arrayApi.filter(item => item.apiFunction());
      console.log(requests, store.getters.isLocked);
      // функция в которой упаковываем ответ в состояние
      function packAnswer(response) {
        console.log(response, store.getters.isLocked, 'метод packAnswer', requests);
      }
      // Promise.all будет ожидать выполнения всех промисов
      Promise.all(requests)
        .then((responses) => {
          responses.forEach(
            response => packAnswer(response),
          );
        });
      // apiGetMailingList()
      //   .then((response) => {
      //     console.log('1');
      //     const mailings = response ? response.data : {};
      //     context.commit('updateState', { data: mailings, name: 'mailings' });
      //   });
      // apiGetChannels()
      //   .then((response) => {
      //     console.log('2');
      //     const channels = response ? response.data : {};
      //     context.commit('updateState', { data: channels, name: 'channels' });
      //   });
      // apiGetFilters()
      //   .then((response) => {
      //     console.log('3');
      //     const filters = response ? response.data : {};
      //     context.commit('updateState', { data: filters, name: 'filters' });
      //   });
      // apiGetInterval()
      //   .then((response) => {
      //     const intervals = response ? response.data : {};
      //     context.commit('updateState', { data: intervals, name: 'interval' });
      //   });
      // apiGetEndingTypes()
      //   .then((response) => {
      //     const endingTypes = response ? response.data : {};
      //     context.commit('updateState', { data: endingTypes, name: 'endingTypes' });
      //   });
      // apiGetFiltersScopes()
      //   .then((response) => {
      //     const filters = response ? response.data : {};
      //     context.commit('updateState', { data: filters, name: 'filtersScopes' });
      //   });
    },
    // async getMailings(context) {
    //   console.log(context.getters.isLocked);
    //   !context.getters.isLocked && await apiGetMailingList()
    //     .then((response) => {
    //       const mailings = response ? response.data : {};
    //       context.commit('updateMailings', mailings);
    //     });
    // },
    // async getChannels(context) {
    //   !context.getters.isLocked && await apiGetChannels()
    //     .then((response) => {
    //       const channels = response ? response.data : {};
    //       context.commit('updateState', { data: channels, name: 'channels' });
    //     });
    // },
    // async getFilters(context) {
    //   // context.dispatch('getRefresh');
    //   !context.getters.isLocked && await apiGetFilters()
    //     .then((response) => {
    //       const filters = response ? response.data : {};
    //       context.commit('updateState', { data: filters, name: 'filters' });
    //     });
    // },
    // async getInterval(context) {
    //   // context.dispatch('getRefresh');
    //   !context.getters.isLocked && await apiGetInterval()
    //     .then((response) => {
    //       const intervals = response ? response.data : {};
    //       context.commit('updateState', { data: intervals, name: 'interval' });
    //     });
    // },
    // async getEndingTypes(context) {
    //   // context.dispatch('getRefresh');
    //   await apiGetEndingTypes()
    //     .then((response) => {
    //       const endingTypes = response ? response.data : {};
    //       context.commit('updateState', { data: endingTypes, name: 'endingTypes' });
    //     });
    // },
    mailingCreate(context, payload) {
      // context.dispatch('getRefresh');
      const testData = {
        name: payload.name,
        project_id: payload.projectId, // существующий проект
        template_id: payload.templateId, // существующий шаблон
        status: payload.status, // 1 активна, 0 отключена
        comment: 'comment', // комментарий
        channels: payload.channels, // обязательный
        filters: payload.filters,
        event: payload.event,
      };
      // console.log(payload);
      axios.post('https://mailing.dev.dengisrazy.ru/mailing/create', testData)
        .then((response) => {
          console.log(response);
        })
        .catch((response) => {
          console.log(response.message, 'МУТАТОР');
        });
    },
  },
  mutations: {
    updateState(state, payload) {
      // console.log(payload.name, payload.data, "PAYLOAD");
      state[payload.name] = payload.data;
    },
    updateMailings(state, mailings) { // обновляем список шаблонов
      state.mailings = mailings;
    },

    controlAdditionallyMailing(state, payload) {
      state.editMailing = {};
      state.additionMailing = payload;
    },
  },
  state: {
    mailings: [],
    editMailing: {},
    filtersScopes: [],
    additionMailing: false,
    channels: [],
    endingTypes: {},
  },
  getters: {
    getAllMailings(state) {
      return state.mailings;
    },
    getStatusAdditionallyMailing(state) {
      return state.additionMailing;
    },
    getChannels(state) {
      return state.channels;
    },
    getEndingTypes(state) {
      return state.endingTypes;
    },
    getFiltersScopes(state) {
      return state.filtersScopes;
    },
  },
};

