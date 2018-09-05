<template>
  <div>
    <b-navbar id="topmost-nav" toggleable type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="language" right>
            <b-dropdown-item @click="setLang('ja')">Japanese</b-dropdown-item>
            <b-dropdown-item @click="setLang('en')">English</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <b-navbar id="main-nav" toggleable type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">MEEPRO</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <template v-if="$route.path !== '/'">
            <b-nav-item-dropdown right v-if="isLogin">
              <template slot="button-content">&#x1F468;</template>
              <b-dropdown-item to="/profile">プロフィール</b-dropdown-item>
              <b-dropdown-item @click="signOut">ログアウト</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-else>
              <facebook-login-button/>
            </b-nav-item>
          </template>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <div class="body">
      <div class="container">
        <nuxt/>
      </div>
    </div>

    <footer>
      <div class="footer-brand">
        MEEPRO
      </div>
      <div class="footer-column">
        <div class="footer-column-title">ABOUT</div>
        <ul>
          <li>hoge</li>
          <li>fuga</li>
        </ul>
      </div>
      <div class="footer-column">
        <div class="footer-column-title">RESOURCES</div>
        <ul>
          <li><s>Twitter</s></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from '~/utils/firebase.js';
import {mixin as firebaseMixin} from '~/utils/firebase.js';

import FacebookLoginButton from '~/components/FacebookLoginButton.vue'

export default {
  mixins: [firebaseMixin],
  components: {
    FacebookLoginButton,
  },
  methods: {
    setLang(lang) {
      this.$store.commit('setLang', lang);
    },
    async signOut() {
      await firebase.auth().signOut();
      this.$store.commit('authStatusChange');
      this.$router.push('/');
    },
  },
  computed: {
    language() {
      return this.$store.state.lang;
    },
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

</style>

<style scoped lang="scss">
.body {
  background-color: #cfc;
};

.container {
  width: 1600px;
  padding: 30px;
}

footer {
  padding: 50px 200px;

  background-color: #080;

  color: #ccc;
  display: flex;
  flex-direction: row;

  & .footer-brand {
    color: #fff;
  }

  & .footer-column {
    padding: 10px 50px;
    width: 200px;

    & ul {
      list-style-type: none;
    }
  }
}

#main-nav {
  height: 100px;
  padding-left: 200px;
  padding-right: 200px;
}
</style>

