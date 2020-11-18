import { createStore } from 'vuex'

// модули
import templates from './modules/templates';
import authorization from './modules/authorization';
//import projects from './modules/projects';
import mailings from './modules/mailings';
import info from './modules/info';
export default createStore({
  modules: {
    templates, authorization, mailings, info,
  },
})
