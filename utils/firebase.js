import firebase from 'firebase/app';
import 'firebase/auth';

export default firebase;

export const mixin = {
  computed: {
    isLogin() {
      return this.$store.state.user !== null;
    },
  },
};
