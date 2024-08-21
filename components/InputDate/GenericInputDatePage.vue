<template>
  <input
    ref="inputDate"
    v-model="inputValue"
    class="input rounded-[5px] border-[1px] border-solid border-[rgba(119,136,153,0.3)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
    :type="type"
    :style="{
      width: `${widthtype === '%' ? `${width}%` : `${width}px`}`,
      height: `${height}px`,
      padding: '2px 12px',
      fontSize: `${textsize}px`,
      color: valuecolor,
      border: required
        ? '1px solid rgb(228,228,228)'
        : '1px solid rgba(255,0,0,0.5)',
      cursor: 'pointer',
    }"
    :placeholder="placeholder"
    @change="getSelectValue"
  />
</template>
<script>
export default {
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
    placeholder: {
      type: String,
      default: '',
    },
    textsize: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    valuecolor: {
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
  data() {
    return {
      inputValue: this.value || '',
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal
    },
  },
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
