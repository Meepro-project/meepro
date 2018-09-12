import Vuex from 'vuex'

import firebase from '~/utils/firebase.js';
import {init, auth} from '~/utils/firebase/auth.js';

export const strict = true;
export const state = () => ({
  lang: 'ja',
});

export const mutations = {
  setLang (state, lang) {
    state.lang = lang;
  },
};

export const actions = {
  async CHANGE_USER({dispatch}) {
    await dispatch('user/CHANGE_USER');
  },
};

export const plugins = [
  store => {
    console.log(store);
    auth.onIdTokenChanged( u => {
      store.commit('user/setAuth', u);
    });
  },
];
