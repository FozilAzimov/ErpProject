<template>
  <div
    class="max-w-[80%] max-h-[65vh] p-3 rounded-md overflow-auto fixed bg-[rgb(208,225,243)] z-[1000] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%] shadow-[0px_0px_50px_rgba(0,0,0,0.2)] flex justify-between"
  >
    <div>
      <div
        class="flex items-center justify-between gap-5 border-b-[1px] border-b-[solid] border-b-[#000] pb-3 mb-2"
      >
        <h2 class="font-bold text-[rgb(49,126,172)]">Invoice Item</h2>
        <div class="flex items-center justify-between gap-2">
          <GenericButton
            name="Accept"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgb(119,191,120)"
            textsize="14"
            @click="acceptAction"
          />
          <GenericButton
            name="Close"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgb(245,108,108)"
            textsize="14"
            @click="closeAction"
          />
        </div>
      </div>
      <div class="flex justify-between items-start gap-52 pb-3">
        <div>
          <div
            v-for="(itemRight, indexRight) in rightData"
            :key="itemRight.name + indexRight"
            class="flex justify-between gap-5"
          >
            <div>
              <label class="font-medium whitespace-nowrap text-[14px]">
                {{ itemRight.headerText }}
              </label>
            </div>
            <div class="mt-[2px]">
              <LookUp
                v-if="itemRight.type === 'list'"
                :durl="`invoiceBase/${itemRight.durl}`"
                dwidth="250"
                :name="itemRight.name"
                :result-type="itemRight.resultType"
                :required="requiredData[0]?.[itemRight.name]"
                @customFunction="getLookUpValue"
              />
              <GenericInput
                v-else-if="
                  itemRight.type === 'float' || itemRight.type === 'integer'
                "
                width="250"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                :name="itemRight.name"
                :required="requiredData[0]?.[itemRight.name]"
                @customFunction="getInputValue"
              />
              <GenericInput
                v-else-if="itemRight.type === 'string'"
                width="250"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                :name="itemRight.name"
                :required="requiredData[0]?.[itemRight.name]"
                @customFunction="getInputValue"
              />
              <GenericInputDatePage
                v-else-if="itemRight.type === 'date'"
                width="250"
                height="23"
                pl="10"
                pr="10"
                pt="1"
                pb="1"
                textsize="13"
                type="datetime-local"
                valuecolor="rgba(0,0,0,0.7)"
                :name="itemRight.name"
                :required="requiredData[0]?.[itemRight.name]"
                @customFunction="getInputValue"
              />
              <GenericInput
                v-else-if="itemRight.type === 'checkbox'"
                type="checkbox"
                :name="itemRight.name"
                @customFunction="getInputValue"
              />
              <span v-else>Type {{ itemRight.type }}</span>
            </div>
          </div>
        </div>
        <div>
          <div
            v-for="(itemLeft, indexLeft) in leftData"
            :key="itemLeft.name + indexLeft"
            class="flex justify-between gap-5"
          >
            <div>
              <label class="font-medium whitespace-nowrap text-[14px]">
                {{ itemLeft.headerText }}
              </label>
            </div>
            <div class="mt-[2px]">
              <LookUp
                v-if="itemLeft.type === 'list'"
                :durl="`invoiceBase/${itemLeft.durl}`"
                dwidth="250"
                :name="itemLeft.name"
                :result-type="itemLeft.resultType"
                :required="requiredData[0]?.[itemLeft.name]"
                @customFunction="getLookUpValue"
              />
              <GenericInput
                v-else-if="
                  itemLeft.type === 'float' || itemLeft.type === 'integer'
                "
                width="250"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                :name="itemLeft.name"
                :required="requiredData[0]?.[itemLeft.name]"
                @customFunction="getInputValue"
              />
              <GenericInput
                v-else-if="itemLeft.type === 'string'"
                width="250"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                :name="itemLeft.name"
                :required="requiredData[0]?.[itemLeft.name]"
                @customFunction="getInputValue"
              />
              <GenericInputDatePage
                v-else-if="itemLeft.type === 'date'"
                width="250"
                height="23"
                pl="10"
                pr="10"
                pt="1"
                pb="1"
                textsize="13"
                type="datetime-local"
                valuecolor="rgba(0,0,0,0.7)"
                :name="itemLeft.name"
                :required="requiredData[0]?.[itemLeft.name]"
                @customFunction="getInputValue"
              />
              <GenericInput
                v-else-if="itemLeft.type === 'checkbox'"
                type="checkbox"
                :name="itemLeft.name"
                @customFunction="getInputValue"
              />
              <span v-else>Type {{ itemLeft.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '../Button/GenericButton.vue'
import GenericInput from '../Input/GenericInput.vue'
import GenericInputDatePage from '../InputDate/GenericInputDatePage.vue'
import LookUp from '../Lookup/LookUp.vue'

export default {
  components: {
    GenericInput,
    GenericButton,
    LookUp,
    GenericInputDatePage,
  },

  // Props
  props: {
    tabledata: {
      type: Array,
      default: () => [],
    },
    whichTableName: {
      type: String,
      default: '',
    },
  },

  // Data
  data() {
    return {
      modalData: [],
      rightData: [],
      leftData: [],
      inputValuesObj: new Map(),
      ResData: [],
      requiredData: [],
      disabledButtun: false,
    }
  },

  // Watch
  watch: {
    ResData(val) {
      this.requiredLookUpAndInputCheckerAction(val)
    },
  },

  // Mounted
  mounted() {
    this.filterData()
  },

  // Methods
  methods: {
    // LookUp va Input'larning required'larini tekshiradi
    requiredLookUpAndInputCheckerAction(data) {
      const arr = this.modalData.filter(
        (obj) =>
          obj.required &&
          (obj.type === 'list' || obj.type === 'float' || obj.type === 'date')
      )
      arr.forEach((obj) => {
        data.forEach((subObj, index) => {
          if (subObj?.[obj.name] && this.requiredData[index])
            this.requiredData[index][obj.name] = true
          else if (!subObj?.[obj.name] && this.requiredData[index])
            this.requiredData[index][obj.name] = false
          else if (subObj?.[obj.name] && !this.requiredData[index])
            this.requiredData.push({ [obj.name]: true })
          else this.requiredData.push({ [obj.name]: false })
        })
      })
      this.requiredData = [this.requiredData?.at(-1)]
      this.disabledButtun = this.requiredData
        .map((obj) => Object.values(obj).includes(true))
        .at(-1)
    },
    // LookUp va Input'larning required'larini tekshiradi

    // Data filter
    filterData() {
      // eslint-disable-next-line array-callback-return
      this.modalData = this.tabledata.filter((value) => {
        if (
          value.type !== 'label' &&
          value.type !== 'hidden' &&
          value.type !== 'file_image' &&
          value.type !== 'button'
        )
          return value
      })
      this.rightData = this.modalData.slice(
        0,
        Number.parseInt(this.modalData.length / 2) + 1
      )
      this.leftData = this.modalData.slice(
        Number.parseInt(this.modalData.length / 2) + 1,
        this.modalData.length
      )
    },

    // Cashbox and Banks value'larini o'chirish
    removeCashboxAndBanksValueAction(key) {
      if (key === 'cashbox') {
        this.inputValuesObj.delete('bankBranchAccount')
      } else if (key === 'bankBranchAccount') {
        this.inputValuesObj.delete('cashbox')
      }
    },

    // Modal close
    closeAction() {
      this.$emit('customCloseAction', false)
    },

    // Accept button action addition rows
    acceptAction() {
      const objBack = Object.fromEntries(this.inputValuesObj)
      this.ResData.push(objBack)
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData)
      if (this.disabledButtun) {
        this.$emit('customInputValueObj', objBack)
        // function
        this.closeAction()
      }
    },

    // Lookup's Valuesini olish
    getInputValue(key, value) {
      if (this.whichTableName) {
        this.inputValuesObj.set('erepairStatus', 'false')
        this.inputValuesObj.set('marriage', 'false')
        this.inputValuesObj.set('mark', 'false')
        this.inputValuesObj.set('waste', 'false')
        this.inputValuesObj.set('qtyOfOne', '0')
        this.inputValuesObj.set('price4', '0')
        this.inputValuesObj.set('packNumber', `${1}`)
        this.inputValuesObj.set(key, value)
      } else {
        this.inputValuesObj.set(key, value)
      }
    },

    getLookUpValue(key, name, value, order, resultType) {
      this.inputValuesObj.set(
        key,
        resultType === 'object'
          ? { id: Number(value), text: name }
          : key === 'paymentTypesId'
          ? { id: `${value}`, text: name }
          : value
      )
      this.removeCashboxAndBanksValueAction(key)
    },
  },
}
</script>
