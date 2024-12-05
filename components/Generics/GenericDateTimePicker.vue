<template>
  <div class="flex items-center gap-5">
    <el-date-picker
      ref="datePicker"
      v-model="dateValue"
      type="datetime"
      size="mini"
      format="dd/MM/yyyy HH:mm:ss"
      value-format="dd/MM/yyyy HH:mm:ss"
      :style="{
        width: `${widthtype === '%' ? `${width}%` : `${width}px`}`,
        border: required ? 'none' : '1px solid red',
        borderRadius: '5px',
      }"
      @change="getSelectValue"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  // PROPS
  props: {
    id: {
      type: String,
      default: '',
    },
    widthtype: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '175',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Date],
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
  },

  // DATA
  data() {
    return {
      dateValue: this.value || '',
    }
  },

  // METHODS
  methods: {
    getSelectValue() {
      let value = ''
      if (this.dateValue) {
        const [datePart, timePart] = this.dateValue.split(' ')
        const [day, month, year] = datePart.split('/').map(Number)
        const [hours, minutes, seconds] = timePart.split(':').map(Number)
        const padWithZero = (value) => (value < 10 ? `0${value}` : `${value}`)
        value = `${padWithZero(day)}/${padWithZero(month)}/${padWithZero(
          year
        )} ${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(
          seconds
        )}`
      }
      this.$emit('change', value, this.id)
      this.$emit('customFunction', this.name, value, this.order)
    },

    focusCustomFunction() {
      this.$refs.datePicker?.focus()
    },
  },
}
</script>
