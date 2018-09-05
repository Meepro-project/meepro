import firebase from 'firebase/app';

export default firebase;

if(firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyAr_blBrYVsKQ3_wxspOC063K3XykUoYOg",
    authDomain: "meepro-dev.firebaseapp.com",
    databaseURL: "https://meepro-dev.firebaseio.com",
    projectId: "meepro-dev",
    storageBucket: "meepro-dev.appspot.com",
    messagingSenderId: "1018513591875"
  });
}
