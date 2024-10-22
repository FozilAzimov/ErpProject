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
                ? 'View PRODUCT TRANSFER CODE'
                : pageType === 'edit'
                ? 'Edit PRODUCT TRANSFER CODE'
                : 'Add PRODUCT TRANSFER CODE'
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
          <div v-for="(element, index) in elementData" :key="index">
            <template v-if="element.show">
              <span
                v-if="element.type === 'text'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span
                    v-if="element?.required"
                    class="text-[16px] text-red-500"
                    >*</span
                  >
                </span>
                <generic-input
                  :value="
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
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
                  :defvalue="viewEditData?.[element?.subName]"
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
              @click="$router.push('/producttransfercodes.htm')"
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
  // COMPONENTS
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
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      radio: 'Enabled',
      selectData: {},
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
          .post(`/productTransferCode/prepareProductTransferCode`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { productTransferCode } }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = productTransferCode
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productTransferCode/prepareProductTransferCode`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { transferCodeTypeList, productTransferCode } }) => {
            this.viewEditData = productTransferCode
            this.selectData.transferCodeTypeList = transferCodeTypeList
            productTransferCode.active
              ? (this.radio = 'Enabled')
              : (this.radio = 'Disabled')
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productTransferCode/prepareProductTransferCode`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { transferCodeTypeList } }) => {
            this.selectData.transferCodeTypeList = transferCodeTypeList
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
      if (this.allInputAndLookUpValue?.name || this.viewEditData?.name) {
        let body = {}
        if (this.pageID && this.pageType === 'edit') {
          body = {
            id: this.pageID,
            page_size: this.pageSize_value,
            page_current: 1,
            transfer_id:
              this.allInputAndLookUpValue?.transferCodeTypeName ??
              this.viewEditData?.transferCodeTypeName ??
              '',
            name:
              this.allInputAndLookUpValue?.name ??
              this.viewEditData?.transferCodeTypeName ??
              '',
            active:
              this.allInputAndLookUpValue?.active ??
              this.viewEditData?.active ??
              false,
          }
        } else {
          body = {
            page_size: this.pageSize_value,
            page_current: 1,
            transfer_id:
              this.allInputAndLookUpValue?.transferCodeTypeName ?? '',
            name: this.allInputAndLookUpValue?.name ?? '',
            active: this.allInputAndLookUpValue?.active ?? false,
          }
        }

        this.isLoading = !this.isLoading
        const method = this.pageID ? 'put' : 'post'
        this.$axios[method](
          `/productTransferCode/${
            this.pageID ? 'editProductTransferCode' : 'addProductTransferCode'
          }`,
          body
        )
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/producttransfercodes.htm')
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
          name: 'Transfer Code',
          subName: 'transferCodeTypeName',
          selectName: 'transferCodeTypeList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Transfer Code',
          subName: 'name',
          type: 'text',
          show: true,
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
