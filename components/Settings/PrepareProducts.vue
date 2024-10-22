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
            {{
              pageType === 'view'
                ? 'View Product'
                : pageType === 'edit'
                ? 'Edit Product'
                : 'Add Product'
            }}
          </h1>
          <div class="flex items-center gap-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/products.htm')"
            />
            <generic-button
              v-if="pageType === 'create'"
              name="More Info"
              type="success"
              @click="isMoreInfoAction"
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] flex items-start"
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
                v-if="element.type === 'text' || element.type === 'number'"
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
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  ></span
                >
                <generic-look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="editData?.[element?.subName]"
                  :options-data="selectData?.[element?.selectName]"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <template v-else-if="element.type === 'checkbox'">
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
              </template>
              <span
                v-else-if="element.type === 'radio'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <el-radio
                  v-for="(elem, inx) in element?.list"
                  :key="inx"
                  v-model="radio"
                  :disabled="elem.disabled"
                  :label="elem.subName"
                ></el-radio>
              </span>
            </template>
          </div>
        </div>

        <div
          v-if="!isMoreInfo"
          class="w-fit flex flex-col items-start m-2 gap-1"
        >
          <div v-for="(element, index) in elementData2" :key="index">
            <template v-if="element.show">
              <span
                v-if="
                  element.type === 'text' ||
                  element.type === 'number' ||
                  element.type === 'textarea'
                "
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
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  ></span
                >
                <generic-look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="editData?.[element?.subName]"
                  :options-data="selectData?.[element?.selectName]"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <template v-else-if="element.type === 'checkbox'">
                <generic-check-box
                  :text="element?.name"
                  :name="element?.subName"
                  :disabled="element.disabled"
                  :border="true"
                  :default-value="
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : false
                  "
                  @customFunction="getInputAndLookUpValueAction"
                />
              </template>
              <span
                v-else-if="element.type === 'multiple'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <div class="flex items-center gap-2">
                  <generic-input
                    v-for="(elem, inx) in element?.list"
                    :key="inx"
                    :name="elem?.subName"
                    :type="elem?.type"
                    :width="elem?.width"
                    :value="`${
                      editData?.[element.subName]
                        ? editData?.[element.subName]
                        : ''
                    }`"
                  ></generic-input>
                </div>
              </span>
            </template>
          </div>
        </div>

        <div class="m-2">
          <template v-if="pageID && pageType === 'edit'">
            <div
              v-for="(obj, index) in resultJson"
              :key="index"
              class="flex flex-col justify-start mb-2"
            >
              <span class="text-[13px] whitespace-nowrap">{{ obj?.name }}</span>
              <generic-look-up
                dwidth="250"
                :name="obj?.name"
                :options-data="characteristicDetailsMap?.[obj?.name]"
                @customFunction="getInputAndLookUpValueAction"
              />
            </div>
          </template>
          <template v-else-if="pageType === 'create' && isCharacteristicLookUp">
            <generic-look-up
              dwidth="250"
              name="detailsId"
              durl="findAllCharacteristicDetails"
              :param="{
                characteristicId: 2,
              }"
              @customFunction="getInputAndLookUpValueAction"
            />
          </template>
        </div>
        <generic-transfer
          v-show="allInputAndLookUpValue?.productProductionType || pageID"
          ref="transferRef"
          class="mt-5"
          :left-data="transferLeft"
          :right-data="transferRight"
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
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericTransfer from '@generics/GenericTransfer.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
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
      selectData: {},
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      elementData2: [],
      radio: 'Enabled',
      currencyData: [],
      isMoreInfo: false,
      productsTypeLeft: [],
      productsTypeRight: [],
      characteristicDetailsMap: [],
      resultJson: [],
      isCharacteristicLookUp: false,
    }
  },

  // COMPUTED
  computed: {
    transferLeft() {
      return this.selectData?.planningTypeLeftModuleList?.map((obj) => {
        return {
          id: obj?.moduleId,
          name: obj?.moduleName,
        }
      })
    },
    transferRight() {
      return this.selectData?.planningTypeRightModuleList?.map((obj) => {
        return {
          id: obj?.moduleId,
          name: obj?.moduleName,
        }
      })
    },
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
    // radio default value
    this.allInputAndLookUpValue.active = true
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
      this.isLoading = !this.isLoading
      if (this.pageType === 'edit') {
        this.$axios
          .post(`/products/prepareProducts`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.selectData = data
            this.editData = data?.product
            this.resultJson = data?.resultJson
            this.characteristicDetailsMap = data?.characteristicDetailsMap
            data?.product?.active
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
        this.$axios
          .post(`/products/prepareAddProducts`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.selectData = data
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
      if (name === 'productProductionType' || name === 'categoryId')
        this.allSelectChangedAction(name, value)
    },

    // SAVE action body data
    requestBodyDataAction() {
      const product = {
        productProductionType: {
          id: this.allInputAndLookUpValue?.productProductionType ?? '',
        },
        unitMeasurement: {
          id: this.allInputAndLookUpValue?.unitMeasurement ?? 0,
        },
        barcode: this.allInputAndLookUpValue?.barcode ?? '',
        qtyLimit: this.allInputAndLookUpValue?.qtyLimit ?? 0,
        active: this.allInputAndLookUpValue?.active ?? true,
        name: this.allInputAndLookUpValue?.name ?? '',
        productNumber: this.allInputAndLookUpValue?.productNumber ?? '',
        unitPrice: this.allInputAndLookUpValue?.unitPrice ?? 0,
        price4: this.allInputAndLookUpValue?.price4 ?? 0,
        stockMaxAmount: this.allInputAndLookUpValue?.stockMaxAmount ?? 0,
        stockMinAmount: this.allInputAndLookUpValue?.stockMinAmount ?? 0,
        componentAmount: this.allInputAndLookUpValue?.componentAmount ?? '',
        description: this.allInputAndLookUpValue?.description ?? '',
        automaticSystemTransferType:
          this.allInputAndLookUpValue?.automaticSystemTransferType ?? 0,
        qtyOfOne: this.allInputAndLookUpValue?.qtyOfOne ?? 0,
        percentage: this.allInputAndLookUpValue?.percentage ?? 0,
        fixedAmount: this.allInputAndLookUpValue?.fixedAmount ?? 0,
        validityDay: this.allInputAndLookUpValue?.validityDay ?? 0,
        recommendedRangeOfUseFrom:
          this.allInputAndLookUpValue?.recommendedRangeOfUseFrom ?? 0,
        recommendedRangeOfUseTo:
          this.allInputAndLookUpValue?.recommendedRangeOfUseTo ?? 0,
        measurement3: { id: this.allInputAndLookUpValue?.measurement3 ?? '' },
        measurement2: { id: this.allInputAndLookUpValue?.measurement2 ?? '' },
      }
      const body = {
        detailsId: this.allInputAndLookUpValue?.detailsId ?? '',
        planningTypeRightArr:
          this.allInputAndLookUpValue?.planningTypeRight ?? '',
        categoryId: this.allInputAndLookUpValue?.categoryId ?? null,
        articleId: this.allInputAndLookUpValue?.articleId ?? null,
        manufacturerId: this.allInputAndLookUpValue?.manufacturerId ?? null,
        productTypeId: this.allInputAndLookUpValue?.productTypeId ?? null,
        productAnalogsId: this.allInputAndLookUpValue?.productAnalogsId ?? '',
        dyingReciepeCalculationTypeModuleId:
          this.allInputAndLookUpValue?.dyingReciepeCalculationTypeModuleId ?? 0,
        productTransferCodeId:
          this.allInputAndLookUpValue?.productTransferCodeId ?? null,
        barcodeGenType: this.allInputAndLookUpValue?.barcodeGenType ?? true,
        saleEcommerce: this.allInputAndLookUpValue?.saleEcommerce ?? true,
        prepack: this.allInputAndLookUpValue?.prepack ?? true,
        product,
        planningTypeLeft: this.planningTypeLeft,
        planningTypeRight: this.planningTypeRight,
      }
      return body
    },

    // select change action
    allSelectChangedAction(name, value) {
      if (name === 'categoryId') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/products/characteristicDetailsAction`,
            this.requestBodyDataAction()
          )
          .then(({ data: { characteristicDetailsMap, resultJson } }) => {
            // this.characteristicDetailsMap = characteristicDetailsMap
            // this.resultJson = resultJson
            value
              ? (this.isCharacteristicLookUp = true)
              : (this.isCharacteristicLookUp = false)
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // More Info action
    isMoreInfoAction() {
      this.isMoreInfo = !this.isMoreInfo
    },

    // Save Changes action
    saveAction() {
      if (
        this.allInputAndLookUpValue?.categoryId ||
        this.allEditData?.categoryId
      ) {
        // Transfer da ishlab beradigan function
        this.$refs.transferRef.refTransferAction()

        let body = {}
        if (this.pageID && this.pageType === 'edit') {
          this.requestBodyDataAction().id = this.pageID
          body = {
            page_size: this.pageSize_value,
            page_current: 1,
            ...this.requestBodyDataAction(),
          }
        } else {
          body = {
            page_size: this.pageSize_value,
            page_current: 1,
            ...this.requestBodyDataAction(),
          }
        }

        this.isLoading = !this.isLoading
        const method = this.pageID ? 'put' : 'post'
        this.$axios[method](
          `/products/${this.pageID ? 'editProducts' : 'addProducts'}`,
          body
        )
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/products.htm')
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
      this.productsTypeLeft = leftID
      this.productsTypeRight = rightID
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Product Production',
          subName: 'productProductionType',
          selectName: 'productProduction',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Category Name',
          subName: 'categoryId',
          selectName: 'productCategoryLsit',
          type: 'select',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Measurement',
          subName: 'unitMeasurement',
          selectName: 'unitMeasurements',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Article Name',
          subName: 'articleId',
          selectName: 'articleList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Manufacturer Name',
          subName: 'manufacturerId',
          selectName: 'manufacturerList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Barcode',
          subName: 'barcode',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Limit qty',
          subName: 'qtyLimit',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Type Name',
          subName: 'productTypeId',
          selectName: 'productTypeList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          type: 'radio',
          show: true,
          list: [
            { subName: 'Enabled', disabled: this.pageType === 'view' },
            { subName: 'Disabled', disabled: this.pageType === 'view' },
          ],
        },
      ]
      this.elementData = data

      const data2 = [
        {
          name: 'Product Analogs',
          subName: 'productAnalogsId',
          selectName: 'productAnalogsList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Name',
          subName: 'name',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Product Number',
          subName: 'productNumber',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Unit Price',
          subName: 'unitPrice',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Price4',
          subName: 'price4',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Stock Max Amount',
          subName: 'stockMaxAmount',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Stock Min Amount',
          subName: 'stockMinAmount',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Component Amount',
          subName: 'componentAmount',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Description',
          subName: 'description',
          type: 'textarea',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'AutoMaticSystemTransfertype',
          subName: 'automaticSystemTransferType',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Qty of one',
          subName: 'qtyOfOne',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Dying Reciepe Calculation Type Module',
          subName: 'dyingReciepeCalculationTypeModuleId',
          selectName: 'dyingReciepeCalculationTypeModuleList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Transfer Code',
          subName: 'productTransferCodeId',
          selectName: 'productTransferCodeList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Manual Barcode',
          subName: 'barcodeGenType',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Sale E-Commerce',
          subName: 'saleEcommerce',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Has Component',
          subName: 'hasComponent',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Percentage or Fixed Amount',
          type: 'multiple',
          show: true,
          list: [
            {
              subName: 'percentage',
              disabled: this.pageType === 'view',
              type: 'number',
              width: '100',
            },
            {
              subName: 'fixedAmount',
              disabled: this.pageType === 'view',
              type: 'number',
              width: '100',
            },
          ],
        },
        {
          name: 'Prepack',
          subName: 'prepack',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'product.validityTime',
          subName: 'validityDay',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'recommended Range Of Use From',
          subName: 'recommendedRangeOfUseFrom',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'recommended Range Of Use To',
          subName: 'recommendedRangeOfUseTo',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData2 = data2
    },
  },
}
</script>
