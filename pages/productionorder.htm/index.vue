<template>
  <MainList
    main-action-url="productionOrder/productionorderAjaxLoad"
    main-create-url="prepareProductionOrderItem"
  />
</template>

<script>
import MainList from '@/components/Lists/MainList.vue'
export default {
  components: { MainList },
}
</script>
