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
              height="28"
              pl="10"
              pr="10"
              pt="1"
              pb="1"
              textsize="13"
              type="datetime-local"
              :value="`${allFilterElementValues?.[element?.subName]}`"
              valuecolor="rgba(0,0,0,0.7)"
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
                height="28"
                pl="10"
                pr="10"
                pt="1"
                pb="1"
                textsize="13"
                type="datetime-local"
                :value="`${allFilterElementValues?.[element?.subName]}`"
                valuecolor="rgba(0,0,0,0.7)"
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
      </template>
      <!-- End TOP static Filter elements -->

      <!-- TABLE -->
      <generic-popup-prepare-table
        ref="popupTable"
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
    tabName: {
      type: String,
      default: '',
    },
    headData: {
      type: Array,
      default: () => [],
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
      filterElementMin: [],
      filterElementMax: [],
      allFilterElementValues: {},
      tableData: [],
      emitTableData: [],
    }
  },

  // WATCH
  watch: {},

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
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
      this.$emit('popupEmitAction', this.emitTableData, false)
    },

    // Emit action
    getEmitDataAction(selectedData) {
      this.emitTableData = selectedData
    },

    // set all select and input value
    allSelectAndInputAction(name, value) {
      this.$set(this.allFilterElementValues, name, value)
    },

    allBtnAction(btnClickType) {
      const body = {
        internalStatus: this.allFilterElementValues?.internalStatus || true,
        orderNumber: this.allFilterElementValues?.orderNumber ?? null,
        clientOrder: this.allFilterElementValues?.clientOrder ?? null,
        stillage: this.allFilterElementValues?.stillage ?? '',
        planningTypeId: this.allFilterElementValues?.planningTypeId ?? null,
        planningNumber: this.allFilterElementValues?.planningNumber ?? null,
        packingNumbers: this.allFilterElementValues?.packingNumbers ?? null,
        startDate: this.allFilterElementValues?.startDate ?? null,
        endDate: this.allFilterElementValues?.endDate ?? null,
        clientCompanyId: this.allFilterElementValues?.clientCompanyId ?? null,
        departmentId: this.allFilterElementValues?.departmentId ?? null,
        sewModelSizeVariantId:
          this.allFilterElementValues?.sewModelSizeVariantId ?? null,
        planOpenOrCloseId:
          this.allFilterElementValues?.planOpenOrCloseId ?? null,
        prOrderId: this.allFilterElementValues?.prOrderId ?? null,
        packingTypeId: this.allFilterElementValues?.packingTypeId ?? null,
        colorId: this.allFilterElementValues?.colorId ?? null,
        colorVariantId: this.allFilterElementValues?.colorVariantId ?? null,
        designId: this.allFilterElementValues?.designId ?? null,
        designVariantId: this.allFilterElementValues?.designVariantId ?? null,
        gradeId: this.allFilterElementValues?.gradeId ?? null,
        fiberClassId: this.allFilterElementValues?.fiberClassId ?? null,
        currencyId: this.allFilterElementValues?.currencyId ?? null,
        currencyRateVal: this.allFilterElementValues?.currencyRateVal ?? null,
        tabName: this.tabName ?? '',
        warehouseId: this.allFilterElementValues?.warehouseId ?? null,
        orderProductionTypeId:
          this.allFilterElementValues?.orderProductionTypeId ?? null,
        salesManagerId: this.allFilterElementValues?.salesManagerId ?? null,
        equipmentId: this.allFilterElementValues?.equipmentId ?? null,
        companyId: this.allFilterElementValues?.companyId ?? null,
        id: this.pageID,
        dateFrom: this.allFilterElementValues?.endDate ?? null,
        allCompanies: this.allFilterElementValues?.allCompanies ?? false,
        marriage: this.allFilterElementValues?.marriage ?? false,
        employeeId: this.allFilterElementValues?.employeeId ?? null,
      }

      if (
        btnClickType === 'get' ||
        this.allFilterElementValues?.planningNumber ||
        this.allFilterElementValues?.clientOrder ||
        this.allFilterElementValues?.orderNumber
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/invoices/findInvoiceItemListUrl`, body)
          .then(({ data: { invoiceItemListJson } }) => {
            this.tableData = invoiceItemListJson
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
      const dataMin = [
        {
          name: 'Date From',
          subName: 'startDate',
          type: 'date',
          width: '165',
        },
        {
          name: 'Date To',
          subName: 'endDate',
          type: 'date',
          width: '165',
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

      const dataMax = [
        [
          {
            name: 'Warehouse',
            subName: 'warehouseId',
            type: 'select',
            api: 'findAllWarehouseLogic',
            width: '160',
            param: {
              actionUrl: 'iplikReserv',
            },
          },
          {
            name: 'Product Qty',
            subName: 'productQtyId',
            type: 'select',
            api: 'findAllStockProductListUrl',
            width: '160',
            param: {
              tabName: this.tabName,
              warehouseId: this.allFilterElementValues?.warehouseId ?? null,
              orderProductionTypeId:
                this.allFilterElementValues?.orderProductionTypeId ?? null,
              companyId: this.allFilterElementValues?.companyId ?? null,
              employeeId: this.allFilterElementValues?.employeeId ?? null,
              prOrderId: this.allFilterElementValues?.prOrderId ?? null,
              equipment_id: null,
              packingTypeId: this.allFilterElementValues?.packingTypeId ?? null,
              colorId: this.allFilterElementValues?.colorId ?? null,
              colorVariantId:
                this.allFilterElementValues?.colorVariantId ?? null,
              designId: this.allFilterElementValues?.designId ?? null,
              designVariantId:
                this.allFilterElementValues?.designVariantId ?? null,
              salesManagerId:
                this.allFilterElementValues?.salesManagerId ?? null,
              dateFrom: this.allFilterElementValues?.endDate ?? null,
              batchNumber: '-1',
              gradeId: this.allFilterElementValues?.gradeId ?? null,
              fiberClassId: this.allFilterElementValues?.fiberClassId ?? null,
              id: this.pageID,
              clientCompanyId:
                this.allFilterElementValues?.clientCompanyId ?? null,
              orderNumber: this.allFilterElementValues?.orderNumber ?? null,
              lot: '',
              packingNumbers: this.allFilterElementValues?.packingNumbers ?? '',
              allCompanies: this.allFilterElementValues?.allCompanies ?? false,
              marriage: this.allFilterElementValues?.marriage ?? false,
              planningTypeId:
                this.allFilterElementValues?.planningTypeId ?? null,
              sewModelSizeVariantId:
                this.allFilterElementValues?.sewModelSizeVariantId ?? null,
              planningNumber:
                this.allFilterElementValues?.planningNumber ?? null,
            },
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
            subName: 'batch',
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
