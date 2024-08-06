<template>
  <div>
    <div
      class="flex flex-col items-start overflow-scroll"
      :style="`height:${height}px`"
    >
      <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)] sticky top-[-1px]">
          <tr>
            <th
              v-for="(headName, key) in tablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
              :class="`w-[${headName?.width}px]`"
            >
              {{ headName.name }}
            </th>
            <th
              class="w-[100px] text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="istherebody">
            <tr
              v-for="(value, index) in tablebody"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
            >
              <td
                v-for="(key, inx) in tablehead"
                :key="inx"
                class="border-[1px] text-[12px] p-2"
              >
                <span
                  v-if="
                    (key?.code === 'status' &&
                      $route.path.includes('batchProcess.htm')) ||
                    (key?.code === 'status' &&
                      $route.path.includes('stages.htm')) ||
                    (key?.code === 'active' &&
                      $route.path.includes('batchProcessStages.htm'))
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.active)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'saleInfoParam' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.saleInfoParam)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'autoSave' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.autoSave)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'onlyOnceInColorVariant' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.onlyOnceInColorVariant)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'autoStartStopBefore' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.autoStartStopBefore)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'useEquipment' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.useEquipment)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'checkPreviousStageEndStatus' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value.checkPreviousStageEndStatus)"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <span
                  v-else-if="
                    key?.code === 'processStatusStr' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span class="bg-[rgb(102,149,51)] px-[5px] rounded-md">{{
                    value[key.code]
                  }}</span>
                </span>
                <span
                  v-else-if="
                    key?.code === 'status' ||
                    key?.code === 'invoiceOnWayStatus' ||
                    key?.code === 'type' ||
                    key?.code === 'orderProductionType'
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key.code]"
                >
                </span>
                <span
                  v-else-if="key.code === 'invoiceConfirmedStatus'"
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                  v-html="value[key.code]"
                ></span>

                <!-- Bill Status col -->
                <span
                  v-else-if="
                    key.code === 'invoiceBillStatus' &&
                    String(value[key.code]).includes('Not')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                  v-html="value[key.code]"
                ></span>
                <span
                  v-else-if="
                    key.code === 'invoiceBillStatus' &&
                    !String(value[key.code]).includes('Not')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key.code]"
                ></span>
                <span
                  v-else-if="
                    (key.code === 'batchNumber' ||
                      key.code === 'product' ||
                      key.code === 'colorVariant' ||
                      key.code === 'batchPrintedCount' ||
                      key.code === 'ready_info_product' ||
                      key.code === 'ready_info_qty' ||
                      key.code === 'ready_info_qty2' ||
                      key.code === 'ready_info_real_count' ||
                      key.code === 'sale_qty' ||
                      key.code === 'sale_qty2' ||
                      key.code === 'sale_dates' ||
                      key.code === 'batchColorVariantPrintedCount') &&
                    $route.path.includes('batches.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)] text-nowrap"
                  v-html="value[key.code]"
                ></span>
                <!-- Bill Status col -->
                <img
                  v-else-if="key.code === 'images'"
                  :src="
                    value?.[key?.code]
                      ? value?.[key?.code]
                      : '@assets/images/no-image.png'
                  "
                  :alt="value?.[key?.code]"
                  class="w-[50px]"
                />
                <span
                  v-else-if="
                    $route.path.includes('colors.htm') &&
                    key?.code === 'code' &&
                    value[key.code]
                  "
                  class="flex items-center gap-2"
                >
                  <span
                    class="w-[15px] h-[15px] block rounded-[50%]"
                    :style="{ backgroundColor: value[key.code] }"
                  >
                  </span>
                  {{ value[key.code] }}
                </span>
                <span
                  v-else-if="
                    $route.path.includes('designVariants.htm') &&
                    key?.code === 'recipe'
                  "
                >
                  <generic-button name="recipeDesignItem" type="primary" />
                </span>
                <span v-else>
                  {{ value[key.code] }}
                </span>
              </td>

              <!-- productions uchun -->
              <td v-if="productionsActionButtons" class="border-[1px] p-2">
                <span
                  v-if="
                    $route.path.includes('sewmodel.htm') ||
                    $route.path.includes('batchunions.htm') ||
                    $route.path.includes('colorVariantRecipeStageGroup.htm') ||
                    $route.path.includes('batches.htm') ||
                    $route.path.includes('colorVariant.htm') ||
                    $route.path.includes('salesorder.htm') ||
                    $route.path.includes('purchaseorder.htm') ||
                    $route.path.includes('iplikLotStavka.htm')
                  "
                  class="flex items-center justify-center gap-2 p-2"
                >
                  <generic-button
                    name="Open"
                    type="success"
                    icon-name-attribute="edit"
                    @click="$router.push(`${openUrl}.htm/${value.id}`)"
                  />
                </span>
                <span v-else class="flex items-center justify-center gap-2 p-2">
                  <GenericButton
                    name="View"
                    type="primary"
                    @click="goToNextAction(value?.id, 'view')"
                  />
                  <GenericButton
                    name="Edit"
                    type="success"
                    icon-name-attribute="edit"
                    @click="goToNextAction(value?.id, 'edit')"
                  />
                  <GenericButton
                    name="Delete"
                    type="danger"
                    icon-name-attribute="delete"
                    @click="rowDelAction(value.id)"
                  />
                </span>
              </td>

              <!-- invoices uchun -->
              <td v-else class="border-[1px] p-2">
                <span class="flex items-center justify-center gap-2">
                  <generic-button
                    v-if="!$route.path.includes('simpleProductionInvoice.htm')"
                    name="Open"
                    type="primary"
                    icon-name-attribute="edit"
                    @click="$router.push(`${openUrl}.htm/${value.id}`)"
                  />
                  <generic-button
                    v-if="$route.path.includes('simpleProductionInvoice.htm')"
                    name="Edit"
                    type="success"
                    icon-name-attribute="edit"
                    @click="$router.push(`${openUrl}.htm/${value.id}`)"
                  />
                  <generic-button
                    v-if="
                      $route.path.includes('internalInvoice.htm') ||
                      $route.path.includes('viabranchreceive.htm') ||
                      $route.path.includes('productionorder.htm')
                    "
                    :name="btnName"
                    type="primary"
                    @click="$router.push(`${openUrlTwo}.htm/${value.id}`)"
                  />
                  <GenericButton
                    v-if="
                      !$route.path.includes('salesReturn.htm') &&
                      !$route.path.includes('inputReturn.htm') &&
                      !$route.path.includes('simpleProductionInvoice.htm') &&
                      !$route.path.includes('outputToPrOrder.htm') &&
                      !$route.path.includes('outputToServiceInvoice.htm') &&
                      !$route.path.includes('inputToServiceInvoice.htm') &&
                      !$route.path.includes('outputToPrOrderReturn.htm') &&
                      !$route.path.includes('outputToProductionCompany.htm') &&
                      !$route.path.includes(
                        'outputToProductionCompanyReturn.htm'
                      ) &&
                      !$route.path.includes('purchaseServiceInvoice.htm') &&
                      !$route.path.includes('saleServiceInvoice.htm') &&
                      !$route.path.includes('internalInvoice.htm') &&
                      !$route.path.includes('viabranchreceive.htm') &&
                      !$route.path.includes('productionorder.htm')
                    "
                    name="qrCode"
                    type="success"
                  />
                  <GenericButton
                    v-if="
                      !$route.path.includes('salesReturn.htm') &&
                      !$route.path.includes('inputReturn.htm') &&
                      !$route.path.includes('simpleProductionInvoice.htm') &&
                      !$route.path.includes('outputToPrOrder.htm') &&
                      !$route.path.includes('outputToServiceInvoice.htm') &&
                      !$route.path.includes('inputToServiceInvoice.htm') &&
                      !$route.path.includes('outputToPrOrderReturn.htm') &&
                      !$route.path.includes('outputToProductionCompany.htm') &&
                      !$route.path.includes(
                        'outputToProductionCompanyReturn.htm'
                      ) &&
                      !$route.path.includes('purchaseServiceInvoice.htm') &&
                      !$route.path.includes('saleServiceInvoice.htm') &&
                      !$route.path.includes('internalInvoice.htm') &&
                      !$route.path.includes('viabranchreceive.htm') &&
                      !$route.path.includes('productionorder.htm')
                    "
                    name="forDevice"
                    type="success"
                  />
                </span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td
                :colspan="tableheadlength"
                class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
              >
                <div class="flex justify-start">
                  <el-empty
                    :image-size="70"
                    description="No Data"
                    style="padding: 0"
                  ></el-empty>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] py-3 bg-gradient-to-b from-transparent via-transparent to-gray-100 shadow-md flex items-center justify-center"
    >
      <generic-pagination :total="10" />
    </div>
  </div>
