<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // translate api
    getStaticTableNameValues() {
      this.$axios
        .post(
          `/translate`,
          { messages: this.tableNameTranslate },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          this.tableNameTranslateObj = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
