<template>
  <div>
    <img class="facebook-login-button" src="/facebook.png" @click="facebookLogin" />
  </div>
</template>

<script>
import firebase from '~/utils/firebase.js';
import 'firebase/auth';

export default {
  props: ['to'],
  methods: {
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then( res => {
        let user = res.user;
        this.$store.commit('authStatusChange');
        if(this.to) {
          this.$router.push(this.to);
        }
      }).catch( err => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.facebook-login-button {
  display: block;
  width: 200px;
}
</style>
