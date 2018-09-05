import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      lang: 'ja',
    },
    mutations: {
      setLang (state, lang) {
        state.lang = lang;
      }
    }
  })
}

export default createStore
