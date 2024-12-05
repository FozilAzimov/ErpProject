<template>
  <div>
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :left="leftMap"
        :right="rightMap"
        :url="actionUrl"
        :openpopup="openPopup"
        :create-edit="true"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <!-- ======================================================================= -->
    <div class="max-h-[500px] overflow-scroll my-1">
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)] z-[999] sticky top-[-1px]">
          <tr>
            <th
              v-for="(obj, key) in headData"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] py-3 px-2 cursor-pointer whitespace-nowrap"
            >
              {{ obj.name }}
              <!-- <pre>{{ obj }}</pre> -->
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in bodyData"
            :key="index"
            class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
          >
            <td
              v-for="({ subName }, inx) in headData"
              :key="inx"
              class="border-[1px] text-[12px] p-[2px] text-center"
            >
              <!-- <pre>{{ row[subName] }}</pre> -->

              <!-- Actions -->
              <div v-if="subName === 'action'" class="flex items-center gap-1">
                <generic-button
                  v-for="(elem, i) in row[subName]"
                  :key="i"
                  :name="elem.name"
                  :type="elem.type"
                  @click="allBtnClickAction(elem?.clickType, index, row)"
                />
              </div>

              <!-- Size Items -->
              <div
                v-else-if="subName?.includes('size')"
                class="flex flex-col items-center gap-2"
              >
                <generic-input
                  :value="`${row[subName]?.size_sum ?? 0}`"
                  width="120"
                  type="number"
                  disabled
                />
                <div
                  v-if="row[subName]?.isEdit"
                  class="flex items-center gap-1"
                >
                  <generic-input
                    width="100"
                    :value="`${row[subName]?.qty ?? ''}`"
                    name="qty"
                    type="number"
                    :order="index"
                    :clearable="false"
                    @customFunction="setSelectAndInputValueAction"
                  />
                  <generic-input
                    width="100"
                    :value="`${row[subName]?.planReqQty ?? ''}`"
                    name="planReqQty"
                    type="number"
                    :order="index"
                    :clearable="false"
                    @customFunction="setSelectAndInputValueAction"
                  />
                </div>
                <generic-button
                  v-else
                  :name="`${row[subName]?.qty} : ${row[subName]?.planReqQty}`"
                  type="info"
                  @click="
                    sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                      'sizeItem',
                      row[subName],
                      subName,
                      index
                    )
                  "
                />

                <!-- start Edit & Save & Cansel actions -->
                <div class="flex flex-col items-center gap-2">
                  <div
                    v-if="row[subName]?.isEdit"
                    class="flex items-center gap-2"
                  >
                    <generic-button
                      name="Cansel"
                      @click="
                        sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                          'cansel',
                          row[subName],
                          subName,
                          index
                        )
                      "
                    />
                    <generic-button
                      name="Save"
                      type="primary"
                      @click="
                        sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                          'save',
                          row[subName],
                          subName,
                          index
                        )
                      "
                    />
                  </div>
                  <generic-button
                    v-else
                    name="Edit"
                    type="success"
                    icon-name-attribute="edit"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'edit',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                </div>
                <!-- end Edit & Save & Cansel actions -->
              </div>

              <!-- Type -->
              <template v-else-if="subName === 'sewModel'">
                {{ row[subName] }}
                <div class="flex flex-col items-center gap-1 mt-2">
                  <generic-button
                    name="Open top cutted"
                    type="success"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'topCutted',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                  <generic-button
                    name="Open bottom cutted"
                    type="primary"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'bottomCutted',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                </div>
              </template>

              <!-- Color Variant LookUp -->
              <template v-else-if="subName === 'colorVariant'">
                <div class="flex flex-col items-center gap-2">
                  <div
                    v-if="row.isEditColVar"
                    class="flex flex-col items-center gap-2"
                  >
                    <generic-look-up
                      dwidth="120"
                      durl="findAllColorVariant"
                      :defvalue="`${row[subName] ?? ''}`"
                      name="colorVariant"
                      :order="index"
                      :is-look-up-obj="true"
                      @customFunction="setSelectAndInputValueAction"
                    />
                    <div class="flex items-center gap-2">
                      <generic-button
                        name="Cansel"
                        @click="
                          sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                            'cansel',
                            row,
                            subName,
                            index
                          )
                        "
                      />
                      <generic-button
                        name="Save"
                        type="primary"
                        @click="
                          sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                            'save',
                            row,
                            subName,
                            index
                          )
                        "
                      />
                    </div>
                  </div>
                  <div v-else class="flex flex-col items-center gap-2">
                    {{ row[subName] }}
                    <generic-button
                      name="Edit"
                      type="success"
                      icon-name-attribute="edit"
                      @click="
                        sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                          'edit',
                          row,
                          subName,
                          index
                        )
                      "
                    />
                  </div>
                </div>
              </template>

              <!-- Color LookUp -->
              <template v-else-if="subName === 'color'">
                <generic-look-up
                  v-if="row.isEditColVar"
                  dwidth="120"
                  durl="findAllColor"
                  :defvalue="`${row[subName] ?? ''}`"
                  name="color"
                  :order="index"
                  :param="{
                    colorVariantId:
                      allSelectAndInputValue?.[index]?.colorVariantId,
                  }"
                  @customFunction="setSelectAndInputValueAction"
                />
                <template v-else>{{ row[subName] }}</template>
              </template>

              <!-- Description -->
              <template v-else-if="subName === 'description'">
                <div class="flex flex-col items-center gap-2">
                  <div
                    v-if="row.isEditDesc"
                    class="flex flex-col items-center gap-2"
                  >
                    <generic-input
                      :name="subName"
                      :value="`${row[subName] ?? ''}`"
                      width="200"
                      type="textarea"
                      @customFunction="setSelectAndInputValueAction"
                    />
                    <div class="flex items-center gap-2">
                      <generic-button
                        name="Cansel"
                        @click="
                          sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                            'cansel',
                            row,
                            subName,
                            index
                          )
                        "
                      />
                      <generic-button
                        name="Save"
                        type="primary"
                        @click="
                          sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                            'save',
                            row,
                            subName,
                            index
                          )
                        "
                      />
                    </div>
                  </div>
                  <div v-else class="flex flex-col items-center gap-2">
                    {{ row[subName] }}
                    <generic-button
                      name="Edit"
                      type="success"
                      icon-name-attribute="edit"
                      @click="
                        sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                          'edit',
                          row,
                          subName,
                          index
                        )
                      "
                    />
                  </div>
                </div>
              </template>

              <!-- Type -->
              <template v-else-if="subName === 'productProductionTypeName'">
                {{ row[subName] }}
                <div class="flex flex-col items-center gap-1 mt-2">
                  <generic-button
                    name="Update Barcode"
                    type="primary"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'updateBarcode',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                  <generic-button
                    name="Update Barcode From Model"
                    type="primary"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'updateModel',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                </div>
              </template>

              <div
                v-else-if="subName === 'total'"
                class="flex items-center gap-1 text-[13px]"
              >
                <span class="text-red-500">{{ subName }}:</span>
                {{ row[subName] ?? 0 }}
              </div>

              <!-- All Element -->
              <template v-else>
                {{ row[subName] }}
              </template>
            </td>
          </tr>
        </tbody>
        <tfoot
          v-if="isTotal"
          class="bg-[rgb(229,235,245)] z-[999] sticky bottom-[-1px]"
        >
          <tr>
            <td
              v-for="({ subName }, key) in headData"
              :key="key"
              class="border-[1px] text-[13px] py-3 text-center"
            >
              <span
                v-if="
                  totalRowDataObj?.[subName] || totalRowDataObj?.[subName] === 0
                "
                class="text-[dodgerblue]"
                >Total:</span
              >
              <span class="text-red-500">{{
                totalRowDataObj?.[subName] ?? ''
              }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- ======================================================================= -->
    <sub-kroy-table
      v-if="kroyTopHeadData?.length"
      :head-data="kroyTopHeadData"
      table-type="kroyTop"
      @emitAction="$emit('emitAction', true, true)"
    />
    <sub-kroy-table
      v-if="kroyBottomHeadData?.length"
      :head-data="kroyBottomHeadData"
      table-type="kroyBottom"
      @emitAction="$emit('emitAction', true, true)"
    />
    <sub-kroy-table
      v-if="productionInvoiceHeadData?.length"
      :head-data="productionInvoiceHeadData"
      table-type="productionInvoice"
      @emitAction="$emit('emitAction', true, true)"
    />

    <!-- --START-- Custom Table -->
    <div v-if="isShowHide && pageID" class="m-1">
      <span class="text-[14px]"
        >Operation Panel.
        <strong v-if="pageID" class="text-[14px] text-[rgb(156,0,78)]"
          >Parent ID = {{ pageID }}</strong
        ></span
      >
      <div class="flex gap-1 flex-wrap">
        <GenericButton
          name="Column Setting"
          type="info"
          icon-name-attribute="setting"
          @click="openColumnConfig"
        />
        <span v-if="hideButton" class="flex gap-1 flex-wrap">
          <GenericButton
            name="Save"
            type="primary"
            :disabled="saveBtnDisabled"
            @click="saveAction"
          />
          <GenericButton v-if="pageID" name="Discard" @click="discardAction" />
        </span>
        <GenericButton
          v-else
          name="Edit"
          type="success"
          icon-name-attribute="edit"
          @click="editAction"
        />
        <GenericButton
          v-if="pageID"
          name="Print Preview"
          type="success"
          icon-name-attribute="printer"
        />
        <GenericButton
          v-if="pageID"
          name="Create Barcode Pack"
          type="info"
          @click="createBarcodePackAndUpdateBarcodeAction('createBarcodePack')"
        />
        <GenericButton
          v-if="pageID"
          name="Update Barcode"
          type="info"
          @click="createBarcodePackAndUpdateBarcodeAction('updateBarcode')"
        />
      </div>
      <generic-prepare-table-page
        ref="customTableRef"
        :action-url="actionUrl"
        tab-name="productionOrderItemTable"
        filter-type="max"
        :addmodalorrow="openPopup"
        :tablehead="planningModelOperationColumns"
        :tableheadlength="planningModelOperationColumns?.length"
        :response-data="planningModelOperationListJson"
        :ui-show-hide="uiShowHide"
        :is-edit="isEdit"
        :height="450"
        delete-url-row="productionOrderNew/prepareCreateEditModelOperation"
        class="bg-[rgba(255,255,255,0.5)] mt-1"
        @rowValues="getRowElements"
        @requiredAction="getDisabledValue"
      />
    </div>
    <!-- --END-- Custom Table -->
  </div>
</template>

<script>
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
import SubKroyTable from '@components/Orders/PrepareSewProductionOrderItem/SubKroyTable.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInput,
    GenericLookUp,
    SubKroyTable,
    GenericPrepareTablePage,
  },

  // PROPS
  props: {
    orderList: {
      type: Array,
      default: () => [],
    },
    kroyList: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      // column config uchun
      checkModal: false,
      actionUrl: 'productionOrderPlanOperationTable',
      openPopup: null,
      rightMap: {},
      leftMap: {},
      // column config uchun
      isLoading: false,
      pageID: null,
      headData: [],
      bodyData: [],
      allSelectAndInputValue: [],
      kroyGropedArr: [],
      totalRowDataObj: {},
      isTotal: false,
      // Kroy Top uchun
      kroyTopHeadData: [],
      // Kroy Bottom uchun
      kroyBottomHeadData: [],
      // Production Invoice uchun
      productionInvoiceHeadData: [],
      // CutomTable uchun
      planningModelOperationColumns: [],
      planningModelOperationListJson: [],
      isShowHide: false,
      uiShowHide: false,
      saveBtnDisabled: false,
      isEdit: null,
      hideButton: null,
      selectedPlanId: null,
      // CutomTable uchun
    }
  },

  // WATCH
  watch: {
    orderList: {
      handler(newVal) {
        this.createTableHeadDataAction(newVal[0]) // function
      },
    },
    kroyList: {
      handler(newVal) {
        newVal?.length &&
          (this.kroyGropedArr = this.groupKroyListAction(newVal)) // function
      },
    },
    kroyGropedArr: {
      handler(newVal) {
        this.bodyDataSetKroyValAction(this.bodyData, this.headData, newVal) // function
        this.totalRowAction(this.bodyData, this.headData) // function
        this.isTotal = true
      },
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.isEdit = !!this.pageID
    this.hideButton = !this.pageID
    this.uiShowHide = !!this.pageID
  },

  // METHODS
  methods: {
    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    // Bu page da Column config ishlatilmagan
    openColumnConfig() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/base/columnsConfigU`, {
          actionUrl: this.actionUrl,
        })
        .then(({ data }) => {
          this.getFilterData(data?.rightColumns, data?.leftColumns) // function
          this.checkModal = true
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Filter Action
    getFilterData(rightColumns, leftColumns) {
      const leftMap = {}
      const rightMap = {}
      rightColumns?.length &&
        rightColumns.forEach((obj) => {
          rightMap[obj.name] = obj
        })
      leftColumns?.length &&
        leftColumns.forEach((obj) => {
          leftMap[obj.name] = obj
        })
      this.$set(this, 'leftMap', { ...this.leftMap, ...leftMap })
      this.$set(this, 'rightMap', { ...this.rightMap, ...rightMap })
    },

    // set input value action
    setSelectAndInputValueAction(name, value, order, resultType, resObj) {
      if (!this.allSelectAndInputValue[order])
        this.$set(this.allSelectAndInputValue, order, {})
      this.$set(this.allSelectAndInputValue[order], name, value)

      name === 'colorVariant' &&
        this.colorVariantSelectedAction(name, value, order, resultType, resObj) // function
    },

    // action LookUp selected
    colorVariantSelectedAction(name, value, order, resultType, resObj) {
      this.$set(this.bodyData[order], 'colorId', resObj?.color_id)
      this.$set(this.bodyData[order], 'color', resObj?.color_name)

      this.$set(this.allSelectAndInputValue[order], name, value)
      this.$set(this.allSelectAndInputValue[order], 'color', resObj?.color_id)
    },

    // Kroy list Group action
    groupKroyListAction(arrData) {
      const result = {}
      arrData.forEach((item) => {
        if (!result[item.groupId]) {
          result[item.groupId] = {}
        }
        item.kroyitems.forEach((kroyItem) => {
          const size = kroyItem.size
          const qty = parseFloat(kroyItem.qty)
          if (result[item.groupId][size]) {
            result[item.groupId][size] += qty
          } else {
            result[item.groupId][size] = qty
          }
        })
      })
      return Object.keys(result).map((groupId) => {
        return {
          groupId: parseInt(groupId),
          sizes: Object.keys(result[groupId]).map((size) => {
            return {
              size,
              qty: result[groupId][size],
            }
          }),
        }
      })
    },

    // bodyData set Kroy value action
    bodyDataSetKroyValAction(bodyData, headData, arr) {
      bodyData.forEach((oldObj) => {
        arr.forEach((subObj) => {
          if (oldObj?.number === subObj?.groupId) {
            let i = 0
            headData.forEach((obj) => {
              if (obj.subName?.includes('size')) {
                oldObj[obj.subName].size_sum = subObj.sizes[i]?.qty
                i++
              }
            })
            i = 0
          }
        })
      })

      bodyData.forEach((obj) => {
        let total = 0
        headData.forEach((subObj) => {
          if (subObj.subName?.includes('size')) {
            total += parseFloat(obj?.[subObj.subName]?.size_sum ?? 0)
          }
        })
        obj.total = total
      })
    },

    // Total row data action
    totalRowAction(bodyData, headData) {
      bodyData.forEach((obj) => {
        headData.forEach((subObj) => {
          if (subObj.subName?.includes('size')) {
            if (this.totalRowDataObj?.[subObj.subName])
              this.totalRowDataObj[subObj.subName] += parseFloat(
                obj?.[subObj.subName]?.size_sum ?? 0
              )
            else
              this.totalRowDataObj[subObj.subName] = parseFloat(
                obj?.[subObj.subName]?.size_sum ?? 0
              )
          }
        })
      })
    },

    // Save & Edit & Cansel action
    sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
      type,
      obj,
      colSubName,
      index
    ) {
      if (type === 'sizeItem') {
        if (obj?.planId) {
          this.selectedPlanId = obj?.planId
          this.isLoading = !this.isLoading
          this.$axios
            .post(`/productionOrderNew/prepareCreateEditModelOperation`, {
              id: obj?.planId,
            })
            .then(({ data }) => {
              this.openPopup = data?.openPopup
              this.planningModelOperationColumns =
                data.planningModelOperationColumns
              this.planningModelOperationListJson =
                data.planningModelOperationListJson
              this.isShowHide = true
              this.isLoading = !this.isLoading
            })
            .catch((error) => {
              this.isLoading = !this.isLoading
              // eslint-disable-next-line no-console
              console.log(error)
            })
        } else this.$notification('planId not found')
      } else if (type === 'edit') {
        colSubName === 'colorVariant'
          ? this.$set(this.bodyData[index], 'isEditColVar', true)
          : colSubName === 'description'
          ? this.$set(this.bodyData[index], 'isEditDesc', true)
          : this.$set(this.bodyData[index][colSubName], 'isEdit', true)
      } else if (type === 'cansel') {
        colSubName === 'colorVariant'
          ? this.$set(this.bodyData[index], 'isEditColVar', false)
          : colSubName === 'description'
          ? this.$set(this.bodyData[index], 'isEditDesc', false)
          : this.$set(this.bodyData[index][colSubName], 'isEdit', false)
      } else if (type === 'save') {
        // Save action ==================================================
        if (
          colSubName === 'colorVariant' &&
          (this.allSelectAndInputValue[index]?.[colSubName] ||
            this.allSelectAndInputValue[index]?.color)
        ) {
          const body = {
            id: this.bodyData[index]?.orderItemId,
            colorId: this.allSelectAndInputValue[index]?.color,
            colorVariantId: this.allSelectAndInputValue[index]?.[colSubName],
          }
          this.$axios
            .post(`/productionOrderNew/editProductionOrderItem`, body)
            .then(() => {
              this.$emit('emitAction', true)
            })
          this.$set(this.bodyData[index], 'isEditColVar', false)
        } else if (
          colSubName === 'description' &&
          this.allSelectAndInputValue[index]?.[colSubName]
        ) {
          const body = {
            id: this.bodyData[index]?.orderItemId,
            notes: this.allSelectAndInputValue[index]?.[colSubName],
          }
          this.$axios
            .post(`/productionOrderNew/editProductionOrderItem`, body)
            .then(() => {
              this.$emit('emitAction', true)
            })
          this.$set(this.bodyData[index], 'isEditDesc', false)
        } else if (
          this.allSelectAndInputValue[index]?.qty ||
          this.allSelectAndInputValue[index]?.planReqQty
        ) {
          const body = {
            id: obj?.planId,
            qty: this.allSelectAndInputValue[index]?.qty,
            perQty: this.allSelectAndInputValue[index]?.planReqQty,
          }
          this.$axios
            .post(`/productionOrderPlanning/productionOrderPlanningEdit`, body)
            .then(() => {
              this.$emit('emitAction', true)
            })
          this.$set(this.bodyData[index][colSubName], 'isEdit', false)
        }
      } else if (colSubName === 'productProductionTypeName') {
        this.$refs.messageBoxRef.open(
          this.bodyData[index]?.orderItemId,
          index,
          type
        )
      }
    },

    // Create Barcode Pack Action
    createBarcodePackAndUpdateBarcodeAction(type) {
      if (this.selectedPlanId)
        this.$refs.messageBoxRef.open(this.selectedPlanId, '', type)
    },

    // Message box action
    getEmitProp(propMessage, id, index, type) {
      if (propMessage === 'confirm' && type === 'createBarcodePack') {
        const body = { planId: id, kroyId: null, cardProxy: '' }
        this.$axios
          .post(`/productionOrderNew/createBarcodeUrl`, body)
          .then(() => {
            this.sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction('sizeItem', {
              planId: id,
            })
            this.$notification('Success', 'Success', 'success')
          })
          .catch((error) => {
            this.$notification('Error', 'Error', 'error')
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (propMessage === 'confirm' && type === 'updateBarcode') {
        const body = { planId: id }
        this.$axios
          .post(`/productionOrderNew/updateOperationBarcodeUrl`, body)
          .then(() => {
            this.sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction('sizeItem', {
              planId: id,
            })
            this.$notification('Success', 'Success', 'success')
          })
          .catch((error) => {
            this.$notification('Error', 'Error', 'error')
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Response dan qaytgan data'ga static data set qilish
    staticSetDataAction(resArray) {
      return resArray.map((obj) => {
        if (obj?.id) {
          obj = { ...obj, invoice: { id: this.pageID } }
        }

        // bu tekshiruv vaqtincha bo'lishi mumkin | tavsiya etilmaydi
        for (const key in obj) {
          if (typeof obj[key] === 'object' && !obj[key]?.id) {
            delete obj[key]
          }
        }
        // bu tekshiruv vaqtincha bo'lishi mumkin | tavsiya etilmaydi
        return obj
      })
    },
    // Response dan qaytgan data'ga static data set qilish

    // Save button'ni disabled qilish
    getDisabledValue(disabledVal) {
      this.saveBtnDisabled = disabledVal
    },

    // EMIT action
    getRowElements(arr, hideBtn) {
      // list set qilish
      this.planningModelOperationListJson = this.staticSetDataAction(arr)

      // Start Request body
      const body = {}
      body.id = this.selectedPlanId
      body.planningModelOperationList = this.planningModelOperationListJson
      // End Request body

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/productionOrderNew/prepareCreateEditModelOperation`, body)
        .then(({ data }) => {
          this.planningModelOperationListJson =
            data?.planningModelOperationListJson
          this.hideButton = !hideBtn
          this.uiShowHide = true
          this.isLoading = !this.isLoading
          this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Ma'lumot saqlanmadi!`, 'Error', 'error')
        })
    },

    // Save btn action
    saveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getSaveRowAction()
    },

    // discard sewModelOperation
    discardAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.discardArrayFiltered()
      this.planningModelOperationListJson =
        this.planningModelOperationListJson.filter((obj) => obj?.id)
      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // edit sewModelOperation
    editAction() {
      this.hideButton = !this.hideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // Data created action
    createTableHeadDataAction(headObj) {
      this.headData = []
      this.bodyData = []
      for (const key in headObj) {
        const obj = {}
        if (headObj[key]) {
          obj.name = headObj[key]
          obj.subName =
            key === 'productionType' ? 'productProductionTypeName' : key
          this.headData.push(obj)
        }
      }
      const total = {
        name: 'Total',
        subName: 'total',
      }
      const action = {
        name: 'Action',
        subName: 'action',
      }
      this.headData.push(total)
      this.headData.push(action)
      // ==============================  Body data created
      this.orderList.forEach((obj, i) => {
        if (i !== 0) {
          obj.action = [
            { name: 'Add Kroy Top', type: 'primary', clickType: 'addKroyTop' },
            {
              name: 'Add Kroy Bottom',
              type: 'primary',
              clickType: 'addKroyBottom',
            },
            { name: 'Add', type: 'warning', clickType: 'add' },
            {
              name: 'Add Production Invoice',
              type: 'primary',
              clickType: 'addProductionInvoice',
            },
          ]
          this.bodyData.push(obj)
        }
      })
    },

    // Static data set action
    staticSetKroyDataAction(type, rowObj) {
      // Set Size Item
      let count = 5
      for (const key in rowObj) {
        const newObj = {}
        if (key?.includes('size')) {
          newObj.name = rowObj[key]?.productionOrderSizeName
          newObj.subName =
            type === 'addProductionInvoice'
              ? `${rowObj[key]?.planId}planid${rowObj[key]?.planId}item${count}`
              : `${rowObj[key]?.planId}item${count}`
          newObj.type = 'number'
          newObj.item = true
          type === 'addKroyTop'
            ? this.kroyTopHeadData.push(newObj)
            : type === 'addKroyBottom'
            ? this.kroyBottomHeadData.push(newObj)
            : type === 'addProductionInvoice'
            ? this.productionInvoiceHeadData.push(newObj)
            : console.log(type)
          count++
        }
      }
      // Set Size Item

      // Set Action Column
      const action = {
        name: 'Action',
        type: 'btns',
        list: [
          {
            subName: 'all',
            type: 'checkbox',
          },
          {
            subName: 'action',
            type: 'btn',
            btnType: 'danger',
            icon: 'delete',
            circle: true,
          },
        ],
      }
      type === 'addKroyTop'
        ? this.kroyTopHeadData.push(action)
        : type === 'addKroyBottom'
        ? this.kroyBottomHeadData.push(action)
        : type === 'addProductionInvoice'
        ? this.productionInvoiceHeadData.push(action)
        : console.log(type)
      // Set Action Column
    },

    // All Button Click Action
    allBtnClickAction(type, index, rowObj) {
      console.log(rowObj)

      if (type === 'addKroyTop') {
        const headKroy = [
          {
            name: 'Id',
            subName: 'id',
            type: 'text',
            id: rowObj?.number,
          },
          {
            name: '№',
            subName: `${rowObj?.orderItemId}number1`,
            type: 'number',
          },
          {
            name: 'Color',
            subName: 'item2',
            type: 'text',
            item2: rowObj?.color,
            itemId2: rowObj?.colorId,
          },
          {
            name: 'Color Variant',
            subName: 'item3',
            type: 'text',
            item3: rowObj?.colorVariant,
            itemId3: rowObj?.colorVariantId,
          },
          {
            name: 'Size',
            subName: 'item4',
            type: 'text',
            item4: 'Qty',
          },
        ]
        this.kroyTopHeadData = headKroy
        this.staticSetKroyDataAction(type, rowObj) // function
      } else if (type === 'addKroyBottom') {
        const headKroy = [
          {
            name: 'Id',
            subName: 'id',
            type: 'text',
            id: rowObj?.number,
          },
          {
            name: '№',
            subName: `0_${rowObj?.orderItemId}item1`,
            type: 'number',
          },
          {
            name: 'Color',
            subName: 'item2',
            type: 'select',
            api: 'findAllColor',
            item2: rowObj?.color,
            itemId2: rowObj?.colorId,
          },
          {
            name: 'Color Variant',
            subName: 'item3',
            type: 'text',
            item3: rowObj?.colorVariant,
            itemId3: rowObj?.colorVariantId,
          },
          {
            name: 'Size',
            subName: 'item4',
            type: 'text',
            item4: 'Qty',
          },
        ]
        this.kroyBottomHeadData = headKroy
        this.staticSetKroyDataAction(type, rowObj) // function
      } else if (type === 'add') {
        console.log(type, '|', index)
      } else if (type === 'addProductionInvoice') {
        const headProductionInvoice = [
          {
            name: 'Id',
            subName: 'id',
            type: 'text',
            id: rowObj?.number,
          },
          {
            name: 'Color',
            subName: 'item1',
            type: 'text',
            item1: rowObj?.color,
            itemId1: rowObj?.colorId,
          },
          {
            name: 'Grade',
            subName: 'item2',
            type: 'select',
            api: 'findAllGrade',
            item2: rowObj?.grade,
            itemId2: rowObj?.gradeId,
          },
          {
            name: 'Department',
            subName: 'item3',
            type: 'text',
            item3: rowObj?.department,
            itemId3: rowObj?.departmentId,
          },
          {
            name: 'Size',
            subName: 'item4',
            type: 'text',
            item4: 'Qty',
          },
        ]
        this.productionInvoiceHeadData = headProductionInvoice
        this.staticSetKroyDataAction(type, rowObj) // function
      }
    },
  },
}
</script>

<style scoped>
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
