<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-1">
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="$router.push('/users.htm')"
          />
          <generic-button
            v-if="pageType !== 'view'"
            :name="pageType === 'edit' ? 'Save changes' : 'Save'"
            :type="pageType === 'edit' ? 'success' : 'primary'"
            :icon-name-attribute="pageType === 'edit' ? 'edit' : ''"
            :disabled="allInputAndLookUpValue?.fileAttach ? true : false"
            @click="saveAction"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View USER'
                : pageType === 'edit'
                ? 'Edit USER'
                : 'Add USER'
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
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex flex-col items-start m-2 gap-1">
          <div
            v-for="(row, index) in elementData"
            :key="index"
            class="w-full flex items-start"
          >
            <div
              v-for="(element, innerIndex) in row"
              :key="innerIndex"
              class="w-1/3"
            >
              <template v-if="element.showHide">
                <span
                  v-if="
                    element.type === 'text' ||
                    element.type === 'textarea' ||
                    element.type === 'number'
                  "
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
                    width="500"
                    :type="element?.type"
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
                  <div class="flex items-center gap-1">
                    <generic-look-up
                      dwidth="500"
                      :name="element.subName"
                      :defvalue="`${
                        viewEditData?.[element.subName]
                          ? viewEditData?.[element.subName]
                          : ''
                      }`"
                      :durl="element?.api"
                      :options-data="selectData?.[element?.selectName]"
                      :disabled="element.disabled"
                      :multiple="element?.multiple"
                      :collapse-tags="element?.collapseTags"
                      @customFunction="getInputAndLookUpValueAction"
                    />
                    <generic-button
                      v-if="element?.doubleElement"
                      name="Save"
                      type="success"
                      icon-name-attribute="refresh"
                      @click="selectButtonAction(element?.subName)"
                    />
                  </div>
                </span>
                <span
                  v-else-if="element.type === 'date'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <generic-input-date-page
                    :value="`${
                      viewEditData?.[element.subName]
                        ? viewEditData?.[element.subName]
                        : ''
                    }`"
                    width="500"
                    :name="element.subName"
                    :disabled="element.disabled"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </span>
                <generic-check-box
                  v-else-if="element.type === 'checkbox'"
                  :text="element?.name"
                  :name="element?.subName"
                  :disabled="element.disabled"
                  :default-value="
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : false
                  "
                  :border="true"
                  @customFunction="getInputAndLookUpValueAction"
                />
                <div
                  v-else-if="element.type === 'file'"
                  class="flex items-center justify-center"
                >
                  <label
                    class="w-full max-w-xs flex flex-col items-center p-3 bg-gray-100 rounded-md border border-gray-300 shadow-sm hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    <i class="el-icon-upload" size="large"></i>
                    <span class="text-sm font-medium text-gray-700"
                      >Choose a file</span
                    >
                    <input
                      type="file"
                      class="hidden"
                      @change="
                        getInputAndLookUpValueAction(
                          'fileAttach',
                          $event?.target?.files
                        )
                      "
                    />
                  </label>
                </div>
                <!-- RADIO -->
                <span
                  v-else-if="element.type === 'radio'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-radio
                    v-for="(elem, inx) in element.list"
                    :key="inx"
                    v-model="radio"
                    :label="elem.subName"
                    :disabled="element.disabled"
                  ></el-radio>
                </span>
                <span
                  v-else-if="element.type === 'radio1'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-radio
                    v-for="(elem, inx) in element.list"
                    :key="inx"
                    v-model="radio1"
                    :label="elem.subName"
                    :disabled="element.disabled"
                  ></el-radio>
                </span>
                <span
                  v-else-if="element.type === 'radio2'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-radio
                    v-for="(elem, inx) in element.list"
                    :key="inx"
                    v-model="radio2"
                    :label="elem.subName"
                    :disabled="element.disabled"
                  ></el-radio>
                </span>
                <span
                  v-else-if="element.type === 'radio3'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-radio
                    v-for="(elem, inx) in element.list"
                    :key="inx"
                    v-model="radio3"
                    :label="elem.subName"
                    :disabled="element.disabled"
                  ></el-radio>
                </span>
                <!-- RADIO -->
                <span
                  v-else-if="element.type === 'switch'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-switch
                    v-model="switchVal"
                    :active-text="element?.subName"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </span>
                <span v-else-if="element?.type === 'menuBox'"></span>
              </template>
            </div>
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
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
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
      radio: 'Yes',
      radio1: 'Enabled_Email',
      radio2: 'Enabled',
      radio3: 'Male',
      switchVal: false,
      selectData: {},
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      this.allInputAndLookUpValue.is_official = newVal === 'Yes'
    },
    radio1(newVal) {
      this.allInputAndLookUpValue.use_external_mail = newVal === 'Enabled_Email'
    },
    radio2(newVal) {
      this.allInputAndLookUpValue.active = newVal === 'Enabled'
    },
    radio3(newVal) {
      this.allInputAndLookUpValue.gender = newVal === 'Male' ? 1 : 2
    },
    switchVal(newVal) {
      this.allInputAndLookUpValue.fp_card_pass_edit_param = newVal
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
    // default set value
    this.allInputAndLookUpValue.gender = 1
    this.allInputAndLookUpValue.is_official = true
    this.allInputAndLookUpValue.use_external_mail = true
    this.allInputAndLookUpValue.active = true
    this.allInputAndLookUpValue.orderPaymentAccess = true
    this.allInputAndLookUpValue.fp_card_pass_edit_param = false
    // default set value
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
          .post(`/user/prepareUser`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.selectData = data
            this.viewEditData = data?.person
            const [day, month, year] = data?.person?.dateOfBirthStr
              .split('/')
              .map(Number)
            this.viewEditData.dateOfBirthStr = `${year}-${month}-${day} 00:00:00`
            this.viewEditData.dateOfDismissal = this.$formatDate(
              data?.person?.dateOfDismissal,
              'yyyy-mm-dd hh:mm:ss'
            )
            this.viewEditData.dateOfReception = this.$formatDate(
              data?.person?.dateOfReception,
              'yyyy-mm-dd hh:mm:ss'
            )
            data?.person?.doors.forEach((obj) => {
              const ids = []
              const names = []
              ids.push(obj?.id)
              names.push(obj?.name)
              this.viewEditData.doorsNames = names
              this.viewEditData.doorsIds = ids
            })
            this.radio = data?.person?.is_official ? 'Yes' : 'No'
            this.radio1 = data?.person?.use_external_mail
              ? 'Enabled_Email'
              : 'Disabled_Email'
            this.radio2 = data?.person?.active ? 'Enabled' : 'Disabled'
            this.radio3 = data?.person?.gender === 1 ? 'Male' : 'Female'
            this.switchVal = data?.person?.fp_card_pass_edit_param
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.$axios
          .post(`/user/prepareUser`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.selectData = data
            this.viewEditData = data?.person
            const [day, month, year] = data?.person?.dateOfBirthStr
              .split('/')
              .map(Number)
            this.viewEditData.dateOfBirthStr = `${year}-${month}-${day} 00:00:00`
            this.viewEditData.dateOfDismissal = this.$formatDate(
              data?.person?.dateOfDismissal,
              'yyyy-mm-dd hh:mm:ss'
            )
            this.viewEditData.dateOfReception = this.$formatDate(
              data?.person?.dateOfReception,
              'yyyy-mm-dd hh:mm:ss'
            )
            data?.person?.doors.forEach((obj) => {
              const ids = []
              const names = []
              ids.push(obj?.id)
              names.push(obj?.name)
              this.viewEditData.doorsNames = names
              this.viewEditData.doorsIds = ids
            })
            this.radio = data?.person?.is_official ? 'Yes' : 'No'
            this.radio1 = data?.person?.use_external_mail
              ? 'Enabled_Email'
              : 'Disabled_Email'
            this.radio2 = data?.person?.active ? 'Enabled' : 'Disabled'
            this.radio3 = data?.person?.gender === 1 ? 'Male' : 'Female'
            this.switchVal = data?.person?.fp_card_pass_edit_param
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/user/prepareUserPersonal`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            // function
            this.selectData = data
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // all INPUT And SELECT value set "this.allInputAndLookUpValue" object
    async getInputAndLookUpValueAction(name, value) {
      if (name === 'fileAttach' && value[0]) {
        try {
          const base64String = await this.convertToBase64(value[0])
          await this.$set(this.allInputAndLookUpValue, name, base64String)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Faylni Base64 formatiga o'zgartirishda xato:", error)
        }
      } else this.$set(this.allInputAndLookUpValue, name, value)
    },

    // Faylni Base64 formatga o'zgartiruvchi funksiya
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file) // Faylni Base64 formatga o'zgartirish
      })
    },

    // Save Changes action
    saveAction() {
      let body = {}
      let person = {}
      if (this.pageID && this.pageType === 'edit') {
        person = {
          id: this.pageID,
          fname:
            this.allInputAndLookUpValue?.fname ??
            this.viewEditData?.fname ??
            '',
          lname:
            this.allInputAndLookUpValue?.lname ??
            this.viewEditData?.lname ??
            '',
          middleName:
            this.allInputAndLookUpValue?.middleName ??
            this.viewEditData?.middleName ??
            '',
          givenBy:
            this.allInputAndLookUpValue?.givenBy ??
            this.viewEditData?.givenBy ??
            '',
          passportNumber:
            this.allInputAndLookUpValue?.passportNumber ??
            this.viewEditData?.passportNumber ??
            '',
          dateOfIssueStr: this.allInputAndLookUpValue?.dateOfIssue
            ? this.$formatDate(this.allInputAndLookUpValue?.dateOfIssue)
            : this.viewEditData?.dateOfIssue
            ? this.$formatDate(this.viewEditData?.dateOfIssue)
            : '',
          dateOfBirthStr: this.allInputAndLookUpValue?.dateOfIssue
            ? this.$formatDate(this.allInputAndLookUpValue?.dateOfIssue)
            : this.viewEditData?.dateOfIssue
            ? this.$formatDate(this.viewEditData?.dateOfIssue)
            : '',
          dateOfExpiryStr: this.allInputAndLookUpValue?.dateOfExpiry
            ? this.$formatDate(this.allInputAndLookUpValue?.dateOfExpiry)
            : this.viewEditData?.dateOfExpiry
            ? this.$formatDate(this.viewEditData?.dateOfExpiry)
            : '',
          nationality:
            this.allInputAndLookUpValue?.nationality ??
            this.viewEditData?.nationality ??
            '',
          gender:
            this.allInputAndLookUpValue?.gender ??
            this.viewEditData?.gender ??
            1,
          childrensQty:
            this.allInputAndLookUpValue?.childrensQty ??
            this.viewEditData?.childrensQty ??
            '',
          rank:
            this.allInputAndLookUpValue?.rank ?? this.viewEditData?.rank ?? '',
          master:
            this.allInputAndLookUpValue?.master ??
            this.viewEditData?.master ??
            '',
          tax_number:
            this.allInputAndLookUpValue?.tax_number ??
            this.viewEditData?.tax_number ??
            '',
          pinfl:
            this.allInputAndLookUpValue?.pinfl ??
            this.viewEditData?.pinfl ??
            '',
          socialSecurityNumber:
            this.allInputAndLookUpValue?.socialSecurityNumber ??
            this.viewEditData?.socialSecurityNumber ??
            '',
          info:
            this.allInputAndLookUpValue?.info ?? this.viewEditData?.info ?? '',
          dateOfReceptionStr: this.allInputAndLookUpValue?.dateOfReception
            ? this.$formatDate(this.allInputAndLookUpValue?.dateOfReception)
            : this.viewEditData?.dateOfReception
            ? this.$formatDate(this.viewEditData?.dateOfReception)
            : '',
          dateOfDismissalStr: this.allInputAndLookUpValue?.dateOfDismissal
            ? this.$formatDate(this.allInputAndLookUpValue?.dateOfDismissal)
            : this.viewEditData?.dateOfDismissal
            ? this.$formatDate(this.viewEditData?.dateOfDismissal)
            : '',
          dateOfProbationStr: this.allInputAndLookUpValue?.dateOfProbationStr
            ? this.$formatDate(this.allInputAndLookUpValue?.dateOfProbationStr)
            : this.viewEditData?.dateOfProbationStr
            ? this.$formatDate(this.viewEditData?.dateOfProbationStr)
            : '',
          more_info:
            this.allInputAndLookUpValue?.more_info ??
            this.viewEditData?.more_info ??
            '',
          timeZone: {
            id:
              this.allInputAndLookUpValue?.timeZoneName ??
              this.viewEditData?.timeZoneId ??
              '',
          },
          plate_number_entry_exit_check:
            this.allInputAndLookUpValue?.plate_number_entry_exit_check ??
            this.viewEditData?.plate_number_entry_exit_check ??
            false,
          employee_number:
            this.allInputAndLookUpValue?.employee_number ??
            this.viewEditData?.employee_number ??
            '',
          address:
            this.allInputAndLookUpValue?.address ??
            this.viewEditData?.address ??
            '',
          account_employee_number:
            this.allInputAndLookUpValue?.account_employee_number ??
            this.viewEditData?.account_employee_number ??
            '',
          mobile_phone:
            this.allInputAndLookUpValue?.mobile_phone ??
            this.viewEditData?.mobile_phone ??
            '',
          home_phone:
            this.allInputAndLookUpValue?.home_phone ??
            this.viewEditData?.home_phone ??
            '',
          userType: {
            id:
              this.allInputAndLookUpValue?.userTypeName ??
              this.viewEditData?.userTypeId ??
              '',
          },
          is_official:
            this.allInputAndLookUpValue?.is_official ??
            this.viewEditData?.is_official ??
            false,
          is_use_external_mail:
            this.allInputAndLookUpValue?.use_external_mail ??
            this.viewEditData?.use_external_mail ??
            false,
          active:
            this.allInputAndLookUpValue?.active ??
            this.viewEditData?.active ??
            false,
          fp_card_pass_edit_param:
            this.allInputAndLookUpValue?.fp_card_pass_edit_param ??
            this.viewEditData?.fp_card_pass_edit_param ??
            false,
          salesManager:
            this.allInputAndLookUpValue?.salesManager ??
            this.viewEditData?.salesManager ??
            false,
          defaultMessageParam:
            this.allInputAndLookUpValue?.messageType ??
            this.viewEditData?.messageType ??
            '',
          paymentCardNumber:
            this.allInputAndLookUpValue?.paymentCardNumber ??
            this.viewEditData?.paymentCardNumber ??
            '',
        }
      } else {
        person = {
          fname: this.allInputAndLookUpValue?.fname ?? '',
          lname: this.allInputAndLookUpValue?.lname ?? '',
          middleName: this.allInputAndLookUpValue?.middleName ?? '',
          givenBy: this.allInputAndLookUpValue?.givenBy ?? '',
          passportNumber: this.allInputAndLookUpValue?.passportNumber ?? '',
          dateOfIssueStr:
            this.$formatDate(this.allInputAndLookUpValue?.dateOfIssue) ?? '',
          dateOfBirthStr:
            this.$formatDate(this.allInputAndLookUpValue?.dateOfBirthStr) ?? '',
          dateOfExpiryStr:
            this.$formatDate(this.allInputAndLookUpValue?.dateOfExpiry) ?? '',
          nationality: this.allInputAndLookUpValue?.nationality ?? '',
          gender: this.allInputAndLookUpValue?.gender ?? 1,
          childrensQty: this.allInputAndLookUpValue?.childrensQty ?? '',
          rank: this.allInputAndLookUpValue?.rank ?? '',
          master: this.allInputAndLookUpValue?.master ?? '',
          tax_number: this.allInputAndLookUpValue?.tax_number ?? '',
          pinfl: this.allInputAndLookUpValue?.pinfl ?? '',
          socialSecurityNumber:
            this.allInputAndLookUpValue?.socialSecurityNumber ?? '',
          info: this.allInputAndLookUpValue?.info ?? '',
          dateOfReceptionStr:
            this.$formatDate(this.allInputAndLookUpValue?.dateOfReception) ??
            '',
          dateOfDismissalStr:
            this.$formatDate(this.allInputAndLookUpValue?.dateOfDismissal) ??
            '',
          dateOfProbationStr:
            this.$formatDate(this.allInputAndLookUpValue?.dateOfProbationStr) ??
            '',
          more_info: this.allInputAndLookUpValue?.more_info ?? '',
          timeZone: { id: this.allInputAndLookUpValue?.timeZoneName ?? '' },
          plate_number_entry_exit_check:
            this.allInputAndLookUpValue?.plate_number_entry_exit_check ?? false,
          employee_number: this.allInputAndLookUpValue?.employee_number ?? '',
          address: this.allInputAndLookUpValue?.address ?? '',
          account_employee_number:
            this.allInputAndLookUpValue?.account_employee_number ?? '',
          mobile_phone: this.allInputAndLookUpValue?.mobile_phone ?? '',
          home_phone: this.allInputAndLookUpValue?.home_phone ?? '',
          userType: { id: this.allInputAndLookUpValue?.userTypeName ?? '' },
          is_official: this.allInputAndLookUpValue?.is_official ?? false,
          is_use_external_mail:
            this.allInputAndLookUpValue?.use_external_mail ?? false,
          active: this.allInputAndLookUpValue?.active ?? false,
          fp_card_pass_edit_param:
            this.allInputAndLookUpValue?.fp_card_pass_edit_param ?? false,
          salesManager: this.allInputAndLookUpValue?.salesManager ?? false,
          defaultMessageParam: this.allInputAndLookUpValue?.messageType ?? '',
          paymentCardNumber:
            this.allInputAndLookUpValue?.paymentCardNumber ?? '',
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        userOrPersonSalary: true,
        saveAndCreateNew: false,
        fileNames: '',
        fileFullName: '',
        fileIndex: 0,
        countryId:
          this.allInputAndLookUpValue?.countryName ??
          this.viewEditData?.countryId ??
          '',
        cityId:
          this.allInputAndLookUpValue?.cityName ??
          this.viewEditData?.cityId ??
          '',
        streetId:
          this.allInputAndLookUpValue?.streetName ??
          this.viewEditData?.streetId ??
          '',
        collectionPointId:
          this.allInputAndLookUpValue?.collectionPointName ??
          this.viewEditData?.collectionPointId ??
          '',
        transportLineId:
          this.allInputAndLookUpValue?.transportLine ??
          this.viewEditData?.transportLineId ??
          '',
        company_id:
          this.allInputAndLookUpValue?.companyName ??
          this.viewEditData?.companyId ??
          '',
        department_id:
          this.allInputAndLookUpValue?.departmentName ??
          this.viewEditData?.departmentId ??
          '',
        subDepartment_id:
          this.allInputAndLookUpValue?.subDepartmentName ??
          this.viewEditData?.subDepartmentId ??
          '',
        companyOrDepartment: 'DEPARTMENT',
        positionId:
          this.allInputAndLookUpValue?.positionName ??
          this.viewEditData?.positionId ??
          '',
        doorIds:
          this.allInputAndLookUpValue?.doorsNames ??
          this.viewEditData?.doorsIds,
        person,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/user/${this.pageID ? 'editUserPersonal' : 'addUserPersonal'}`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$notification('Success', 'Success', 'success')
          this.$router.push('/users.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          this.$notification('Error', 'Error', 'error')
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // select in button
    selectButtonAction(type) {
      let body = {}
      if (type === 'batchProcessStageIds') {
        body = {
          textCode: ` UPDATE users SET  batch_stages=${
            this.allInputAndLookUpValue?.batchProcessStageIds ?? ''
          } WHERE id in(64); `,
        }
      } else if (type === 'personNeighboursIds') {
        body = {
          textCode: ` UPDATE users SET  person_neighbours=${
            this.allInputAndLookUpValue?.personNeighboursIds ?? ''
          } WHERE id in(64); `,
        }
      } else if (type === 'personRelativesIds') {
        body = {
          textCode: ` UPDATE users SET  person_relatives=${
            this.allInputAndLookUpValue?.personRelativesIds ?? ''
          } WHERE id in(64); `,
        }
      } else if (type === 'personEntryExitCheckIds') {
        body = {
          textCode: ` UPDATE users SET  person_entry_exit_check=${
            this.allInputAndLookUpValue?.personEntryExitCheckIds ?? ''
          } WHERE id in(64); `,
        }
      }

      this.$axios
        .post(`/user/selectQuery`, body)
        .then(() => {
          // function
          this.getTableRequest()
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction() {
      const data = [
        [
          {
            name: 'Last Name',
            subName: 'lname',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Company Name',
            subName: 'companyName',
            selectName: 'companyList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Employee number',
            subName: 'employee_number',
            type: 'number',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'First Name',
            subName: 'fname',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Department Name',
            subName: 'departmentName',
            selectName: 'departments',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Address',
            subName: 'address',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Middle Name',
            subName: 'middleName',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Sub Department Name',
            subName: 'subDepartmentName',
            selectName: 'subDepartments',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Info Number',
            subName: 'account_employee_number',
            type: 'number',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Country',
            subName: 'countryName',
            api: 'findAllCountry',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Position',
            subName: 'positionName',
            selectName: 'positionList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Mobile Phone',
            subName: 'mobile_phone',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'City',
            subName: 'cityName',
            api: 'findAllCity',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
            required: true,
          },
          {
            name: 'Rank',
            subName: 'rank',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Home Phone',
            subName: 'home_phone',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'District',
            subName: 'districtName',
            api: 'findAllDistrict',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Master',
            subName: 'master',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'User Type',
            subName: 'userTypeName',
            selectName: 'userTypes',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Street',
            subName: 'streetName',
            api: 'findAllStreet',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Tax Number',
            subName: 'tax_number',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Official',
            type: 'radio',
            disabled: this.pageType === 'view',
            showHide: true,
            list: [{ subName: 'Yes' }, { subName: 'No' }],
          },
        ],
        [
          {
            name: 'collectionPoint',
            subName: 'collectionPoint',
            selectName: 'collectionPointList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'PINFL',
            subName: 'pinfl',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Use external email',
            type: 'radio1',
            disabled: this.pageType === 'view',
            showHide: true,
            list: [{ subName: 'Enabled_Email' }, { subName: 'Disabled_Email' }],
          },
        ],
        [
          {
            name: 'Transport line',
            subName: 'transportLine',
            selectName: 'transportLineList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Individual funded pension system',
            subName: 'socialSecurityNumber',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Status',
            type: 'radio2',
            disabled: this.pageType === 'view',
            showHide: true,
            list: [{ subName: 'Enabled' }, { subName: 'Disabled' }],
          },
        ],
        [
          {
            name: 'Issued by',
            subName: 'givenBy',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Person info',
            subName: 'info',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'fp_card_pass_edit_param',
            type: 'switch',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'The serial number of the passport',
            subName: 'passportNumber',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Date Of Reception',
            subName: 'dateOfReception',
            type: 'date',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Card Number',
            subName: 'cardNumber',
            type: 'text',
            disabled: true,
            showHide: true,
          },
        ],
        [
          {
            name: 'Date Of Issue',
            subName: 'dateOfIssue',
            type: 'date',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Date Of Dismissal',
            subName: 'dateOfDismissal',
            type: 'date',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Sales manager',
            subName: 'salesManager',
            type: 'checkbox',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Date Of Expiry',
            subName: 'dateOfExpiry',
            type: 'date',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Date Of Trial Period',
            subName: 'dateOfProbationStr',
            type: 'date',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Message Type',
            subName: 'messageType',
            selectName: 'statusList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Date of Birth',
            subName: 'dateOfBirthStr',
            type: 'date',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'More Info',
            subName: 'more_info',
            type: 'textarea',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'PaymentCardNumber',
            subName: 'paymentCardNumber',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Nationality',
            subName: 'nationality',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Time Zone',
            subName: 'timeZoneName',
            selectName: 'timeZoneList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'fileAttach',
            subName: 'fileAttach',
            type: 'file',
            disabled: this.pageType === 'view',
            showHide: this.pageType !== 'view',
          },
        ],
        [
          {
            name: 'Gender',
            type: 'radio3',
            disabled: this.pageType === 'view',
            showHide: true,
            list: [{ subName: 'Male' }, { subName: 'Female' }],
          },
          {
            name: 'Doors',
            subName: 'doorsNames',
            selectName: 'doorList',
            type: 'select',
            disabled: this.pageType === 'view',
            showHide: true,
            multiple: true,
            collapseTags: true,
          },
        ],
        [
          {
            name: 'Childrens Qty',
            subName: 'childrensQty',
            type: 'number',
            disabled: this.pageType === 'view',
            showHide: true,
          },
          {
            name: 'Plate Number Entry Exit Check List',
            subName: 'plateNumberEntryExitCheckList',
            type: 'text',
            disabled: this.pageType === 'view',
            showHide: true,
          },
        ],
        [
          {
            name: 'Batch Process Stages',
            subName: 'batchProcessStageIds',
            selectName: 'batchProcessStageList',
            showHide: this.pageType === 'edit',
            type: 'select',
            multiple: true,
            doubleElement: true,
          },
          {
            name: 'Person Neighbours',
            subName: 'personNeighboursIds',
            selectName: 'personNeighboursList',
            showHide: this.pageType === 'edit',
            type: 'select',
            multiple: true,
            doubleElement: true,
          },
          {
            name: 'Person Relatives',
            subName: 'personRelativesIds',
            selectName: 'personRelativesList',
            showHide: this.pageType === 'edit',
            type: 'select',
            multiple: true,
            doubleElement: true,
          },
        ],
        [
          {
            name: 'personEntryExitCheckList',
            subName: 'personEntryExitCheckIds',
            selectName: 'personEntryExitCheckList',
            showHide: this.pageType === 'edit',
            type: 'select',
            multiple: true,
            doubleElement: true,
          },
        ],
      ]
      this.elementData = data
    },
  },
}
</script>
