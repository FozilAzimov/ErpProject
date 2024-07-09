<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img
            src="../../assets/icons/user-black.png"
            alt="user"
            class="w-[14px]"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              btnType === 'view'
                ? 'View color'
                : btnType === 'edit'
                ? 'Edit color'
                : 'Add color'
            }}
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img
                class="w-[11px]"
                src="../../assets/icons/gear.png"
                alt="gear"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="../../assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="../../assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="w-fit flex flex-col items-start m-2 gap-1">
          <div v-for="(element, index) in elementData" :key="index">
            <template v-if="element.show">
              <span
                v-if="element.type === 'text'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </span>
                <generic-input
                  :value="
                    editData?.[element.defValName]
                      ? editData?.[element.defValName]
                      : ''
                  "
                  width="300"
                  type="text"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'color'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <span class="flex items-center gap-2 flex-nowrap">
                  <generic-input
                    :value="
                      editData?.[element.defValName]
                        ? editData?.[element.defValName]
                        : ''
                    "
                    width="230"
                    type="color"
                    :name="element.subName"
                    :disabled="element.disabled"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <span
                    :style="{
                      color: editData?.[element.defValName]
                        ? editData?.[element.defValName]
                        : allInputAndLookUpValue?.[element.subName],
                    }"
                    class="text-[14px]"
                  >
                    {{
                      editData?.[element.defValName]
                        ? editData?.[element.defValName]
                        : allInputAndLookUpValue?.[element.subName]
                    }}</span
                  >
                </span>
              </span>
              <span
                v-else-if="element.type === 'date'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input-date-page
                  :value="
                    editDate
                      ? new Date(editDate).toISOString().split('.')[0]
                      : ''
                  "
                  width="300"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="datetime-local"
                  valuecolor="rgba(0,0,0,0.7)"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'select'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </span>
                <look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="
                    editData?.[element.defValName]
                      ? editData?.[element.defValName]
                      : ''
                  "
                  :options-data="
                    element.subName === 'colorGroupCode'
                      ? colorGroupList
                      : element.subName === 'companyId'
                      ? companyList
                      : []
                  "
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
            </template>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="goBackAction"
            />
            <generic-button
              v-if="!(btnType === 'view')"
              :name="btnType === 'edit' ? 'Save changes' : 'Save'"
              :type="btnType === 'edit' ? 'success' : 'primary'"
              :icon-name-attribute="btnType && 'edit'"
              @click="saveAction(btnType)"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@components/Generics/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LookUp from '@components/Lookup/LookUp.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericInputDatePage,
    LoadingPage,
    LookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      btnType: '',
      rowID: null,
      viewData: {},
      editData: {},
      editDate: null,
      allInputAndLookUpValue: {},
      elementData: [],
      companyList: [],
      colorGroupList: [],
    }
  },

  // MOUNTED
  mounted() {
    this.btnType = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.type
    this.rowID = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.id

    // function
    this.dataCreatedAction()

    // Table function
    this.getTableRequest()
  },

  // METHODS
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // go back action
    goBackAction() {
      localStorage.removeItem('allTrueAndFalseData')
      this.$router.push('/colors.htm')
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Color Name',
          subName: 'name',
          defValName: 'name',
          type: 'text',
          required: true,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Color Name 2',
          subName: 'name2',
          defValName: 'name2',
          type: 'text',
          required: false,
          show: this.btnType !== 'view',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Color Name 3',
          subName: 'name3',
          defValName: 'name3',
          type: 'text',
          required: false,
          show: this.btnType !== 'view',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Company',
          subName: 'companyId',
          defValName: 'companyName',
          type: 'select',
          required: false,
          show: this.btnType !== 'view',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Color Request No',
          subName: 'colorRequest',
          defValName: 'colorRequest',
          type: 'select',
          required: false,
          show: this.btnType === 'edit',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Color Code',
          subName: 'code',
          defValName: 'code',
          type: 'color',
          required: false,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Color Group',
          subName: 'colorGroupCode',
          defValName: 'colorGroupName',
          type: 'select',
          required: true,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Pantone Code',
          subName: 'pantoneCode',
          defValName: 'pantoneCode',
          type: 'text',
          required: false,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Deying Code',
          subName: 'dyeingCode',
          defValName: 'dyeingCode',
          type: 'text',
          required: false,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Date',
          subName: 'date',
          defValName: 'date',
          type: 'date',
          required: false,
          show: this.btnType !== 'view',
          disabled: this.btnType === 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.btnType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/color/prepareColorView`, {
            id: this.rowID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { colorGroupList, companyList, color, date } }) => {
            this.isLoading = !this.isLoading
            this.colorGroupList = colorGroupList
            this.formatterCompanyListAction(companyList)
            this.editData = color
            this.rowID = color?.id
            this.editDate = date
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.btnType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/color/prepareColorAjaxLoad`, {
            id: this.rowID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { colorGroupList, companyList, color, date } }) => {
            this.isLoading = !this.isLoading
            this.colorGroupList = colorGroupList
            this.formatterCompanyListAction(companyList)
            this.editData = color
            this.rowID = color?.id
            this.editDate = date
            this.allInputAndLookUpValue = color
            this.allInputAndLookUpValue.date = date
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/color/prepareColorAjaxLoad`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { colorGroupList, companyList } }) => {
            this.isLoading = !this.isLoading
            this.colorGroupList = colorGroupList
            this.formatterCompanyListAction(companyList)
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // function
    formatterCompanyListAction(companyList) {
      companyList.forEach((obj) => {
        this.companyList.push({
          id: Object.keys(obj)?.[0],
          name: `${Object.values(obj)?.[0].substring(0, 50)} ${
            Object.keys(obj)?.[0]
          }`,
        })
      })
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // formatted Date action
    formattedDateValue(currentDateTime) {
      const date = new Date(currentDateTime)
      const formattedDate =
        date?.getDate() +
        '/' +
        (date?.getMonth() + 1) +
        '/' +
        date?.getFullYear() +
        ' ' +
        date?.getHours() +
        ':' +
        date?.getMinutes() +
        ':' +
        date?.getSeconds()
      return formattedDate
    },

    // Save Changes action
    saveAction() {
      if (
        this.allInputAndLookUpValue?.name &&
        this.allInputAndLookUpValue?.colorGroupCode
      ) {
        const body = {}
        const color = {}
        if (this.btnType === 'edit') {
          color.id = this.allInputAndLookUpValue?.id || ''
          color.colorVariantListStr = ''
          color.uncheckedColorVariantListStr = ''
          color.company = { id: this.allInputAndLookUpValue.companyId || '' }
          color.colorRequest = {
            id: this.allInputAndLookUpValue.colorRequest || '',
          }
          color.name = this.allInputAndLookUpValue.name || ''
          color.name2 = this.allInputAndLookUpValue.name2 || ''
          color.name3 = this.allInputAndLookUpValue.name3 || ''
          color.code = this.allInputAndLookUpValue.code || ''
          color.colorGroup = {
            id: this.allInputAndLookUpValue?.colorGroupCode || '',
          }
          color.pantoneCode = this.allInputAndLookUpValue.pantoneCode || ''
          color.dyeingCode = this.allInputAndLookUpValue.dyeingCode || ''
          body.color = color
          body.date =
            this.formattedDateValue(this.allInputAndLookUpValue?.date) || ''
        } else {
          color.name = this.allInputAndLookUpValue?.name || ''
          color.name2 = this.allInputAndLookUpValue?.name2 || ''
          color.name3 = this.allInputAndLookUpValue?.name3 || ''
          color.company = { id: this.allInputAndLookUpValue?.companyId || '' }
          color.code = this.allInputAndLookUpValue?.code || ''
          color.colorGroup = {
            id: this.allInputAndLookUpValue?.colorGroupId || '',
          }
          color.pantoneCode = this.allInputAndLookUpValue?.pantoneCode || ''
          color.dyeingCode = this.allInputAndLookUpValue?.dyeingCode || ''
          body.color = color || ''
          body.date =
            this.formattedDateValue(this.allInputAndLookUpValue?.date) || ''
        }

        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/color/${this.btnType === 'edit' ? 'editColor' : 'addColor'}`,
            body
          )
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.$router.push('/colors.htm')
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
