<template>
  <div>
    <div
      class="flex flex-col items-start overflow-scroll"
      :style="`height:${height}px`"
    >
      <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)] sticky top-[-1px] z-[1000]">
          <tr>
            <th
              v-for="(headName, key) in tablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] py-4 px-2 cursor-pointer whitespace-nowrap"
              :class="`w-[${headName?.dwidth}px]`"
              @click="sortedRowAction(headName.code)"
            >
              <div class="flex items-center justify-between">
                <span>
                  <!-- style uchun ishlatilgan -->
                  <!-- <pre>{{ headName }}</pre> -->
                </span>
                {{ GET_CORE_STRING?.[headName.name] || headName.name }}
                <i
                  v-if="allSortOrderObj?.[headName.code] === 1"
                  class="el-icon-caret-top ml-2"
                ></i>
                <i
                  v-else-if="allSortOrderObj?.[headName.code] === -1"
                  class="el-icon-caret-bottom ml-2"
                ></i>
                <i v-else class="el-icon-d-caret ml-2"></i>
              </div>
            </th>
            <th
              v-if="showHideActionCol"
              class="w-[100px] text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
            >
              {{ GET_CORE_STRING?.['common.table.title.action'] || 'Action' }}
            </th>
          </tr>
        </thead>

        <tbody>
          <template v-if="istherebody">
            <tr
              v-for="(value, index) in sortedData"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] hover:bg-[rgb(239,243,247)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-transparent transition-all duration-300 ease-in-out"
            >
              <td
                v-for="(key, inx) in tablehead"
                :key="inx"
                class="border-[1px] text-[12px] p-2"
                :style="{
                  background:
                    routerPath === 'productionorder' &&
                    value?.status === 'CLOSED'
                      ? 'green'
                      : routerPath === 'productionorder' &&
                        value?.status === 'SOLD'
                      ? '#1baedf'
                      : routerPath === 'productionorder' &&
                        value?.status === 'PRODUCED'
                      ? 'lightgreen'
                      : routerPath === 'productionorder' &&
                        value?.status === 'CUTTED'
                      ? '#dfde0d'
                      : 'linear-gradient(to bottom, transparent, transparent, #F4F4F4)',
                }"
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
                      $route.path.includes('departments.htm')) ||
                    (key?.code === 'active' &&
                      ($route.path.includes('warehouses.htm') ||
                        $route.path.includes('positions.htm') ||
                        $route.path.includes('producttransfercodes.htm') ||
                        $route.path.includes('characteristics.htm') ||
                        $route.path.includes('characterDetails.htm') ||
                        $route.path.includes('productEntryTypes.htm') ||
                        $route.path.includes('manufacturers.htm') ||
                        $route.path.includes('articles.htm') ||
                        $route.path.includes('equipments.htm') ||
                        $route.path.includes('productionArticles.htm') ||
                        $route.path.includes('subDepartments.htm') ||
                        $route.path.includes('phoneNumbers.htm') ||
                        $route.path.includes('cashboxs.htm') ||
                        $route.path.includes('transactionCharacters.htm') ||
                        $route.path.includes('currencies.htm') ||
                        $route.path.includes('banks.htm') ||
                        $route.path.includes('branches.htm') ||
                        $route.path.includes('accounts.htm') ||
                        $route.path.includes('paymenttypes.htm') ||
                        $route.path.includes('paymenttypegroups.htm') ||
                        $route.path.includes('doors.htm') ||
                        $route.path.includes('productcategories.htm')))
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
                    ((key?.code === 'system_company' ||
                      key?.code === 'physical' ||
                      key?.code === 'companyBranch' ||
                      key?.code === 'active') &&
                      $route.path.includes('companies.htm')) ||
                    (key?.code === 'arrow' &&
                      $route.path.includes('manufacturers.htm'))
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

                <!-- teg filter -->
                <span
                  v-else-if="
                    key?.code === 'type' && $route.path.includes('logs.htm')
                  "
                >
                  <span
                    v-if="value?.[key?.code] === 1"
                    class="bg-[#43A1DA] text-[11px] italic p-[0px_5px] text-white rounded-sm"
                    >Create</span
                  >
                  <span
                    v-if="value?.[key?.code] === 2"
                    class="bg-[#9E6AB8] text-[11px] italic p-[0px_5px] text-white rounded-sm"
                    >Edit</span
                  >
                  <span
                    v-if="value?.[key?.code] === 3"
                    class="bg-[#D41E24] text-[11px] italic p-[0px_5px] text-white rounded-sm"
                    >Delete</span
                  >
                  <span
                    v-if="value?.[key?.code] === 4"
                    class="bg-[#5B8793] text-[11px] italic p-[0px_5px] text-white rounded-sm"
                    >Other</span
                  >
                  <span
                    v-if="value?.[key?.code] === 5"
                    class="bg-[#7BB33D] text-[11px] italic p-[0px_5px] text-white rounded-sm"
                    >View</span
                  >
                </span>
                <!-- teg filter -->

                <span
                  v-else-if="
                    typeof value[key?.code] === 'boolean' &&
                    (key?.code === 'status' ||
                      key?.code === 'invoiceOnWayStatus' ||
                      key?.code === 'type' ||
                      key?.code === 'orderProductionType' ||
                      key?.code === 'oder_payment_status')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key?.code]"
                >
                </span>

                <!-- Bill Status col -->
                <span
                  v-else-if="
                    (key.code === 'client' &&
                      $route.path.includes('batchDetailsList.htm')) ||
                    (key.code === 'unitprice' &&
                      $route.path.includes('products.htm')) ||
                    ((key?.code === 'sew_barcode_created_qty' ||
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

                <!-- start IMAGE -->
                <span
                  v-else-if="
                    key?.code === 'images' ||
                    key?.code === 'image' ||
                    key?.code === 'mainImage' ||
                    key?.code === 'face' ||
                    key?.code === 'productimg' ||
                    key?.code === 'sewmodelimg' ||
                    key?.code === 'faceIdImg'
                  "
                >
                  <img
                    v-if="value?.[key?.code]?.includes('no_product')"
                    :src="require('@images/no-image.png')"
                    :alt="value?.[key?.code]"
                    class="w-[50px]"
                  />
                  <img
                    v-else-if="value?.[key?.code]?.includes('faceNo')"
                    :src="require('@images/faceNo.png')"
                    :alt="value?.[key?.code]"
                    class="w-[50px]"
                  />
                  <img
                    v-else
                    :src="
                      value?.[key?.code]
                        ? value?.[key?.code]
                        : require('@images/no-image.png')
                    "
                    :alt="value?.[key?.code]"
                    class="w-[50px]"
                  />
                </span>
                <!-- end IMAGE -->
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
                    ($route.path.includes('designVariants.htm') &&
                      key?.code === 'recipe') ||
                    ($route.path.includes('equipments.htm') &&
                      key?.code === 'calendar')
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
                    v-else-if="value.id"
                    name="Calendar"
                    type="success"
                    icon-name-attribute="zoom-in"
                    @click="
                      $router.push(
                        `/prepareEquipmentServicesCalendar.htm/${value.id}`
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
                <template
                  v-else-if="
                    typeof value?.[key?.code] === 'string' &&
                    value[key?.code]?.includes('<') &&
                    value[key?.code]?.includes('>')
                  "
                >
                  <span
                    v-if="value[key?.code]?.includes('background')"
                    class="p-[0px_5px] italic text-white font-bold rounded-[5px]"
                    v-html="value[key?.code]"
                  ></span>
                  <span
                    v-else-if="value[key?.code]?.includes('success')"
                    class="p-[0px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                    v-html="value[key?.code]"
                  ></span>
                  <span
                    v-else-if="value[key?.code]?.includes('important')"
                    class="p-[0px_5px] italic text-white font-bold rounded-[5px] bg-[#BD4247]"
                    v-html="value[key?.code]"
                  ></span>
                  <span
                    v-else-if="value[key?.code]?.includes('label-warning')"
                    class="p-[0px_5px] italic text-white font-bold rounded-[5px] bg-[#dd5600]"
                    v-html="value[key?.code]"
                  ></span>
                  <span
                    v-else-if="value[key?.code]?.includes('label-success')"
                    class="p-[0px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                    v-html="value[key?.code]"
                  ></span>
                  <span v-else v-html="value[key?.code]"></span>
                </template>
                <!-- All html elements -->
                <span
                  v-else-if="
                    key?.code === 'person' &&
                    $route.path.includes('tableRowAccessSysUser.htm')
                  "
                >
                  {{ value?.[key?.code1] }}
                  {{ value?.[key?.code2] }}
                  {{ value?.[key?.code3] }}
                  - Login: ({{ value?.[key?.code4] }})
                </span>
                <generic-check-box
                  v-else-if="
                    $route.path?.includes('logs.htm') && key?.code === 'check'
                  "
                  :name="key?.code"
                />
                <!-- ProductionOrder page uchun -->
                <span
                  v-else-if="
                    routerPath === 'productionorder' &&
                    key?.code === 'status' &&
                    value?.[key.code] === 'SAVE'
                  "
                >
                  {{
                    value?.order_prod_diff <= 0
                      ? GET_CORE_STRING?.ready
                      : GET_CORE_STRING?.action
                  }}
                </span>
                <span v-else>
                  {{ value?.[key?.code?.toLowerCase()] ?? value?.[key?.code] }}
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
                    v-if="
                      !$route.path.includes('products.htm') &&
                      !$route.path.includes('permissionGroups.htm') &&
                      !$route.path.includes('capitals.htm') &&
                      !$route.path.includes('obligations.htm') &&
                      !$route.path.includes('profitsAndLosses.htm') &&
                      !$route.path.includes('intangibleAssets.htm') &&
                      !$route.path.includes('purchaseorder.htm')
                    "
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
                      $route.path.includes('products.htm') ||
                      $route.path.includes('users.htm') ||
                      $route.path.includes('purchaseorder.htm')
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
                  <GenericButton
                    v-if="!$route.path.includes('purchaseorder.htm')"
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
                    v-if="!routerPath.includes('simpleProductionInvoice')"
                    :name="`Open ${
                      routerPath?.includes('productioninvoice') &&
                      value?.invoiceType
                        ? value?.invoiceType
                        : routerPath?.includes('outputToPrOrder') &&
                          value?.statusType
                        ? value?.statusType
                        : ''
                    }`"
                    type="primary"
                    icon-name-attribute="edit"
                    @click="
                      if (routerPath.includes('productioninvoice')) {
                        if (value?.invoiceType === 'IPLIK') {
                          $router.push({
                            path: `${openUrl}.htm/${value.id}`,
                            query: {
                              productionInvoiceType: true,
                            },
                          })
                        } else if (value?.invoiceType === 'WOVEN') {
                          $router.push({
                            path: `${openUrl}.htm/${value.id}`,
                            query: {
                              productionInvoiceTypeWoven: true,
                            },
                          })
                        } else {
                          $router.push({
                            path: `${openUrl}.htm/${value.id}`,
                            query: {
                              internalStatus: true,
                            },
                          })
                        }
                      } else $router.push(`${openUrl}.htm/${value.id}`)
                    "
                  />
                  <generic-button
                    v-if="routerPath?.includes('simpleProductionInvoice')"
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
                    :name="customBtn?.name"
                    :type="customBtn?.type ? customBtn?.type : 'primary'"
                    :icon-name-attribute="customBtn?.icon"
                    @click="$router.push(`${customBtn?.url}.htm/${value.id}`)"
                  />
                  <GenericButton
                    v-if="
                      !$route.path.includes('salesReturn.htm') &&
                      !$route.path.includes('inputReturn.htm') &&
                      !$route.path.includes('expenseInvoice.htm') &&
                      !$route.path.includes('inputFromProductionCompany.htm') &&
                      !$route.path.includes('simpleProductionInvoice.htm') &&
                      !$route.path.includes('productioninvoice.htm') &&
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
                      !$route.path.includes('personSalaries.htm') &&
                      !$route.path.includes('colorVariant.htm')
                    "
                    name="qrCode"
                    type="success"
                  />
                  <GenericButton
                    v-if="
                      !$route.path.includes('salesReturn.htm') &&
                      !$route.path.includes('inputReturn.htm') &&
                      !$route.path.includes('expenseInvoice.htm') &&
                      !$route.path.includes('inputFromProductionCompany.htm') &&
                      !$route.path.includes('simpleProductionInvoice.htm') &&
                      !$route.path.includes('productioninvoice.htm') &&
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
                      !$route.path.includes('personSalaries.htm') &&
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
                :colspan="Object.keys(tablehead)?.length"
                class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
              >
                <div class="flex justify-start">
                  <el-empty
                    :image-size="40"
                    description="No Data"
                    style="padding: 0"
                  >
                    <template #description>
                      <p
                        style="
                          font-size: 10px;
                          margin-top: -17px;
                          color: #cccdd0;
                        "
                      >
                        {{
                          GET_CORE_STRING?.NoDataAvailableInTable || 'No data'
                        }}
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
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    GenericButton,
    MessageBox,
    GenericPagination,
    GenericCheckBox,
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

  // DATA
  data() {
    return {
      // table head col click sorted row elements
      sortKey: '',
      sortOrder: null,
      allSortOrderObj: {},
      // table head col click sorted row elements
      routerPath: null,
    }
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),

    // Sorted row
    sortedData() {
      return this.tablebody.slice().sort((a, b) => {
        if (this.sortKey) {
          const valueA = this.getNestedValue(a, this.sortKey)
          const valueB = this.getNestedValue(b, this.sortKey)
          if (
            typeof valueA === 'string' &&
            typeof valueB === 'string' &&
            valueA &&
            valueB
          ) {
            return this.sortOrder * valueA.localeCompare(valueB) // Sorting strings alphabetically
          } else if (
            typeof valueA === 'object' &&
            typeof valueB === 'object' &&
            valueA?.text &&
            valueB?.text
          ) {
            return this.sortOrder * valueA.text.localeCompare(valueB.text) // Sorting Object alphabetically
          } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return this.sortOrder * (valueA - valueB) // Sorting numbers
          }
        }
        return ''
      })
    },
  },

  // CREATED
  created() {
    // page TYPE ni aniqlash
    this.routerPath = this.$route?.name?.split('.')?.[0]
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

    // Row sorted
    sortedRowAction(column) {
      if (this.sortKey === column) {
        this.sortOrder = -this.sortOrder
      } else {
        this.sortKey = column
        this.sortOrder = 1
      }
      this.allSortOrderObj = {}
      this.$set(this.allSortOrderObj, column, this.sortOrder)
    },
    getNestedValue(object, keyPath) {
      return keyPath.split('.').reduce((acc, key) => acc && acc[key], object)
    },
    // Row sorted

    // row delete action
    rowDelAction(id) {
      this.$refs.messageBoxRef.open(id)
    },
    // Message box EMIT action
    getEmitProp(propMessage, id) {
      if (
        (this.routerPath === 'capitals' ||
          this.routerPath === 'obligations' ||
          this.routerPath === 'profitsAndLosses' ||
          this.routerPath === 'paymenttypegroups' ||
          this.routerPath === 'intangibleAssets') &&
        propMessage === 'confirm'
      ) {
        this.$axios.delete(`/${this.deleteRowUrl}/${id}`).then(({ status }) => {
          if (status < 300) this.$emit('pageEmitAction', true)
        })
      } else if (propMessage === 'confirm') {
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
        // eslint-disable-next-line no-console
        console.log(type)
      } else if (type === 'printer') {
        // eslint-disable-next-line no-console
        console.log(type)
      }
    },
  },
}
</script>
