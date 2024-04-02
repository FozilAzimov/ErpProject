<template>
  <input
    v-model="inputValue"
    class="input rounded-[5px] border-[1px] border-[solid] border-[rgba(228,228,228,1)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
    :type="type"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      fontSize: `${textsize}px`,
      color: valuecolor,
      border: required
        ? '1px solid rgb(228,228,228)'
        : '1px solid rgba(255,0,0,0.5)',
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
  },
}
</script>

<style scoped>
.input:focus {
  border: 1px solid #52a8eccc !important;
}
</style>
