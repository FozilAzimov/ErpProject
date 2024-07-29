<template>
  <el-checkbox
    v-model="checked"
    :disabled="disabled"
    :label="text"
    :border="border"
    :size="size"
    @change="getChangeValueAction"
  ></el-checkbox>
</template>
<script>
export default {
  // Props
  props: {
    defaultValue: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'mini',
    },
    text: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },

  // DATA
  data() {
    return {
      checked: this.defaultValue,
    }
  },

  // WATCH
  watch: {
    defaultValue(newVal) {
      this.checked = newVal
    },
  },

  // METHODS
  methods: {
    getChangeValueAction() {
      this.$emit('customFunction', this.name, this.checked, this.order)
    },
  },
}
</script>
