import {init, auth} from '~/utils/firebase/auth.js';
import {db} from '~/utils/firebase/db.js';

import {deepCopy} from '~/utils/utils.js';

const defaultState = {
  auth: null,
  uid: '',
  displayName: '',
  occupation: '',
};

export const state = () => deepCopy(defaultState);

export const mutations = {
  setAuth(state, auth) {
    if(!auth) auth = {};
    ({
      uid: state.uid = '',
      displayName: state.displayName = '',
    } = auth);
    state.auth = !!auth;
  },
  setProfile(state, {occupation}) {
    Object.assign(state, {occupation});
  },
  reset(state) {
    Object.assign(state, deepCopy(defaultState));
  },
};

export const actions = {
  async INIT_AUTH({dispatch}) {
    await init;
    await dispatch('CHANGE_USER');
  },
  async FETCH_PROFILE({state, commit, getters}) {
    if(!getters.isLogin) return;

    const doc = await db.collection('users').doc(state.uid).get();
    let profile = {occupation: ''};
    if(doc.exists) {
      Object.assign(profile, doc.data());
    }
    commit('setProfile', profile);
  },
  async CHANGE_USER({commit}) {
    commit('reset');
    commit('setAuth', auth.currentUser);
  },
  async UPDATE_PROFILE({state, commit}, {occupation, name}) {
    await db.collection('users').doc(state.uid).set({
      occupation,
      name,
    });
    commit('setProfile', {occupation});
  }
};

export const getters = {
  isLogin(state) {
    return !!state.auth;
  },
};
