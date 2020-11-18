import { createStore } from 'vuex'

// модули
import templates from './modules/templates';
import refreshToken from './modules/refreshToken';
import authorization from './modules/authorization';
import projects from './modules/projects';
import mailings from './modules/mailings';
import info from './modules/info';
export default createStore({
  modules: {
    templates, refreshToken, authorization, projects, mailings, info,
  },
})