</template>

<script>
import GenericButton from '@components/Generics/GenericButton.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPagination from '@components/Generics/GenericPagination.vue'
export default {
  components: {
    GenericButton,
    MessageBox,
    GenericPagination,
  },

  // PROPS
  props: {
    tablehead: {
      type: Object,
      default: () => ({}),
    },
    tablebody: {
      type: Array,
      default: () => [],
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    istherebody: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '0',
    },
    openUrl: {
      type: String,
      default: '',
    },
    openUrlTwo: {
      type: String,
      default: '',
    },
    btnName: {
      type: String,
      default: '',
    },
    productionsActionButtons: {
      type: Boolean,
      default: false,
    },
    deleteRowUrl: {
      type: String,
      default: '',
    },
  },

  // METHODS
  methods: {
    goToNextAction(rowID, btnName) {
      if (btnName === 'view')
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify({ id: rowID, type: 'view' })
        )
      else if (btnName === 'edit')
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify({ id: rowID, type: 'edit' })
        )
      this.$router.push(`${this.openUrl}.htm/${rowID}`)
    },

    // row delete action
    rowDelAction(id) {
      this.$refs.messageBoxRef.open(id)
    },

    // Message box EMIT action
    getEmitProp(propMessage, id) {
      if (propMessage === 'confirm') {
        this.$axios
          .delete(`/${this.deleteRowUrl}`, {
            data: {
              id,
              pagingForm: {
                pageSize: 25,
                currentPage: 1,
                pageCount: 14,
                total: 328,
              },
            },
          })
          .then(({ status }) => {
            if (status < 300) this.$emit('pageEmitAction', true)
          })
      }
    },
  },
}
</script>
