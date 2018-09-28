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
      <img
        src="../static/kaisya_kaiwa_communication.png"
        alt="header image"
        align="top:right">
    </section>

    <section id="pane-2nd">
      <div>
        <img src="/User.svg" >
      </div>
      <div>
        <img src="/User.svg" >
      </div>
      <div>
        <img src="/User.svg" >
      </div>
    </section>

    <a href="https://github.com/Meepro-project/meepro">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        alt="Fork me on GitHub">
    </a>

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
  display: flex;
  flex-direction: row;
  justify-content: center;

  & .pane-hero-text {
    margin: auto 0;
  }

  & h1 {
    margin-bottom: 1em;
    color: #666ee8;
  }

  & .describe {
    color: #6b6f81;
  }
}

#pane-2nd {
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  text-align: center;

  & > * {
    max-width: 100%;
  }
}
</style>
