<template>
  <input
    ref="inputDate"
    v-model="inputValue"
    class="input text-[13px] text-[rgba(0,0,0,0.7)] rounded-[5px] border-[1px] border-solid border-[rgba(119,136,153,0.3)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99] px-[10px] py-[2px]"
    type="datetime-local"
    :style="{
      width: `${widthtype === '%' ? `${width}%` : `${width}px`}`,
      border: required
        ? '1px solid rgb(228,228,228)'
        : '1px solid rgba(255,0,0,0.5)',
      cursor: 'pointer',
    }"
    @change="getSelectValue"
  />
</template>
<script>
export default {
  // PROPS
  props: {
    id: {
      type: String,
      default: '',
    },
    widthtype: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: true,
    },
  },

  // DATA
  data() {
    return {
      inputValue: this.value || '',
    }
  },

  // WATCH
  watch: {
    value(newVal) {
      this.inputValue = newVal
    },
  },

  // METHODS
  methods: {
    getSelectValue() {
      this.$emit('change', this.inputValue, this.id)
      this.$emit('customFunction', this.name, this.inputValue, this.order)
    },

    focusCustomFunction() {
      this.$refs.inputDate?.focus()
    },
  },
}
</script>

<style scoped>
.input:focus {
  border: 1px solid #52a8eccc !important;
}
</style>
