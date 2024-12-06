<template>
  <div>
    <div>
      <el-date-picker
        v-model="dateValue"
        type="datetime"
        :disabled="isDisabled"
        size="mini"
        format="dd/MM/yyyy HH:mm:ss"
        value-format="dd/MM/yyyy HH:mm:ss"
        style="width: 190px"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    defValue: {
      type: String,
      default: '',
    },
    dateStart: {
      type: Boolean,
      default: false,
    },
    dateCurrentStart: {
      type: Boolean,
      default: false,
    },
    dateEnd: {
      type: Boolean,
      default: false,
    },
    dateMonthStart: {
      type: Boolean,
      default: false,
    },
    emptyDate: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dateValue: this.dateStart
        ? this.getCurrentDate().formattedDateTimeStart
        : this.dateCurrentStart
        ? this.getCurrentDate().formattedCurrentDateTimeStart
        : this.dateEnd
        ? this.getCurrentDate().formattedDateTimeEnd
        : this.dateMonthStart
        ? this.getCurrentDate().formattedMonthFirstDateTime
        : this.emptyDate
        ? ''
        : this.getCurrentDate().formattedDateTimeCurrent,
    }
  },
  watch: {
    dateValue() {
      this.emitCurrentValue()
    },
  },
  mounted() {
    this.emitCurrentValue()
  },
  methods: {
    getCurrentDate() {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      const hours = String(currentDate.getHours()).padStart(2, '0')
      const minutes = String(currentDate.getMinutes()).padStart(2, '0')
      const seconds = String(currentDate.getSeconds()).padStart(2, '0')

      const previousDayDate = new Date(currentDate)
      previousDayDate.setDate(currentDate.getDate() - 1)
      const previousDayYear = previousDayDate.getFullYear()
      const previousDayMonth = String(previousDayDate.getMonth() + 1).padStart(
        2,
        '0'
      )
      const previousDay = String(previousDayDate.getDate()).padStart(2, '0')

      const formattedDateTimeStart = `${previousDay}/${previousDayMonth}/${previousDayYear} 00:00:00`
      const formattedCurrentDateTimeStart = `${day}/${month}/${year} 00:00:00`
      const formattedDateTimeEnd = `${day}/${month}/${year} 23:59:59`
      const formattedDateTimeCurrent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
      const formattedMonthFirstDateTime = `01/${month}/${year} 00:00:00`

      return {
        formattedDateTimeStart,
        formattedCurrentDateTimeStart,
        formattedDateTimeEnd,
        formattedDateTimeCurrent,
        formattedMonthFirstDateTime,
      }
    },
    emitCurrentValue() {
      this.$emit('newValue', this.dateValue)
    },
  },
}
</script>
