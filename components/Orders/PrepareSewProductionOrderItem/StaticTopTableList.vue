<template>
  <table class="w-full text-[13px] mt-1">
    <tbody>
      <tr
        v-for="(row, index) in elementData"
        :key="index"
        class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
      >
        <td
          v-for="(obj, innerIndex) in row"
          :key="innerIndex"
          class="border-[1px] border-solid border-[#778899] p-[2px_5px]"
          :style="{ width: `${obj?.width}px !important` }"
        >
          <template v-if="obj?.type === 'text'">
            <span v-if="obj?.name" class="font-medium whitespace-nowrap">{{
              obj?.name
            }}</span>
            <span v-else-if="obj?.subName" class="whitespace-nowrap">{{
              allLookUpAndInputValue?.[obj?.subName] ??
              editData?.[obj?.subName] ??
              ''
            }}</span>
            <span v-if="obj?.required" class="text-red-600 text-[16px]">*</span>
          </template>

          <template v-else-if="obj?.type === 'date'">
            <template v-if="pageID">{{
              editData?.[obj?.subName] ? editData[obj.subName] : ''
            }}</template>
            <generic-input-date-page
              v-else
              :value="
                editData?.[obj?.subName]
                  ? $formatDate(editData?.[obj?.subName], 'yyyy-mm-dd hh:mm:ss')
                  : ''
              "
              :width="obj?.width"
              :name="obj.subName"
              :required="
                !obj?.required ||
                allLookUpAndInputValue?.[obj?.subName] ||
                editData?.[obj?.subName]
                  ? true
                  : false
              "
              @customFunction="setLookUpAndInputValueAction"
            />
          </template>
          <template
            v-else-if="obj?.type === 'number' || obj?.type === 'inputText'"
          >
            <template v-if="pageID">{{ editData?.[obj?.subName] }}</template>
            <generic-input
              v-else
              :value="`${
                (typeof editData?.[obj?.subName] === 'object'
                  ? editData?.[obj?.subName]?.text
                  : editData?.[obj?.subName]) ?? ''
              }`"
              :name="obj?.subName"
              :type="obj?.type"
              :width="obj?.width"
              :required="
                !obj?.required ||
                allLookUpAndInputValue?.[obj?.subName] ||
                editData?.[obj?.subName]
                  ? true
                  : false
              "
              @customFunction="setLookUpAndInputValueAction"
            />
          </template>
          <template v-else-if="obj?.type === 'select'">
            <template v-if="pageID">{{
              typeof editData?.[obj?.subName] === 'object'
                ? editData?.[obj?.subName]?.text
                : editData?.[obj?.subName]
            }}</template>
            <generic-look-up
              v-else
              :defvalue="
                typeof editData?.[obj?.subName] === 'object'
                  ? editData?.[obj?.subName]?.text
                  : editData?.[obj?.subName]
              "
              :name="obj?.subName"
              :dwidth="obj?.width"
              :durl="obj?.url"
              :dparam="obj?.param"
              :disabled="obj?.disabled"
              :required="
                !obj?.required ||
                allLookUpAndInputValue?.[obj?.subName] ||
                editData?.[obj?.subName]?.text ||
                editData?.[obj?.subName]
                  ? true
                  : false
              "
              @customFunction="setLookUpAndInputValueAction"
            />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
export default {
  components: {
    GenericInputDatePage,
    GenericInput,
    GenericLookUp,
  },

  // PROPS
  props: {
    editData: {
      type: Object,
      default: () => ({}),
    },
  },

  // DATA
  data() {
    return {
      pageID: null,
      elementData: [],
      allLookUpAndInputValue: {},
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
  },

  // METHODS
  methods: {
    // get LookUps and Inputs value
    setLookUpAndInputValueAction(name, value) {
      this.$set(this.allLookUpAndInputValue, name, value)
      this.$emit('emitAction', this.allLookUpAndInputValue)
    },

    // Data created
    dataCreatedAction() {
      const data = [
        [
          {
            width: '250',
            name: 'Date',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'date',
            type: 'date',
            required: true,
          },
          {
            width: '250',
            name: 'Order Sequence number',
            type: 'text',
          },
          {
            subName: 'orderNumberPo',
            type: 'number',
          },
        ],
        [
          {
            width: '250',
            name: 'Due Date',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'dueDate',
            type: 'date',
            required: true,
          },
          {
            width: '250',
            name: 'Year',
            type: 'text',
          },
          {
            subName: 'years',
            type: 'text',
          },
        ],
        [
          {
            width: '250',
            name: 'Customer',
            type: 'text',
            required: true,
          },
          {
            width: '300',
            subName: 'company',
            url: 'findAllCompanyForInvoice',
            param: { branchcompany: false, companyType: 'prOrderClient' },
            type: 'select',
            required: true,
          },
          {
            width: '250',
            name: 'Sequence No',
            type: 'text',
          },
          {
            subName: 'orderNoSequenceValue',
            type: 'text',
          },
        ],
        [
          {
            width: '250',
            name: 'Notes',
            type: 'text',
          },
          {
            width: '300',
            subName: 'notes',
            type: 'inputText',
          },
          {
            width: '250',
            name: 'Client Order',
            type: 'text',
          },
          {
            subName: 'clientOrder',
            type: 'inputText',
          },
        ],
      ]
      this.elementData = data
    },
  },
}
</script>
