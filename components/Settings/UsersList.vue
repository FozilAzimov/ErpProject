<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="tableHead"
        :left="leftMap"
        :url="actionUrl"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <form class="flex flex-wrap items-center gap-2">
      <span v-for="(element, index) in topFilterData" :key="index">
        <span
          v-if="element.type === 'select'"
          class="flex flex-col items-start"
        >
          <span class="text-[13px]">{{ element.name }}</span>
          <generic-look-up
            :dwidth="element?.width"
            :name="element?.subName"
            placeholder="Please Select"
            :durl="element?.api"
            :options-data="selectData?.[element?.selectName]"
            @customFunction="getInputAndLookUpValueAction"
          />
        </span>
        <span
          v-else-if="element.type === 'number'"
          class="flex flex-col items-start"
        >
          <span class="text-[13px]">{{ element.name }}</span>
          <span class="flex items-center gap-1">
            <generic-input
              v-for="(elem, inx) in element?.list"
              :key="inx"
              :width="element?.width"
              :name="elem?.subName"
              type="number"
              :clearable="false"
              @customFunction="getInputAndLookUpValueAction"
            />
          </span>
        </span>
      </span>
    </form>
    <generic-scales-box class="my-2" />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            USERS LIST
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
        <div class="flex items-center gap-2 m-2">
          <generic-button
            name="Add New"
            type="primary"
            icon-name-attribute="circle-plus-outline"
            @click="
              $router.push({
                path: '/prepareUser.htm',
                query: { page_type: 'create' },
              })
            "
          />
          <generic-button
            name="Add Employee"
            type="primary"
            icon-name-attribute="circle-plus-outline"
            @click="
              $router.push({
                path: '/prepareUserPersonal.htm',
                query: { page_type: 'create' },
              })
            "
          />
          <generic-file-upload />
          <generic-button
            name="Download"
            type="success"
            icon-name-attribute="download"
          />
        </div>
        <div class="p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[14px]">
              <select
                v-model="pageSize_value"
                class="border-[1px] border-solid border-[rgba(171,177,187,0.7)] w-[60px] px-[5px] py-[3px] cursor-pointer rounded-[2px] text-[14px] outline-none"
                @change="getTableRequest"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
              Records
            </div>
            <div class="flex items-center gap-2">
              <GenericInput
                name="keyword"
                placeholder="Search..."
                @enter="getTableRequest"
                @input="getInputAndLookUpValueAction"
              />
              <GenericButton
                name="Search"
                type="primary"
                icon-name-attribute="search"
                @click="getTableRequest"
              />
            </div>
          </div>
          <GenericTablePage
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
            open-url="prepareUserPersonal"
            :custom-btn="{
              name: 'Employment Contract',
              type: 'success',
              icon: 'check',
              clickType: 'employmentContract',
            }"
            :productions-action-buttons="true"
            delete-row-url="batchProcess/prepareBatchProcessDelete"
            height="600"
            @pageEmitAction="getTableRequest"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericTablePage from '@components/GenericTable/GenericTablePage.vue'
import GenericScalesBox from '@generics/GenericScalesBox.vue'
import GenericFileUpload from '@generics/GenericFileUpload.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    ColumnConfigPage,
    GenericTablePage,
    GenericScalesBox,
    GenericFileUpload,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      // ================
      actionUrl: null,
      topFilterData: [],
      tableHead: {},
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      leftMap: {},
      rightMap: {},
      selectData: {},
      allSelectAndInputValue: {},
    }
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
    // function
    this.createDataFiltering()
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

    // get select and input value
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Page Request
    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/user/usersAjaxLoad`, {
          searchForm: {
            keyword: this.allSelectAndInputValue?.keyword ?? '',
          },
          pagingForm: {
            pageSize: this.pageSize_value,
            currentPage: 1,
            pageCount: 14,
            total: 328,
          },
        })
        .then(({ data }) => {
          this.actionUrl = data?.actionUrl
          this.leftMap = data?.leftMap
          this.rightMap = data?.rightMap
          this.tableHead = data?.rightMap
          this.selectData = data
          data?.resultPersonList?.length
            ? (this.isThereBody = true)
            : (this.isThereBody = false)
          // function
          this.getTableBody(data?.resultPersonList)
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table action Start
    getTableBody(bodyData) {
      for (const obj of bodyData) {
        const newObj = {}
        for (const key in this.tableHead) {
          const keyCode = this.tableHead[key]?.code
          if (keyCode in obj) {
            if (typeof obj[keyCode] === 'object')
              newObj[keyCode] = obj[keyCode]?.value
            else newObj[keyCode] = obj[keyCode]
          }
        }
        this.tableBody.push(newObj)
      }
      this.tableHeadLength = Object.keys(this.tableHead).length + 1
      this.tableBody.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)
    },
    // Generic Table action End

    // page yuqorisidagi filterlar uchun data yaratish
    createDataFiltering() {
      const data = [
        {
          width: '200',
          name: 'Company Branch',
          subName: 'companyBranchId',
          selectName: 'companyList',
          type: 'select',
        },
        {
          width: '200',
          name: 'Department Name',
          subName: 'DepartmentId',
          selectName: 'departmentList',
          type: 'select',
        },
        {
          width: '200',
          name: 'Sub Department Name',
          subName: 'subDepartmentName',
          selectName: 'subDepartmentList',
          type: 'select',
        },
        {
          width: '200',
          name: 'Position',
          subName: 'positionId',
          selectName: 'positionList',
          type: 'select',
        },
        {
          width: '200',
          name: 'Gender',
          subName: 'genderId',
          selectName: 'genderList',
          type: 'select',
        },
        {
          width: '100',
          name: 'Status',
          subName: 'statusId',
          selectName: 'statusList',
          type: 'select',
        },
        {
          width: '100',
          name: 'Type',
          subName: 'typeId',
          selectName: 'userTypeList',
          type: 'select',
        },
        {
          width: '100',
          name: 'Official',
          subName: 'officialId',
          selectName: 'userOfficialTypeList',
          type: 'select',
        },
        {
          width: '200',
          name: 'Country List',
          subName: 'countryListId',
          selectName: 'countryList',
          type: 'select',
        },
        {
          width: '100',
          name: 'Age',
          type: 'number',
          multiply: true,
          list: [{ subName: 'age1' }, { subName: 'age2' }],
        },
      ]
      this.topFilterData = data
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
