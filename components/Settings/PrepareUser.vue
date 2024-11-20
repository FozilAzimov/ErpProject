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
          <generic-button name="Save" type="primary" @click="saveAction" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ 'Add USER' }}
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
              <span
                v-if="
                  element.type === 'text' ||
                  element.type === 'textarea' ||
                  element.type === 'number' ||
                  element.type === 'password'
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
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-look-up
                  dwidth="500"
                  :name="element.subName"
                  :disabled="element.disabled"
                  :multiple="element?.multiple"
                  :collapse-tags="element?.collapseTags"
                  :durl="element?.api"
                  :options-data="selectData?.[element?.selectName]"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'date'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input-date-page
                  width="500"
                  :name="element.subName"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'checkbox'"
                class="flex flex-col items-start mb-1"
              >
                <generic-check-box
                  :text="element?.name"
                  :name="element?.subName"
                  :disabled="element.disabled"
                  :border="true"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
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
      pageID: null,
      allInputAndLookUpValue: {},
      elementData: [],
      radio: 'Male',
      radio1: 'Enabled_Email',
      radio2: 'Enabled',
      radio3: 'Enabled_Payment',
      switchVal: false,
      selectData: {},
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      this.allInputAndLookUpValue.gender = newVal === 'Male' ? 1 : 2
    },
    radio1(newVal) {
      this.allInputAndLookUpValue.is_use_external_mail =
        newVal === 'Enabled_Email'
    },
    radio2(newVal) {
      this.allInputAndLookUpValue.active = newVal === 'Enabled'
    },
    radio3(newVal) {
      this.allInputAndLookUpValue.orderPaymentAccess =
        newVal === 'Enabled_Payment'
    },
    switchVal(newVal) {
      this.allInputAndLookUpValue.fp_card_pass_edit_param = newVal
    },
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
    // Table function
    this.getTableRequest()
    // default set value
    this.allInputAndLookUpValue.gender = 1
    this.allInputAndLookUpValue.is_use_external_mail = true
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
      this.$axios
        .post(`/user/prepareUser`, {
          page_current: 1,
          page_size: 25,
        })
        .then(({ data }) => {
          // function
          this.selectData = data
          this.selectData.activeLanguage = this.sortedSelectDataAction(
            data?.activeLanguage
          )
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // serted action
    sortedSelectDataAction(obj) {
      const activeLanguage = []
      for (const key in obj) {
        activeLanguage.push({ id: key, name: obj?.[key] })
      }
      return activeLanguage
    },

    // Save Changes action
    saveAction() {
      let body = {}
      let person = {}
      person = {
        user: {
          login: this.allInputAndLookUpValue?.login ?? '',
          password: this.allInputAndLookUpValue?.password ?? '',
          orderPaymentAccess:
            this.allInputAndLookUpValue?.orderPaymentAccess ?? false,
          equipmentsRealTimeSec:
            this.allInputAndLookUpValue?.equipmentsRealTimeSec ?? '',
          batchPlanningsTimeSec:
            this.allInputAndLookUpValue?.batchPlanningsTimeSec ?? '',
          permissionGroup: {
            id: this.allInputAndLookUpValue?.permissionGroupName ?? '',
          },
          locale: this.allInputAndLookUpValue?.localeName ?? '',
          accessType: {
            id: this.allInputAndLookUpValue?.accessTypeName ?? '',
          },
          hrmrAccessType: {
            id: this.allInputAndLookUpValue?.hrmrAccessTypeName ?? '',
          },
          transactionBranchPermissionType: {
            id:
              this.allInputAndLookUpValue
                ?.transactionBranchPermissionTypeName ?? '',
          },
          requestPermissionType: {
            id: this.allInputAndLookUpValue?.requestPermissionTypeName ?? '',
          },
          iplikLotStavkaListAccessType: {
            id: this.allInputAndLookUpValue?.iplikLotStavkaListAccessType ?? '',
          },
        },
        fname: this.allInputAndLookUpValue?.fname ?? '',
        lname: this.allInputAndLookUpValue?.lname ?? '',
        middleName: this.allInputAndLookUpValue?.middleName ?? '',
        givenBy: this.allInputAndLookUpValue?.givenBy ?? '',
        passportNumber: this.allInputAndLookUpValue?.passportNumber ?? '',
        dateOfBirthStr:
          this.$formatDate(this.allInputAndLookUpValue?.dateOfBirthStr) ?? '',
        dateOfIssueStr:
          this.$formatDate(this.allInputAndLookUpValue?.dateOfIssueStr) ?? '',
        dateOfExpiryStr:
          this.$formatDate(this.allInputAndLookUpValue?.dateOfExpiryStr) ?? '',
        nationality: this.allInputAndLookUpValue?.nationality ?? '',
        gender: this.allInputAndLookUpValue?.gender ?? '',
        childrensQty: this.allInputAndLookUpValue?.childrensQty ?? '',
        account_employee_number:
          this.allInputAndLookUpValue?.account_employee_number ?? '',
        mobile_phone: this.allInputAndLookUpValue?.mobile_phone ?? '',
        home_phone: this.allInputAndLookUpValue?.home_phone ?? '',
        hide_menu: this.allInputAndLookUpValue?.hide_menu ?? false,
        hide_duration: this.allInputAndLookUpValue?.hide_duration ?? '',
        salesManager: this.allInputAndLookUpValue?.salesManager ?? false,
        defaultMessageParam:
          this.allInputAndLookUpValue?.defaultMessageParam ?? '',
        rank: this.allInputAndLookUpValue?.rank ?? '',
        master: this.allInputAndLookUpValue?.master ?? '',
        tax_number: this.allInputAndLookUpValue?.taxNumber ?? '',
        pinfl: this.allInputAndLookUpValue?.pinfl ?? '',
        socialSecurityNumber:
          this.allInputAndLookUpValue?.socialSecurityNumber ?? '',
        info: this.allInputAndLookUpValue?.info ?? '',
        dateOfReceptionStr:
          this.$formatDate(this.allInputAndLookUpValue?.dateOfReceptionStr) ??
          '',
        dateOfDismissalStr:
          this.$formatDate(this.allInputAndLookUpValue?.dateOfDismissalStr) ??
          '',
        dateOfProbationStr:
          this.$formatDate(this.allInputAndLookUpValue?.dateOfProbationStr) ??
          '',
        email: this.allInputAndLookUpValue?.email ?? '',
        more_info: this.allInputAndLookUpValue?.moreInfo ?? '',
        employee_number: this.allInputAndLookUpValue?.employeeNumber ?? '',
        address: this.allInputAndLookUpValue?.address ?? '',
        userType: { id: this.allInputAndLookUpValue?.userTypeName ?? '' },
        is_use_external_mail:
          this.allInputAndLookUpValue?.is_use_external_mail ?? false,
        active: this.allInputAndLookUpValue?.active ?? false,
        fp_card_pass_edit_param:
          this.allInputAndLookUpValue?.fp_card_pass_edit_param ?? false,
        timeZone: { id: this.allInputAndLookUpValue?.timeZoneName ?? '' },
        plate_number_entry_exit_check:
          this.allInputAndLookUpValue?.plate_number_entry_exit_check ?? false,
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        passwordConfirm:
          this.allInputAndLookUpValue?.passwordConfirm ??
          this.viewEditData?.passwordConfirm ??
          '',
        countryId:
          this.allInputAndLookUpValue?.countryName ??
          this.viewEditData?.countryId ??
          '',
        cityId:
          this.allInputAndLookUpValue?.cityName ??
          this.viewEditData?.cityId ??
          '',
        districtId:
          this.allInputAndLookUpValue?.districtName ??
          this.viewEditData?.districtId ??
          '',
        streetId:
          this.allInputAndLookUpValue?.streetName ??
          this.viewEditData?.streetId ??
          '',
        collectionPointId:
          this.allInputAndLookUpValue?.collectionPointName ??
          this.viewEditData?.collectionPointId ??
          '',
        company_id:
          this.allInputAndLookUpValue?.companyName ??
          this.viewEditData?.company_id ??
          '',
        department_id:
          this.allInputAndLookUpValue?.departmentName ??
          this.viewEditData?.department_id ??
          '',
        companyOrDepartment:
          this.allInputAndLookUpValue?.companyOrDepartment ??
          this.viewEditData?.companyOrDepartment ??
          '',
        positionId:
          this.allInputAndLookUpValue?.positionName ??
          this.viewEditData?.positionId ??
          '',
        doorIds:
          this.allInputAndLookUpValue?.doorIdsName ??
          this.viewEditData?.doorIds ??
          '',
        person,
        jsonTree: '',
      }

      this.isLoading = !this.isLoading

      this.$axios
        .post(`/user/addUser`, body)
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/users.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction() {
      const data = [
        [
          {
            name: 'Login',
            subName: 'login',
            type: 'text',
            required: true,
          },
          {
            name: 'Company Name',
            subName: 'companyName',
            api: 'findAllCompanyLogic',
            type: 'select',
            required: true,
          },
          {
            name: 'Permission Groups',
            subName: 'permissionGroupName',
            selectName: 'permission',
            type: 'select',
          },
        ],
        [
          {
            name: 'New password',
            subName: 'password',
            type: 'password',
            required: true,
          },
          {
            name: 'Department Name',
            subName: 'departmentName',
            api: 'findAllDepartmentByAbsoluteLogic',
            type: 'select',
            required: true,
          },
          {
            name: 'Default Language',
            subName: 'localeName',
            api: 'findAllLangs',
            type: 'select',
          },
        ],
        [
          {
            name: 'New password confirm',
            subName: 'passwordConfirm',
            type: 'password',
            required: true,
          },
          {
            name: 'Sub Department Name',
            subName: 'subDepartmentName',
            api: 'findAllSubDepartment',
            type: 'select',
          },
          {
            name: 'Permission_type',
            subName: 'accessTypeName',
            selectName: 'accessType',
            type: 'select',
          },
        ],
        [
          {
            name: 'First Name',
            subName: 'fname',
            type: 'text',
            required: true,
          },
          {
            name: 'Warehouse Name',
            subName: 'warehouseName',
            api: 'findAllWarehouseByAbsoluteLogic',
            type: 'select',
          },
          {
            name: 'Hrms_Permission_type',
            subName: 'hrmrAccessTypeName',
            selectName: 'accessType',
            type: 'select',
          },
        ],
        [
          {
            name: 'Last Name',
            subName: 'lname',
            type: 'text',
            required: true,
          },
          {
            name: 'Position',
            subName: 'positionName',
            api: 'findAllPosition',
            type: 'select',
          },
          {
            name: 'Transaction_Branch_Permission_type',
            subName: 'transactionBranchPermissionTypeName',
            selectName: 'accessType',
            type: 'select',
          },
        ],
        [
          {
            name: 'Middle Name',
            subName: 'middleName',
            type: 'text',
          },
          {
            name: 'Rank',
            subName: 'rank',
            type: 'number',
          },
          {
            name: 'Request_Permission_type',
            subName: 'requestPermissionTypeName',
            selectName: 'accessType',
            type: 'select',
          },
        ],
        [
          {
            name: 'Country',
            subName: 'countryName',
            api: 'findAllCountry',
            type: 'select',
            required: true,
          },
          {
            name: 'Master',
            subName: 'master',
            type: 'text',
          },
          {
            name: 'Resolution Type Of Yarn',
            subName: 'iplikLotStavkaListAccessType',
            selectName: 'accessType',
            type: 'select',
          },
        ],
        [
          {
            name: 'City',
            subName: 'cityName',
            api: 'findAllCity',
            type: 'select',
            required: true,
          },
          {
            name: 'Tax Number',
            subName: 'taxNumber',
            type: 'text',
          },
          {
            name: 'Time Zone',
            subName: 'timeZoneName',
            api: 'findAllTimeZone',
            type: 'select',
          },
        ],
        [
          {
            name: 'District',
            subName: 'districtName',
            api: 'findAllDistrict',
            type: 'select',
          },
          {
            name: 'PINFL',
            subName: 'pinfl',
            type: 'text',
          },
          {
            name: 'Doors',
            subName: 'doorIdsName',
            api: 'findAllDoor',
            type: 'select',
            multiple: true,
            collapseTags: true,
          },
        ],
        [
          {
            name: 'Street',
            subName: 'streetName',
            api: 'findAllStreet',
            type: 'select',
          },
          {
            name: 'Individual funded pension system',
            subName: 'socialSecurityNumber',
            type: 'text',
          },
          {
            name: 'plateNumberEntryExitCheckList',
            subName: 'plate_number_entry_exit_check',
            type: 'text',
          },
        ],
        // box
        [
          {
            name: 'collectionPoint',
            subName: 'collectionPointName',
            selectName: 'collectionPoint',
            type: 'select',
          },
          {
            name: 'Person info',
            subName: 'info',
            type: 'text',
          },
          {
            subName: 'menuSetting',
            type: 'menuBox',
          },
        ],
        [
          {
            name: 'Issued by',
            subName: 'givenBy',
            type: 'text',
          },
          {
            name: 'Date Of Reception',
            subName: 'dateOfReceptionStr',
            type: 'date',
          },
        ],
        [
          {
            name: 'The serial number of the passport',
            subName: 'passportNumber',
            type: 'text',
          },
          {
            name: 'Date Of Dismissal',
            subName: 'dateOfDismissalStr',
            type: 'date',
          },
        ],
        [
          {
            name: 'Date of Birth',
            subName: 'dateOfBirthStr',
            type: 'date',
          },
          {
            name: 'Date Of Trial Period',
            subName: 'dateOfProbationStr',
            type: 'date',
          },
        ],
        [
          {
            name: 'Date Of Issue',
            subName: 'dateOfIssueStr',
            type: 'date',
          },
          {
            name: 'Email',
            subName: 'email',
            type: 'text',
            required: true,
          },
        ],
        [
          {
            name: 'Date Of Expiry',
            subName: 'dateOfExpiryStr',
            type: 'date',
          },
          {
            name: 'More Info',
            subName: 'moreInfo',
            type: 'textarea',
          },
        ],
        [
          {
            name: 'Nationality',
            subName: 'nationality',
            type: 'text',
          },
          {
            name: 'Employee number',
            subName: 'employeeNumber',
            type: 'number',
          },
        ],
        // gender
        [
          {
            name: 'Gender',
            type: 'radio',
            list: [{ subName: 'Male' }, { subName: 'Female' }],
          },
          {
            name: 'Address',
            subName: 'address',
            type: 'text',
          },
        ],
        [
          {
            name: 'childrensQty',
            subName: 'childrensQty',
            type: 'number',
          },
          {
            name: 'User Type',
            subName: 'userTypeName',
            selectName: 'userTypes',
            type: 'select',
          },
        ],
        [
          {
            name: 'Info Number',
            subName: 'account_employee_number',
            type: 'number',
          },
          {
            name: 'Use external email',
            type: 'radio1',
            list: [{ subName: 'Enabled_Email' }, { subName: 'Disabled_Email' }],
          },
        ],
        // active
        [
          {
            name: 'Mobile Phone',
            subName: 'mobile_phone',
            type: 'text',
          },
          {
            name: 'Status',
            type: 'radio2',
            list: [{ subName: 'Enabled' }, { subName: 'Disabled' }],
          },
        ],
        [
          {
            name: 'Home Phone',
            subName: 'home_phone',
            type: 'text',
          },
          {
            name: 'fp_card_pass_edit_param',
            subName: 'fp_card_pass_edit_param',
            type: 'switch',
          },
        ],
        [
          {
            name: 'Auto hide menu',
            subName: 'hide_menu',
            type: 'checkbox',
          },
          {
            name: 'Card Number',
            subName: 'cardNumber',
            type: 'text',
            disabled: true,
          },
        ],
        [
          {
            name: 'Auto-Hide Timeout',
            subName: 'hide_duration',
            type: 'number',
          },
          {
            name: 'equipmentsRealTimeSec',
            subName: 'equipmentsRealTimeSec',
            type: 'number',
          },
        ],
        // orderPaymentAccess
        [
          {
            name: 'Order Payment Access',
            type: 'radio3',
            list: [
              { subName: 'Enabled_Payment' },
              { subName: 'Disabled_Payment' },
            ],
          },
          {
            name: 'batchPlanningsTimeSec',
            subName: 'batchPlanningsTimeSec',
            type: 'number',
          },
        ],
        [
          {
            name: 'Sales manager',
            subName: 'salesManager',
            type: 'checkbox',
          },
          {
            name: 'Message Type',
            subName: 'defaultMessageParam',
            selectName: 'statusList',
            type: 'select',
          },
        ],
      ]
      this.elementData = data
    },
  },
}
</script>
