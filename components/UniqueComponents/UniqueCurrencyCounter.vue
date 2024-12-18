<template>
  <div class="flex justify-between">
    <label>{{ defLabel }}</label>
    <div class="flex justify-between gap-[10px] w-[60%]">
      <UniqueLookUp
        :def-value="defValue"
        :custom-url="'invoiceBase/findAllCurrency'"
        @newValue="
          (value) => {
            setNewValue(value, 'currencyKey')
          }
        "
      />
      <UniqueInput
        :def-value="defaultInputVal"
        :def-type="'number'"
        @newValue="
          (value) => {
            setNewValue(value, 'inputKey')
          }
        "
      />
    </div>
  </div>
</template>
<script>
import UniqueLookUp from './UniqueLookUp.vue'
import UniqueInput from './UniqueInput.vue'
export default {
  components: {
    UniqueLookUp,
    UniqueInput,
  },
  props: {
    defLabel: {
      type: String,
      default: '',
    },
    defValue: {
      type: Object,
      default: () => ({
        id: 2,
        text: 'UZB',
      }),
    },
    defProperties: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      defaultValObj: this.defValue,
      defaultInputVal: '1.00',
      valueObject: {},
      defaultProps: this.defProperties,
      newResponseData: '',
    }
  },
  watch: {
    defProperties: {
      handler(newValue) {
        this.defaultProps = newValue
      },
      deep: true,
    },
  },
  mounted() {
    this.setNewValue(this.defValue, 'currencyKey')
  },
  methods: {
    async setNewValue(value, objKey) {
      this.$set(this.valueObject, objKey, value)
      if (objKey === 'currencyKey') {
        if (this.defProperties) {
          const data = {
            branchCompanyId: this.defaultProps.branchCompanyId
              ? this.defaultProps.branchCompanyId
              : null,
            currencyId: this.valueObject.currencyKey.id
              ? this.valueObject.currencyKey.id
              : null,
            dateFrom: this.defaultProps.dateFrom
              ? this.defaultProps.dateFrom
              : null,
            employeeId: this.defaultProps.employeeId
              ? this.defaultProps.employeeId
              : null,
            settingsRateType: this.defaultProps.settingsRateType
              ? this.defaultProps.settingsRateType
              : null,
          }

          try {
            const response = await this.$axios.post(
              'invoiceBase/getCurrentCurrencyRate',
              data,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              }
            )
            const responseObject = response.data.paramsObject
            this.defaultInputVal = responseObject.value
            const newData = {
              id: value.id,
              text: responseObject.currency,
              value: responseObject.value,
            }
            this.$emit('newValue', newData)
            this.newResponseData = newData
          } catch (err) {
            this.$emit('newValue', '')
            this.defaultInputVal = ''
          }
        }
      } else if (this.newResponseData) {
        this.newResponseData.value = value
      }
    },
  },
}
</script>
<style></style>
