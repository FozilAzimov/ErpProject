<template>
  <span></span>
</template>

<script>
export default {
  methods: {
    open(id, index) {
      this.$confirm('Are you sure you want to delete?', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true,
      })
        .then((res) => {
          this.$emit('emitProp', res, id, index)
          this.$message({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch((res) => {
          this.$emit('emitProp', res, id, index)
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },
  },
}
</script>
