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
              btnType === 'view'
                ? 'View PRODUCT TRANSFER CODE'
                : btnType === 'edit'
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
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input
                  :value="
                    editData?.[element.subName]
                      ? editData?.[element.subName]
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
                v-else-if="element.type === 'number'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input
                  :value="`${
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : ''
                  }`"
                  width="300"
                  type="number"
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
                  defvalue="USA Dollor"
                  :options-data="currencyData"
                  :disabled="element.disabled"
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
                  :default-value="
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : false
                  "
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
              @click="goBackAction"
            />
            <generic-button
              v-if="btnType !== 'view'"
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
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      btnType: '',
      pageID: null,
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      radio: null,
      currencyData: [],
    }
  },

  // WATCH
  watch: {
    pageID(newVal) {
      this.btnTypeSpecifyingAction()
    },
    radio(newVal) {
      if (newVal === 'enabled') this.allInputAndLookUpValue.active = true
      else if (newVal === 'disabled') this.allInputAndLookUpValue.active = false
      else this.allInputAndLookUpValue.active = false
    },
  },

  // CREATED
  created() {
    this.btnType = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.type
    // page ID sini olish
    this.pageID = this.$route.params?.id
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

    // go back action
    goBackAction() {
      localStorage.removeItem('allTrueAndFalseData')
      this.$router.push('/producttransfercodes.htm')
    },

    // Specifying the buttun type action
    btnTypeSpecifyingAction() {
      if (!this.pageID) {
        localStorage.removeItem('allTrueAndFalseData')
      }
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Batch Process Name',
          subName: 'name',
          type: 'text',
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Code',
          subName: 'code',
          type: 'text',
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Currency',
          subName: 'currency',
          type: 'select',
          show: this.btnType === 'edit',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Price',
          subName: 'price',
          type: 'number',
          show: this.btnType === 'edit',
          disabled: this.btnType === 'view',
        },
        {
          name: 'Save name',
          subName: 'savename',
          type: 'checkbox',
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Status',
          subName: 'enabled',
          type: 'radio',
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Status',
          subName: 'disabled',
          type: 'radio',
          show: true,
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
          .post(`/batchProcess/prepareBatchProcessViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { design } }) => {
            this.isLoading = !this.isLoading
            this.editData = design
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.btnType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/batchProcess/prepareBatchProcessAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { batchProcess, currencyList } }) => {
            this.isLoading = !this.isLoading
            this.editData = batchProcess
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

    // Save Changes action
    saveAction() {
      let body = {}
      let batchProcess = {}
      if (this.pageID && this.btnType === 'edit') {
        batchProcess = {
          id: this.pageID,
          name: this.allInputAndLookUpValue?.name || this.editData.name || '',
          savename:
            this.allInputAndLookUpValue?.savename ||
            this.editData.savename ||
            '',
          code: this.allInputAndLookUpValue?.code || this.editData.code || '',
          active:
            this.allInputAndLookUpValue?.active || this.editData.active || '',
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
        page_size: this.pageSize_value,
        page_current: 1,
        rightData: '',
        batchProcess,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/batchProcess/${this.pageID ? 'editBatchProcess' : 'addBatchProcess'}`,
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
