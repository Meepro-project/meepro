import 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

export default firebase;

export const mixin = {
  computed: {
    isLogin() {
      console.log(this.$store.state.user);
      return this.$store.state.user !== null;
    },
  },
};

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
