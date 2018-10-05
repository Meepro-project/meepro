<template>
  <b-modal
    id="user-modal"
    :visible="value"
    centered
    hide-backdrop
    ok-only
    ok-title="チャットをしたい"
    @ok.prevent
    @change="$emit('input', $event)"
  >
    <img
      :src="photoURL"
      class="photo">
    <div class="name">{{ name }}</div>
    <div class="profession">{{ profession }}</div>
    <tags
      :value="tags"
      class="tags"
      readonly
    />
    <div class="comment">
      {{ comment }}
    </div>
  </b-modal>
</template>

<script>
import Tags from "~/components/tags.vue";

export default {
  components: { Tags },
  props: {
    value: { type: Boolean, required: true },
    open: { type: Boolean, default: false },
    photoURL: { type: String, default: "" },
    name: { type: String, default: "" },
    profession: { type: String, default: "" },
    tags: { type: Array, default: () => [] },
    comment: { type: String, default: "" }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
dialog {
  margin: auto;
}
</style>
