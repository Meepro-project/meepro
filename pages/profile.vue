<template>
  <div class="container">
    <b-form
      @keyup.enter="onSubmit"
      @submit.prevent="onSubmit">
      <b-form-group
        label="写真"
        for="photo"
        horizontal>
        <img
          id="photo"
          :src="photoURL" >
      </b-form-group>
      <b-form-group
        label="名前"
        for="name"
        horizontal>
        <b-form-input
          id="name"
          :value="name"
          type="text"
          plaintext/>
      </b-form-group>
      <b-form-group
        label="職業"
        for="profession"
        horizontal>
        <b-form-input
          id="profession"
          v-model="profession"
          type="text"
          @input.native="saved = false; changed = true"/>
      </b-form-group>
      <b-button
        :variant="changed ? 'success' : saved ? 'outline-success' : 'secondary'"
        type="submit">{{ saved ? 'Saved!' : 'Save' }}</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

import firebase from "~/utils/firebase.js";

export default {
  middleware: "authenticated",
  data() {
    return {
      saved: false,
      changed: false,
      profession: ""
    };
  },
  async asyncData({ store }) {
    await store.dispatch("user/FETCH_PROFILE");
    return {
      profession: store.state.user.profession
    };
  },
  computed: {
    ...mapState("user", {
      photoURL: state => state.photoURL,
      name: state => state.displayName
    })
  },
  methods: {
    async onSubmit() {
      if (this.changed) {
        await this.$store.dispatch("user/UPDATE_PROFILE", {
          photoURL: this.photoURL,
          name: this.name,
          profession: this.profession
        });
        this.saved = true;
      }
      this.changed = false;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
}
</style>
