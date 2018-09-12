import firebase from '~/utils/firebase.js';
import 'firebase/auth';

export default function ({store, redirect}) {
  if(process.server) {
    return;
  }
  if(store.state.user === null) {
    redirect('/login');
  }
};
