<template>
  <div class="input">
    <label v-if="label" class="input__label">
      {{ label }}
    </label>

    <select class="select input__field" v-bind="$attrs" v-on="$listeners">
      <option value=""  selected>
        {{ title }}
      </option>

      <option
        v-for="option in options"
        :key="option[keyId]"
        :selected="selectedValue[0] == option[keyId]"
        :value="option[keyId]"
        @click="$emit('change', option[keyId])"
      >
        <span v-if="option[keyName]">
          {{ option[keyName] }}
        </span>
        <span v-else>
          {{ option }} 
        </span>
        <span v-if="option[optionalKeyName]">
          / {{ option[optionalKeyName] }}
        </span>
      </option>
    </select>
    <p v-if="valodationmsg" class="erormsg">
      {{ valodationmsg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BaseSelectInput',
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
    selectedValue: {
      type: Array,
      default() {
        return []
      },
    },
    label: {
      type: String,
      default: '',
    },
    keyName: {
      type: String,
      default: '',
    },
    optionalKeyName: {
      type: String,
      default: '',
    },
    keyId: {
      type: String,
      default: '',
    },
    valodationmsg: {
      type: String,
      default: '',
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
