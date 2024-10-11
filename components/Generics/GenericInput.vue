<template>
  <el-input
    v-model="input"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :clearable="clearable"
    :prefix-icon="prefixIcon && `el-icon-${prefixIcon}`"
    :suffix-icon="suffixIcon && `el-icon-${suffixIcon}`"
    :style="{
      width: widthtype === '%' ? `${width}%` : `${width}px`,
      border: required ? 'none' : '1px solid red',
      borderRadius: '5px',
      color: valuecolor,
    }"
    @input="getInputValue(name, input, order)"
    @change="getTableRequest(name, input, order)"
  >
  </el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    width: {
      type: String,
      default: '200',
    },
    widthtype: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'mini',
    },
    disabled: { type: Boolean, default: false },
    valuecolor: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: true,
    },
    limitedValue: {
      type: Array,
      default: () => [],
    },
    isItLimitedValue: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    maxValue: {
      type: Number,
      default: 0,
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      input: this.value,
      clearableValue: this.clearable,
    }
  },

  watch: {
    value(newVal) {
      this.input = newVal
      this.name === 'qty' && this.setLimitedValueAction(this.name)
      if (this.name === 'top_qty' || this.name === 'packQty')
        this.setMaxValueAction(this.name)
    },
  },

  methods: {
    getTableRequest(name, value, index) {
      this.$emit('enter', value)
      this.$emit('customFunction', name, value, index)
    },

    getInputValue(name, value, index) {
      this.$emit('input', value)
      this.$emit('customFunction', name, value, index)

      // function
      this.regexAction(name, value, index)
    },

    // RegeEx action
    regexAction(name, value, index) {
      const regex = /[-+]/g
      if (regex.test(value)) {
        this.input = value.replace(/[-+]/g, '')
      }
      this.$emit('customFunctionRegEx', name, this.input, index)
    },

    // Filtering modaldagi qty va realCount uchun ishlaydi
    setLimitedValueAction(name) {
      if (this.isItLimitedValue) {
        this.input = this.limitedValue?.[this.order]?.realCount
        this.$emit(
          'setMAXvalue',
          name,
          this.limitedValue?.[this.order]?.realCount,
          this.order
        )
      }
    },
    // Filtering modaldagi qty va realCount uchun ishlaydi

    // Filtering modaldagi top_qty va packQty'ni max-valuesini tekshiradi
    setMaxValueAction(name) {
      if (this.input >= this.maxValue) {
        this.input = this.maxValue
        this.$emit('setMAXvalue', name, this.maxValue)
      }
    },
    // Filtering modaldagi top_qty va packQty'ni max-valuesini tekshiradi
  },
}
</script>
