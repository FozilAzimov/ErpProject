<template>
  <div class="max-h-[500px] overflow-scroll my-1">
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
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
              <div v-if="row[subName]?.isEdit" class="flex items-center gap-1">
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
              {{ row[subName] }}
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
</template>

<script>
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericLookUp,
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
      headData: [],
      bodyData: [],
      allSelectAndInputValue: [],
      kroyGropedArr: [],
      totalRowDataObj: {},
      isTotal: false,
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

  // METHODS
  methods: {
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
      if (type === 'edit') {
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

    // Message box action
    getEmitProp(propMessage, id, index, type) {
      if (propMessage === 'confirm') {
        const body = { prOrderItemId: id }
        if (type === 'updateBarcode') {
          body.datadata = 0
          body.typeStr = 4
        } else {
          body.datadata = 1
          body.typeStr = 4
        }
        this.$axios
          .post(`/productionOrderNew/updateOperationBarcodeUrl`, body)
          .then(() => {
            this.$notification('Successfully Deleted', 'Deleted', 'success')
          })
          .catch((error) => {
            this.$notification('Error Deleted', 'Not Deleted', 'error')
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
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
  },
}
</script>
