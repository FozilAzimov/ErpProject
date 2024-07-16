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
                ? 'VIEW DESIGN'
                : btnType === 'edit'
                ? 'EDIT DESIGN'
                : 'ADD DESIGN'
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
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </span>
                <generic-input
                  :value="
                    editData?.[element.defValName]
                      ? editData?.[element.defValName]
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
                <look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="
                    currencyList?.[0]?.name ? currencyList?.[0]?.name : ''
                  "
                  :options-data="currencyList"
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
              @click="goBackAction"
            />
            <generic-button
              v-if="!(btnType === 'view')"
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
import GenericInput from '@components/Input/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
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
      currencyList: [],
    }
  },

  // WATCH
  watch: {
    pageID(newVal) {
      this.btnTypeSpecifyingAction()
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

    // go back action
    goBackAction() {
      localStorage.removeItem('allTrueAndFalseData')
      this.$router.push('/colorDepth.htm')
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
          name: 'Color Depth Name',
          subName: 'name',
          defValName: 'name',
          type: 'text',
          required: true,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Currency',
          subName: 'currencyId',
          defValName: 'currencyName',
          type: 'select',
          required: false,
          show: this.btnType === 'edit',
        },

        {
          name: 'Price',
          subName: 'price',
          defValName: 'price',
          type: 'text',
          required: false,
          show: this.btnType === 'edit',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.btnType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/colorDepth/prepareColorDepthViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { color } }) => {
            this.isLoading = !this.isLoading
            this.editData = color
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.btnType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/colorDepth/prepareColorDepthAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { currencyList, color } }) => {
            this.isLoading = !this.isLoading
            this.editData = color
            this.pageID = color?.id
            this.currencyList = currencyList
            this.allInputAndLookUpValue.currencyId = currencyList?.[0]?.id
            this.allInputAndLookUpValue.name = color?.name
            this.allInputAndLookUpValue.price = color?.price
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
      if (this.allInputAndLookUpValue.name) {
        const color = {}
        if (this.btnType === 'edit') {
          color.id = this.pageID || ''
          color.name = this.allInputAndLookUpValue?.name || ''
          color.currency = { id: this.allInputAndLookUpValue?.currencyId || '' }
          color.price = this.allInputAndLookUpValue?.price || ''
        } else {
          color.name = this.allInputAndLookUpValue?.name || ''
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/colorDepth/${
              this.btnType === 'edit' ? 'editColorDepth' : 'addColorDepth'
            }`,
            {
              color,
            }
          )
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.$router.push('/colorDepth.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
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
