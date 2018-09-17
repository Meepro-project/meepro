<template>
  <div>
    <div class="tags-container">
      <b-btn
        v-for="val in localValue"
        :key="val"
        class="tag"
        variant="outline-danger"
        @click="onRemove">
        {{ val }}
      </b-btn>
    </div>
    <b-form-group v-if="!readonly" >
      <div style="display: inline-block" >
        <b-input-group>
          <input
            v-model="newTag"
            class="form-control"
            @keyup.enter.prevent="onAppend"
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
      newTag: "",
      localValue: this.value
    };
  },
  methods: {
    onRemove(e) {
      const idx = Array.prototype.indexOf.call(
        this.$el.querySelectorAll(".tags-container > .tag"),
        e.target
      );
      assert(idx >= 0);
      this.localValue.splice(idx, 1);
      this.$emit("input", this.localValue);
    },
    onAppend() {
      if (this.newTag && !this.localValue.includes(this.newTag))
        this.localValue.push(this.newTag);
      this.newTag = "";
      this.$emit("input", this.localValue);
    }
  }
};
</script>

<style scoped>
.tag {
  margin-right: 5px;
  margin-bottom: 5px;
  min-width: 50px;
}
</style>
