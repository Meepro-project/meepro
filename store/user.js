import {init, auth} from '~/utils/firebase/auth.js';

export const state = () => ({
  auth: null,
  uid: '',
  displayName: '',
});

export const mutations = {
  updateAuth(state, auth) {
    if(!auth) auth = {};
    ({
      uid: state.uid = '',
      displayName: state.displayName = '',
    } = auth);
    state.auth = !!auth;
  },
};

export const actions = {
  async INIT_AUTH({dispatch}) {
    await init;
    await dispatch('UPDATE_USER');
  },
  async UPDATE_USER({commit}) {
    commit('updateAuth', auth.currentUser);
  },
};

export const getters = {
  isLogin(state) {
    return !!state.auth;
  },
};
