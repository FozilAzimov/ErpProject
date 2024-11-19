<template>
  <div class="w-full p-1">
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View Company'
                : pageType === 'edit'
                ? 'Edit Company'
                : 'Add Company'
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
          <div class="flex items-center gap-1">
            <generic-button
              v-for="(obj, index) in allBtnElements"
              v-show="obj?.showHide"
              :key="index"
              :name="obj?.name"
              :icon-name-attribute="obj?.icon"
              type="primary"
              @click="allBtnAction(obj?.clickType)"
            />
          </div>

          <div v-for="(parentRow, inx) in commonData" :key="inx">
            <div
              v-for="(row, index) in parentRow"
              :key="index"
              class="flex items-end gap-x-3 my-3"
            >
              <span
                v-for="(element, innerIndex) in row"
                :key="innerIndex"
                class="flex items-center gap-1"
              >
                <template v-if="Array.isArray(element)">
                  <span
                    v-for="(obj, nestedIndex) in element"
                    :key="nestedIndex"
                  >
                    <template v-if="obj.show">
                      <generic-check-box
                        :text="obj?.name"
                        :name="obj?.subName"
                        :disabled="obj.disabled"
                        :border="true"
                        :default-value="
                          viewEditData?.[obj.subName]
                            ? viewEditData?.[obj.subName]
                            : false
                        "
                        @customFunction="getInputAndLookUpValueAction"
                      />
                    </template>
                  </span>
                </template>

                <template v-else>
                  <template v-if="element.show">
                    <span
                      v-if="
                        element.type === 'text' ||
                        element.type === 'number' ||
                        element.type === 'password'
                      "
                      class="flex flex-col items-start"
                    >
                      <span class="text-[13px]">{{ element.name }}</span>
                      <generic-input
                        :value="
                          viewEditData?.[element.subName]
                            ? viewEditData?.[element.subName]
                            : ''
                        "
                        width="300"
                        :type="element.type"
                        :name="element.subName"
                        :disabled="element.disabled"
                        @customFunction="getInputAndLookUpValueAction"
                      />
                    </span>
                    <span
                      v-else-if="element.type === 'select'"
                      class="flex flex-col items-start"
                    >
                      <span class="text-[13px]">{{ element.name }}</span>
                      <generic-look-up
                        dwidth="300"
                        :durl="element?.api"
                        :name="element.subName"
                        :defvalue="''"
                        :multiple="element?.multiple"
                        :options-data="allSelectData?.[element?.selectName]"
                        :disabled="element.disabled"
                        @customFunction="getInputAndLookUpValueAction"
                      />
                    </span>
                    <span
                      v-else-if="element.type === 'checkbox'"
                      class="flex flex-col items-start"
                    >
                      <generic-check-box
                        :text="element?.name"
                        :name="element?.subName"
                        :disabled="element.disabled"
                        :border="true"
                        :default-value="
                          viewEditData?.[element.subName]
                            ? viewEditData?.[element.subName]
                            : false
                        "
                        @customFunction="getInputAndLookUpValueAction"
                      />
                    </span>
                    <span
                      v-else-if="element.type === 'radio'"
                      class="flex flex-col items-start"
                    >
                      <span class="text-[13px]">{{ element.name }}</span>
                      <el-radio
                        v-model="radio"
                        :disabled="element.disabled"
                        :label="element.subName"
                      ></el-radio>
                    </span>
                    <span
                      v-else-if="element.type === 'radio2'"
                      class="flex flex-col items-start"
                    >
                      <el-radio
                        v-model="radio2"
                        :disabled="element.disabled"
                        :label="element.subName"
                      ></el-radio>
                    </span>
                  </template>
                </template>
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/companies.htm')"
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
import { mapGetters } from 'vuex'
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
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      allBtnElements: [],
      viewEditData: {},
      allInputAndLookUpValue: {},
      radio: null,
      radio2: null,
      allSelectData: [],
      // element data
      commonData: [],
      defaultElementData: [],
      additionElementData: [],
      specialElementData: [],
      // element data
    }
  },

  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // WATCH
  watch: {
    // start CoreString action
    GET_CORE_STRING: {
      handler(newVal) {
        // function
        this.dataCreatedAction(newVal)
      },
      deep: true,
    },
    // end CoreString action
    radio(newVal) {
      if (newVal === 'enabled') this.allInputAndLookUpValue.active = true
      else if (newVal === 'disabled') this.allInputAndLookUpValue.active = false
      else this.allInputAndLookUpValue.active = false
    },
    radio2(newVal) {
      if (newVal === 'physical') this.allInputAndLookUpValue.active2 = true
      else if (newVal === 'notPhysical')
        this.allInputAndLookUpValue.active2 = false
      else this.allInputAndLookUpValue.active2 = false
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
    this.dataCreatedAction(this.GET_CORE_STRING)
    // Table function
    this.getTableRequest()
  },

  // Methods
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

    // Page request
    getTableRequest() {
      this.isLoading = !this.isLoading
      if (this.pageType === 'view') {
        this.$axios
          .post(`/company/prepareCompanyView`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { design } }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = design
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.$axios
          .post(`/company/prepareCompany`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { batchProcess, currencyList } }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = batchProcess
            this.currencyData = currencyList
            batchProcess.active
              ? (this.radio = 'enabled')
              : (this.radio = 'disabled')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/company/prepareCompanyAdd`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.isLoading = !this.isLoading
            // this.viewEditData = batchProcess
            this.allSelectData = data
            // batchProcess.active
            //   ? (this.radio = 'enabled')
            //   : (this.radio = 'disabled')
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

    allBtnAction(btnType) {
      if (btnType === 'main') {
        this.commonData[0]?.length
          ? this.$set(this.commonData, 0, [])
          : this.$set(this.commonData, 0, this.defaultElementData)
      } else if (btnType === 'addition') {
        this.commonData[1]?.length
          ? this.$set(this.commonData, 1, [])
          : this.$set(this.commonData, 1, this.additionElementData)
      } else if (btnType === 'spacial') {
        this.commonData[2]?.length
          ? this.$set(this.commonData, 2, [])
          : this.$set(this.commonData, 2, this.specialElementData)
      }
    },

    // Save Changes action
    saveAction() {
      let body = {}
      const company = {}
      if (this.pageID && this.pageType === 'edit') {
        company.id = this.pageID ?? ''
        company.code = this.allInputAndLookUpValue?.code ?? ''
      } else {
        company.code = this.allInputAndLookUpValue?.code ?? ''
        company.companyGroup = {
          id: this.allInputAndLookUpValue?.companyGroup ?? '',
        }
        company.active = this.allInputAndLookUpValue?.active ?? false
        company.name = this.allInputAndLookUpValue?.name ?? ''
        company.companyCategory = {
          id: this.allInputAndLookUpValue?.companyCategory ?? '',
        }
        company.currency = {
          id: this.allInputAndLookUpValue?.currency ?? '',
        }
        company.physical = this.allInputAndLookUpValue?.physical ?? false
        company.reportCompany =
          this.allInputAndLookUpValue?.reportCompany ?? false
        company.systemCompany =
          this.allInputAndLookUpValue?.systemCompany ?? false
        company.name2 = this.allInputAndLookUpValue?.name2 ?? ''
        company.assignedBranchId =
          this.allInputAndLookUpValue?.assignedBranchId ?? ''
        company.chief = this.allInputAndLookUpValue?.chief ?? ''
        company.address = this.allInputAndLookUpValue?.address ?? ''
        company.web_address = this.allInputAndLookUpValue?.web_address ?? ''
        company.mfo = this.allInputAndLookUpValue?.mfo ?? ''
        company.town = this.allInputAndLookUpValue?.town ?? ''
        company.phone_number = this.allInputAndLookUpValue?.phone_number ?? ''
        company.tax_organization_name =
          this.allInputAndLookUpValue?.tax_organization_name ?? ''
        company.notes = this.allInputAndLookUpValue?.notes ?? ''
        company.country = this.allInputAndLookUpValue?.country ?? ''
        company.mobile_phone = this.allInputAndLookUpValue?.mobile_phone ?? ''
        company.bank = {
          id: this.allInputAndLookUpValue?.bank ?? '',
        }
        company.city = this.allInputAndLookUpValue?.city ?? ''
        company.email = this.allInputAndLookUpValue?.email ?? ''
        company.accountNumber = this.allInputAndLookUpValue?.accountNumber ?? ''
        company.fax_number = this.allInputAndLookUpValue?.fax_number ?? ''
        company.tax_number = this.allInputAndLookUpValue?.tax_number ?? ''
        company.reportOrderSequence =
          this.allInputAndLookUpValue?.reportOrderSequence ?? ''
        company.ecPasswordHashNew =
          this.allInputAndLookUpValue?.ecPasswordHashNew ?? ''
        company.special_day = this.allInputAndLookUpValue?.special_day ?? ''
        company.postTypeInternational =
          this.allInputAndLookUpValue?.postTypeInternational ?? ''
        company.discount_rate = this.allInputAndLookUpValue?.discount_rate ?? ''
        company.webAccess = this.allInputAndLookUpValue?.webAccess ?? false
        company.monday = this.allInputAndLookUpValue?.monday ?? false
        company.tuesday = this.allInputAndLookUpValue?.tuesday ?? false
        company.wednesday = this.allInputAndLookUpValue?.wednesday ?? false
        company.thursday = this.allInputAndLookUpValue?.thursday ?? false
        company.friday = this.allInputAndLookUpValue?.friday ?? false
        company.saturday = this.allInputAndLookUpValue?.saturday ?? false
        company.vatAmount = this.allInputAndLookUpValue?.vatAmount ?? ''
        company.vatIncludedExcluded =
          this.allInputAndLookUpValue?.vatIncludedExcluded ?? false
        company.week1 = this.allInputAndLookUpValue?.week1 ?? false
        company.week2 = this.allInputAndLookUpValue?.week2 ?? false
        company.week3 = this.allInputAndLookUpValue?.week3 ?? false
        company.week4 = this.allInputAndLookUpValue?.week4 ?? false
        company.locale = this.allInputAndLookUpValue?.locale ?? ''
        company.creditMarketSaleAutoExtraDebit =
          this.allInputAndLookUpValue?.creditMarketSaleAutoExtraDebit ?? false
      }
      body = {
        companyTypesIds: this.allInputAndLookUpValue?.typeId ?? [],
        districtId: this.allInputAndLookUpValue?.districtId ?? '',
        company,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/companies/${this.pageID ? 'editCompany' : 'addCompany'}`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/batchProcess.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction(getText) {
      // ALL BTN DATA
      const btnData = [
        {
          name: getText?.mainInfo || 'Main information',
          showHide: true,
          clickType: 'main',
        },
        {
          name: getText?.additionInfo || 'Addition information',
          showHide: true,
          clickType: 'addition',
        },
        {
          name: getText?.specialInfo || 'Spacial information',
          showHide: true,
          clickType: 'spacial',
        },
        {
          name:
            `${getText?.upload} ${getText?.['title.files.sub']}` ||
            'Upload Files',
          showHide: this.pageType === 'edit',
          clickType: 'uploadFile',
          icon: 'upload2',
        },
      ]
      this.allBtnElements = btnData

      // DEFAULT DATA
      const data = [
        [
          {
            name: getText?.code || 'Code',
            subName: 'code',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.companyGroup || 'Company Group',
            subName: 'companyGroupId',
            selectName: 'companyGroupList',
            api: 'findAllCompanyGroups',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['common.types'] || 'Type',
            subName: 'typeId',
            selectName: 'companyTypeList',
            type: 'select',
            show: true,
            multiple: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.status || 'Status',
            subName: 'enabled',
            selectName: 'companyCategoryList',
            type: 'radio',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            subName: 'disabled',
            type: 'radio',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: getText?.['company.name'] || 'Name',
            subName: 'name',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.companyCategory || 'companyCategory',
            subName: 'companyCategoryId',
            selectName: 'companyCategoryList',
            api: 'findAllCompanyCategory',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.currency || 'Currency',
            subName: 'currencyId',
            selectName: 'currencyList',
            api: 'findAllCurrency',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            subName: 'physical',
            type: 'radio2',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            subName: 'notPhysical',
            type: 'radio2',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: getText?.['company.name2'] || 'Name 2',
            subName: 'name2',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['assigned company'] || 'Assigned company',
            subName: 'assignedCompanyId',
            selectName: 'branchCompanyList',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.reportCompany || 'Report Company',
            subName: 'reportCompany',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.systemCompany || 'System Company',
            subName: 'systemCompany',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name:
              getText?.creditMarketSaleAutoExtraDebit ||
              'Credit Market Sale Auto Extra Debit',
            subName: 'creditMarketSaleAutoExtraDebit',
            type: 'checkbox',
            show: this.pageType === 'edit',
          },
        ],
        [
          {
            name: getText?.['Company Access'] || 'Company Access',
            subName: 'companyAccess',
            selectName: 'personList',
            type: 'select',
            multiple: true,
            show: this.pageType === 'edit',
          },
          {
            name: getText?.['To Company Access'] || 'To Company Access',
            subName: 'toCompanyAccess',
            selectName: 'personList',
            type: 'select',
            multiple: true,
            show: this.pageType === 'edit',
          },
        ],
      ]
      this.defaultElementData = data
      this.commonData[0] = this.defaultElementData

      // DEFAULT DATA
      const data2 = [
        [
          {
            name: getText?.['company.chief'] || 'company.chief',
            subName: 'company.chief',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.address'] || 'Address',
            subName: 'address',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['common.webaddress'] || 'Web Address',
            subName: 'webAddress',
            type: 'text',
            show: !this.pageID,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.fax_number'] || 'Fax number',
            subName: 'webAddress',
            type: 'text',
            show: this.pageType === 'edit',
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.mfo'] || 'MFO',
            subName: 'mfo',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: getText?.['common.town'] || 'Town',
            subName: 'town',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.phone_number'] || 'Company phone number',
            subName: 'companyPhoneNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name:
              getText?.['company.tax_organization_name'] ||
              'Tax Organization Name',
            subName: 'taxOrganizationName',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.notes'] || 'company.notes',
            subName: 'company.notes',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: getText?.['common.country'] || 'Country',
            subName: 'country',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.mobile_phone'] || 'Phone',
            subName: 'phone',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.banks || 'Banks',
            subName: 'banks',
            selectName: 'bankList',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: getText?.['common.city'] || 'City',
            subName: 'city',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['common.email'] || 'Email',
            subName: 'email',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['common.accountnumber'] || 'Account number',
            subName: 'accountNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: getText?.district || 'District',
            subName: 'district',
            selectName: 'districtList',
            api: 'findAllDistrict',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.fax_number'] || 'Fax number',
            subName: 'faxNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.tax_number'] || 'Tax number',
            subName: 'taxNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
      ]
      this.additionElementData = data2

      // DEFAULT DATA
      const data3 = [
        [
          {
            name: getText?.['Post Types'] || 'Post Types',
            subName: 'postTypes',
            selectName: 'postTypes',
            api: 'findAllPostType',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name:
              getText?.['company.report_order_sequence'] ||
              'Company report order sequence',
            subName: 'companyReportOrderSequence',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['login.password'] || 'Password',
            subName: 'password',
            type: 'password',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.special_day'] || 'Special Day',
            subName: 'specialDay',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name:
              getText?.['Post Type International'] || 'Post Type International',
            subName: 'postTypeInternational',
            api: 'findAllPostType',
            type: 'select',
            param: {
              postTypeId: this.allInputAndLookUpValue?.postTypeId ?? 3,
            },
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.['company.discount_rate'] || 'Discount Rate',
            subName: 'discountRate',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.webAccess || 'Access for web',
            subName: 'accessForWeb',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          [
            {
              name: getText?.['company.monday'] || 'Monday',
              subName: 'monday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.tuesday'] || 'Tuesday',
              subName: 'tuesday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.wednesday'] || 'Wednesday',
              subName: 'wednesday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.thursday'] || 'Thursday',
              subName: 'thursday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.friday'] || 'Friday',
              subName: 'friday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.saturday'] || 'Saturday',
              subName: 'saturday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
          ],
        ],
        [
          {
            name: getText?.PostTypeRegion || 'Post Type Region',
            subName: 'postTypeRegion',
            type: 'select',
            api: 'findAllPostType',
            param: {
              postTypeId: this.allInputAndLookUpValue?.postTypeId ?? 1,
            },
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.vat_amount || 'Vat amount',
            subName: 'vatAmount',
            type: 'number',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.webAccess || 'Access for web',
            subName: 'webAccess',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: getText?.vatIncludedExcluded || 'vatIncludedExcluded',
            subName: 'vatIncludedExcluded',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          [
            {
              name: getText?.['company.week1'] || 'Week',
              subName: 'week',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.week2'] || 'Week 2',
              subName: 'week2',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.week3'] || 'Week 3',
              subName: 'week3',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: getText?.['company.week4'] || 'Week 4',
              subName: 'week4',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
          ],
        ],
        [
          {
            name: getText?.PostTypeCity || 'Post Type City',
            subName: 'postTypeCity',
            type: 'select',
            api: 'findAllPostType',
            param: {
              postTypeId: this.allInputAndLookUpValue?.postTypeId ?? 2,
            },
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name:
              getText?.['menu.settings.default_language'] || 'Default Language',
            subName: 'defaultLanguage',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name:
              getText?.creditMarketSaleAutoExtraDebit ||
              'creditMarketSaleAutoExtraDebit',
            subName: 'creditMarketSaleAutoExtraDebit',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
      ]
      this.specialElementData = data3
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
