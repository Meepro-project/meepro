<template>
  <section class="container">
    <facebook-login-button to="/profile" />
  </section>
</template>

<script>
import FacebookLoginButton from '~/components/FacebookLoginButton.vue'

export default {
  components: {
    FacebookLoginButton,
  }
}
</script>

<style scoped>
.container {
}
</style>

