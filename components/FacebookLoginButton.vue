<template>
  <button class="btn btn-social btn-facebook" @click="facebookLogin">
    <fa style="margin: auto;" :icon="['fab','facebook-square']" />Sign in with Facebook
  </button>
  <!-- img class="facebook-login-button" src="/facebook.png" @click="facebookLogin" / -->
</template>

<script>
import firebase from '~/utils/firebase.js';
import 'firebase/auth';

import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export default {
  props: ['to'],
  computed: {
    faFacebook() {
      return faFacebook;
    },
  },
  methods: {
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then( async _ => {
        await this.$store.dispatch('user/UPDATE_USER');
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
