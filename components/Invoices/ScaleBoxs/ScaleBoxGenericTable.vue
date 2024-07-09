<template>
  <div class="w-[780px] border-[1px] border-solid border-[#D9DBDF] p-2">
    <div class="flex items-center justify-between gap-2 mb-2">
      <GenericButton name="Add" type="primary" @click="addRowAction" />
      <GenericButton name="Save" type="primary" @click="saveAction" />
    </div>
    <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
      <thead class="bg-[rgb(229,235,245)]">
        <tr>
          <th
            v-for="(element, index) in tableHeadBodyData"
            :key="index"
            class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer whitespace-nowrap"
          >
            {{ element.name }}
          </th>
          <th
            class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer whitespace-nowrap"
          >
            Delete
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in tableBodyAllData"
          :key="index"
          class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
        >
          <td
            v-for="(element, inx) in row"
            :key="inx"
            class="border-[1px] text-[12px] p-2"
          >
            <look-up
              v-if="element.type === 'list'"
              durl="invoiceBase/searchProductList"
              dwidth="100"
              widthtype="%"
              dlist="150"
              :name="element.payloadName"
              :order="index"
              result-type="object"
              @customFunction="getLookUpValue"
            />
            <generic-input
              v-else-if="element.type === 'float'"
              :value="tableLookUpAndInputValues?.[index]?.qty"
              width="100"
              widthtype="%"
              height="23"
              pl="10"
              pr="10"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              :name="element.payloadName"
              :order="index"
              @customFunction="getInputValue"
            />
            <generic-input
              v-else-if="element.type === 'number'"
              width="100"
              widthtype="%"
              height="23"
              pl="10"
              pr="10"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              :name="element.payloadName"
              :order="index"
              @customFunction="getInputValue"
            />
            <generic-input
              v-else-if="element.type === 'string'"
              width="100"
              widthtype="%"
              height="23"
              pl="10"
              pr="10"
              pt="2"
              pb="2"
              textsize="13"
              type="text"
              :name="element.payloadName"
              :order="index"
              @customFunction="getInputValue"
            />
          </td>
          <td class="border-[1px] text-[12px] p-2">
            <img
              src="@/assets/icons/delete.png"
              class="w-[22px] cursor-pointer"
              @click="deleteAction(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import GenericButton from '@components/Generics/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import LookUp from '@components/Lookup/LookUp.vue'
export default {
  components: {
    GenericButton,
    LookUp,
    GenericInput,
  },

  props: {
    tableHeadBodyData: {
      type: Array,
      default: () => [],
    },
    allLookUpAndInputData: {
      type: Object,
      default: () => ({}),
    },
    saveUrl: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      tableBodyAllData: [],
      tableLookUpAndInputValues: [],
    }
  },

  methods: {
    // Addition action
    addRowAction() {
      this.tableBodyAllData.push(this.tableHeadBodyData)
    },

    // Delete action
    deleteAction(id) {
      this.tableLookUpAndInputValues = this.tableLookUpAndInputValues.filter(
        (obj, index) => id !== index
      )
      this.tableBodyAllData = this.tableBodyAllData.filter(
        (arr, index) => id !== index
      )
    },

    // Look Up  valuesini olish
    getLookUpValue(name, value, valueID, order, resultType) {
      if (this.tableLookUpAndInputValues?.[order] && resultType === 'object') {
        this.$set(this.tableLookUpAndInputValues[order], name, { id: valueID })
      } else if (
        this.tableLookUpAndInputValues?.[order] &&
        resultType !== 'object'
      ) {
        this.$set(this.tableLookUpAndInputValues[order], name, value)
      } else if (resultType === 'object') {
        this.tableLookUpAndInputValues.push({
          [name]: { id: valueID },
        })
      } else {
        this.tableLookUpAndInputValues.push({
          [name]: value,
        })
      }
    },

    // Input value sini olish
    getInputValue(name, value, order) {
      if (this.tableLookUpAndInputValues?.[order]) {
        if (name === 'percentage') {
          this.$set(
            this.tableLookUpAndInputValues[order],
            'qty',
            parseFloat(value) / 100
          )
        } else if (name !== 'percentage') {
          this.$set(this.tableLookUpAndInputValues[order], name, value)
        }
      } else if (name === 'percentage') {
        this.tableLookUpAndInputValues.push({
          [name]: parseFloat(value) / 100,
        })
      } else if (name !== 'percentage') {
        this.tableLookUpAndInputValues.push({
          [name]: value,
        })
      }
    },

    saveAction() {
      const body = {
        ...this.allLookUpAndInputData,
        erpInvoiceItemList: this.tableLookUpAndInputValues,
      }

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/simpleProductionInvoice/${this.saveUrl}`, body)
        .then((res) => {
          this.isLoading = !this.isLoading
          this.$router.push('/simpleProductionInvoice.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
