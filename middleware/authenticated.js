import firebase from '~/utils/firebase.js';
import 'firebase/auth';

export default function ({store, redirect}) {
  if(store.state.user === null) {
    redirect('/login');
  }
}
