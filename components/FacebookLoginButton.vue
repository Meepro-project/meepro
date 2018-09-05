<template>
  <img class="facebook-login-button" src="/facebook.png" @click="facebookLogin" />
</template>

<script>
import FirebaseApp from '~/utils/firebase.js';
import 'firebase/auth';

export default {
  methods: {
    facebookLogin() {
      const provider = new FirebaseApp.auth.FacebookAuthProvider();

      FirebaseApp.auth().signInWithPopup(provider).then( res => {
        let user = res.user;
        this.$router.push('/settings/profile');
      }).catch( err => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.facebook-login-button {
  width: 200px;
}
</style>
