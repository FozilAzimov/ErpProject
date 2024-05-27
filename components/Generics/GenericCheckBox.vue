<template>
  <el-checkbox v-model="checked" @change="getChangeValueAction"></el-checkbox>
</template>
<script>
export default {
  // Props
  props: {
    defaultValue: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
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
