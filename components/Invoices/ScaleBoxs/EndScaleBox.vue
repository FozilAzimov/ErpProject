<template>
  <div
    class="w-fit flex flex-col items-end gap-2 border-[1px] border-solid border-[#D9DBDF] p-2"
  >
    <div class="flex flex-col gap-3">
      <div
        v-for="(element, index) in allDataType"
        :key="index"
        class="flex flex-col items-start"
      >
        <span class="text-[13px]">{{ element.name }}</span>
        <generic-look-up
          v-if="element.type === 'list'"
          :durl="element.url"
          dwidth="100"
          widthtype="%"
          dlist="100"
          :name="element.payloadName"
          @customFunction="getLookUpValue"
        />
        <generic-input
          v-else-if="element.type === 'number'"
          width="210"
          pl="8"
          pr="8"
          pt="2"
          pb="2"
          textsize="13"
          type="number"
          :name="element.payloadName"
          @customFunction="getInputValue"
        />
        <generic-input-date-page
          v-else-if="element.type === 'date'"
          :value="new Date().toISOString().split('.')[0]"
          width="210"
          :name="element.payloadName"
          @customFunction="getDateValue"
        />
      </div>
    </div>
    <generic-button name="Accept" type="primary" @click="acceptAction" />
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    GenericLookUp,
    GenericInputDatePage,
    GenericInput,
    GenericButton,
  },

  // DATA
  data() {
    return {
      allInputLookUpValues: {},
      allDataType: [
        {
          name: 'Order Production Type',
          payloadName: 'orderProductionTypeId',
          type: 'list',
          url: 'findAllOrderProductionType',
        },
        { name: 'Date', payloadName: 'valueDate', type: 'date' },
        {
          name: 'Company Branch',
          payloadName: 'branchCompanyId',
          type: 'list',
          url: 'findAllCompanyLogic',
        },
        {
          name: 'Departments',
          payloadName: 'departmentId',
          type: 'list',
          url: 'findAllDepartmentLogic',
        },
        {
          name: 'Input Warehouse',
          payloadName: 'warehouseId',
          type: 'list',
          url: 'findAllWarehouseLogic',
        },
        {
          name: 'Product',
          payloadName: 'productId',
          type: 'list',
          url: 'searchProductList',
        },
        {
          name: 'Output Warehouse',
          payloadName: 'expenseWarehouseId',
          type: 'list',
          url: 'findAllWarehouseLogic',
        },
        {
          name: 'Production QTY',
          payloadName: 'productionQty',
          type: 'number',
        },
      ],
    }
  },

  mounted() {
    this.allInputLookUpValues.valueDate = new Date()
      .toLocaleString('en-GB')
      .split(',')
      .join('')
  },

  // METHODS
  methods: {
    // GenericLookUp value'sini olish
    getLookUpValue(name, value, valueID, order, resultType) {
      this.allInputLookUpValues[name] = valueID
      if (name === 'product' && valueID) this.getResponseData('all')
    },
    // Input value'sini olish
    getInputValue(name, value) {
      this.allInputLookUpValues[name] = value
    },
    // Input value'sini olish
    getDateValue(name, value, rowID) {
      this.allInputLookUpValues[name] = new Date(value)
        .toLocaleString('en-GB')
        .split(',')
        .join('')
    },

    acceptAction() {
      if (Object.keys(this.allInputLookUpValues).length >= 8) {
        this.$emit('isTableShowHide', this.allInputLookUpValues, true)
      }
    },
  },
}
</script>
