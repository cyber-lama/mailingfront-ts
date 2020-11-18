import { apiGetTemplates } from '../../services/Api';

export default {
  actions: {
    async getTemplates(ctx) {
      apiGetTemplates()
        .then((response) => {
          ctx.commit('updateTemplates', response.data);
        });
    },
    async editTemplate(ctx, payload) {
      const dateNow = Math.round(new Date().getTime() / 1000);
      const expires = localStorage.getItem('expires_in');
      if (dateNow >= parseInt(expires, 10)) {
        ctx.dispatch('getRefresh');
      } else {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };
        axios.put(`https://mailing.dev.dengisrazy.ru/template/${payload.id}/update`, {
          name: payload.name,
          message: payload.message,
          comment: payload.comment,
        }, config).then(() => {
          ctx.dispatch('getTemplates');
          ctx.commit('controlAdditionallyTemplate', false);
        },
        ).catch((response) => {
          console.log(response.message);
        });
      }
    },
    async createTemplates(ctx, payload) {
      const dateNow = Math.round(new Date().getTime() / 1000);
      const expires = localStorage.getItem('expires_in');
      if (dateNow >= parseInt(expires, 10)) {
        ctx.dispatch('getRefresh');
      } else {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };
        axios.post('https://mailing.dev.dengisrazy.ru/template/create', payload, config)
          .then(() => {
            ctx.dispatch('getTemplates');
            ctx.commit('controlAdditionallyTemplate', false);
          }).catch((response) => {
            console.log(response.message);
          });
      }
    },
  },
  mutations: {
    updateTemplates(state, templates) { // обновляем список шаблонов
      state.templates = templates.data;
    },
    controlAdditionallyTemplate(state, payload) {
      state.editObject = {};
      state.additionTemplate = payload;
    },
    addObject(state, payload) {
      state.additionTemplate = true;
      state.editObject = payload;
    },
  },
  state: {
    editObject: {},
    templates: [],
    additionTemplate: false,
  },
  getters: {
    getAllTemplates(state) {
      return state.templates;
    },
    getStatusAdditionally(state) {
      return state.additionTemplate;
    },
    getEditElement(state) {
      return state.editObject;
    },
  },
};

