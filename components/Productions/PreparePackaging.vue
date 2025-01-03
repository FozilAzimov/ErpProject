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
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View Packaging'
                : pageType === 'edit'
                ? 'Edit Packaging'
                : 'Packaging Create'
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
            ? 'duration-[1s] h-fit overflow-hidden'
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
                  ></span
                >
                <generic-input
                  :value="
                    editData?.[element?.subName]
                      ? editData?.[element?.subName]
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
                v-else-if="element.type === 'select'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="editData[element?.subName]"
                  :options-data="selectDefaultData"
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
              @click="$router.push('/packaging.htm')"
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

        <!-- Component Add table -->
        <production-addition-table
          v-if="pageType === 'edit'"
          class="mt-10 p-2"
          :page-id="pageID"
          :data="rowData"
          title="Packaging"
          :buttons="[
            {
              name: 'Add new',
              type: 'primary',
              iconNameAttribute: 'circle-plus-outline',
              action: 'add',
            },
            {
              name: 'Save Change',
              type: 'primary',
              action: 'save',
            },
          ]"
        />
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import ProductionAdditionTable from '@components/Productions/ProductionAdditionTable.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    ProductionAdditionTable,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      pageType: null,
      pageID: null,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      selectDefaultData: [],
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
          type: 'del',
        },
      ],
    }
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

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Name',
          subName: 'name',
          type: 'text',
          required: true,
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Code',
          subName: 'code',
          type: 'text',
          required: false,
          show: this.pageType !== 'view',
        },
        {
          name: 'Card Number',
          subName: 'cardnumber',
          type: 'text',
          required: false,
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Department Name',
          subName: 'departmentName',
          type: 'select',
          required: false,
          show: this.pageType !== 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.pageID && this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/packagings/viewPackagingAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: this.pageSize_value,
          })
          .then(({ data: { packaging } }) => {
            this.isLoading = !this.isLoading
            this.editData = packaging
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageID && this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/packagings/preparePackagingAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: this.pageSize_value,
          })
          .then(({ data }) => {
            this.selectDefaultData = data?.department
            this.editData = data?.packaging
            this.editData.department_id = data?.department_id
            // function
            this.departmentFindNameAction(data?.department, data?.department_id)
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (!this.pageID) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/packagings/preparePackagingAjaxLoad`, {
            page_current: 1,
            page_size: this.pageSize_value,
          })
          .then(({ data: { departmentList } }) => {
            this.isLoading = !this.isLoading
            this.selectDefaultData = departmentList
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

    // SAVE and Changes action
    saveAction() {
      if (this.allInputAndLookUpValue.name || this.editData?.name) {
        const body = {}
        const packaging = {}
        if (this.pageID && this.pageType === 'edit') {
          packaging.id = this.pageID
          packaging.name =
            this.allInputAndLookUpValue?.name || this.editData?.name || ''
          packaging.code =
            this.allInputAndLookUpValue?.code || this.editData?.code || ''
          packaging.cardnumber =
            this.allInputAndLookUpValue?.cardnumber ||
            this.editData?.cardnumber ||
            ''
          body.department_id =
            this.allInputAndLookUpValue?.departmentName ||
            this.editData?.department_id ||
            ''
        } else if (!this.pageID) {
          packaging.name = this.allInputAndLookUpValue?.name || ''
          packaging.cardnumber = this.allInputAndLookUpValue?.cardnumber || ''
          packaging.code = this.allInputAndLookUpValue?.code || ''
          body.department_id = this.allInputAndLookUpValue?.departmentName || ''
        }

        body.packaging = packaging
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/packagings/addEditPackaging`, body)
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.$router.push('/packaging.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Department LookUp name ni olish
    departmentFindNameAction(optionData, id) {
      const foundObj = optionData.find((obj) => id === obj?.id && obj?.name)
      this.editData.departmentName = foundObj ? foundObj.name : ''
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
