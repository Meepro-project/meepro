<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="名前" for="name" horizontal>
        <b-form-input id="name" type="text" :value="name" plaintext readonly></b-form-input>
      </b-form-group>
      <b-form-group label="職業" for="occupation" horizontal>
        <b-form-input id="occupation" v-model="occupation" type="text"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from '~/utils/firebase.js';
import 'firebase/firestore';

let db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
});

export default {
  middleware: 'authenticated',
  data() {
    return {
      occupation: '',
    };
  },
  computed: {
    name() {
      return this.$store.state.user.displayName;
    },
  },
  methods: {
    onSubmit() {
      db.collection('users').doc(this.$store.state.user.uid).set({
        occupation: this.occupation,
      });
    },
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
