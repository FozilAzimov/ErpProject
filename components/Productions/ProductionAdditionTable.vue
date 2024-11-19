<template>
  <div>
    <span class="flex items-center gap-2">
      <span v-if="title" class="text-[16px] font-semibold text-[#317eac]">{{
        title
      }}</span>

      <generic-button
        v-for="(elem, index) in buttons"
        :key="index"
        :name="elem?.name"
        :type="elem?.type"
        :icon-name-attribute="elem?.iconNameAttribute"
        @click="customFunctionAction(elem?.action)"
      />
    </span>

    <div class="w-full h-fit overflow-x-auto">
      <table class="w-full border-[1px] border-solid border-[#F0F0F0] mt-2">
        <thead class="bg-[rgb(229,235,245)]">
          <tr>
            <th
              v-for="(headName, key) in data"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-6 cursor-pointer"
              :class="`w-[${headName?.width}px]`"
              :style="{
                whiteSpace:
                  headName?.subName !== 'externalProductsAndServicesCode'
                    ? 'nowrap'
                    : '',
              }"
            >
              <template v-if="headName?.multiple"
                >{{ headName?.topName }} |</template
              >
              {{ headName?.name }}
              <span v-if="headName?.required" class="text-red-600 text-[16px]"
                >*</span
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, inx) in tableData"
            :key="inx"
            class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
          >
            <td
              v-for="(element, index) in row"
              :key="index"
              class="border-[1px] text-[12px] text-center p-2"
            >
              <template v-if="element?.type === 'label'">{{
                1 + inx
              }}</template>
              <template v-else-if="element?.type === 'date'">
                <generic-input-date-page
                  type="datetime-local"
                  :name="element?.subName"
                  :order="inx"
                  :disabled="element?.disabled"
                  @customFunction="getSelectAndInputValueAction"
                />
              </template>
              <template v-else-if="element?.type === 'select'">
                <generic-look-up
                  :dwidth="element?.width"
                  :durl="element?.api"
                  :name="element?.subName"
                  :order="inx"
                  :disabled="element?.disabled"
                  :options-data="allSelectData?.[element?.subName]"
                  @customFunction="getSelectAndInputValueAction"
                  @emitLookUpData="getLookUpData"
                />
              </template>
              <template
                v-else-if="
                  element?.type === 'text' ||
                  element?.type === 'number' ||
                  element?.type === 'textarea'
                "
              >
                <generic-input
                  :width="element?.width"
                  :name="element?.subName"
                  :type="element?.type"
                  :order="inx"
                  :disabled="element?.disabled"
                  :value="
                    tableAllDataEmitArray?.[inx]?.[element?.subName] ?? ''
                  "
                  @customFunction="getSelectAndInputValueAction"
                />
              </template>
              <template v-else-if="element?.type === 'checkbox'">
                <generic-check-box
                  :name="element?.subName"
                  :order="inx"
                  :disabled="element?.disabled"
                  @customFunction="getSelectAndInputValueAction"
                />
              </template>
              <template v-else-if="element?.type === 'button'">
                <generic-button type="success" :name="element?.btnName" />
              </template>
              <template v-else-if="element?.type === 'del'">
                <generic-button
                  type="danger"
                  :circle="true"
                  icon-name-attribute="delete"
                  @click="deleteRowAction(inx, tableData)"
                />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericLookUp,
    GenericInput,
    GenericCheckBox,
    GenericInputDatePage,
  },

  props: {
    pageId: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    allSelectData: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      tableData: [],
      allSelectAndInputValue: {},
      tableAllDataEmitArray: [],
      allSelectDataArr: [],
      pageName: null,
    }
  },

  // MOUNTED
  watch: {
    data: {
      handler() {
        this.tableData.push(this.data)
      },
      deep: true,
    },
  },

  // MOUNTED
  mounted() {
    this.pageName = this.$route?.name
    this.tableData.push(this.data)
  },

  // METHODS
  methods: {
    // Row Delete action
    deleteRowAction(index, rows) {
      rows.splice(index, 1)
      this.tableAllDataEmitArray.splice(index, 1)
    },

    customFunctionAction(name) {
      if (name === 'add') {
        this.tableData.push(this.data)
      } else if (name === 'save') {
        const body = {
          id: this.pageId,
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/packagings/addPackagingDetails`, body)
          .then(() => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Emit action
    additionTableValuesAction() {
      this.$emit('getTableValue', this.allSelectAndInputValue)
    },

    // Select and Input values set
    getSelectAndInputValueAction(name, value, index) {
      this.$set(this.allSelectAndInputValue, name, value)

      // table valuelarini arrayga set qilish
      if (!this.tableAllDataEmitArray[index])
        this.$set(this.tableAllDataEmitArray, index, { prePayment: false })

      if (name === 'externalProductsAndServicesCode' || name === 'item')
        this.$set(this.tableAllDataEmitArray[index], name, { id: value })
      else this.$set(this.tableAllDataEmitArray[index], name, value)
      // table valuelarini arrayga set qilish

      // function
      this.pageName.includes('contractRegistration.htm') &&
        this.selectAndInputAction(name, value, index)
    },

    // Input and Select actions
    selectAndInputAction(name, value, index) {
      if (name === 'item') {
        const thisUM = this.allSelectDataArr.find(
          (obj) => obj?.id === value
        )?.um
        this.$set(this.tableAllDataEmitArray[index], 'measurement', thisUM)
      } else if (name === 'qty') {
        const net =
          parseFloat(value || 0) *
          parseFloat(this.tableAllDataEmitArray?.[index]?.unitPrice || 0)
        this.$set(this.tableAllDataEmitArray[index], 'net', net.toFixed(3))
      } else if (name === 'unitPrice') {
        const net =
          parseFloat(value || 0) *
          parseFloat(this.tableAllDataEmitArray?.[index]?.qty || 0)
        this.$set(this.tableAllDataEmitArray[index], 'net', net.toFixed(3))
      } else if (name === 'vat') {
        const vatAmount =
          (parseFloat(this.tableAllDataEmitArray?.[index]?.net || 0) / 100) *
          parseFloat(value || 0)
        this.$set(
          this.tableAllDataEmitArray[index],
          'vatAmount',
          vatAmount.toFixed(3)
        )
      }

      // Total Amount hisoblash uchun
      if (name === 'qty' || name === 'unitPrice' || name === 'vat') {
        const ammount =
          parseFloat(this.tableAllDataEmitArray?.[index]?.net || 0) +
          parseFloat(this.tableAllDataEmitArray?.[index]?.vatAmount || 0)
        this.$set(
          this.tableAllDataEmitArray[index],
          'ammount',
          ammount.toFixed(3)
        )
      }

      // Emit set Table Data
      this.$emit('emitTableData', this.tableAllDataEmitArray)
    },

    // get LookUp data
    getLookUpData(data) {
      this.allSelectDataArr = data
    },
  },
}
</script>
