<template>
  <div class="container">
    <div>
      <div
        class="query-composer">
        <b-list-group
          flush>
          <b-list-group-item>
            <div
              class="collapse-header"
              @click="searchByProfession = !searchByProfession">SEARCH PRO BY PROFESSION</div>
            <b-collapse
              id="search-by-profession"
              :visible="searchByProfession"
            >
              <b-form-select
                id="profession"
                v-model="profession"
                :options="professionOptions"
                required
              />
            </b-collapse>
          </b-list-group-item>

          <b-list-group-item>
            <div
              class="collapse-header"
              @click="searchByComment = !searchByComment">SEARCH PRO BY COMMENT</div>
            <b-collapse
              id="search-by-comment"
              :visible="searchByComment"
            >
              TODO
            </b-collapse>
          </b-list-group-item>
        </b-list-group>

        <b-btn
          variant="success"
          @click="onSearch">Search</b-btn>
      </div>

    </div>

    <div class="result-status">
      <b-card
        v-for="result in results"
        :key="result.id"
        tag="article"
        class="result-card"
      >
        <img :src="result.data.photoURL">
        <p class="name">{{ result.data.name }}</p>
        <tags 
          :value="result.data.tags" 
          readonly/>
      </b-card>
    </div>
</div></template>

  <script>
import { mapState } from "vuex";

import professions from "~/utils/professions.js";
import firebase from "~/utils/firebase.js";
import Tags from "~/components/tags.vue";
import { db } from "~/utils/firebase/db.js";

export default {
  middleware: "authenticated",
  components: { Tags },
  data() {
    return {
      searchByProfession: false,
      searchByComment: false,
      profession: null,
      results: []
    };
  },
  async asyncData({ store }) {
    await store.dispatch("user/FETCH_PROFILE");
    return {
      position: store.state.user.position
    };
  },
  computed: {
    ...mapState("user", {
      photoURL: state => state.photoURL,
      name: state => state.displayName
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
          position: this.position
        });
        this.saved = true;
      }
      this.changed = false;
    },
    async onSearch() {
      // this.results = []; // TODO
      db.collection("users")
        .where("profession", "==", this.profession)
        .limit(10)
        .get()
        .then(snapshot =>
          snapshot.forEach(doc => {
            this.results.push({ id: doc.id, data: doc.data() });
          })
        );
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
}

.result-status {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.query-composer {
  width: 350px;
  margin: 0 30px 0 0;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
}

.result-card {
  width: 200px;

  & .name {
    margin: auto;
  }
}

.collapse-header {
  display: block;
}
</style>
