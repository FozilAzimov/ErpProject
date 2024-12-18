<template>
  <span></span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },
  methods: {
    open(id, index, actionName, messageName) {
      this.$confirm(
        `${this.GET_CORE_STRING?.areYouSure || 'Are you sure you want to'} ${
          messageName || `${this.GET_CORE_STRING?.delete}` || 'delete'
        }?`,
        {
          confirmButtonText: `${this.GET_CORE_STRING?.messegaOk || 'Ok'}`,
          cancelButtonText: `${this.GET_CORE_STRING?.cancel || 'Cancel'}`,
          type: 'warning',
          center: true,
        }
      )
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
