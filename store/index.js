import Vuex from 'vuex'

import firebase from '~/utils/firebase.js';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: firebase.auth().currentUser,
      lang: 'ja',
    },
    mutations: {
      setLang (state, lang) {
        state.lang = lang;
      },
      authStatusChange(state) {
        state.user = firebase.auth().currentUser;
      },
    }
  })
}

export default createStore;
