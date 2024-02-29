<template>
  <div
    class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
  >
    <div class="flex items-center gap-[10px]">
      <GenericButton
        name="Go Back"
        pl="10"
        pt="3"
        pr="10"
        pb="3"
        bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
        textsize="14"
        :url="img.goBack"
        :istherepicture="true"
        @click="$router.go(-1)"
      />
      <GenericButton
        name="onWay changeState"
        pl="10"
        pt="3"
        pr="10"
        pb="3"
        bggradient="linear-gradient(to bottom, rgb(108,33,38),rgba(108,33,38,0.65))"
        textsize="14"
      />
      <GenericButton
        name="Copy Invoice"
        pl="10"
        pt="3"
        pr="10"
        pb="3"
        bg="rgba(54, 155, 215, 0.8)"
        textsize="14"
        :url="img.copy"
        :istherepicture="true"
      />
      <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
        {{ headerTitle }}
      </h1>
    </div>
  </div>
</template>
<script>
// Icons url
import goBack from '@/assets/icons/go-back.png'
import copy from '@/assets/icons/copy.png'
import setting from '@/assets/icons/settings.png'
import printer from '@/assets/icons/printer.png'
import del from '@/assets/icons/delete.png'
export default {
  props: {
    headerTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      img: {
        goBack,
        copy,
        setting,
        printer,
        del,
      },
      userId: null,
    }
  },
}
</script>
