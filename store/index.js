import Vuex from 'vuex'

import firebase from '~/utils/firebase.js';

const createStore = () => {
  if(firebase.apps.length === 0) {
    firebase.initializeApp({
      apiKey: "AIzaSyAr_blBrYVsKQ3_wxspOC063K3XykUoYOg",
      authDomain: "meepro-dev.firebaseapp.com",
      databaseURL: "https://meepro-dev.firebaseio.com",
      projectId: "meepro-dev",
      storageBucket: "meepro-dev.appspot.com",
      messagingSenderId: "1018513591875",
    });
  }

  const store = new Vuex.Store({
    state: {
      user: null,
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

  firebase.auth().onIdTokenChanged( (user) => {
    store.commit('authStatusChange');
  });
  return store;
}

export default createStore;
