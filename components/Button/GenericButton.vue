<template>
  <button
    class="flex items-center gap-1 rounded-[5px] text-white active:scale-110 duration-[0.3s] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(0,0,0,0.1)]"
    :style="{
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      backgroundColor: bg,
      fontSize: `${text_size}px`,
      margin: `${margin}px`,
    }"
  >
    <img v-if="is_there_picture" class="w-[15px]" :src="url" alt="icons" />
    {{ name }}
  </button>
</template>
<script>
export default {
  props: {
    name: String,
    pl: String,
    pt: String,
    pr: String,
    pb: String,
    text_size: String,
    bg: String,
    margin: String,
    url: String,
    is_there_picture: Boolean,
  },
}
</script>
