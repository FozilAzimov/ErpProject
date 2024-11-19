<template>
  <div>
    <h1>hayyyy</h1>
    <generic-button
      name="back"
      type="primary"
      icon-name-attribute="arrow-left"
      @click="$router.push('productionorder.htm')"
    />
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: { GenericButton },
}
</script>
