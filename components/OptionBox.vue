<template>
  <li 
    @click="selectOption()"
    class="e-select-box__option"
    :class="{ 'e-select-box__option--selected' : active }"
  >
  {{ label }}
  </li>
</template>

<script>
export default {
  name: 'OptionBox',
  props: {
    value: String,
    label: String,
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    selectOption() {
      this.$emit("onChange", this.value);
    }
  },
}
</script>