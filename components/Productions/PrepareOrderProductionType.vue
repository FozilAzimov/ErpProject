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
                ? 'VIEW CHARACTERISTIC'
                : pageType === 'edit'
                ? 'Editing of sew model variant size'
                : 'Addition of sew model variant size'
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
            <span
              v-if="element.type === 'text'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]">{{ element.name }}</span>
              <generic-input
                :value="viewEditData?.[element?.subName]"
                width="300"
                type="text"
                :name="element.subName"
                :disabled="element.disabled"
                @customFunction="getInputValueAction"
              />
            </span>
            <span
              v-else-if="element.type === 'radio'"
              class="flex flex-col items-start mb-1"
            >
              <span class="text-[13px]">{{ element.name }}</span>
              <span class="flex items-center">
                <el-radio
                  v-model="radio"
                  label="enabled"
                  border
                  size="mini"
                  :disabled="element.disabled"
                  >Enabled</el-radio
                >
                <el-radio
                  v-model="radio"
                  label="disabled"
                  border
                  size="mini"
                  :disabled="element.disabled"
                  >Disabled</el-radio
                >
              </span>
            </span>
          </div>
          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/orderproductiontypes.htm')"
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
      pageSize_value: 10,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      elementData: [],
      viewEditData: {},
      allInputAndRadioValues: {},
      radio: 'enabled',
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      if (newVal === 'enabled') this.allInputAndRadioValues.active = true
      else if (newVal === 'disabled') this.allInputAndRadioValues.active = false
      else this.allInputAndRadioValues.active = false
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

    // Input value action
    getInputValueAction(name, value) {
      this.$set(this.allInputAndRadioValues, name, value)
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Order Production Type',
          subName: 'name',
          type: 'text',
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          subName: 'active',
          type: 'radio',
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.pageID && this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/orderProductionType/prepareOrderProductionTypeViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { orderProductionType } }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = orderProductionType
            orderProductionType?.active
              ? (this.radio = 'enabled')
              : (this.radio = 'disabled')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageID && this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/orderProductionType/prepareOrderProductionTypeAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { orderProductionType } }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = orderProductionType
            orderProductionType?.active
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

    // Save Changes action
    saveAction() {
      const orderProductionType = {}
      if (this.pageID) {
        orderProductionType.id = this.pageID || ''
        orderProductionType.name =
          this.allInputAndRadioValues?.name ?? this.viewEditData?.name ?? ''
        orderProductionType.active =
          this.allInputAndRadioValues?.active ?? this.viewEditData?.active
      } else {
        orderProductionType.name = this.allInputAndRadioValues?.name || ''
        orderProductionType.active =
          this.allInputAndRadioValues?.active || false
      }

      this.isLoading = !this.isLoading
      this.$axios[this.pageID ? 'put' : 'post'](
        `/orderProductionType/${
          this.pageID ? 'editOrderProductionType' : 'addOrderproductiontype'
        }`,
        { orderProductionType }
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/orderproductiontypes.htm')
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
