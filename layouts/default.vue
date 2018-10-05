<template>
  <div>
    <b-navbar
      id="topmost-nav"
    />

    <b-navbar
      id="main-nav"
      toggleable
      type="light"
      variant="light">
      <b-navbar-toggle target="nav_collapse"/>

      <b-navbar-brand
        id="nav_brand"
        to="/">
        <img
          id="m-logo"
          src="../static/logo.svg"
          alt="M">EEPRO
      </b-navbar-brand>

      <b-collapse
        id="nav_collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item
            to="/profile">
            Profile
          </b-nav-item>
          <b-nav-item
            to="/search">
            Search
          </b-nav-item>
          <b-nav-item
            to="/requests">
            Requests
          </b-nav-item>

          <b-nav-item
            v-if="!isLogin"
            @click="signIn"
          >
            Login
          </b-nav-item>
          <b-nav-item
            v-else
            @click="signOut">
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="body">
      <div class="body-container">
        <nuxt/>
      </div>
    </div>

    <footer class="footer">
      <div class="brand">MEEPRO</div>

      <div class="footer-body">
        <div class="footer-column">
          <div class="footer-navitem-title">ABOUT</div>
          <ul>
            <li>hoge</li>
            <li>fuga</li>
          </ul>
        </div>

        <div class="footer-column">
          <div class="footer-navitem-title">RESOURCES</div>
          <ul>
            <li>Twitter</li>
          </ul>
        </div>
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
    async signIn() {
      await this.$store.dispatch("user/LOGIN");
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

#m-logo {
  padding-right: 3px;
}

.body {
  background-color: #d5efb6;

  & .body-container {
    padding: 30px 0;
  }
}

.footer {
  padding: 20px;
  background-color: #053d01;
  color: #a5a8bb;

  & .brand {
    color: #fff;
  }

  & ul {
    list-style-type: none;
  }

  & .footer-body {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: stretch;
    flex-wrap: wrap;

    & .footer-column {
      padding: 10px;
    }
  }
}
</style>
