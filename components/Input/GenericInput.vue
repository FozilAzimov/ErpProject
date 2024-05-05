<template>
  <input
    v-model="keywordValue"
    class="input rounded-[5px] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
    :type="type"
    :style="{
      width: widthtype === '%' ? `${width}%` : `${width}px`,
      height: `${height}px`,
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      fontSize: `${textsize}px`,
      color: valuecolor,
      border: required
        ? '1px solid rgba(119,136,153,0.3)'
        : '1px solid rgba(255,0,0,0.5)',
    }"
    :placeholder="placeholder"
    @input="getInputValue"
    @keyup.enter="getTableRequest"
  />
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    widthtype: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    pl: {
      type: String,
      default: '',
    },
    pt: {
      type: String,
      default: '',
    },
    pr: {
      type: String,
      default: '',
    },
    pb: {
      type: String,
      default: '',
    },
    textsize: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
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
    maxValue: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      keywordValue: '',
    }
  },

  watch: {
    keywordValue(newVal) {
      this.name === 'qty' && this.setLimitedValueAction(this.name)
      if (this.name === 'top_qty' || this.name === 'packQty')
        this.setMaxValueAction(this.name)
    },
  },

  methods: {
    getTableRequest(event) {
      this.$emit('enter', event.target.value)
      this.$emit('customFunction', this.name, this.keywordValue, this.order)
    },

    getInputValue({ target: { value, checked, type } }) {
      type === 'checkbox'
        ? (this.keywordValue = checked)
        : (this.keywordValue = value)
      this.$emit('input', this.keywordValue)
      this.$emit('customFunction', this.name, this.keywordValue, this.order)
    },

    // Filtering modaldagi qty va realCount uchun ishlaydi
    setLimitedValueAction(name) {
      if (this.isItLimitedValue) {
        this.keywordValue = this.limitedValue?.[this.order]?.realCount
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
      if (this.keywordValue >= this.maxValue) {
        this.keywordValue = this.maxValue
        this.$emit('setMAXvalue', name, this.maxValue)
      }
    },
    // Filtering modaldagi top_qty va packQty'ni max-valuesini tekshiradi
  },
}
</script>

<style scoped>
.input:focus {
  border: 1px solid #52a8eccc !important;
}
</style>
