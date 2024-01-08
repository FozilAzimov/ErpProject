<template>
  <input
    class="rounded-[5px] border-[1px] border-[solid] border-[rgba(228,228,228,1)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
    :type="type"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      fontSize: `${text_size}px`,
    }"
    :placeholder="placeholder"
    @keydown="getTableRequest"
    @input="getEnter"
  />
</template>
<script>
export default {
  props: {
    width: String,
    height: String,
    placeholder: String,
    pl: String,
    pt: String,
    pr: String,
    pb: String,
    text_size: String,
    type: String,
  },
  methods: {
    getTableRequest(event) {
      this.$emit('keydown', event.key)
    },
    getEnter(event) {
      this.$emit('inputChange', event.target.value)
    },
  },
}
</script>
