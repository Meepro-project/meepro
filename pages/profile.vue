<template>
  <div class="container">
    <b-form
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
        label="ポジション"
        for="position"
        horizontal>
        <b-form-input
          id="position"
          v-model="position"
          required
          @keyup.enter="onSubmit"
          @input.native="onChange"
        />
      </b-form-group>

      <b-form-group
        label="プロフェッション"
        for="profession"
        horizontal>
        <b-form-select
          id="profession"
          v-model="profession"
          :options="professionOptions"
          required
          @change="onChange"
        />
      </b-form-group>

      <b-form-group
        label="タグ"
        horizontal>
        <tags
          :value = "tags"
          @click="onTagClick($event); onChange()"
          @input="onTagAppend($event); onChange()"
        />
      </b-form-group>

      <b-form-group
        label="フリーコメント"
        for="comment"
        horizontal>
        <b-form-textarea
          id="comment"
          v-model="comment"
          rows="3"
          @input.native="onChange"
        />
      </b-form-group>

      <template>
        <b-button
          v-if="changed"
          variant="success"
          type="submit">Save</b-button>
        <b-button
          v-else-if="saved"
          variant="outline-success">Saved!</b-button>
        <b-button
          v-else
          variant="secondary">Save</b-button>
      </template>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

import firebase from "~/utils/firebase.js";
import professions from "~/utils/professions.js";

import Tags from "~/components/tags.vue";

export default {
  components: { Tags },
  middleware: "authenticated",
  data() {
    return {
      saved: false,
      changed: false,
      position: "",
      profession: null,
      comment: "",
      tags: []
    };
  },
  async asyncData({ store }) {
    await store.dispatch("user/FETCH_PROFILE");
    return {
      position: store.state.user.position,
      profession: store.state.user.profession || null,
      tags: [].concat(store.state.user.tags),
      comment: store.state.user.comment
    };
  },
  computed: {
    ...mapState("user", {
      photoURL: state => state.photoURL,
      name: state => state.name
    }),
    professionOptions: () => [
      { value: null, text: "-- 選択してください --" },
      ...professions.map(profession => ({
        value: profession,
        text: profession
      }))
    ]
  },
  methods: {
    async onSubmit() {
      if (this.changed) {
        await this.$store.dispatch("user/UPDATE_PROFILE", {
          photoURL: this.photoURL,
          name: this.name,
          position: this.position,
          profession: this.profession,
          tags: this.tags,
          comment: this.comment
        });
        this.saved = true;
      }
      this.changed = false;
    },
    async onChange() {
      this.saved = false;
      this.changed = true;
    },
    async onTagAppend(newTag) {
      this.tags.push(newTag);
    },
    async onTagClick(tag) {
      this.tags = this.tags.filter(e => e !== tag);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 50px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
}
</style>
