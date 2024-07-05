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
          <img
            src="../../assets/icons/user-black.png"
            alt="user"
            class="w-[14px]"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              btnType === 'view'
                ? 'View Design'
                : btnType === 'edit'
                ? 'Edit Design'
                : 'Add Design'
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
              <img
                class="w-[11px]"
                src="../../assets/icons/gear.png"
                alt="gear"
              />
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
                src="../../assets/icons/arrow.png"
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
                src="../../assets/icons/remove.png"
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
          <div
            class="max-w-[700px] flex gap-x-[10px] justify-between items-center flex-wrap"
          >
            <div v-for="(element, index) in elementData" :key="index">
              <template v-if="element.show">
                <span
                  v-if="element.type === 'select'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]"
                    >{{ element.name }}
                    <span
                      v-if="element.required"
                      class="text-[18px] text-red-600"
                      >*</span
                    ></span
                  >
                  <look-up
                    dwidth="300"
                    :name="element.subName"
                    :defvalue="
                      editData?.[element.defValName]?.text
                        ? editData?.[element.defValName]?.text
                        : ''
                    "
                    :options-data="
                      element.subName === 'designName'
                        ? allSelectData.name
                        : element.subName === 'colorDepth'
                        ? allSelectData.colorDepth
                        : element.subName === 'productType'
                        ? allSelectData.productType
                        : element.subName === 'product'
                        ? allSelectData.product
                        : element.subName === 'colorGroup'
                        ? allSelectData.colorGroup
                        : element.subName === 'batchProcessStage'
                        ? allSelectData.batchProcessStage
                        : element.subName === 'designVariantType'
                        ? allSelectData.designVariantType
                        : []
                    "
                    :disabled="element.disabled"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </span>
                <span
                  v-else-if="
                    element.type === 'text' || element.type === 'textarea'
                  "
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]"
                    >{{ element.name }}
                    <span
                      v-if="element.required"
                      class="text-[18px] text-red-600"
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
                    :type="element.type"
                    :name="element.subName"
                    :disabled="element.disabled"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </span>
              </template>
            </div>
          </div>
          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              pl="8"
              pt="3"
              pr="8"
              pb="3"
              bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
              textsize="13"
              :url="img.goBack"
              :istherepicture="true"
              @click="goBackAction"
            />
            <generic-button
              v-if="!(btnType === 'view')"
              :name="btnType === 'edit' ? 'Save changes' : 'Save'"
              pl="8"
              pt="3"
              pr="8"
              pb="3"
              bg="rgba(54, 155, 215, 0.8)"
              textsize="13"
              @click="saveAction(btnType)"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Icons url
