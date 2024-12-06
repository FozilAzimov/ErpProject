<template>
  <div>
    <div style="position: relative">
      <el-select
        v-model="value.text"
        placeholder="Select"
        filterable
        clearable
        default-first-option
        :size="defSize"
        no-data-text="No data"
        :loading="loading"
        :disabled="defaultActiveStatus"
        :filter-method="handleSelect"
        :remote="remoteStatus"
        @visible-change="handleSelect('')"
        @focus="focusHandler"
        @blur="blurHandler"
        @change="handleOptionChange"
      >
        <el-option
          v-for="(item, id) in options"
          :key="id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    customParameter: {
      type: Object,
      default: () => {},
    },
    customUrl: {
      type: String,
      default: '',
    },
    defValue: {
      type: [String, Object],
      default: () => ({}),
    },
    defSize: {
      type: String,
      default: 'mini',
    },
    defActiveStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: [],
      actionUrl: this.customUrl,
      parameters: this.customParameter,
      value: this.defValue === '' ? {} : this.defValue,
      loading: false,
      remoteStatus: false,
      defaultActiveStatus: this.defActiveStatus,
    }
  },
  computed: {},
  watch: {
    defValue(newValue) {
      console.log(newValue, 'newValue')
      console.log(this.value, 'this.value')
      this.value = newValue === '' ? {} : newValue
      if (newValue.name && !newValue.text) {
        this.value.text = newValue.name
      }
      console.log('watch property worked')
    },
    customParameter(newValue) {
      this.parameters = newValue
    },
    defActiveStatus(newVal) {
      console.log(newVal, 'defActiveStatus(newVal)')
      this.defaultActiveStatus = newVal
    },
    customUrl(newVal) {
      this.actionUrl = newVal
    },
  },
  methods: {
    async handleSelect(query) {
      // console.log(query, 'query');
      const searchKey = query || ''
      const data = {
        search_key: searchKey,
      }
      if (this.parameters) {
        Object.assign(data, this.parameters)
      }
      this.loading = true
      try {
        const response = await this.$axios.post(
          this.actionUrl,
          // `/api/${this.actionUrl}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        // console.log(response.data, 'response.data');
        this.options = response.data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
    handleOptionChange(newValue) {
      console.log('emitting lookup')
      let selectedOption = {}
      if (newValue !== '') {
        selectedOption = this.options.find((option) => option.id === newValue)
      } else {
        // selectedOption.id = '';
        // selectedOption.text = '';
        selectedOption = null
      }
      // this.$emit('newValue', this.value)
      this.$emit('newValue', selectedOption)
    },
    focusHandler() {
      this.remoteStatus = true
    },
    blurHandler() {
      this.remoteStatus = false
    },
  },
}
</script>
<style>
.el-select-dropdown__item:hover {
  background-color: #c4d6f1;
}
.custom-option {
  position: relative;
  z-index: 999;
}
</style>
