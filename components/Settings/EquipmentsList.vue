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
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            EQUIPMENT LIST
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
        <div class="flex items-center gap-2 m-2">
          <generic-button
            name="Add New Internal"
            type="primary"
            icon-name-attribute="circle-plus-outline"
            @click="
              $router.push({
                path: '/prepareEquipment.htm',
                query: { page_type: 'create' },
              })
            "
          />
          <generic-button
            name="Add New External"
            type="primary"
            icon-name-attribute="circle-plus-outline"
            @click="
              $router.push({
                path: '/prepareEquipmentExternal.htm',
                query: { page_type: 'create' },
              })
            "
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
                v-model="keywordValue"
                placeholder="Search..."
                @enter="getTableRequest"
                @input="getInputValue"
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
            open-url="prepareEquipment"
            :productions-action-buttons="true"
            delete-row-url="equipment/prepareEquipmentSevicesDelete"
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
import GenericTablePage from '@components/GenericTable/GenericTablePage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericTablePage,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      keywordValue: '',
      tableHead: {
        id: { name: 'Id', code: 'id' },
        name: {
          name: 'Equipment Name',
          code: 'name',
        },
        code: {
          name: 'Code Equipment',
          code: 'code',
        },
        ecode: {
          name: 'Equipment ecode',
          code: 'ecode',
        },
        departmentName: {
          name: 'Department',
          code: 'departmentName',
        },
        equipmentIsInternalOrExternal: {
          name: 'Equipment Is Internal Or External',
          code: 'equipmentIsInternalOrExternal',
        },
        ipAddress: {
          name: 'Ip Address',
          code: 'ipAddress',
        },
        onlyOneStart: {
          name: 'Only One Start',
          code: 'onlyOneStart',
        },
        volume: {
          name: 'Volume',
          code: 'volume',
        },
        ratio: {
          name: 'Ratio',
          code: 'ratio',
        },
        active: {
          name: 'Status',
          code: 'active',
        },
        calendar: {
          name: 'Calendar',
          code: 'calendar',
        },
      },
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      isOpenTable: true,
      isCloseTable: true,
    }
  },

  // MOUNTED
  mounted() {
    this.tableHeadLength = Object.keys(this.tableHead).length + 1
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/equipment/equipmentServicesList`, {
          searchForm: {
            keyword: this.keywordValue,
          },
          pagingForm: {
            pageSize: this.pageSize_value,
            currentPage: 1,
            pageCount: 14,
            total: 328,
          },
        })
        .then(({ data: { equipmentList } }) => {
          this.isLoading = !this.isLoading
          this.tableBody = equipmentList

          this.tableBody.length
            ? (this.isThereBody = true)
            : (this.isThereBody = false)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic_Input value
    getInputValue(inputVal) {
      this.keywordValue = inputVal
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
  },
}
</script>
