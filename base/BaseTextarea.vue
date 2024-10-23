<template>
  <div>
    <textarea
      v-bind="$attrs"
      v-on="$listeners"
      v-on:keyup="lengthPad(text.length)"
      class="textarea"
      :maxlength="max"
      :value="value"
      :placeholder="title"
    ></textarea>
    <div class="char-limit" v-if="text.length < max">
      {{ noteLength }}/{{ max }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    value: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      max: "200",
      text: "",
      noteLength: "000",
    };
  },
  methods: {
    lengthPad: function (num) {
      this.noteLength = ("000" + num).slice(-3);
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/modules/_textarea.scss";
</style>