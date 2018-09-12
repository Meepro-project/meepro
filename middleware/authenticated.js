import firebase from '~/utils/firebase.js';
import {init} from '~/utils/firebase/auth.js';

export default async function ({store, redirect}) {
  if(process.server) {
    return;
  }
  await store.dispatch('user/INIT_AUTH');
  if(!store.getters['user/isLogin']) {
    redirect('/login');
  }
};
