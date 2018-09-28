<template>
  <div>
    <div class="tags-container">
      <b-badge
        v-for="val in value"
        :key="val"
        class="tag"
        @click="onClick">
        {{ val }}
      </b-badge>
    </div>
    <b-form-group v-if="!readonly" >
      <div style="display: inline-block" >
        <b-input-group>
          <input
            v-model="newTag"
            class="form-control"
            @input.prevent
            @keydown.enter.prevent="onAppend"
          >
          <b-input-group-append>
            <b-btn @click="onAppend">タグ追加</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>
      <b-form-valid-feedback />
    </b-form-group>
  </div>
</template>

<script>
import { assert } from "~/utils/utils.js";

export default {
  props: {
    readonly: { type: Boolean, default: false },
    value: { type: Array, default: () => [] }
  },
  data() {
    return {
      newTag: ""
    };
  },
  methods: {
    onClick(e) {
      const tag = e.target.textContent.trim();
      this.$emit("click", tag);
    },
    onAppend() {
      const newTag = this.newTag.trim();
      if (newTag && !this.value.includes(newTag)) this.$emit("input", newTag);
      this.newTag = "";
    }
  }
};
</script>

<style scoped>
.tag {
  margin-right: 3px;
}
</style>
