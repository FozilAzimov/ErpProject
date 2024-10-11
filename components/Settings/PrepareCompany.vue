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
              :key="index"
              :name="obj?.name"
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
                        :durl="element?.api ? element?.api : ''"
                        :name="element.subName"
                        :defvalue="''"
                        :multiple="element?.multiple"
                        :options-data="currencyData"
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
      currencyData: [],
      // element data
      commonData: [],
      defaultElementData: [],
      additionElementData: [],
      specialElementData: [],
      // element data
    }
  },

  // WATCH
  watch: {
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
    this.dataCreatedAction()
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
      if (this.pageType === 'view') {
        this.isLoading = !this.isLoading
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
        this.isLoading = !this.isLoading
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
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/company/addCompany`, {
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
      let batchProcess = {}
      if (this.pageID && this.pageType === 'edit') {
        batchProcess = {
          id: this.pageID,
          name:
            this.allInputAndLookUpValue?.name || this.viewEditData.name || '',
          savename:
            this.allInputAndLookUpValue?.savename ||
            this.viewEditData.savename ||
            '',
          code:
            this.allInputAndLookUpValue?.code || this.viewEditData.code || '',
          active:
            this.allInputAndLookUpValue?.active ||
            this.viewEditData.active ||
            '',
          currency: {
            id: this.allInputAndLookUpValue?.currency || '',
          },
          price: this.allInputAndLookUpValue?.price || '',
        }
      } else {
        batchProcess = {
          name: this.allInputAndLookUpValue?.name,
          savename: this.allInputAndLookUpValue?.savename,
          code: this.allInputAndLookUpValue?.code,
          active: this.allInputAndLookUpValue?.active,
        }
      }
      body = {
        page_current: 1,
        rightData: '',
        batchProcess,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/companies/${this.pageID ? 'editCompany' : 'prepareCompany'}`,
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
    dataCreatedAction() {
      // ALL BTN DATA
      const btnData = [
        { name: 'Main information', showHide: true, clickType: 'main' },
        { name: 'Addition information', showHide: true, clickType: 'addition' },
        { name: 'Spacial information', showHide: true, clickType: 'spacial' },
      ]
      this.allBtnElements = btnData

      // DEFAULT DATA
      const data = [
        [
          {
            name: 'Code',
            subName: 'code',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Company Group',
            subName: 'companyGroupId',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Type',
            subName: 'typeId',
            type: 'select',
            show: true,
            multiple: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Status',
            subName: 'enabled',
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
            name: 'Name',
            subName: 'name',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'companyCategory',
            subName: 'companyCategoryId',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Currency',
            subName: 'currencyId',
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
            name: 'Name 2',
            subName: 'name2',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Assigned company',
            subName: 'assignedCompanyId',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Report Company',
            subName: 'reportCompany',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'System Company',
            subName: 'systemCompany',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Credit Market Sale Auto Extra Debit',
            subName: 'creditMarketSaleAutoExtraDebit',
            type: 'checkbox',
            show: this.pageType === 'edit',
          },
        ],
        [
          {
            name: 'Company Access',
            subName: 'companyAccess',
            type: 'select',
            multiple: true,
            show: this.pageType === 'edit',
          },
          {
            name: 'To Company Access',
            subName: 'toCompanyAccess',
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
            name: 'company.chief',
            subName: 'company.chief',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Address',
            subName: 'address',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Web Address',
            subName: 'webAddress',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'MFO',
            subName: 'mfo',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: 'Town',
            subName: 'town',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Company phone number',
            subName: 'companyPhoneNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Tax Organization Name',
            subName: 'taxOrganizationName',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'company.notes',
            subName: 'company.notes',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: 'Country',
            subName: 'country',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Phone',
            subName: 'phone',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Banks',
            subName: 'banks',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: 'City',
            subName: 'city',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Email',
            subName: 'email',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Account number',
            subName: 'accountNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: 'District',
            subName: 'district',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Fax number',
            subName: 'faxNumber',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Tax number',
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
            name: 'Post Types',
            subName: 'postTypes',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Company report order sequence',
            subName: 'companyReportOrderSequence',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Password',
            subName: 'password',
            type: 'password',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Special Day',
            subName: 'specialDay',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
        ],
        [
          {
            name: 'Post Type International',
            subName: 'postTypeInternational',
            type: 'select',
            api: 'findAllPostType',
            param: {
              postTypeId: this.allInputAndLookUpValue?.postTypeId ?? 3,
            },
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Discount Rate',
            subName: 'discountRate',
            type: 'text',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'Access for web',
            subName: 'accessForWeb',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          [
            {
              name: 'Monday',
              subName: 'monday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Tuesday',
              subName: 'tuesday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Wednesday',
              subName: 'wednesday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Thursday',
              subName: 'thursday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Friday',
              subName: 'friday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Saturday',
              subName: 'saturday',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
          ],
        ],
        [
          {
            name: 'Post Type Region',
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
            name: 'Vat amount',
            subName: 'vatAmount',
            type: 'number',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'vatIncludedExcluded',
            subName: 'vatIncludedExcluded',
            type: 'checkbox',
            show: true,
            disabled: this.pageType === 'view',
          },
          [
            {
              name: 'Week',
              subName: 'week',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Week 2',
              subName: 'week2',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Week 3',
              subName: 'week3',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
            {
              name: 'Week 4',
              subName: 'week4',
              type: 'checkbox',
              show: true,
              disabled: this.pageType === 'view',
            },
          ],
        ],
        [
          {
            name: 'Post Type City',
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
            name: 'Default Language',
            subName: 'defaultLanguage',
            type: 'select',
            show: true,
            disabled: this.pageType === 'view',
          },
          {
            name: 'creditMarketSaleAutoExtraDebit',
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