import goBack from '../../assets/icons/go-back.png'
// Components
import GenericButton from '../Button/GenericButton.vue'
import GenericInput from '../Input/GenericInput.vue'
import LoadingPage from '../Loading/LoadingPage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
  },
  data() {
    return {
      img: {
        goBack,
      },
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      btnType: '',
      rowID: null,
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      allSelectData: {
        name: [],
        colorDepth: [],
        productType: [],
        product: [],
        colorGroup: [],
        batchProcessStage: [],
        designVariantType: [],
      },
    }
  },

  mounted() {
    this.btnType = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.type
    this.rowID = JSON.parse(localStorage.getItem('allTrueAndFalseData'))?.id

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
      this.$router.push('/designVariants.htm')
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Design Name',
          subName: 'designName',
          defValName: 'designName',
          type: 'select',
          required: true,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Design Variant Name',
          subName: 'designVariantName',
          defValName: 'designVariantName',
          type: 'text',
          required: true,
          show: true,
          disabled: this.btnType === 'view',
        },
        {
          name: 'Name',
          subName: 'name',
          defValName: 'name',
          type: 'text',
          required: true,
          show: this.btnType !== 'view',
        },
        {
          name: 'Color Depth',
          subName: 'colorDepth',
          defValName: 'colorDepth',
          type: 'select',
          required: false,
          show: this.btnType !== 'view',
        },
        {
          name: 'Product Type',
          subName: 'productType',
          defValName: 'productType',
          type: 'select',
          required: false,
          show: this.btnType !== 'view',
        },
        {
          name: 'Product',
          subName: 'product',
          defValName: 'product',
          type: 'select',
          required: false,
          show: this.btnType !== 'view',
        },
        {
          name: 'Color Group',
          subName: 'colorGroup',
          defValName: 'colorGroup',
          type: 'select',
          required: false,
          show: this.btnType !== 'view',
        },
        {
          name: 'Batch Process Stage',
          subName: 'batchProcessStage',
          defValName: 'batchProcessStage',
          type: 'select',
          required: true,
          show: this.btnType !== 'view',
        },
        {
          name: 'Design Variant Type',
          subName: 'designVariantType',
          defValName: 'designVariantType',
          type: 'select',
          required: true,
          show: this.btnType !== 'view',
        },
        {
          name: 'Note',
          subName: 'note',
          defValName: 'note',
          type: 'textarea',
          required: false,
          show: this.btnType !== 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.btnType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/design/prepareDesignViewAjaxLoad`, {
            id: this.rowID,
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
          .post(`/design/prepareDesignAjaxLoad`, {
            id: this.rowID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { designJson } }) => {
            this.isLoading = !this.isLoading
            this.editData = JSON.parse(designJson)
            this.allInputAndLookUpValue.planningTypeId =
              this.editData?.planningtype?.id || ''
            this.allInputAndLookUpValue.code = this.editData?.code || ''
            this.allInputAndLookUpValue.name = this.editData?.name || ''
            this.rowID = this.editData?.id
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/designVariant/prepareDesignVariantAjaxLoad`, {
            id: this.rowID,
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                designList,
                colorDepthList,
                productTypeList,
                productList,
                colorGroupList,
                batchProcessStageList,
                colorVariantTypeList,
              },
            }) => {
              this.isLoading = !this.isLoading
              this.allSelectData.name = designList
              this.allSelectData.colorDepth = colorDepthList
              this.allSelectData.productType = productTypeList
              this.allSelectData.product = productList
              this.allSelectData.colorGroup = colorGroupList
              this.allSelectData.batchProcessStage = batchProcessStageList
              this.allSelectData.designVariantType = colorVariantTypeList
            }
          )
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
      if (
        this.allInputAndLookUpValue.designName &&
        this.allInputAndLookUpValue.name &&
        this.allInputAndLookUpValue.designVariantType &&
        this.allInputAndLookUpValue.designVariantName &&
        this.allInputAndLookUpValue.batchProcessStage
      ) {
        const body = {}
        if (this.btnType === 'edit') {
          body.id = this.rowID || ''
          body.confirmed = this.allInputAndLookUpValue?.confirmed || ''
          body.name = this.allInputAndLookUpValue?.name || ''
          body.code = this.allInputAndLookUpValue?.code || ''
          body.planningTypeId =
            this.allInputAndLookUpValue?.planningTypeId || ''
        } else {
          const designVariant = {}
          const colorVariant = {}
          designVariant.design = { id: this.allInputAndLookUpValue?.designName }
          designVariant.name = this.allInputAndLookUpValue?.designVariantName
          colorVariant.name = this.allInputAndLookUpValue?.name
          colorVariant.colorDepth = {
            id: this.allInputAndLookUpValue?.colorDepth,
          }
          colorVariant.productType = {
            id: this.allInputAndLookUpValue?.productType,
          }
          colorVariant.product = {
            id: this.allInputAndLookUpValue?.product,
          }
          colorVariant.colorGroup = {
            id: this.allInputAndLookUpValue?.colorGroup,
          }
          colorVariant.batchProcessStage = {
            id: this.allInputAndLookUpValue?.batchProcessStage,
          }
          colorVariant.colorVariantType = {
            id: this.allInputAndLookUpValue?.designVariantType,
          }
          colorVariant.note = this.allInputAndLookUpValue?.note

          body.designVariant = designVariant
          body.colorVariant = colorVariant
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/designVariant/addDesignVariant`, body)
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.$router.push('/designVariants.htm')
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
