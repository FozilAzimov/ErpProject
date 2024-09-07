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
        class="flex items-start gap-5 border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
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
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element.required" class="text-[18px] text-red-600"
                  >*</span
                ></span
              >
              <generic-input
                :value="
                  viewEditData?.[element?.subName]
                    ? viewEditData?.[element?.subName]
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
                  @change="getInputAndLookUpValueAction"
                  >Enabled</el-radio
                >
                <el-radio
                  v-model="radio"
                  label="disabled"
                  border
                  size="mini"
                  :disabled="element.disabled"
                  @change="getInputAndLookUpValueAction"
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
              @click="$router.push('/productproductiontypes.htm')"
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
        <generic-transfer
          v-if="pageType !== 'view'"
          ref="transferRef"
          class="mt-5"
          :left-data="transferLeftData"
          :right-data="transferRightData"
          @customFunction="getTransferLeftRightData"
        />
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericTransfer from '@generics/GenericTransfer.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericTransfer,
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
      radio: 'enabled',
      transferLeftData: [],
      transferRightData: [],
      planningTypeLeft: [],
      planningTypeRight: [],
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      newVal === 'enabled'
        ? (this.allInputAndLookUpValue.active = true)
        : (this.allInputAndLookUpValue.active = false)
    },
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
    this.allInputAndLookUpValue.active = true
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
          name: 'Product Production',
          subName: 'name',
          type: 'text',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          subName: 'status',
          type: 'radio',
          required: false,
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
          .post(`/productionType/prepareProductProductionTypeViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { productProductionType } }) => {
            this.viewEditData = productProductionType
            this.radio = productProductionType?.active ? 'enabled' : 'disabled'
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageID && this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productionType/prepareProductProductionTypeAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                planingTypeLeft,
                planingTypeRight,
                productProductionType,
              },
            }) => {
              this.transferLeftData = planingTypeLeft
              this.transferRightData = planingTypeRight
              this.viewEditData = productProductionType
              this.isLoading = !this.isLoading
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productionType/prepareProductProductionTypeAjaxLoad`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { planingTypeLeft } }) => {
            this.transferLeftData = planingTypeLeft
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

    // SAVE and Changes action
    saveAction() {
      if (this.allInputAndLookUpValue?.name || this.viewEditData?.name) {
        // Transfer da ishlab beradigan function
        this.$refs.transferRef.refTransferAction()

        const body = {}
        if (this.pageType === 'edit') {
          body.id = this.pageID || ''
          body.confirmed = this.allInputAndLookUpValue?.confirmed || ''
          body.name = this.allInputAndLookUpValue?.name || ''
          body.code = this.allInputAndLookUpValue?.code || ''
          body.planningTypeId =
            this.allInputAndLookUpValue?.planningTypeId || ''
        } else {
          const productProductionType = {}
          productProductionType.name = this.allInputAndLookUpValue?.name ?? ''
          productProductionType.active =
            this.allInputAndLookUpValue?.active ?? false
          body.productProductionType = productProductionType
          body.planningTypeLeft = this.planningTypeLeft
          body.planningTypeRight = this.planningTypeRight
        }

        this.isLoading = !this.isLoading
        this.$axios[this.pageID ? 'put' : 'post'](
          `/productionType/${
            this.pageID
              ? 'editProductproductiontype'
              : 'addProductproductiontype'
          }`,
          body
        )
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/productproductiontypes.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Emit Transfer function
    getTransferLeftRightData(leftPropData, rightID) {
      const removeMatchingObjects = (array1, array2) =>
        array1.filter((obj) => !array2.includes(obj.id))
      const updatedArray = removeMatchingObjects(leftPropData, rightID)
      const leftID = []
      updatedArray.forEach(({ id }) => {
        leftID.push(id)
      })
      this.planningTypeLeft = leftID
      this.planningTypeRight = rightID
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
