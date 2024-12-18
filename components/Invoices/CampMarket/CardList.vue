<template>
  <div
    ref="card"
    tabindex="0"
    class="card w-[400px] rounded-sm border-[1px] border-solid border-[#e5e5e5] overflow-hidden"
    :style="allCardData?.[rowIndex]?.count ? { background: '#deffde' } : 'none'"
  >
    <img
      v-if="cardData?.base64"
      :src="cardData.base64"
      alt="product_img"
      class="w-full h-[350px]"
      :style="{ borderRadius: '0.125rem 0.125rem 0 0' }"
    />
    <img
      v-else
      src="@assets/images/no-image.jpg"
      alt="product_img"
      class="w-full h-[350px]"
      :style="{ borderRadius: '0.125rem 0.125rem 0 0' }"
    />
    <div class="flex flex-col items-center gap-1 p-2">
      <h1 class="text-[18px] font-medium">
        {{ cardData?.name }}
      </h1>
      <div
        class="w-full flex items-center justify-between bg-[#a1e3a6] rounded-sm px-2 py-1"
      >
        <span class="w-1/3 text-[15px] font-semibold">Price</span>
        <span class="w-2/3 text-end">{{
          $formatNumber(cardData?.price ?? 0, 2) ?? 0
        }}</span>
      </div>
      <div
        class="w-full flex items-center justify-between bg-[rgb(131,207,223)] rounded-sm px-2 py-1"
      >
        <span class="w-1/3 text-[15px] font-semibold">Total</span>
        <span class="w-2/3 text-end">{{
          $formatNumber(allCardData?.[rowIndex]?.total ?? 0, 2) ?? 0
        }}</span>
      </div>
      <div
        class="w-full flex items-center justify-between bg-[#a8bfeb] rounded-sm px-2 py-1"
      >
        <span class="text-[15px] font-semibold">Qty</span>
        <div
          class="flex items-center justify-between gap-3 bg-[rgb(255,252,252)] px-2 py-1 rounded-sm"
        >
          <generic-button
            icon-name-attribute="minus"
            type="primary"
            :disabled="!allCardData?.[rowIndex]?.count"
            @click="
              counterAction(
                'minus',
                rowIndex,
                cardData.price,
                cardData.id,
                cardData.name
              )
            "
          />
          <span>{{ allCardData?.[rowIndex]?.count ?? 0 }}</span>
          <generic-button
            icon-name-attribute="plus"
            type="success"
            :disabled="!!allCardData?.[rowIndex]?.disabled"
            @click="
              counterAction(
                'plus',
                rowIndex,
                cardData.price,
                cardData.id,
                cardData.name
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
export default {
  // COMPONENTS
  components: { GenericButton },

  // PROPS
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
    allCardData: {
      type: Array,
      default: () => [],
    },
    rowIndex: {
      type: Number,
      default: null,
    },
    limitValue: {
      type: Number,
      default: 0,
    },
    totalAmountValue: {
      type: Number,
      default: 0,
    },
  },

  // METHODS
  methods: {
    counterAction(type, index, price, id, name) {
      this.$refs.card.focus() // set focus
      this.$emit('emitAction', type, index, price, id, name)
    },
  },
}
</script>

<style>
.card {
  transition: 0.6s;
}

.card:focus {
  transform: scale(1.03);
  transition: 0.6s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
