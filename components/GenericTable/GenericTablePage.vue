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
              {{ GET_CORE_STRING?.[headName.name] || headName.name }}
            </th>
            <th
              v-if="showHideActionCol"
              class="w-[100px] text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
            >
              {{ GET_CORE_STRING?.['common.table.title.action'] }}
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
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'active' &&
                      $route.path.includes('orderproductiontypes.htm')) ||
                    (key?.code === 'active' &&
                      $route.path.includes('planningTypes.htm')) ||
                    (key?.code === 'active' &&
                      $route.path.includes('productproductiontypes.htm'))
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
                    key?.code === 'finalOperation' &&
                    $route.path.includes('iplikStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="JSON.parse(value?.[key?.code])"
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >YES</span
                  >
                </span>

                <!-- Start Enabled and Disabled -->
                <span
                  v-else-if="
                    (key?.code === 'saleInfoParam' &&
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'autoSave' &&
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'onlyOnceInColorVariant' &&
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'autoStartStopBefore' &&
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'useEquipment' &&
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'checkPreviousStageEndStatus' &&
                      $route.path.includes('batchProcessStages.htm')) ||
                    (key?.code === 'status' &&
                      $route.path.includes('departments.htm'))
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="
                      typeof value?.[key?.code] === 'boolean'
                        ? value?.[key?.code]
                        : JSON.parse(value?.[key?.code])
                    "
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Enebled</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >Disabled</span
                  >
                </span>
                <!-- End Enabled and Disabled -->
                <!-- Start YES and NO -->
                <span
                  v-else-if="
                    (key?.code === 'system_company' ||
                      key?.code === 'physical' ||
                      key?.code === 'companyBranch' ||
                      key?.code === 'active') &&
                    $route.path.includes('companies.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span
                    v-if="
                      typeof value?.[key?.code] === 'boolean'
                        ? value?.[key?.code]
                        : JSON.parse(value?.[key?.code])
                    "
                    class="bg-[rgb(102,149,51)] px-[5px] rounded-md"
                    >Yes</span
                  >
                  <span v-else class="bg-[#BD4247] px-[5px] rounded-md"
                    >No</span
                  >
                </span>
                <!-- End YES and NO -->

                <span
                  v-else-if="
                    key?.code === 'processStatusStr' &&
                    $route.path.includes('batchProcessStages.htm')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                >
                  <span class="bg-[rgb(102,149,51)] px-[5px] rounded-md">{{
                    value[key?.code]
                  }}</span>
                </span>
                <span
                  v-else-if="
                    key?.code === 'status' ||
                    key?.code === 'invoiceOnWayStatus' ||
                    key?.code === 'type' ||
                    key?.code === 'orderProductionType' ||
                    key?.code === 'oder_payment_status'
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key?.code]"
                >
                </span>
                <span
                  v-else-if="key.code === 'invoiceConfirmedStatus'"
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                  v-html="value[key?.code]"
                ></span>

                <!-- Bill Status col -->
                <span
                  v-else-if="
                    key.code === 'invoiceBillStatus' &&
                    String(value[key?.code]).includes('Not')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                  v-html="value[key?.code]"
                ></span>
                <span
                  v-else-if="
                    key.code === 'invoiceBillStatus' &&
                    !String(value[key?.code]).includes('Not')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key?.code]"
                ></span>
                <span
                  v-else-if="
                    (key.code === 'client' &&
                      $route.path.includes('batchDetailsList.htm')) ||
                    (key.code === 'unitprice' &&
                      $route.path.includes('products.htm')) ||
                    ((key?.code === 'productimg' ||
                      key?.code === 'sewmodelimg' ||
                      key?.code === 'sew_barcode_created_qty' ||
                      key?.code === 'sew_barcode_printed_qty' ||
                      key?.code === 'sew_barcode_read_qty' ||
                      key?.code.toLowerCase() === 'planningtypes' ||
                      key?.code.toLowerCase() === 'ordernumber' ||
                      key?.code.toLowerCase() === 'clientcode' ||
                      key?.code.toLowerCase() === 'duedate' ||
                      key?.code.toLowerCase() === 'orderqty' ||
                      key?.code.toLowerCase() === 'planningconfirmstatus') &&
                      $route.path.includes('productionorder.htm'))
                  "
                  v-html="value[key?.code.toLowerCase()]"
                >
                </span>
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
                  v-html="value[key?.code]"
                ></span>
                <!-- Bill Status col -->

                <img
                  v-else-if="
                    key?.code === 'images' ||
                    key?.code === 'image' ||
                    key?.code === 'mainImage'
                  "
                  :src="
                    value?.[key?.code]
                      ? `data:image/jpeg;base64,${value?.[key?.code]}`
                      : require('@images/no-image.png')
                  "
                  :alt="value?.[key?.code]"
                  class="w-[50px]"
                />
                <span
                  v-else-if="
                    $route.path.includes('colors.htm') &&
                    key?.code === 'code' &&
                    value[key?.code]
                  "
                  class="flex items-center gap-2"
                >
                  <span
                    class="w-[15px] h-[15px] block rounded-[50%]"
                    :style="{ backgroundColor: value[key?.code] }"
                  >
                  </span>
                  {{ value[key?.code] }}
                </span>
                <div
                  v-else-if="
                    $route.path.includes('designVariants.htm') &&
                    key?.code === 'recipe'
                  "
                  class="align-middle text-center"
                >
                  <generic-button
                    v-if="value.colorVariantId"
                    name="recipeDesignItem"
                    type="primary"
                    icon-name-attribute="zoom-in"
                    @click="
                      $router.push(
                        `/prepareDesignColorVariant.htm/${value.colorVariantId}`
                      )
                    "
                  />
                  <generic-button
                    v-else
                    name="recipeDesignItem"
                    type="primary"
                    icon-name-attribute="zoom-in"
                    :disabled="true"
                  />
                </div>
                <span
                  v-else-if="
                    $route.path.includes('colorVariant.htm') &&
                    key.code === 'color'
                  "
                  class="text-[#6E9BD7] hover:underline hover:cursor-pointer"
                  @click="
                    openNewTabAction('prepareColor', value?.colorId, 'edit')
                  "
                  >{{ value[key?.code] }}</span
                >
                <template
                  v-else-if="
                    $route.path.includes('batchDetailsList.htm') &&
                    key.code === 'batch_detail' &&
                    value[key?.code].length
                  "
                >
                  <span v-for="(obj, i) in value[key?.code]" :key="i">
                    <span
                      >{{ obj?.qqty }} -/- {{ obj?.product_barcode }} |
                      {{ obj?.productname }} =
                      <span class="text-red-600"
                        >{{ obj?.lastname }} {{ obj?.nextname }}</span
                      >
                    </span>
                    <br />
                  </span>
                </template>

                <!-- All html elements -->
                <span
                  v-else-if="
                    value?.[key?.code] &&
                    typeof value?.[key?.code] === 'string' &&
                    value?.[key?.code]?.includes('Enabled')
                  "
                  class="bg-[rgb(102,149,51)] p-[2px_5px] italic text-white font-bold rounded-[5px]"
                  v-html="value?.[key?.code]"
                ></span>
                <span
                  v-else-if="
                    value?.[key?.code] &&
                    typeof value?.[key?.code] === 'string' &&
                    value?.[key?.code]?.includes('Disabled')
                  "
                  class="bg-[#BD4247] p-[2px_5px] italic text-white font-bold rounded-[5px]"
                  v-html="value?.[key?.code]"
                ></span>
                <span
                  v-else-if="
                    typeof value?.[key?.code] === 'string' &&
                    value[key?.code]?.includes('<') &&
                    value[key?.code]?.includes('>')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px]"
                  v-html="value[key?.code]"
                ></span>
                <!-- All html elements -->

                <span v-else>
                  {{ value?.[key?.code] }}
                </span>
              </td>

              <!-- productions uchun -->
              <td
                v-if="productionsActionButtons && showHideActionCol"
                class="border-[1px] p-2"
              >
                <span
                  v-if="
                    $route.path.includes('sewmodel.htm') ||
                    $route.path.includes('batchunions.htm') ||
                    $route.path.includes('colorVariantRecipeStageGroup.htm') ||
                    $route.path.includes('batches.htm') ||
                    $route.path.includes('colorVariant.htm') ||
                    $route.path.includes('salesorder.htm') ||
                    $route.path.includes('purchaseorder.htm') ||
                    $route.path.includes('iplikLotStavka.htm') ||
                    $route.path.includes('tableRowAccessSysUser.htm') ||
                    $route.path.includes('languages.htm') ||
                    $route.path.includes('discounts.htm') ||
                    $route.path.includes('columnSettings.htm') ||
                    $route.path.includes('sewModelPackingType.htm')
                  "
                  class="flex items-center justify-center gap-2 p-2"
                >
                  <generic-button
                    name="Open"
                    type="success"
                    icon-name-attribute="edit"
                    @click="$router.push(`${openUrl}.htm/${value?.id}`)"
                  />
                </span>
                <span v-else-if="$route.path.includes('batchDetailsList.htm')">
                  <generic-button
                    name="Open"
                    type="success"
                    icon-name-attribute="edit"
                    @click="
                      openNewTabAction('prepareBatchNew', value?.batch_id)
                    "
                  />
                </span>
                <span v-else class="flex items-center justify-center gap-2 p-2">
                  <GenericButton
                    v-if="!$route.path.includes('products.htm')"
                    name="View"
                    type="primary"
                    icon-name-attribute="zoom-in"
                    @click="goToNextAction(value?.id, 'view')"
                  />
                  <GenericButton
                    name="Edit"
                    type="success"
                    icon-name-attribute="edit"
                    @click="goToNextAction(value?.id, 'edit')"
                  />
                  <generic-button
                    v-if="
                      $route.path.includes('departments.htm') ||
                      $route.path.includes('companies.htm') ||
                      $route.path.includes('products.htm')
                    "
                    :name="customBtn?.name"
                    :type="
                      customBtn?.type
                        ? customBtn?.type
                        : value?.blockedStatus
                        ? 'primary'
                        : 'danger'
                    "
                    :icon-name-attribute="customBtn?.icon"
                    @click="
                      customButtonAction(
                        customBtn?.clickType,
                        value?.id,
                        value?.blockedStatus
                      )
                    "
                  />
                  <!-- @click="$router.push(`${openUrlTwo}.htm/${value.id}`)" -->
                  <GenericButton
                    name="Delete"
                    type="danger"
                    icon-name-attribute="delete"
                    @click="rowDelAction(value.id)"
                  />
                </span>
              </td>

              <!-- invoices uchun -->
              <td v-else-if="showHideActionCol" class="border-[1px] p-2">
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
                    icon-name-attribute="edit"
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
                      !$route.path.includes('productionorder.htm') &&
                      !$route.path.includes('colorVariant.htm')
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
                      !$route.path.includes('productionorder.htm') &&
                      !$route.path.includes('colorVariant.htm')
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
                    :image-size="60"
                    description="No Data"
                    style="padding: 0"
                  >
                    <template #description>
                      <p style="font-size: 13px; margin-top: -10px">
                        {{ GET_CORE_STRING?.NoDataAvailableInTable }}
                      </p>
                    </template>
                  </el-empty>
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
import { mapGetters } from 'vuex'
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
      default: '',
    },
    openUrl: {
      type: String,
      default: '',
    },
    openUrlTwo: {
      type: String,
      default: '',
    },
    productionsActionButtons: {
      type: Boolean,
      default: false,
    },
    showHideActionCol: {
      type: Boolean,
      default: true,
    },
    deleteRowUrl: {
      type: String,
      default: '',
    },
    customBtn: {
      type: Object,
      default: () => ({}),
    },
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // METHODS
  methods: {
    goToNextAction(rowID, pageType) {
      this.$router.push({
        path: `${this.openUrl}.htm/${rowID}`,
        query: { page_type: pageType },
      })
    },

    // all new tab action
    openNewTabAction(api, id, pageType) {
      const queryParams = new URLSearchParams({
        page_type: pageType,
      }).toString()
      window.open(
        `/${api}.htm/${id}${pageType ? `?${queryParams}` : ''}`,
        '_blank'
      )
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

    // all custom btn action
    customButtonAction(type, id, status) {
      if (type === 'block') {
        this.$axios
          .post(`/editBlockedStatus`, {
            id,
            status: !status,
            pagingForm: {
              pageSize: 25,
              currentPage: 1,
            },
          })
          .then(({ status }) => {
            if (status < 300) this.$emit('pageEmitAction', true)
          })
      } else if (type === 'sticker') {
        console.log(type)
      }
    },
  },
}
</script>
