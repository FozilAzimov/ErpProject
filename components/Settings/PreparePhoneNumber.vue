<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View PhoneNumber'
                : pageType === 'edit'
                ? 'Edit PhoneNumber'
                : 'Add PhoneNumber'
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
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
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
                src="@assets/icons/arrow.png"
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
                src="@assets/icons/remove.png"
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
                v-if="element.type === 'text' || element.type === 'number'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span
                    v-if="element?.required"
                    class="text-[16px] text-red-500"
                    >*</span
                  ></span
                >
                <generic-input
                  :value="`${
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : ''
                  }`"
                  width="300"
                  :type="element.type"
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
                  <span
                    v-if="element?.required"
                    class="text-[16px] text-red-500"
                    >*</span
                  ></span
                >
                <generic-look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="`${
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : ''
                  }`"
                  :options-data="selectData?.[element?.selectName]"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'radio'"
                class="flex flex-col items-start mb-1"
              >
                <el-radio
                  v-model="radio"
                  :disabled="element.disabled"
                  :label="element.subName"
                ></el-radio>
              </span>
            </template>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/phoneNumbers.htm')"
            />
            <generic-button
              v-if="pageType !== 'view'"
              :name="pageType === 'edit' ? 'Save changes' : 'Save'"
              :type="pageType === 'edit' ? 'success' : 'primary'"
              :icon-name-attribute="pageType && 'edit'"
              @click="saveAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      radio: 'Enabled',
      selectData: [],
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      if (newVal === 'Enabled') this.allInputAndLookUpValue.active = true
      else if (newVal === 'Disabled') this.allInputAndLookUpValue.active = false
      else this.allInputAndLookUpValue.active = false
    },
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
    // Table function
    this.getTableRequest()
    this.allInputAndLookUpValue.active = true
  },

  // Methods
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Page request
    getTableRequest() {
      this.isLoading = !this.isLoading
      if (this.pageType === 'view') {
        this.$axios
          .post(`/phoneNumber/phoneNumberViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { phoneNumber } }) => {
            this.viewEditData = phoneNumber
            this.radio = phoneNumber.active ? 'Enabled' : 'Disabled'
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.$axios
          .post(`/phoneNumber/phoneNumberViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { phoneNumber, companyList } }) => {
            this.viewEditData = phoneNumber
            this.selectData.companyList = companyList
            this.radio = phoneNumber.active ? 'Enabled' : 'Disabled'
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/phoneNumber/phoneNumberViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { companyList } }) => {
            this.selectData.companyList = companyList
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // Save Changes action
    saveAction() {
      if (
        this.allInputAndLookUpValue?.companyName ||
        this.allInputAndLookUpValue?.phone ||
        this.allInputAndLookUpValue?.contactName ||
        this.allInputAndLookUpValue?.telegramReportType ||
        this.allInputAndLookUpValue?.telegramBotName ||
        this.allInputAndLookUpValue?.telegramBotChatId ||
        this.viewEditData?.companyName ||
        this.viewEditData?.phone ||
        this.viewEditData?.contactName ||
        this.viewEditData?.telegramReportType ||
        this.viewEditData?.telegramBotName ||
        this.viewEditData?.telegramBotChatId
      ) {
        let body = {}
        let phoneNumber = {}
        if (this.pageID && this.pageType === 'edit') {
          phoneNumber = {
            id: this.pageID,
            company: {
              id:
                this.allInputAndLookUpValue?.companyName ??
                this.viewEditData?.companyId ??
                '',
            },
            phone:
              this.allInputAndLookUpValue?.phone ??
              this.viewEditData?.phone ??
              '',
            contactName:
              this.allInputAndLookUpValue?.contactName ??
              this.viewEditData?.contactName ??
              '',
            telegramReportType:
              this.allInputAndLookUpValue?.telegramReportType ??
              this.viewEditData?.telegramReportType ??
              '',
            telegramBotName:
              this.allInputAndLookUpValue?.telegramBotName ??
              this.viewEditData?.telegramBotName ??
              '',
            telegramBotChatId:
              this.allInputAndLookUpValue?.telegramBotChatId ??
              this.viewEditData?.telegramBotChatId ??
              '',
            active:
              this.allInputAndLookUpValue?.active ??
              this.viewEditData?.active ??
              false,
          }
        } else {
          phoneNumber = {
            company: { id: this.allInputAndLookUpValue?.companyName ?? '' },
            phone: this.allInputAndLookUpValue?.phone ?? '',
            contactName: this.allInputAndLookUpValue?.contactName ?? '',
            telegramReportType:
              this.allInputAndLookUpValue?.telegramReportType ?? '',
            telegramBotName: this.allInputAndLookUpValue?.telegramBotName ?? '',
            telegramBotChatId:
              this.allInputAndLookUpValue?.telegramBotChatId ?? '',
            active: this.allInputAndLookUpValue?.active ?? false,
          }
        }
        body = {
          page_size: this.pageSize_value,
          page_current: 1,
          phoneNumber,
        }

        this.isLoading = !this.isLoading
        const method = this.pageID ? 'put' : 'post'
        this.$axios[method](
          `/phoneNumber/${this.pageID ? 'editPhoneNumber' : 'addPhoneNumber'}`,
          body
        )
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/phoneNumbers.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Name',
          subName: 'companyName',
          selectName: 'companyList',
          type: 'select',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'phoneNumber.name',
          subName: 'phone',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'contact',
          subName: 'contactName',
          type: 'text',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'telegramType',
          subName: 'telegramReportType',
          type: 'number',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'phoneNumber.telegram',
          subName: 'telegramBotName',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'phoneNumber.telegramChatId',
          subName: 'telegramBotChatId',
          type: 'text',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          subName: 'Enabled',
          type: 'radio',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          subName: 'Disabled',
          type: 'radio',
          show: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },
  },
}
</script>
