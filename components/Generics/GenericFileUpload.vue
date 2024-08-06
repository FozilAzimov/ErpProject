<template>
  <el-upload class="upload-demo" action="/url.com" :on-change="handleChange">
    <generic-button
      :is-icon="true"
      type="primary"
      name="Upload file"
      icon-name-class="upload2"
    />
  </el-upload>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: { GenericButton },

  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
  },
}
</script>
