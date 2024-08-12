<template>
  <div>
    <h1>PRODUCTION INTERNAL</h1>
    <generic-button
      name="Go Back"
      type="primary"
      icon-name-attribute="arrow-left"
      @click="$router.push('/columnSettings.htm')"
    />
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: { GenericButton },
}
</script>
