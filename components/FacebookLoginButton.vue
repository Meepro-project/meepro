<template>
  <button
    class="btn btn-social btn-facebook"
    @click="facebookLogin">
    <fa
      :icon="['fab','facebook-square']"
      style="margin: auto;" />Sign in with Facebook
  </button>
</template>

<script>
import firebase from "~/utils/firebase.js";
import { auth } from "~/utils/firebase/auth.js";

export default {
  props: { to: { type: String, default: null } },
  methods: {
    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();

      auth
        .signInWithPopup(provider)
        .then(async _ => {
          await this.$store.dispatch("CHANGE_USER");
          if (this.to) {
            this.$router.push(this.to);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.facebook-login-button {
  display: block;
  width: 200px;
}
</style>
