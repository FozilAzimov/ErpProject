<template>
  <el-select
    v-model="value"
    filterable
    :disabled="disabled"
    :placeholder="placeholder"
    :multiple="multiple"
    :size="size"
    :clearable="true"
    :popper-append-to-body="popperAppendToBody"
    :loading="loading"
    loading-text="Loading..."
    no-data-text="No Data"
    :filter-method="getRequestResponseAction"
    :style="{
      width: widthtype === '%' ? `${dwidth}%` : `${dwidth}px`,
      border: required ? 'none' : '1px solid red',
      borderRadius: '5px',
    }"
    @change="getChangeValueAction"
    @focus="getRequestResponseAction('')"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="
        item?.name
          ? item?.name
          : item?.moduleName
          ? item?.moduleName
          : `${item?.fname} ${item?.lname} ${item?.employee_number}`
      "
      :value="
        item?.id ? item?.id : item?.moduleId ? item?.moduleId : item?.code
      "
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
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  // DATA
  data() {
    return {
      loading: false,
      options: this.optionsData,
      value: this.defvalue,
    }
  },

  // WATCH
  watch: {
    defvalue: {
      handler(newVal) {
        this.value = newVal
      },
      immediate: true,
    },
  },

  // METHODS
  methods: {
    // Filtering And dUrl action
    getRequestResponseAction(searchKey) {
      // filter searchKey'ni value'ga set qilish
      this.value = searchKey
      // filter searchKey'ni value'ga set qilish
      if (this.durl) {
        this.loading = true
        const body = { ...this.dparam, search_key: searchKey }
        this.$axios
          .post(
            `${
              this.durl === 'findAllEquipments' ||
              this.durl === 'findAllDyeingEquipments'
                ? 'productionReports'
                : 'invoiceBase'
            }/${this.durl}`,
            body
          )
          .then((res) => {
            this.loading = false
            this.options = res.data
          })
          .catch((res) => {
            this.loading = false
          })
      } else {
        this.options = this.optionsData.filter((obj) =>
          obj?.name.includes(searchKey)
        )
      }
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
  },
}
</script>
