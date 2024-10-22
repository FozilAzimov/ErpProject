<template>
  <div class="w-full p-1 mb-5">
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
            {{
              pageType === 'view'
                ? 'View PRODUCT CATEGORY'
                : pageType === 'edit'
                ? 'Edit PRODUCT CATEGORY'
                : 'Add PRODUCT CATEGORY'
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
        <div class="flex items-start gap-10">
          <div class="w-fit flex flex-col items-start m-2 gap-1">
            <div v-for="(element, index) in elementData" :key="index">
              <template v-if="element.show">
                <span
                  v-if="element.type === 'text' || element.type === 'number'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <generic-input
                    value=""
                    width="300"
                    :type="element.type"
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
                    defvalue=""
                    :options-data="selectData?.[element?.selectName]"
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
                    :default-value="false"
                    :border="true"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </span>
                <span
                  v-else-if="element.type === 'radio'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-radio
                    v-for="(elem, inx) in element?.list"
                    :key="inx"
                    v-model="radio"
                    :disabled="element.disabled"
                    :label="elem.subName"
                  ></el-radio>
                </span>
                <span
                  v-else-if="element.type === 'radio2'"
                  class="flex flex-col items-start mb-1"
                >
                  <span class="text-[13px]">{{ element.name }}</span>
                  <el-radio
                    v-for="(elem, inx) in element?.list"
                    :key="inx"
                    v-model="radio2"
                    :disabled="element.disabled"
                    :label="elem.subName"
                  ></el-radio>
                </span>
              </template>
            </div>
            <div class="flex items-center gap-3 mt-3">
              <generic-button
                name="Go Back"
                type="primary"
                icon-name-attribute="arrow-left"
                @click="$router.push('/productcategories.htm')"
              />
              <generic-button
                v-if="pageType !== 'view'"
                :name="pageType === 'edit' ? 'Save changes' : 'Save'"
                :type="pageType === 'edit' ? 'success' : 'primary'"
                :icon-name-attribute="pageType === 'edit' ? 'edit' : ''"
                @click="saveAction"
              />
            </div>
          </div>
          <div>
            <generic-carry-draggable
              v-if="characteristicNoSelect?.length"
              :lyaut-one-data="characteristicNoSelect"
              @customEmitFunction="lyautEmitAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import Draggable from 'vuedraggable'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericCarryDraggable from '@generics/GenericCarryDraggable.vue'
export default {
  components: {
    // Draggable,
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
    GenericCarryDraggable,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      pageType: '',
      pageID: null,
      allInputAndLookUpValue: {},
      elementData: [],
      radio: 'Enabled',
      radio2: 'Auto',
      selectData: {},
      // carry Draggable
      characteristicNoSelect: [],
      leftData: [],
      rightData: [],
      // carry Draggable
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      if (newVal === 'Enabled') this.allInputAndLookUpValue.active = true
      else if (newVal === 'Disabled') this.allInputAndLookUpValue.active = false
      else this.allInputAndLookUpValue.active = false
    },
    radio2(newVal) {
      if (newVal === 'Auto') this.allInputAndLookUpValue.generatedValue = 1
      else if (newVal === 'Manual')
        this.allInputAndLookUpValue.generatedValue = 2
      else if (newVal === 'Group')
        this.allInputAndLookUpValue.generatedValue = 3
      else this.allInputAndLookUpValue.generatedValue = 1
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
    // radio def value
    this.allInputAndLookUpValue.active = true
    this.allInputAndLookUpValue.generatedValue = 1
    // radio def value
  },

  // Methods
  methods: {
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
          .post(`/productCategory/prepareProductCategoryView`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { design } }) => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productCategory/prepareProductCategoryView`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                characteristicNoSelect,
                dyingReciepeCalculationTypeModuleList,
                productCategoryTypeModuleList,
              },
            }) => {
              this.selectData.dyingReciepeCalculationTypeModuleList =
                dyingReciepeCalculationTypeModuleList
              this.selectData.productCategoryTypeModuleList =
                productCategoryTypeModuleList
              // carry data set
              this.$set(this, 'characteristicNoSelect', [
                ...this.characteristicNoSelect,
                ...characteristicNoSelect,
              ])
              // batchProcess.active
              //   ? (this.radio = 'enabled')
              //   : (this.radio = 'disabled')
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
          .post(`/productCategory/prepareProductCategory`, {
            page_current: 1,
            page_size: 25,
          })
          .then(
            ({
              data: {
                characteristicNoSelect,
                dyingReciepeCalculationTypeModuleList,
                productCategoryTypeModuleList,
              },
            }) => {
              this.selectData.dyingReciepeCalculationTypeModuleList =
                dyingReciepeCalculationTypeModuleList
              this.selectData.productCategoryTypeModuleList =
                productCategoryTypeModuleList
              // carry data set
              this.$set(this, 'characteristicNoSelect', [
                ...this.characteristicNoSelect,
                ...characteristicNoSelect,
              ])
              this.isLoading = !this.isLoading
            }
          )
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Input and select value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // Save Changes action
    saveAction() {
      let body = {}
      let productCategory = {}
      if (this.pageID && this.pageType === 'edit') {
        productCategory = {
          id: this.pageID,
        }
      } else {
        productCategory = {
          name: this.allInputAndLookUpValue?.name ?? '',
          kgQtyId: this.allInputAndLookUpValue?.kgQtyId ?? '',
          kgBrutQtyId: this.allInputAndLookUpValue?.kgBrutQtyId ?? '',
          litresQtyId: this.allInputAndLookUpValue?.litresQtyId ?? '',
          meterQtyId: this.allInputAndLookUpValue?.meterQtyId ?? '',
          qtyQtyId: this.allInputAndLookUpValue?.qtyQtyId ?? '',
          nameLan2: this.allInputAndLookUpValue?.nameLan2 ?? '',
          nameLan3: this.allInputAndLookUpValue?.nameLan3 ?? '',
          code: this.allInputAndLookUpValue?.code ?? '',
          qtyLimit: this.allInputAndLookUpValue?.qtyLimit ?? '',
          active: this.allInputAndLookUpValue?.active ?? false,
          generatedValue: this.allInputAndLookUpValue?.generatedValue ?? 1,
          articleManufacturerUnique:
            this.allInputAndLookUpValue?.articleManufacturerUnique ?? false,
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        productCategoryTypeId:
          this.allInputAndLookUpValue?.productCategoryTypeName ??
          this.viewEditData?.productCategoryTypeId ??
          '',
        dyingReciepeCalculationTypeModuleId:
          this.allInputAndLookUpValue?.dyingReciepeCalculationTypeModuleName ??
          this.viewEditData?.dyingReciepeCalculationTypeModuleId ??
          '',
        leftDiv: this.leftData,
        rightDiv: this.rightData,
        umAndPL: '',
        productCategory,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/productCategory/${
          this.pageID ? 'editProductCategory' : 'addProductCategory'
        }`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/productcategories.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // lyauts Emit action
    lyautEmitAction(leftData, rightData) {
      this.leftData = this.filteredAction(leftData)
      this.rightData = this.filteredAction(rightData)
    },

    // Filter action
    filteredAction(list) {
      let str = ''
      list.forEach(({ id }) => {
        str += `${id},`
      })
      return str.slice(0, -1)
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Product Category Name (ru)',
          subName: 'name',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'default.kgId',
          subName: 'kgQtyId',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'default.kgBrutQtyId',
          subName: 'kgBrutQtyId',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'default.litreID',
          subName: 'litresQtyId',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'default.meterId',
          subName: 'meterQtyId',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'default.qtyId',
          subName: 'qtyQtyId',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Category Name ()',
          subName: 'nameLan2',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Category Name ()',
          subName: 'nameLan3',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Code',
          subName: 'code',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Limit',
          subName: 'qtyLimit',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'ProductCategory type',
          subName: 'productCategoryTypeName',
          selectName: 'productCategoryTypeModuleList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Dying Reciepe Calculation Type Module',
          subName: 'dyingReciepeCalculationTypeModuleName',
          selectName: 'dyingReciepeCalculationTypeModuleList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          type: 'radio',
          list: [
            { radioName: this.radio, subName: 'Enabled' },
            { radioName: this.radio, subName: 'Disabled' },
          ],
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Generated',
          type: 'radio2',
          list: [
            { subName: 'Auto' },
            { subName: 'Manual' },
            { subName: 'Group' },
          ],
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Article Manufacturer Unique',
          subName: 'articleManufacturerUnique',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },
  },
}
</script>
