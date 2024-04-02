<template>
  <input
    v-model="keywordValue"
    class="input rounded-[5px] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
    :type="type"
    :style="{
      width: widthtype === '%' ? `${width}%` : `${width}px`,
      height: `${height}px`,
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      fontSize: `${textsize}px`,
      color: valuecolor,
      border: required
        ? '1px solid rgb(228,228,228)'
        : '1px solid rgba(255,0,0,0.5)',
    }"
    :placeholder="placeholder"
    @input="getInputValue"
    @keyup.enter="getTableRequest"
  />
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    widthtype: {
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
    pl: {
      type: String,
      default: '',
    },
    pt: {
      type: String,
      default: '',
    },
    pr: {
      type: String,
      default: '',
    },
    pb: {
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
      keywordValue: '',
    }
  },
  methods: {
    getTableRequest(event) {
      this.$emit('enter', event.target.value)
      this.$emit('customFunction', this.name, this.keywordValue, this.order)
    },
    getInputValue({ target: { value } }) {
      this.keywordValue = value
      this.$emit('input', this.keywordValue)
      this.$emit('customFunction', this.name, this.keywordValue, this.order)
    },
  },
}
</script>

<style scoped>
.input:focus {
  border: 1px solid #52a8eccc !important;
}
</style>
