<template>
  <div>
    <span class="flex items-center gap-2">
      <span class="text-[16px] font-semibold text-[#317eac]">Packaging</span>
      <generic-button
        name="Add new"
        type="primary"
        icon-name-attribute="circle-plus-outline"
        @click="addRowAction"
      />
      <generic-button
        name="Save Change"
        type="primary"
        @click="saveChangeAction"
      />
    </span>

    <div class="w-full h-fit overflow-x-auto">
      <table class="w-full border-[1px] border-solid border-[#F0F0F0] mt-2">
        <thead class="bg-[rgb(229,235,245)]">
          <tr>
            <th
              v-for="(headName, key) in rowData"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-6 cursor-pointer whitespace-nowrap"
              :class="`w-[${headName?.width}px]`"
            >
              {{ headName?.name }}
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
              <template v-else-if="element?.type === 'select'">
                <look-up dwidth="150" />
              </template>
              <template v-else-if="element?.type === 'text'">
                <generic-input width="150" />
              </template>
              <template v-else-if="element?.type === 'checkbox'">
                <generic-check-box />
              </template>
              <template v-else-if="element?.type === 'button'">
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
import LookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
    LookUp,
    GenericInput,
    GenericCheckBox,
  },

  props: {
    pageId: {
      type: String,
      default: '',
    },
  },

  // DATA
  data() {
    return {
      tableData: [],
      rowData: [
        {
          name: 'Id',
          subName: 'id',
          width: '120',
          type: 'label',
        },
        {
          name: 'Product Name',
          subName: 'name',
          width: '120',
          type: 'select',
        },
        {
          name: 'Qty',
          subName: 'qty',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type1 Value',
          subName: 'unitMeasurementType1Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type1',
          subName: 'unitMeasurementType1',
          width: '120',
          type: 'select',
        },
        {
          name: 'Unit Measurement Type2 Value',
          subName: 'unitMeasurementType2Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type2',
          subName: 'unitMeasurementType2',
          width: '120',
          type: 'select',
        },
        {
          name: 'Unit Measurement Type3 Value',
          subName: 'unitMeasurementType3Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type3',
          subName: 'unitMeasurementType3',
          width: '120',
          type: 'select',
        },
        {
          name: 'Unit Measurement Type4 Value',
          subName: 'unitMeasurementType4Value',
          width: '120',
          type: 'text',
        },
        {
          name: 'Unit Measurement Type4',
          subName: 'unitMeasurementType4',
          width: '120',
          type: 'select',
        },
        {
          name: 'Notes',
          subName: 'notes',
          width: '120',
          type: 'text',
        },
        {
          name: 'Expense',
          subName: 'expense',
          width: '120',
          type: 'checkbox',
        },
        {
          name: 'Action',
          subName: 'delete',
          width: '120',
          type: 'button',
        },
      ],
    }
  },

  // METHODS
  methods: {
    // Addition action
    addRowAction() {
      this.tableData.push(this.rowData)
    },

    // Row Delete action
    deleteRowAction(index, rows) {
      rows.splice(index, 1)
    },

    // Save Changes Action
    saveChangeAction() {
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
    },
  },
}
</script>
