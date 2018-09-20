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
        <facebook-login-button 
          v-if="!isLogin" 
          to="/profile" />
      </div>
    </section>
    <a href="https://github.com/Meepro-project/meepro">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        alt="Fork me on GitHub"></a>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

import FacebookLoginButton from "~/components/FacebookLoginButton.vue";

export default {
  middleware: "fetch-user",
  components: {
    FacebookLoginButton
  },
  computed: {
    ...mapGetters("user", ["isLogin"])
  }
};
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
