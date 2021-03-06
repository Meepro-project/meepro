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
                @input="onSearch"
              />
            </b-collapse>
          </b-list-group-item>
        </b-list-group>

        <b-btn
          variant="success"
          @click="onSearch">Search</b-btn>
      </div>
    </div>

    <div style="width:5px"/>

    <div class="result-status">
      <b-card
        v-for="result in results"
        :key="result.id"
        tag="article"
        class="result-card"
      >
        <img
          :src="result.data.photoURL"
          class="photo">
        <div class="name">{{ result.data.name }}</div>
        <div class="profession">{{ result.data.profession }}</div>
        <tags
          :value="result.data.tags"
          class="tags"
          readonly
        />
        <div class="comment">
          {{ result.data.comment }}
        </div>
        <b-btn
          class="more-bar"
          variant="primary"
          @click="showUser(result.id)">more
        </b-btn>
      </b-card>
    </div>

    <UserModal
      v-if="modalData.user"
      v-model="modalData.open"
      :id="modalData.user.id"
      v-bind="modalData.user.data"/>
  </div>
</template>

<script>
import { mapState } from "vuex";

import firebase from "~/utils/firebase.js";
import { db } from "~/utils/firebase/db.js";

import professions from "~/utils/professions.js";
import Tags from "~/components/tags.vue";
import UserModal from "~/components/user-modal.vue";

export default {
  middleware: "authenticated",
  components: { Tags, UserModal },
  data() {
    return {
      searchByProfession: true,
      searchByComment: false,
      profession: null,
      modalData: {
        open: false,
        user: null
      },
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
    async onSearch() {
      const results = [];
      await db
        .collection("users")
        .where("profession", "==", this.profession)
        .limit(10)
        .get()
        .then(snapshot =>
          snapshot.forEach(doc => {
            results.push({ id: doc.id, data: doc.data() });
          })
        );
      this.results = results;
    },
    async showUser(id) {
      const user = this.results.find(u => u.id == id);
      if (!user) return;
      this.modalData.user = user;
      this.modalData.open = true;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.query-composer {
  padding: 10px 50px;
  background-color: white;
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
}

.result-status {
  min-width: 240px;
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  & .result-card {
    width: 240px;

    & .photo {
      display: block;
      margin: 15px auto;
    }

    & .name {
      text-align: center;
    }
    & .profession {
      text-align: center;
    }
    & .tags {
      line-height: 1.6;
      height: 3.2em;
      overflow: hidden;
    }
    & .comment {
      line-height: 1.6;
      height: 4.8em;
      overflow: hidden;
    }

    & .more-bar {
      width: 100%;
    }
  }
}

.collapse-header {
  display: block;
}
</style>
