<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        api="saveColumnConfigU"
        class="z-[10000]"
      />
    </transition>

    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
    >
      <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
        production For Qr Code
      </h1>

      <div>
        <ul class="flex items-center gap-4">
          <li
            class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
            :style="{
              background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
            }"
          >
            <img
              class="w-[11px]"
              src="../../../assets/icons/gear.png"
              alt="gear"
            />
          </li>
          <li
            class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
            :style="{
              background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
            }"
          >
            <img
              class="w-[11px]"
              :class="
                true
                  ? 'rotate-[-180deg] duration-[1s]'
                  : 'rotate-[0deg] duration-[1s]'
              "
              src="../../../assets/icons/arrow.png"
              alt="arrow"
            />
          </li>
          <li
            class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
            :style="{
              background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
            }"
          >
            <img
              class="w-[11px]"
              src="../../../assets/icons/remove.png"
              alt="remove"
            />
          </li>
        </ul>
      </div>
    </div>

    <div
      class="w-full border-[1px] border-solid border-[#D9DBDF] p-3 flex justify-start items-center"
    >
      <div
        class="w-[650px] h-[285px] p-2 shadow-lg border-[1px] border-solid border-[#b4b4b4] rounded-xl flex flex-col flex-wrap gap-2"
      >
        <span
          v-for="(element, index) in allDataType"
          :key="index"
          class="w-[300px] flex items-center justify-between gap-1"
        >
          <template v-if="element.required && element.type === 'list'">
            <span class="text-[13px] whitespace-nowrap"
              >{{ element.name }}
              <span class="text-red-600 text-[15px]">*</span>
            </span>
            <look-up
              dwidth="200"
              dlist="100"
              durl="invoice/findAllEmployee"
              :name="element.payloadName"
              @customFunction="getLookUpValue"
            />
          </template>

          <template v-else-if="element.type === 'list'">
            <span class="text-[13px] whitespace-nowrap"
              >{{ element.name }}
            </span>
            <look-up
              dwidth="200"
              dlist="100"
              durl="invoice/findAllEmployee"
              :name="element.payloadName"
              @customFunction="getLookUpValue"
            />
          </template>

          <template v-else-if="element.type === 'number' && element.required">
            <span class="text-[13px] whitespace-nowrap"
              >{{ element.name }}
              <span class="text-red-600 text-[15px]">*</span></span
            >
            <generic-input
              v-if="element.name === 'qrcode'"
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              width="200"
              :name="element.payloadName"
              @enter="requestAction"
              @customFunction="getInputValue"
            />
            <generic-input
              v-else
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              width="200"
              :name="element.payloadName"
              @customFunction="getInputValue"
            />
          </template>

          <template v-else-if="element.type === 'number' && element.disabled">
            <span class="text-[13px] whitespace-nowrap">{{
              element.name
            }}</span>
            <generic-input
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              :disabled="true"
              width="200"
              :name="element.payloadName"
            />
          </template>

          <template v-else-if="element.type === 'number'">
            <span class="text-[13px] whitespace-nowrap">{{
              element.name
            }}</span>
            <generic-input
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              width="200"
              :name="element.payloadName"
              @customFunction="getInputValue"
            />
          </template>

          <template v-else-if="element.type === 'string'">
            <span class="text-[13px] whitespace-nowrap">{{
              element.name
            }}</span>
            <generic-input
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="text"
              width="200"
              :name="element.payloadName"
              @customFunction="getInputValue"
            />
          </template>

          <template v-else-if="element.type === 'date'">
            <span class="text-[13px] whitespace-nowrap"
              >{{ element.name }}
              <span class="text-red-600 text-[15px]">*</span>
            </span>
            <generic-input-date-page
              width="200"
              height="28"
              pl="10"
              pr="10"
              pt="1"
              pb="1"
              textsize="13"
              type="datetime-local"
              valuecolor="rgba(0,0,0,0.7)"
              :name="element.payloadName"
              :value="new Date().toISOString().split('.')[0]"
              @customFunction="getDateValue"
            />
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import GenericInput from '../../Input/GenericInput.vue'
import GenericInputDatePage from '../../InputDate/GenericInputDatePage.vue'
import LoadingPage from '../../Loading/LoadingPage.vue'
import LookUp from '../../Lookup/LookUp.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    LookUp,
    GenericInput,
    GenericInputDatePage,
  },

  // DATA,
  data() {
    return {
      isLoading: false,
      checkModal: false,
      allInputLookUpValues: {},

      allDataType: [
        {
          name: 'Employee',
          payloadName: 'employeeId',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllEmployee',
        },
        {
          name: 'Equipment',
          payloadName: 'equipmentId',
          type: 'list',
          required: true,
          disabled: false,
          url: 'findAllEquipments',
        },
        {
          name: 'Defect Qty4',
          payloadName: 'marriageQty4',
          type: 'number',
          required: false,
          disabled: false,
        },
        {
          name: 'Defect Qty',
          payloadName: 'marriageQty',
          type: 'number',
          required: false,
          disabled: false,
        },
        {
          name: 'Defect Stillage',
          payloadName: 'defectStillage',
          type: 'string',
          required: false,
          disabled: false,
        },
        {
          name: 'Start Date',
          payloadName: 'dateTo',
          type: 'date',
          required: true,
          disabled: false,
        },
        {
          name: 'Qty2',
          payloadName: 'qty2',
          type: 'number',
          required: false,
          disabled: true,
        },
        {
          name: 'qrcode',
          payloadName: 'productBarcode',
          type: 'number',
          required: true,
          disabled: false,
        },
        {
          name: 'Stillage',
          payloadName: 'stillage',
          type: 'number',
          required: false,
          disabled: false,
        },
        {
          name: 'Qty4',
          payloadName: 'qty4',
          type: 'number',
          required: false,
          disabled: false,
        },
        {
          name: 'Qty',
          payloadName: 'qty',
          type: 'number',
          required: true,
          disabled: false,
        },
        {
          name: 'Lost Qty',
          payloadName: 'lostQty',
          type: 'number',
          required: false,
          disabled: false,
        },
        {
          name: 'Grade',
          payloadName: 'gradeId',
          type: 'list',
          required: false,
          disabled: false,
          url: 'findAllGrade2',
        },
        {
          name: 'Grade Qty',
          payloadName: 'gradeQty',
          type: 'number',
          required: false,
          disabled: false,
        },
        {
          name: 'Grade Stillage',
          payloadName: 'gradeStillage',
          type: 'string',
          required: false,
          disabled: false,
        },
        {
          name: 'Tara',
          payloadName: 'taraId',
          type: 'list',
          required: false,
          disabled: false,
          url: 'findAllTara',
        },
      ],
    }
  },

  // METHOD
  methods: {
    // LookUp value'sini olish
    getLookUpValue(name, value, valueID, order, resultType) {
      this.allInputLookUpValues[name] = valueID
    },
    // Input value'sini olish
    getInputValue(name, value) {
      this.allInputLookUpValues[name] = value
    },
    // Input value'sini olish
    getDateValue(name, value, rowID) {
      this.allInputLookUpValues[name] = value
    },

    requestAction(value) {
      if (
        value &&
        this.allInputLookUpValues?.employeeId &&
        this.allInputLookUpValues?.equipmentId &&
        this.allInputLookUpValues?.dateTo &&
        this.allInputLookUpValues?.qty
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`readSaveQrCode`, this.allInputLookUpValues, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          })
          .then((res) => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
