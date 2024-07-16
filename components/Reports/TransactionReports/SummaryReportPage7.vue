<template>
  <div class="w-full p-4 bg-[#f5f5f5] shadow-[0_0_10px_rgba(189,189,189,0.5)]">
    <form class="flex items-center gap-3 flex-wrap">
      <div class="flex items-center gap-1">
        <label
          for="from"
          class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
          >Start date</label
        >
        <GenericInput
          v-if="dateFrom"
          id="from"
          v-model="dateFrom"
          width="200"
          height="29"
          pl="10"
          pr="10"
          pt="2"
          pb="2"
          textsize="13"
          type="text"
        />
      </div>
      <div class="flex items-center gap-1">
        <label
          for="to"
          class="text-[13px] text-[] cursor-pointer tracking-[1.1] text-nowrap"
          >Start date</label
        >
        <GenericInput
          v-if="dateTo"
          id="to"
          v-model="dateTo"
          width="200"
          height="29"
          pl="10"
          pr="10"
          pt="2"
          pb="2"
          textsize="13"
          type="text"
        />
      </div>
    </form>
    <GenericButton
      name="Print Preview"
      pl="10"
      pt="2"
      pr="10"
      pb="2"
      bg="rgb(126,183,62)"
      textsize="14"
      class="mt-[15px]"
    />
  </div>
</template>

<script>
import GenericButton from '@components/Button/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    GenericInput,
    GenericButton,
  },

  // PROPS
  props: {
    from: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },

  // DATA
  data() {
    return {
      dateFrom: this.from,
      dateTo: this.to,
    }
  },
}
</script>
