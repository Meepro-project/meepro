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
      <b-navbar-brand href="#">MEEPRO</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <template v-if="$route.path !== '/'">
            <b-nav-item v-if="true">
              <facebook-login-button/>
            </b-nav-item>
            <b-nav-item-dropdown right v-else>
              <template slot="button-content">&#x1F468;</template>
              <b-dropdown-item href="#">Hoge</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import FacebookLoginButton from '~/components/FacebookLoginButton.vue'

export default {
  components: {
    FacebookLoginButton,
  },
  methods: {
    setLang(lang) {
      this.$store.commit('setLang', lang);
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

<style scoped>
.container {
  width: 1600px;
}

#main-nav {
  padding-left: 200px;
  padding-right: 200px;
}
</style>

