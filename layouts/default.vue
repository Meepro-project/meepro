<template>
  <div>
    <b-navbar
      id="topmost-nav"
      toggleable>
      <b-navbar-toggle target="nav_collapse"/>
      <b-collapse
        id="nav_collapse"
        is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            right
            no-caret>
            <b-dropdown-item @click="setLang('ja')">Japanese</b-dropdown-item>
            <b-dropdown-item @click="setLang('en')">English</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <b-navbar
      id="main-nav"
      toggleable
      type="light"
      variant="light">
      <b-navbar-toggle target="nav_collapse"/>
      <img
        id="m-logo"
        src="../static/logo.svg">
      <b-navbar-brand
        id="nav_brand"
        to="/">EEPRO</b-navbar-brand>
      <b-naveach
        id="naveach"
        to="/profile">Profile</b-naveach>
      <b-naveach
        id="naveach"
        to="/search">Search</b-naveach>
      <b-naveach
        id="naveach"
        to="/requests">Requests</b-naveach>
      <b-navlog
        v-if="isLogin"
        id="navlog"
        @click="signOut">Logout</b-navlog>
      <b-navlog
        v-if="!isLogin"
        id="navlog">Login</b-navlog>
      <b-navlog
        v-if="!isLogin"
        id="navlog">Sign in</b-navlog>
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
import firebase from "~/utils/firebase.js";
import { auth } from "~/utils/firebase/auth.js";
import { mapGetters } from "vuex";

import FacebookLoginButton from "~/components/FacebookLoginButton.vue";

export default {
  components: {
    FacebookLoginButton
  },
  computed: {
    language() {
      return this.$store.state.lang;
    },
    ...mapGetters("user", ["isLogin"])
  },
  methods: {
    setLang(lang) {
      this.$store.commit("setLang", lang);
    },
    async signOut() {
      await auth.signOut();
      this.$router.push("/");
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<style scoped lang="scss">
#nav_brand {
  letter-spacing: 5px;
}

#topmost-nav {
  background-color: #053d01;
}

.body {
  background-color: #d5efb6;
}

.container {
  width: 1600px;
  padding: 30px;
}

footer {
  padding: 50px 200px;

  background-color: #053d01;

  color: #a5a8bb;
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
  height: 70px;
  padding-left: 200px;
  padding-right: 200px;
}

#naveach {
  padding-right: 20px;
  float: right;
}
#navlog {
  padding-right: 20px;
  float: right;
}
#m-logo {
  padding-right: 3px;
}
</style>
