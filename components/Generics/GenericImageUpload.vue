<template>
  <div class="text-center">
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="onChange"
      :limit="1"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <generic-button
      name="Upload"
      type="primary"
      class="mt-1"
      @click="onChangeAction"
    />
  </div>
</template>
<script>
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: { GenericButton },
  // DATA
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
    }
  },

  // METHODS
  methods: {
    // Remove action
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.singleFile = file
    },

    // View Action
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // Download action
    handleDownload(file) {
      console.log(file)
    },

    // Change action
    onChange(file, fileList) {
      this.singleFile = file
    },

    // Upload Action
    async onChangeAction() {
      const formData = new FormData()
      formData.append('files', this.singleFile.raw)

      this.isLoading = !this.isLoading
      try {
        const res = await this.$axios.post(
          '/designVariant/fileUploadDesignVariant',
          formData
        )
        // eslint-disable-next-line no-console
        console.log(res)
        this.isLoading = !this.isLoading
      } catch (error) {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  },
}
</script>
