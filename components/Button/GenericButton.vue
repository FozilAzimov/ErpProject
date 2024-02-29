<template>
  <button
    class="flex items-center gap-1 rounded-[5px] text-white active:scale-110 duration-[0.3s] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(0,0,0,0.1)]"
    :disabled="disabled"
    :style="{
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      background: disabled ? disabledBg : bggradient,
      backgroundColor: disabled ? disabledBg : bg,
      color: color,
      fontSize: `${textsize}px`,
      margin: `${margin}px`,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }"
    @click="getTableRowOpen"
  >
    <img v-if="istherepicture" class="w-[15px]" :src="url" alt="icons" />
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: {
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
    bggradient: {
      type: String,
      default: '',
    },
    bg: {
      type: String,
      default: '',
    },
    disabledBg: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    istherepicture: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getTableRowOpen() {
      this.$emit('click')
    },
  },
}
</script>
