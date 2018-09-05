<template>
  <section class="content-container">
    <facebook-login-button to="/profile" />
  </section>
</template>

<script>
import FacebookLoginButton from '~/components/FacebookLoginButton.vue';

export default {
  components: {
    FacebookLoginButton,
  },
};
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
