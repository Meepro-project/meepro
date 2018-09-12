<template>
  <div>
    <section id="pane-hero">
      <div class="pane-hero-text">
        <h1>MEET PROFESSIONAL</h1>
        <p class="describe">
          Meeproは話してみたい職業の人と会える、<br>
          完全無料でオープンソースの<br>
          出会い系ではないマッチングサービスです。
        </p>
        <facebook-login-button to="/profile" v-if="!isLogin" />
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import FacebookLoginButton from '~/components/FacebookLoginButton.vue';

export default {
  middleware: 'fetch-user',
  components: {
    FacebookLoginButton,
  },
  computed: {
    ...mapGetters('user', ['isLogin']),
  },
}
</script>

<style scoped lang="scss">
#pane-hero {
  & .pane-hero-text {
    width: 50%;
  }

  & h1 {
    color: #666ee8;
  }

  & .describe {
    color: #6b6f81;
  }
}
</style>
