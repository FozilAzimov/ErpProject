<template>
  <div
    :style="{ top: yPos + 'px', left: xPos + 'px' }"
    class="w-[90%] max-h-[85vh] absolute cursor-grab p-2 rounded-sm overflow-auto bg-[rgb(208,225,243)] shadow-[0px_0px_50px_rgba(0,0,0,0.2)] flex justify-between"
    @mousedown="startDrag"
  >
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div class="w-full">
      <div class="flex items-center justify-between gap-5">
        <h2 class="font-bold text-[rgb(49,126,172)] italic">Filtering</h2>
        <div class="flex items-center justify-between gap-2">
          <generic-button name="Accept" type="primary" @click="acceptAction" />
          <generic-button
            name="Close"
            @click="$emit('customCloseFunction', false)"
          />
        </div>
      </div>

      <!-- Line -->
      <span class="block h-[1px] w-full bg-[rgb(119,136,153)] my-2"></span>
      <!-- Line -->

      <!-- Start TOP static Filter elements -->
      <!-- Minimum filter -->
      <div
        v-if="filterType === 'min'"
        class="flex flex-wrap items-end gap-x-[2px]"
      >
        <span v-for="(element, index) in filterElementMin" :key="index">
          <span
            v-if="element?.type === 'date'"
            class="flex flex-col items-start"
          >
            <span class="text-[12px] font-light">{{ element?.name }}</span>
            <generic-input-date-page
              :width="element?.width"
              :value="`${allFilterElementValues?.[element?.subName]}`"
              :name="element.subName"
              @customFunction="allSelectAndInputAction"
            />
          </span>
          <span
            v-else-if="element?.type === 'select'"
            class="flex flex-col items-start"
          >
            <span class="text-[12px] font-light">{{ element?.name }}</span>
            <generic-look-up
              :dwidth="element?.width"
              :name="element?.subName"
              :durl="element?.api"
              :popper-append-to-body="false"
              @customFunction="allSelectAndInputAction"
            />
          </span>
          <span
            v-else-if="element?.type === 'number' || element?.type === 'text'"
            class="flex flex-col items-start"
          >
            <span class="text-[12px] font-light">{{ element?.name }}</span>
            <generic-input
              :type="element?.type"
              :width="element?.width"
              :name="element?.subName"
              @enter="allBtnAction(element?.subName)"
              @customFunction="allSelectAndInputAction"
            />
          </span>
          <generic-check-box
            v-else-if="element?.type === 'checkbox'"
            :text="element?.name"
            :name="element?.subName"
            :border="true"
            @customFunction="allSelectAndInputAction"
          />
          <generic-button
            v-else-if="element?.type === 'button'"
            :name="element?.name"
            :type="element?.btnType"
            @click="allBtnAction(element?.clickType)"
          />
        </span>
      </div>

      <!-- Maximum filter -->
      <template v-else-if="filterType === 'max'">
        <div
          v-for="(rowArr, index) in filterElementMax"
          :key="index"
          class="flex flex-wrap justify-start items-end gap-x-2"
        >
          <span
            v-for="(element, innerIndex) in rowArr"
            :key="innerIndex"
            class="w-[160px]"
          >
            <span
              v-if="element?.type === 'date'"
              class="flex flex-col items-start"
            >
              <span class="text-[12px] font-light">{{ element?.name }}</span>
              <generic-input-date-page
                :width="element?.width"
                :value="`${allFilterElementValues?.[element?.subName]}`"
                :name="element.subName"
                @customFunction="allSelectAndInputAction"
              />
            </span>
            <span
              v-else-if="element?.type === 'select'"
              class="flex flex-col items-start"
            >
              <span class="text-[12px] font-light">{{ element?.name }}</span>
              <generic-look-up
                :dwidth="element?.width"
                :name="element?.subName"
                :durl="element?.api"
                :dparam="
                  element?.subName === 'productQtyId' ? param : element?.param
                "
                :popper-append-to-body="false"
                @customFunction="allSelectAndInputAction"
              />
            </span>
            <span
              v-else-if="element?.type === 'number' || element?.type === 'text'"
              class="flex flex-col items-start"
            >
              <span class="text-[12px] font-light">{{ element?.name }}</span>
              <generic-input
                :type="element?.type"
                :width="element?.width"
                :name="element?.subName"
                @enter="allBtnAction(element?.subName)"
                @customFunction="allSelectAndInputAction"
              />
            </span>
            <generic-check-box
              v-else-if="element?.type === 'checkbox'"
              :text="element?.name"
              :name="element?.subName"
              :border="true"
              @customFunction="allSelectAndInputAction"
            />
            <generic-button
              v-else-if="element?.type === 'button'"
              :name="element?.name"
              :type="element?.btnType"
              @click="allBtnAction(element?.clickType)"
            />
          </span>
        </div>
      </template>
      <!-- End TOP static Filter elements -->

      <!-- TABLE -->
      <generic-popup-prepare-table
        ref="popupTable"
        :filter-type="filterType"
        :table-head-data="headData"
        :table-head-data-length="headData?.length"
        :table-body-data="tableData"
        :height="450"
        class="bg-[rgba(255,255,255,0.5)] mt-4"
        @emitCustomFunc="getEmitDataAction"
      />
      <!-- TABLE -->
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericPopupPrepareTable from '@generics/GenericPopupPrepareTable.vue'

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericLookUp,
    GenericInput,
    GenericCheckBox,
    GenericInputDatePage,
    GenericPopupPrepareTable,
  },

  // PROPS
  props: {
    headData: {
      type: Array,
      default: () => [],
    },
    topStaticTableData: {
      type: Object,
      default: () => ({}),
    },
    tabName: {
      type: String,
      default: '',
    },
    actionUrl: {
      type: String,
      default: '',
    },
    filterType: {
      type: String,
      default: '',
    },
  },

  // DATA
  data() {
    return {
      // Draggable
      xPos: 0, // Boshlang'ich X pozitsiya
      yPos: 0, // Boshlang'ich Y pozitsiya
      isDragging: false,
      offset: { x: 0, y: 0 },
      // Draggable

      isLoading: false,
      pageID: null,
      pageUrl: null,
      isPage: null,
      filterElementMin: [],
      filterElementMax: [],
      allFilterElementValues: {},
      tableData: [],
      emitTableData: [],
      param: {},
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.pageUrl = this.$route?.name
    this.allFilterElementValues.startDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    )
      .toISOString()
      .split('.')[0]
    this.allFilterElementValues.endDate = new Date().toISOString().split('.')[0]
  },

  // MOUNTED
  mounted() {
    //  Draggable function
    this.setInitialPosition()
    // function
    this.createFilterElementData()
  },

  // METHODS
  methods: {
    // Draggable actions ===========================================
    setInitialPosition() {
      const popupWidthPercent = 90 // Popup kengligi (foiz)
      const popupHeightPercent = 50 // Popup balandligi (foiz)
      // Popup kengligi va balandligini foizdan hisoblash
      const popupWidth = (window.innerWidth * popupWidthPercent) / 100
      const popupHeight = (window.innerHeight * popupHeightPercent) / 100
      // Ekranning markaziga joylashtirish
      this.xPos = window.innerWidth / 2 - popupWidth / 2
      this.yPos = window.innerHeight / 2 - popupHeight / 2
    },
    startDrag(event) {
      this.isDragging = true
      this.offset.x = event.clientX - this.xPos
      this.offset.y = event.clientY - this.yPos
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.stopDrag)
    },
    stopDrag() {
      this.isDragging = false
      window.removeEventListener('mousemove', this.onDragging)
      window.removeEventListener('mouseup', this.stopDrag)
    },
    onDragging(event) {
      if (this.isDragging) {
        this.xPos = event.clientX - this.offset.x
        this.yPos = event.clientY - this.offset.y
      }
    },
    // Draggable actions ===========================================

    // Accept button action addition rows
    acceptAction() {
      this.$emit('filterPopupEmitAction', this.emitTableData, false)
    },

    // Emit action
    getEmitDataAction(selectedData) {
      this.emitTableData = selectedData
    },

    // set all select and input value
    allSelectAndInputAction(name, value) {
      this.$set(this.allFilterElementValues, name, value)
      // start all params

      const params = {
        allCompanies: this.allFilterElementValues?.allCompanies ?? false,
        clientCompanyId: this.allFilterElementValues?.clientCompanyId ?? null,
        clientOrder: this.allFilterElementValues?.clientOrder ?? null,
        colorId: this.allFilterElementValues?.colorId ?? null,
        colorVariantId: this.allFilterElementValues?.colorVariantId ?? null,
        currencyId:
          this.topStaticTableData?.currency?.id ??
          this.topStaticTableData?.currency ??
          null,
        currencyRateVal:
          this.topStaticTableData?.currencyRate?.text ??
          this.topStaticTableData?.currencyRate ??
          null,
        dateFrom:
          (isNaN(this.topStaticTableData?.date)
            ? this.topStaticTableData?.date
            : this.$formatDate(this.topStaticTableData?.date)) ?? null,
        designId: this.allFilterElementValues?.designId ?? null,
        designVariantId: this.allFilterElementValues?.designVariantId ?? null,
        employeeId: this.allFilterElementValues?.employeeId ?? null,
        equipmentId: this.allFilterElementValues?.equipmentId ?? null,
        fiberClassId: this.allFilterElementValues?.fiberClassId ?? null,
        gradeId: this.allFilterElementValues?.gradeId ?? null,
        id: this.pageID,
        internalStatus: this.allFilterElementValues?.internalStatus || null,
        marriage: this.allFilterElementValues?.marriage ?? false,
        orderNumber: this.allFilterElementValues?.orderNumber ?? null,
        orderProductionTypeId:
          this.topStaticTableData?.orderProductionType?.id ??
          this.topStaticTableData?.orderProductionType ??
          null,
        packingNumbers: this.allFilterElementValues?.packingNumbers ?? null,
        packingTypeId: this.allFilterElementValues?.packingTypeId ?? null,
        planOpenOrCloseId:
          this.allFilterElementValues?.planOpenOrCloseId ?? null,
        planningNumber: this.allFilterElementValues?.planningNumber ?? null,
        planningTypeId: this.allFilterElementValues?.planningTypeId ?? null,
        prOrderId: this.allFilterElementValues?.prOrderId ?? null,
        salesManagerId:
          this.topStaticTableData?.salesManager?.id ??
          this.topStaticTableData?.salesManager ??
          null,
        sewModelSizeVariantId:
          this.allFilterElementValues?.sewModelSizeVariantId ?? null,
        stillage: this.allFilterElementValues?.stillage ?? '',
        tabName: this.tabName ?? '',
        warehouseId:
          (this.isPage
            ? this.allFilterElementValues?.warehouseId
            : this.topStaticTableData?.warehouse?.id) ?? null,
      }
      if (this.tabName === 'outputToProductionCompanyItemTable') {
        params.salesManagerId =
          this.topStaticTableData?.company?.id ??
          this.topStaticTableData?.company ??
          null
      } else if (this.tabName === 'productionInvoiceItemTable') {
        params.companyId = null
        params.currencyId = null
      } else {
        params.companyId =
          this.topStaticTableData?.company?.id ??
          this.topStaticTableData?.company ??
          null
      }
      const minMaxParam =
        this.filterType === 'max'
          ? {
              batchNumber: this.allFilterElementValues?.batchNumber ?? '',
              lot: this.allFilterElementValues?.lot ?? '',
              productId: this.allFilterElementValues?.productId ?? null,
              departmentId:
                this.topStaticTableData?.department?.id ??
                this.topStaticTableData?.department ??
                null,
            }
          : this.filterType === 'min'
          ? {
              endDate: this.allFilterElementValues?.endDate ?? '',
              startDate: this.allFilterElementValues?.startDate ?? '',
              departmentId: this.allFilterElementValues?.departmentId ?? null,
            }
          : {}
      this.$set(this, 'param', { ...params, ...minMaxParam })
      // end all params

      // function
      this.allBtnAction(name, value)
    },

    allBtnAction(btnClickType, selectAndInputValue) {
      if (
        btnClickType === 'get' ||
        this.allFilterElementValues?.planningNumber ||
        this.allFilterElementValues?.clientOrder ||
        this.allFilterElementValues?.orderNumber ||
        ((btnClickType === 'productQtyId' || btnClickType === 'productId') &&
          selectAndInputValue)
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/invoices/findInvoiceItemListUrl`, this.param)
          .then(({ data: { invoiceItemListJson } }) => {
            this.tableData = JSON.parse(invoiceItemListJson)
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // create data filter elements
    createFilterElementData() {
      // MIN POPup uchun
      const dataMin = [
        {
          name: 'Date From',
          subName: 'startDate',
          type: 'date',
          width: '185',
        },
        {
          name: 'Date To',
          subName: 'endDate',
          type: 'date',
          width: '185',
        },
        {
          name: 'Planning No',
          subName: 'planningNumber',
          type: 'number',
          width: '110',
        },
        {
          name: 'Planning Type',
          subName: 'planningTypeId',
          type: 'select',
          api: 'findAllPlanningType',
          width: '170',
        },
        {
          name: 'Client Order No',
          subName: 'clientOrder',
          type: 'text',
          width: '150',
        },
        {
          name: 'Order No',
          subName: 'orderNumber',
          type: 'number',
          width: '130',
        },
        {
          name: 'Client Company',
          subName: 'clientCompanyId',
          type: 'select',
          api: 'findAllCompanyForInvoice',
          width: '170',
        },
        {
          name: 'Department',
          subName: 'departmentId',
          type: 'select',
          api: 'findAllDepartment',
          width: '170',
        },
        {
          name: 'Plan Open/Close',
          subName: 'planOpenOrCloseId',
          type: 'select',
          api: 'findAllPlanOpenOrClose',
          width: '170',
        },
        {
          name: 'GET',
          type: 'button',
          btnType: 'info',
          clickType: 'get',
        },
        {
          name: 'keep Window',
          subName: 'internalStatus',
          type: 'checkbox',
        },
      ]
      this.filterElementMin = dataMin

      // MAX POPup uchun
      this.isPage = this.pageUrl?.includes('prepareIplikLotStavka')
      const lookUpParam = {
        allCompanies: this.allFilterElementValues?.allCompanies ?? false,
        batchNumber: '-1',
        clientCompanyId: this.allFilterElementValues?.clientCompanyId ?? null,
        colorId: this.allFilterElementValues?.colorId ?? null,
        colorVariantId: this.allFilterElementValues?.colorVariantId ?? null,
        dateFrom:
          (isNaN(this.topStaticTableData?.date)
            ? this.topStaticTableData?.date
            : this.$formatDate(this.topStaticTableData?.date)) ?? null,
        designId: this.allFilterElementValues?.designId ?? null,
        designVariantId: this.allFilterElementValues?.designVariantId ?? null,
        employeeId: this.allFilterElementValues?.employeeId ?? null,
        equipmentId: this.allFilterElementValues?.equipmentId ?? null,
        fiberClassId: this.allFilterElementValues?.fiberClassId ?? null,
        gradeId: this.allFilterElementValues?.gradeId ?? null,
        id: this.pageID,
        lot: this.allFilterElementValues?.lot ?? null,
        marriage: this.allFilterElementValues?.marriage ?? false,
        orderId: this.topStaticTableData?.order?.id ?? null,
        orderNumber: this.allFilterElementValues?.orderNumber ?? null,
        orderProductionTypeId:
          this.topStaticTableData?.orderProductionType?.id ??
          this.topStaticTableData?.orderProductionType ??
          null,
        packingNumbers: this.allFilterElementValues?.packingNumbers ?? null,
        packingTypeId: this.allFilterElementValues?.packingTypeId ?? null,
        planningNumber: this.allFilterElementValues?.planningNumber ?? null,
        planningTypeId: this.allFilterElementValues?.planningTypeId ?? null,
        prOrderId: this.allFilterElementValues?.prOrderId ?? null,
        salesManagerId:
          this.topStaticTableData?.salesManager?.id ??
          this.topStaticTableData?.salesManager ??
          null,
        sewModelSizeVariantId:
          this.allFilterElementValues?.sewModelSizeVariantId ?? null,
        tabName: this.tabName ?? '',
        warehouseId:
          (this.isPage
            ? this.allFilterElementValues?.warehouseId
            : this.topStaticTableData?.warehouse?.id
            ? this.topStaticTableData?.warehouse?.id
            : this.topStaticTableData?.warehouse) ?? null,
      }
      if (this.tabName === 'outputToProductionCompanyItemTable') {
        lookUpParam.salesManagerId =
          this.topStaticTableData?.company?.id ??
          this.topStaticTableData?.company ??
          null
      } else {
        lookUpParam.companyId =
          this.topStaticTableData?.company?.id ??
          this.topStaticTableData?.company ??
          null
      }
      const dataMax = [
        [
          {
            name: this.isPage ? 'Warehouse' : 'Product',
            subName: this.isPage ? 'warehouseId' : 'productId',
            type: 'select',
            api: this.isPage
              ? 'findAllWarehouseLogic'
              : 'findAllStockProductListUrl',
            width: '160',
            param: this.isPage
              ? {
                  actionUrl: this.actionUrl,
                }
              : lookUpParam,
          },
          {
            name: this.isPage ? 'Product Qty' : 'Qty',
            subName: this.isPage ? 'productQtyId' : 'qty',
            type: this.isPage ? 'select' : 'number',
            api: 'findAllStockProductListUrl',
            width: '160',
          },
          {
            name: 'packQty',
            subName: 'packQty',
            type: 'number',
            width: '130',
          },
          {
            name: 'Item Barcode',
            subName: 'itemBarcode',
            type: 'number',
            width: '130',
          },
          {
            name: 'Product Barcode',
            subName: 'productBarcode',
            type: 'number',
            width: '130',
          },
          {
            name: 'Common Barcode',
            subName: 'commonBarcode',
            type: 'text',
            width: '130',
          },
          {
            name: 'eBarcode',
            subName: 'eBarcode',
            type: 'text',
            width: '130',
          },
          {
            name: 'Equipment',
            subName: 'equipment',
            type: 'text',
            width: '130',
          },
          {
            name: 'EquipmentsId',
            subName: 'equipmentsId',
            type: 'select',
            api: 'findAllEquipments',
            width: '160',
          },
          {
            name: 'keep Window',
            subName: 'internalStatus',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Client Company',
            subName: 'clientCompanyId',
            type: 'select',
            api: 'findAllCompanyForInvoice',
            width: '160',
          },
          {
            name: 'Batch №',
            subName: 'batchNumber',
            type: 'text',
            width: '130',
          },
          {
            name: 'Lot',
            subName: 'lot',
            type: 'text',
            width: '130',
          },
          {
            name: 'Pus',
            subName: 'pus',
            type: 'number',
            width: '130',
          },
          {
            name: 'Gramm',
            subName: 'gramm',
            type: 'number',
            width: '130',
          },
          {
            name: 'fiberClass',
            subName: 'fiberClassId',
            type: 'select',
            api: 'findAllQualityFiberClass',
            width: '160',
          },
          {
            name: 'Size',
            subName: 'sizeId',
            type: 'select',
            api: 'findAllSewModelVariantSize',
            width: '160',
          },
          {
            name: 'Al Companies',
            subName: 'allCompanies',
            type: 'checkbox',
          },
          {
            name: 'Marrige',
            subName: 'marrige',
            type: 'checkbox',
          },
        ],
        [
          {
            name: 'Pr Order',
            subName: 'prOrderId',
            type: 'select',
            api: 'findAllPrOrder',
            width: '160',
          },
          {
            name: 'Packing Type',
            subName: 'packagingType',
            type: 'select',
            api: 'findAllSewModelPackingType',
            width: '160',
          },
          {
            name: 'Color',
            subName: 'colorId',
            type: 'select',
            api: 'findAllColor',
            width: '160',
          },
          {
            name: 'Color Variant',
            subName: 'colorVariantId',
            type: 'select',
            api: 'findAllColorVariant',
            width: '160',
            param: {
              colorId: this.allFilterElementValues?.orderId ?? null,
            },
          },
          {
            name: 'Design',
            subName: 'designId',
            type: 'select',
            api: 'findAllDesign',
            width: '160',
          },
          {
            name: 'Design Variant',
            subName: 'designVariantId',
            type: 'select',
            api: 'findAllDesignVariant',
            width: '160',
            param: {
              designId: this.allFilterElementValues?.designId ?? null,
            },
          },
          {
            name: 'Client Order',
            subName: 'clientOrder',
            type: 'text',
            width: '130',
          },
          {
            name: 'PackingNumbers',
            subName: 'packingNumber',
            type: 'text',
            width: '130',
          },
          {
            name: 'Grade',
            subName: 'gradeId',
            type: 'select',
            api: 'findAllGradeWithNullValue',
            width: '160',
          },
        ],
      ]
      this.filterElementMax = dataMax
    },
  },
}
</script>
