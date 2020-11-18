// import axios from 'axios';
//
// export default {
//   actions: {
//     async getChannels(ctx) {
//       const dateNow = Math.round(new Date().getTime() / 1000);
//       const expires = localStorage.getItem('expires_in');
//       if (dateNow >= parseInt(expires, 10)) {
//         ctx.dispatch('getRefresh');
//       } else {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         };
//         axios.get('https://mailing.dev.dengisrazy.ru/channel/all', config)
//           .then((response) => {
//             const channels = response.data;
//             console.log(channels);
//             ctx.commit('updateChannelsList', channels);
//           }).catch((response) => {
//             console.log(response.message);
//           });
//       }
//     },
//   },
//   mutations: {
//     updateChannelsList(state, channels) { // обновляем список шаблонов
//       state.channelsList = channels;
//     },
//   },
//   state: {
//     channelsList: [],
//   },
//   getters: {
//     getchannelsList(state) {
//       return state.channelsList;
//     },
//   },
// };
//
