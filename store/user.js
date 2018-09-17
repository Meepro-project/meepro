import { init, auth } from "~/utils/firebase/auth.js";
import { db } from "~/utils/firebase/db.js";

import { deepCopy, filterKeys } from "~/utils/utils.js";

const persistentFilter = filterKeys([
  "name",
  "photoURL",
  "position",
  "profession",
  "tags",
  "comment"
]);
const syncDBFilter = filterKeys(["position", "profession", "tags", "comment"]);
const defaultState = () =>
  deepCopy({
    auth: null,
    uid: "",
    name: "",
    photoURL: "",
    position: "",
    tags: [],
    comment: ""
  });

export const state = () => defaultState();

export const mutations = {
  setAuth(state, auth) {
    const { uid, displayName, photoURL } = Object.assign(
      {},
      defaultState(),
      { displayName: "" },
      auth
    );
    Object.assign(state, { auth: !!auth, uid, name: displayName, photoURL });
  },
  setProfile(state, profile) {
    Object.assign(state, syncDBFilter(profile));
  },
  reset(state) {
    Object.assign(state, defaultState());
  }
};

export const actions = {
  async INIT_AUTH({ dispatch }) {
    await init;
    await dispatch("CHANGE_USER");
  },
  async FETCH_PROFILE({ state, commit, getters }) {
    if (!getters.isLogin) return;

    const doc = await db
      .collection("users")
      .doc(state.uid)
      .get();
    const profile = defaultState();
    if (doc.exists) {
      Object.assign(profile, doc.data());
    }
    commit("setProfile", profile);
  },
  async CHANGE_USER({ commit }) {
    commit("reset");
    commit("setAuth", auth.currentUser);
  },
  async UPDATE_PROFILE({ state, commit }, profile) {
    await db
      .collection("users")
      .doc(state.uid)
      .set(persistentFilter(profile));
    commit("setProfile", profile);
  }
};

export const getters = {
  isLogin(state) {
    return !!state.auth;
  }
};
