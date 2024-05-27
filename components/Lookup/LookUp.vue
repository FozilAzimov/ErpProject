<template>
  <el-select
    v-model="value"
    filterable
    :disabled="disabled"
    placeholder=""
    :size="size"
    :clearable="true"
    :popper-append-to-body="false"
    :loading="loading"
    loading-text="Loading..."
    no-data-text="No Data"
    :filter-method="customFilterAction"
    :style="{
      width: widthtype === '%' ? `${dwidth}%` : `${dwidth}px`,
      border: required ? 'none' : '1px solid red',
      borderRadius: '5px',
    }"
    @change="getChangeValueAction"
    @focus="focusSelectAction"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.name"
      :text="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  // PROPS
  props: {
    durl: { type: String, default: '' },
    dparam: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: 'mini',
    },
    name: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    resultType: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
    defvalue: {
      type: String,
      default: '',
    },
    dwidth: {
      type: String,
      default: '',
    },
    widthtype: {
      type: String,
      default: '',
    },
    optionsData: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      loading: false,
      options: [],
      value: this.defvalue,
      text: '',
    }
  },

  watch: {
    defvalue(newVal) {
      this.value = newVal
    },
    optionsData(newVal) {
      this.options = newVal
    },
  },

  // METHODS
  methods: {
    // select'ga yozilganda ishaydi
    customFilterAction(value) {
      // function
      this.getRequestResponseAction(value)
    },

    // select change bo'lganda ishlaydi
    getChangeValueAction(value) {
      // Emit action
      this.$emit(
        'customFunction',
        this.name,
        value,
        this.order,
        this.resultType
      )
    },

    // select'ga focus qaratganda ishlaydi
    focusSelectAction(event) {
      // function
      this.getRequestResponseAction('')
    },

    getRequestResponseAction(searchKey) {
      if (this.durl) {
        this.loading = true
        const body = { ...this.dparam, search_key: searchKey }
        this.$axios
          .post(`${this.durl}`, body)
          .then((res) => {
            this.loading = false
            this.options = res.data
          })
          .catch((res) => {
            this.loading = true
          })
      }
    },
  },
}
</script>
