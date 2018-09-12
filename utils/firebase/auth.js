import firebase from '~/utils/firebase.js';
import 'firebase/auth';

export const init = (new Promise((resolve, reject) => {
  firebase.auth().onIdTokenChanged( u => resolve(u || false) );
}));

export const auth = firebase.auth();
