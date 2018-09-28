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
export default {
  props: { to: { type: String, default: null } },
  methods: {
    facebookLogin() {
      this.$store
        .dispatch("user/LOGIN")
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
