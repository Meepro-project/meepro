<template>
  <div>
    <section
      id="pane-hero"
      class="pane">
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

    <section
      id="pane-2nd"
      class="pane">
      <h1>What is Meepro?</h1>

      <div class="flex">
        <div>
          <img src="/Share-2.svg"> <br>
          Open Source <br>
          ソースコードをgithubで公開しています。
        </div>
        <div>
          <img src="/Dollar_bag.svg"> <br>
          Totally Free <br>
          課金という発想がありません。
        </div>
        <div>
          <img src="/Locked.svg" > <br>
          Secure <br>
          FacebookとのO-Authを利用しているため<br>
          最小限の個人情報しか管理していません。
        </div>
      </div>
    </section>

    <section
      id="pane-3rd"
      class="pane">
      <h1>こんな人々が使っています</h1>

      <div class="flex">
        <div>
          Hanyuさん<br>
          ミープロはとってもいいですね！
        </div>
      </div>
    </section>

    <section
      id="pane-4th"
      class="pane">
      <h1> HOW TO USE MEEPRO </h1>

      <div class="flex">
        <div>
          興味のある人を検索
        </div>
        <div>
          メッセージの招待ボタンを押す
        </div>
        <div>
          相手が承認してくれたらメッセージを始めよう！
        </div>
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

.pane {
  padding: 50px 50px;
  text-align: center;
}

#pane-2nd {
  background-color: white;
}

#pane-3rd {
  background-color: #d5efb6;
}

#pane-4th {
  background-color: white;
}

.flex {
  padding: 50px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;

  & > * {
    max-width: 100%;
  }
}
</style>
