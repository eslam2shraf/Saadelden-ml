<template>
  <div class="input">
    <component :is="icon" class="input__icon" aria-hidden="true" />
    <label v-if="label" class="input__label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      autocomplete="off"
      :value="value"
      :placeholder="placeholder"
      :class="['error_input' ? valodationmsg !== ' ' : '' , 'input__field']"
      v-on="$listeners"
      @input="$emit('update', $event.target.value)"
    />
    <error-msg v-if="valodationmsg" :errorMsg="valodationmsg" class="input__errorMsg" />
  
    <!-- <p v-if="valodationmsg" class="erormsg">
      {{ valodationmsg }}
    </p> -->
    <label :title="title"> </label>
  </div>
</template>

<script>
import ErrorMsg from '../layouts/ErrorMsg.vue'

export default {
  name: 'TextInput',
  components: {
    ErrorMsg 
    
   },
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    valodationmsg: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
