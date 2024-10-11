<template>
  <span></span>
</template>

<script>
export default {
  methods: {
    open(id, index, actionName) {
      this.$confirm('Are you sure you want to delete?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true,
      })
        .then((res) => {
          this.$emit('emitProp', res, id, index, actionName)
        })
        .catch((res) => {
          this.$emit('emitProp', res, id, index, actionName)
        })
    },
  },
}
</script>
