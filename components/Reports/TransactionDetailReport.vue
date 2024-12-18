<template>
  <div class="w-full p-[0px_12px_0px_4px]">
    <transition name="fade">
      <UniqueColumnConfig
        v-if="customTableData"
        :save-url="'saveColumnConfig'"
        :action-url="tableActionUrl"
        :dialog-visible="showModal"
        :visible-data="visibleHeaderArr"
        :hidden-data="hiddenHeaderArr"
        :checkbox-status="false"
        @newStatus="
          (value) => {
            showModal = value
          }
        "
        @newVisibleColumnData="
          (value, status) => {
            setNewColumnHeaders(value, status)
          }
        "
      />
    </transition>

    <template v-if="isCloseTable">
      <div
        class="border-[1px] mt-1 border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              GET_CORE_STRING?.['title.transactionDetailReport.sub'] ||
              'Transaction Detail Report'
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
              @click="showColumnConfig"
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
      <div :class="isOpenTable ? 'duration-[1s] h-[94%]' : 'duration-[1s] h-0'">
        <div
          class="border-[1px] border-[solid] border-[#dedede] p-[10px_5px] shadow-[0_0_10px_rgba(189,189,189,0.4)]"
        >
          <!-- {{ valueObject }}
            <br>
            {{lookupStatusObject}} -->
          <div class="flex">
            <!-- content filter section -->
            <div class="p-[15px] border-box">
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label> {{ GET_CORE_STRING?.startDate || 'Start date' }}</label>
                <UniqueDatePicker
                  :date-start="true"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'dateFrom')
                    }
                  "
                />
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label>{{ GET_CORE_STRING?.endDate || 'End date' }}</label>
                <UniqueDatePicker
                  :date-end="true"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'dateTo')
                    }
                  "
                />
              </div>
              <div
                v-if="transactionValue && transactionValue !== 'COMPANY'"
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{
                  GET_CORE_STRING?.companyGroup || 'Company Group'
                }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.companyGroupId"
                  :custom-url="'invoiceBase/findAllCompanyGroups'"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'companyGroupId')
                      valueObject.employeeId = null
                      valueObject.cashboxId = null
                      valueObject.branchAccountId = null
                      valueObject.branchCompanyId = null
                    }
                  "
                />
              </div>
              <div
                v-if="
                  transactionValue &&
                  transactionValue !== 'COMPANY' &&
                  transactionValue !== 'BRANCH'
                "
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>
                  {{ GET_CORE_STRING?.companyBranch || 'Company Branch' }}
                </label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.branchCompanyId"
                  :custom-parameter="{
                    branchcompany: true,
                    companyGroupId:
                      valueObject.companyGroupId &&
                      valueObject.companyGroupId.id
                        ? valueObject.companyGroupId.id
                        : null,
                  }"
                  :custom-url="'invoiceBase/findAllCompanyLogic'"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'branchCompanyId')
                      valueObject.employeeId = null
                      valueObject.cashboxId = null
                      valueObject.branchAccountId = null
                    }
                  "
                />
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label>
                  {{ GET_CORE_STRING?.transactions || 'Transactions' }}
                </label>
                <el-select
                  v-model="transactionValue"
                  clearable
                  size="mini"
                  placeholder="Select"
                  style="width: 150px"
                  :class="selectClass"
                >
                  <el-option
                    v-for="item in transactionOptions"
                    :key="item.name"
                    :label="item.value"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                v-if="
                  transactionValue &&
                  transactionValue !== 'CASHBOX' &&
                  transactionValue !== 'BANK' &&
                  transactionValue !== 'COMPANY' &&
                  transactionValue !== 'PERSON'
                "
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{ GET_CORE_STRING?.branch || 'Branch' }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.companyBranchId"
                  :custom-parameter="{ branchcompany: true }"
                  :custom-url="'invoiceBase/findAllCompanyByAccess'"
                  :class="{ 'border-red': lookupStatusObject.branch }"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'companyBranchId')
                      lookupStatusObject.branch = value ? false : true
                    }
                  "
                />
              </div>
              <div
                v-if="transactionValue && transactionValue !== 'PERSON'"
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>
                  {{
                    GET_CORE_STRING?.clusterSeasonForPaymentType ||
                    'Cluster Season For Payment Type'
                  }}</label
                >
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.clusterSeasonId"
                  :custom-url="'invoiceBase/findAllClusterSeason'"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'clusterSeasonId')
                      valueObject.paymentTypeId = null
                    }
                  "
                />
              </div>
              <div
                v-if="transactionValue && transactionValue !== 'PERSON'"
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>
                  {{ GET_CORE_STRING?.payment_type || 'Payment Type' }}</label
                >
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.paymentTypeId"
                  :custom-parameter="{
                    clusterSeasonId:
                      valueObject.clusterSeasonId &&
                      valueObject.clusterSeasonId.id
                        ? valueObject.clusterSeasonId.id
                        : null,
                  }"
                  :custom-url="'invoiceBase/findAllPaymentType2'"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'paymentTypeId')
                    }
                  "
                />
              </div>
              <div
                v-if="transactionValue && transactionValue !== 'PERSON'"
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>
                  {{
                    `${GET_CORE_STRING?.currency || 'Currency'} ${
                      GET_CORE_STRING?.filter || 'Filter'
                    }`
                  }}</label
                >
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.currencyFilterId"
                  :custom-url="'invoiceBase/findAllCurrency'"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'currencyFilterId')
                    }
                  "
                />
              </div>
              <div
                v-if="transactionValue && transactionValue !== 'PERSON'"
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label> {{ GET_CORE_STRING?.company || 'Company' }}</label>
                <el-radio-group v-model="companyRadioValue">
                  <el-radio label="1">
                    {{ GET_CORE_STRING?.all || 'All' }}</el-radio
                  >
                  <el-radio label="2">{{
                    GET_CORE_STRING?.active || 'Active'
                  }}</el-radio>
                  <el-radio label="3">{{
                    GET_CORE_STRING?.inactive || 'Inactive'
                  }}</el-radio>
                </el-radio-group>
              </div>
              <div
                v-if="
                  transactionValue &&
                  transactionValue !== 'CASHBOX' &&
                  transactionValue !== 'BANK' &&
                  transactionValue !== 'PERSON'
                "
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{ GET_CORE_STRING?.companies || 'Companies' }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.companyId"
                  :custom-url="
                    companyParameter.actionUrl
                      ? companyParameter.actionUrl
                      : 'invoiceBase/findAllCompanyByAccess'
                  "
                  :custom-parameter="
                    companyParameter.parameter ? companyParameter.parameter : {}
                  "
                  :class="{ 'border-red': lookupStatusObject.company }"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'companyId')
                      if (value) {
                        findTransactionCurrencyRate('COMPANY', value.id)
                      }
                      lookupStatusObject.company = value ? false : true
                    }
                  "
                />
              </div>
              <div
                v-if="
                  transactionValue &&
                  transactionValue !== 'BANK' &&
                  transactionValue !== 'BRANCH' &&
                  transactionValue !== 'PERSON'
                "
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{ GET_CORE_STRING?.cashbox || 'Cashbox' }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.cashboxId"
                  :custom-parameter="{
                    companyGroupId:
                      valueObject.companyGroupId &&
                      valueObject.companyGroupId.id
                        ? valueObject.companyGroupId.id
                        : null,
                    branchCompanyId:
                      valueObject.branchCompanyId &&
                      valueObject.branchCompanyId.id
                        ? valueObject.branchCompanyId.id
                        : null,
                  }"
                  :custom-url="'invoiceBase/findAllCashboxByAccess'"
                  :class="{ 'border-red': lookupStatusObject.cashbox }"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'cashboxId')
                      if (value) {
                        findTransactionCurrencyRate('CASHBOX', value.id)
                      }
                      lookupStatusObject.cashbox = value ? false : true
                    }
                  "
                />
              </div>
              <div
                v-if="
                  transactionValue &&
                  transactionValue !== 'CASHBOX' &&
                  transactionValue !== 'COMPANY' &&
                  transactionValue !== 'PERSON' &&
                  transactionValue !== 'BRANCH'
                "
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{ GET_CORE_STRING?.banks || 'Banks' }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.branchAccountId"
                  :custom-parameter="{
                    companyGroupId:
                      valueObject.companyGroupId &&
                      valueObject.companyGroupId.id
                        ? valueObject.companyGroupId.id
                        : null,
                    branchCompanyId:
                      valueObject.branchCompanyId &&
                      valueObject.branchCompanyId.id
                        ? valueObject.branchCompanyId.id
                        : null,
                  }"
                  :custom-url="'invoiceBase/findAllBranchAccountByAccess'"
                  :class="{ 'border-red': lookupStatusObject.bank }"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'branchAccountId')
                      if (value) {
                        findTransactionCurrencyRate('BANK', value.id)
                      }
                      lookupStatusObject.bank = value ? false : true
                    }
                  "
                />
              </div>
              <div
                v-if="
                  transactionValue &&
                  transactionValue !== 'CASHBOX' &&
                  transactionValue !== 'COMPANY' &&
                  transactionValue !== 'BANK' &&
                  transactionValue !== 'BRANCH'
                "
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{ GET_CORE_STRING?.employee || 'Employee' }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.employeeId"
                  :custom-parameter="{
                    companyGroupId:
                      valueObject.companyGroupId &&
                      valueObject.companyGroupId.id
                        ? valueObject.companyGroupId.id
                        : null,
                    branchCompanyId:
                      valueObject.branchCompanyId &&
                      valueObject.branchCompanyId.id
                        ? valueObject.branchCompanyId.id
                        : null,
                  }"
                  :custom-url="'invoiceBase/findAllEmployeeLookUp'"
                  :class="{ 'border-red': lookupStatusObject.person }"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'employeeId')
                      if (value) {
                        findTransactionCurrencyRate('PERSON', value.id)
                      }
                      lookupStatusObject.person = value ? false : true
                    }
                  "
                />
              </div>
              <div
                v-if="transactionValue && transactionValue !== 'PERSON'"
                class="flex justify-between w-[400px] mb-[5px]"
              >
                <label>{{
                  `${GET_CORE_STRING?.company || 'Company'} ${
                    GET_CORE_STRING?.type || 'Type'
                  }`
                }}</label>
                <UniqueLookUp
                  style="width: 150px"
                  :def-value="valueObject.companyTypeId"
                  :custom-url="'invoiceBase/findAllFilterCompanyType'"
                  @newValue="
                    (value) => {
                      setNewValue(value, 'companyTypeId')
                    }
                  "
                />
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label>{{ GET_CORE_STRING?.currency || 'Currency' }}</label>
                {{ currencySymbol }}
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label>{{
                  GET_CORE_STRING?.['currency.system'] || 'Currency System'
                }}</label>
                {{ currencySymbolSystem }}
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label>{{ GET_CORE_STRING?.details || 'Detail' }}</label>
                <UniqueCheckbox
                  @newValue="
                    (value) => {
                      setNewValue(value, 'detailsChecken')
                    }
                  "
                />
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <label>{{
                  GET_CORE_STRING?.transactionRefSaldoView ||
                  'Transaction Ref Saldo View'
                }}</label>
                <UniqueCheckbox
                  @newValue="
                    (value) => {
                      setNewValue(value, 'transactionRefSaldoView')
                    }
                  "
                />
              </div>
              <div class="flex justify-between w-[400px] mb-[5px]">
                <UniqueCurrencyCounter
                  :def-label="'By Report Rate'"
                  :def-properties="currencyCounterPropObj"
                  @newValue="
                    (value) => {
                      setNewValue(value.id, 'currencyId')
                      setNewValue(value.value, 'currencyRateVal')
                    }
                  "
                />
              </div>
            </div>

            <!-- table section -->
            <div class="p-[15px] box-border max-w-[80%] overflow-auto">
              <table class="dataTable">
                <tr>
                  <th></th>
                  <template v-if="transactionPanelType !== 3">
                    <template v-if="transactionPanelType !== 4">
                      <th>Batch detail start report: debit</th>
                      <th>Batch detail start report: credit</th>
                    </template>
                    <template v-else>
                      <th>Debit</th>
                      <th>Credit</th>
                    </template>
                    <th>Batch detail end report: debit</th>
                    <th>Batch detail end report: credit</th>
                  </template>
                  <th>Batch detail start debit</th>
                  <th>Batch detail start credit</th>
                  <th>Batch detail end debit</th>
                  <th>Batch detail end credit</th>
                </tr>

                <tr>
                  <template v-if="transactionPanelType !== 3">
                    <td>Total:</td>
                    <template v-if="transactionPanelType !== 4">
                      <td>
                        {{ updateNumber(infoTableData?.report_total_debit) }}
                      </td>
                      <td>
                        {{ updateNumber(infoTableData?.report_total_credit) }}
                      </td>
                    </template>
                    <template v-else>
                      <td>{{ updateNumber(infoTableData?.sum_debit_all) }}</td>
                      <td>{{ updateNumber(infoTableData?.sum_credit_all) }}</td>
                    </template>
                    <td>
                      {{ updateNumber(infoTableData?.end_report_total_debit) }}
                    </td>
                    <td>
                      {{ updateNumber(infoTableData?.end_report_total_credit) }}
                    </td>
                    <td>{{ updateNumber(infoTableData?.total_debit) }}</td>
                    <td>{{ updateNumber(infoTableData?.total_credit) }}</td>
                    <td>{{ updateNumber(infoTableData?.end_total_debit) }}</td>
                    <td>{{ updateNumber(infoTableData?.end_total_credit) }}</td>
                  </template>
                </tr>

                <tr>
                  <td>Saldo:</td>
                  <template v-if="transactionPanelType !== 3">
                    <template v-if="transactionPanelType !== 4">
                      <td>
                        {{ updateNumber(infoTableData?.report_saldo_debit) }}
                      </td>
                      <td>
                        {{ updateNumber(infoTableData?.report_saldo_credit) }}
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        {{ updateNumber(infoTableData?.sum_debit_all_diff) }}
                      </td>
                      <td>
                        {{ updateNumber(infoTableData?.sum_credit_all_diff) }}
                      </td>
                    </template>
                    <td>
                      {{ updateNumber(infoTableData?.end_report_saldo_debit) }}
                    </td>
                    <td>
                      {{ updateNumber(infoTableData?.end_report_saldo_credit) }}
                    </td>
                  </template>
                  <td>{{ updateNumber(infoTableData?.saldo_debit) }}</td>
                  <td>{{ updateNumber(infoTableData?.saldo_credit) }}</td>
                  <td>{{ updateNumber(infoTableData?.end_saldo_debit) }}</td>
                  <td>{{ updateNumber(infoTableData?.end_saldo_credit) }}</td>
                </tr>

                <template v-if="transactionPanelType !== 3">
                  <tr>
                    <th colspan="7">Period Invoice</th>
                    <th colspan="2">Last Invoice</th>
                  </tr>
                  <tr>
                    <th>InvoiceTypes</th>
                    <th>Date</th>
                    <th>Qty</th>
                    <th>Qty2</th>
                    <th>Total</th>
                    <th>Total qty</th>
                    <th>Total qty2</th>
                    <th>Last date</th>
                    <th>Last total qty</th>
                  </tr>
                  <tr>
                    <td>Purchase invoice</td>
                    <td>{{ updateNumber(infoTableData?.purchase_date) }}</td>
                    <td>{{ updateNumber(infoTableData?.purchase_qty) }}</td>
                    <td>{{ updateNumber(infoTableData?.purchase_qty2) }}</td>
                    <td>{{ updateNumber(infoTableData?.purchase_total) }}</td>
                    <td>
                      {{ updateNumber(infoTableData?.purchase_total_qty) }}
                    </td>
                    <td>
                      {{ updateNumber(infoTableData?.purchase_total_qty2) }}
                    </td>
                    <td>
                      {{ updateNumber(infoTableData?.last_purchase_date) }}
                    </td>
                    <td>
                      {{ updateNumber(infoTableData?.last_purchase_total_qty) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Sale invoice</td>
                    <td>{{ updateNumber(infoTableData?.sale_date) }}</td>
                    <td>{{ updateNumber(infoTableData?.sale_qty) }}</td>
                    <td>{{ updateNumber(infoTableData?.sale_qty2) }}</td>
                    <td>{{ updateNumber(infoTableData?.sale_total) }}</td>
                    <td>{{ updateNumber(infoTableData?.sale_total_qty) }}</td>
                    <td>{{ updateNumber(infoTableData?.sale_total_qty2) }}</td>
                    <td>{{ updateNumber(infoTableData?.last_sale_date) }}</td>
                    <td>
                      {{ updateNumber(infoTableData?.last_sale_total_qty) }}
                    </td>
                  </tr>
                </template>

                <template
                  v-if="
                    transactionPanelType === 2 || transactionPanelType === 3
                  "
                >
                  <tr>
                    <th colspan="2">Dying Stock Info</th>
                  </tr>
                  <tr>
                    <template v-if="transactionPanelType !== 3">
                      <th>Total count</th>
                      <th>Title warehouse count</th>
                      <th>Title warehouse qty</th>
                      <th>Title warehouse amount</th>
                      <th>Title warehouse count without price</th>
                      <th>Productions count</th>
                      <th>Production qty</th>
                      <th>Productions count with price</th>
                      <th>Amount</th>
                    </template>
                    <th>Productions count without price</th>
                    <th>Action</th>
                  </tr>

                  <tr>
                    <template v-if="transactionPanelType !== 3">
                      <td>{{ updateNumber(infoTableData?.total_count) }}</td>
                      <td>
                        {{ updateNumber(infoTableData?.warehouse_count) }}
                      </td>
                      <td>{{ updateNumber(infoTableData?.warehouse_qty) }}</td>
                      <td>
                        {{ updateNumber(infoTableData?.warehouse_amount) }}
                      </td>
                      <td>
                        {{
                          updateNumber(
                            infoTableData?.warehouse_count_without_price
                          )
                        }}
                      </td>
                      <td>
                        {{ updateNumber(infoTableData?.production_count) }}
                      </td>
                      <td>{{ updateNumber(infoTableData?.production_qty) }}</td>
                      <td>
                        {{
                          updateNumber(
                            infoTableData?.production_count_with_price
                          )
                        }}
                      </td>
                      <td>{{ updateNumber(infoTableData?.amount) }}</td>
                    </template>
                    <td>
                      {{
                        updateNumber(
                          infoTableData?.production_count_without_price
                        )
                      }}
                    </td>
                    <td>
                      <el-link
                        :href="openCompActionUrl"
                        :target="openCompActionUrl === '#' ? '_self' : '_blank'"
                      >
                        <el-button type="success" size="mini"> Open </el-button>
                      </el-link>
                    </td>
                  </tr>
                </template>
              </table>
            </div>
          </div>

          <div class="m-4 flex gap-4">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              size="small"
              @click="acceptValues"
            >
              {{ GET_CORE_STRING?.accept || 'Accept' }}
            </el-button>
          </div>

          <div v-if="customTableData" class="mt-4">
            <el-card class="box-card">
              <div class="flex">
                <p>{{ GET_CORE_STRING?.records || 'Records' }}:</p>
                <UniqueInput
                  class="w-[70px] mx-[5px]"
                  :def-value="maxPageSize"
                  def-type="number"
                  :disabled-status="true"
                />

                <p>{{ GET_CORE_STRING?.limit || 'Limit' }}:</p>
                <UniqueInput
                  class="w-[60px]"
                  :def-value="pageLimit"
                  def-type="number"
                  @newValue="
                    (value) => {
                      pageLimit = !value || value <= 0 ? 1 : value
                      pageLimit = Number(pageLimit)
                    }
                  "
                  @enter="acceptValues"
                />

                <el-pagination
                  background
                  :page-size="pageLimit"
                  layout="prev, pager, next, jumper"
                  :total="maxPageSize"
                  @size-change="changePage"
                  @current-change="changePage"
                >
                </el-pagination>
              </div>
            </el-card>

            <UniqueCustomTable
              :table-header="customTableHead"
              :table-body="customTableBody"
              :table-height="800"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // DATA
  data() {
    return {
      valueObject: {
        date: this.getCurrentDate(),
      },
      transactionPanelType: '', // should get from backend
      transactionOptions: [], // should get from backend,
      transactionValue: '',
      companyRadioValue: '1',
      currencyCounterPropObj: {
        settingsRateType: 'TRANSACTION',
        dateFrom: this.getCurrentDate().formattedDateTimeEnd,
      },
      openCompActionUrl: '#',
      acceptStatus: false,
      lookupStatusObject: {
        cashbox: false,
        bank: false,
        person: false,
        company: false,
        branch: false,
      },
      currencySymbol: '',
      currencySymbolSystem: '',

      isOpenTable: true,
      isCloseTable: true,

      showModal: false,
      visibleHeaderArr: [],
      hiddenHeaderArr: [],
      tableActionUrl: '',

      startPage: 0,
      pageLimit: 150,
      maxPageSize: 0,
      customTableData: '',
      customTableHead: {},
      customTableBody: [],
      fullscreenLoading: false,
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),

    selectClass() {
      return {
        'border-red': !this.transactionType && this.acceptStatus,
      }
    },
    companyParameter() {
      const dataObj = {
        parameter: '',
        actionUrl: '',
      }
      if (this.transactionValue === 'BRANCH') {
        dataObj.parameter = {
          branchCompanyId: this.valueObject.companyBranchId
            ? this.valueObject.companyBranchId.id
            : null,
        }
        dataObj.actionUrl = 'invoiceBase/findAllCompaniesByTransactionBranch'
      } else if (this.transactionValue === 'COMPANY') {
        dataObj.parameter = ''
        dataObj.actionUrl = 'invoiceBase/findAllCompanyByAccess'
      }
      return dataObj
    },
    infoTableData() {
      let newObj = {}
      if (
        this.customTableData &&
        this.customTableData.transactionMovementList &&
        this.customTableData.transactionMovementList.before_saldo
      ) {
        newObj = JSON.parse(
          JSON.stringify(
            this.customTableData.transactionMovementList.before_saldo
          )
        )
        if (
          this.customTableData.transactionMovementList.branchParam !== null &&
          !this.customTableData.transactionMovementList.branchParam
        ) {
          newObj.total_debit =
            this.customTableData.transactionMovementList.before_saldo.total_credit
          newObj.total_credit =
            this.customTableData.transactionMovementList.before_saldo.total_debit
          newObj.report_total_debit =
            this.customTableData.transactionMovementList.before_saldo.report_total_credit
          newObj.report_total_credit =
            this.customTableData.transactionMovementList.before_saldo.report_total_debit

          newObj.sum_credit_all =
            this.customTableData.transactionMovementList.before_saldo.sum_debit_all
          newObj.sum_debit_all =
            this.customTableData.transactionMovementList.before_saldo.sum_credit_all

          newObj.sum_credit_all_diff =
            +newObj.sum_debit_all - +newObj.sum_credit_all > 0
              ? +newObj.sum_debit_all - +newObj.sum_credit_all
              : 0 // important code here
          newObj.sum_debit_all_diff =
            +newObj.sum_credit_all - +newObj.sum_debit_all > 0
              ? +newObj.sum_credit_all - +newObj.sum_debit_all
              : 0 // important code here

          newObj.end_total_debit =
            this.customTableData.transactionMovementList.before_saldo.end_total_credit
          newObj.end_total_credit =
            this.customTableData.transactionMovementList.before_saldo.end_total_debit
          newObj.end_report_total_debit =
            this.customTableData.transactionMovementList.before_saldo.end_report_total_credit
          newObj.end_report_total_credit =
            this.customTableData.transactionMovementList.before_saldo.end_report_total_debit

          newObj.saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.saldo_credit
          newObj.saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.saldo_debit
          newObj.report_saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.report_saldo_credit
          newObj.report_saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.report_saldo_debit

          newObj.end_saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.end_saldo_credit
          newObj.end_saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.end_saldo_debit
          newObj.end_report_saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.end_report_saldo_credit
          newObj.end_report_saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.end_report_saldo_debit
        } else {
          newObj.total_debit =
            this.customTableData.transactionMovementList.before_saldo.total_debit
          newObj.total_credit =
            this.customTableData.transactionMovementList.before_saldo.total_credit
          newObj.report_total_debit =
            this.customTableData.transactionMovementList.before_saldo.report_total_debit
          newObj.report_total_credit =
            this.customTableData.transactionMovementList.before_saldo.report_total_credit

          newObj.sum_credit_all =
            this.customTableData.transactionMovementList.before_saldo.sum_credit_all
          newObj.sum_debit_all =
            this.customTableData.transactionMovementList.before_saldo.sum_debit_all

          newObj.sum_credit_all_diff =
            +newObj.sum_credit_all - +newObj.sum_debit_all > 0
              ? +newObj.sum_credit_all - +newObj.sum_debit_all
              : 0 // important code here
          newObj.sum_debit_all_diff =
            +newObj.sum_debit_all - +newObj.sum_credit_all > 0
              ? +newObj.sum_debit_all - +newObj.sum_credit_all
              : 0 // important code here

          newObj.end_total_debit =
            this.customTableData.transactionMovementList.before_saldo.end_total_debit
          newObj.end_total_credit =
            this.customTableData.transactionMovementList.before_saldo.end_total_credit
          newObj.end_report_total_debit =
            this.customTableData.transactionMovementList.before_saldo.end_report_total_debit
          newObj.end_report_total_credit =
            this.customTableData.transactionMovementList.before_saldo.end_report_total_credit

          newObj.saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.saldo_debit
          newObj.saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.saldo_credit
          newObj.report_saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.report_saldo_debit
          newObj.report_saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.report_saldo_credit

          newObj.end_saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.end_saldo_debit
          newObj.end_saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.end_saldo_credit
          newObj.end_report_saldo_debit =
            this.customTableData.transactionMovementList.before_saldo.end_report_saldo_debit
          newObj.end_report_saldo_credit =
            this.customTableData.transactionMovementList.before_saldo.end_report_saldo_credit
        }
      }
      return newObj
    },
    updatedTableBodyData() {
      const dataArr = []
      if (this.customTableBody.length > 0) {
        let saldoDebit =
          +this.customTableData.transactionMovementList?.before_saldo
            ?.saldo_debit
        let saldoCredit =
          +this.customTableData.transactionMovementList?.before_saldo
            ?.saldo_credit
        const branchParam =
          this.customTableData.transactionMovementList?.branchParam
        let transactionId = null
        let subObjectId = 1

        this.customTableBody.forEach((object, index) => {
          const newObj = JSON.parse(JSON.stringify(object))
          if (!this.valueObject.detailsChecken) {
            if (saldoDebit) {
              if (object.debit) {
                saldoDebit += object.debit
                saldoCredit = 0
              } else {
                saldoDebit -= object.credit
                if (saldoDebit < 0) {
                  saldoCredit = -1 * saldoDebit
                  saldoDebit = 0
                }
              }
            } else if (object.credit) {
              saldoDebit = 0
              saldoCredit += object.credit
            } else {
              saldoCredit -= object.debit
              if (saldoCredit < 0) {
                saldoDebit = -1 * saldoCredit
                saldoCredit = 0
              }
            }

            newObj.ref_amt = +object.system_amount / +object.currencyraterel
            if (object.debit_credit === 1) {
              newObj.refAmt = newObj.refAmt * object.nominal_constant
            } else {
              newObj.refAmt = newObj.refAmt / object.nominal_constant
            }

            newObj.saldo_debit = parseFloat(saldoDebit).toFixed(6)
            if (branchParam !== null && !branchParam) {
              newObj.saldo_debit = parseFloat(saldoCredit).toFixed(6)
            }

            newObj.saldo_credit = parseFloat(saldoCredit).toFixed(6)
            if (branchParam !== null && !branchParam) {
              newObj.saldo_credit = parseFloat(saldoDebit).toFixed(6)
            }

            newObj.saldo_d_c =
              saldoDebit !== 0
                ? saldoDebit * object.currencyrate
                : saldoCredit * object.currencyrate
            newObj.report_saldo =
              (saldoDebit !== 0
                ? saldoDebit * object.currencyrate
                : saldoCredit * object.currencyrate) / object.report_rate

            if (!object.controlled) {
              newObj.action = ''
            }

            if (this.transactionValue !== 'BRANCH') {
              newObj.controlled = ''
              if (object.controlled) {
                newObj.controlled =
                  '<a href="#"><img src="img/lock.png" style="width: 50px;"/></a>'
              } else {
                newObj.controlled =
                  '<a href="#"><img src="img/unlock.png" style="width: 50px;"/></a>'
              }
            }

            if (branchParam !== null && !branchParam) {
              newObj.debit = object.credit
              newObj.credit = object.debit
            }

            newObj.controlled_date = object.controlled_date
              ? object.controlled_date
              : ''
            newObj.controlled_user = object.controlled_user
              ? object.controlled_user
              : ''
            newObj.action = object.action ? object.action : ''

            dataArr.push(newObj)
          } else {
            if (transactionId === null || transactionId !== object.id) {
              transactionId = object.id

              if (saldoDebit !== 0) {
                if (object.debit !== 0) {
                  saldoDebit += object.debit
                  saldoCredit = 0
                } else {
                  saldoDebit -= object.credit
                  if (saldoDebit < 0) {
                    saldoCredit = -1 * saldoDebit
                    saldoDebit = 0
                  }
                }
              } else if (object.credit !== 0) {
                saldoDebit = 0
                saldoCredit += object.credit
              } else {
                saldoCredit -= object.debit
                if (saldoCredit < 0) {
                  saldoDebit = -1 * saldoCredit
                  saldoCredit = 0
                }
              }

              newObj.product_name = ''
              newObj.qty = ''
              newObj.unitprice = ''
              newObj.color_name = ''
              newObj.qty2 = ''
              newObj.color_var_name = ''
              newObj.design_name = ''
              newObj.design_var_name = ''
              newObj.input_batch = ''
              newObj.i_description = ''
              newObj.sub_ammount = ''
              newObj.input_pack = ''
              newObj.sale_pack = ''
              newObj.tupaenmayli = ''
              newObj.width = ''
              newObj.requested_width = ''
              newObj.requested_width_tolerance = ''
              newObj.articlestr = ''
              newObj.gramm = ''
              newObj.requested_grammage = ''
              newObj.requested_grammage_tolerance = ''
              newObj.batchprocess = ''
              newObj.color_depth = ''
              newObj.waste = ''
              newObj.pl_design_name = ''
              newObj.pl_design_var_name = ''
              newObj.bd_created_date = ''
              newObj.invoice_opt_name = ''
              newObj.invoice_opt_name = ''
              newObj.p_name = ''

              newObj.ref_amt = object.system_amount / object.currencyraterel
              if (object.debit_credit === 1) {
                newObj.ref_amt = newObj.ref_amt * object.nominal_constant
              } else {
                newObj.ref_amt = newObj.ref_amt / object.nominal_constant
              }

              newObj.saldo_debit = parseFloat(saldoDebit).toFixed(6)
              if (branchParam !== null && !branchParam) {
                newObj.saldo_debit = parseFloat(saldoCredit).toFixed(6)
              }

              newObj.saldo_credit = parseFloat(saldoCredit).toFixed(6)
              if (branchParam !== null && !branchParam) {
                newObj.saldo_credit = parseFloat(saldoDebit).toFixed(6)
              }

              newObj.saldo_d_c =
                saldoDebit !== 0
                  ? saldoDebit * object.currencyrate
                  : saldoCredit * object.currencyrate

              if (!object.controlled) {
                newObj.controlled = ''
              }

              if (this.transactionValue !== 'BRANCH') {
                newObj.controlled = ''
                if (object.controlled === 'true') {
                  newObj.controlled =
                    '<a href="#" ><img src="img/lock.png" style="width: 50px;" /></a>'
                } else {
                  newObj.controlled =
                    '<a href="#" ><img src="img/unlock.png" style="width: 50px;" /></a>'
                }
              }

              newObj.controlled_date = object.controlled_date
                ? object.controlled_date
                : ''
              newObj.controlled_user = object.controlled_user
                ? object.controlled_user
                : ''
              newObj.action = object.action ? object.action : ''

              if (branchParam !== null && !branchParam) {
                newObj.debit = object.credit
                newObj.credit = object.debit
              }
              dataArr.push(newObj)
            }

            if (object.invoice_id !== null) {
              const subObject = {
                uniqueOrderNumber: `${
                  object.uniqueOrderNumber
                }.${subObjectId++}`,
                uniqueVisibleStatus: true,
                product_name: object.product_name,
                qty: object.qty,
                unitprice: object.unitprice,
                color_name: object.color_name,
                qty2: object.qty2,
                color_var_name: object.color_var_name,
                design_name: object.design_name,
                design_var_name: object.design_var_name,
                input_batch: object.input_batch,
                i_description: object.i_description,
                sub_ammount: object.sub_ammount,
                input_pack: object.input_pack,
                sale_pack: object.sale_pack,
                tupaenmayli: object.tupaenmayli,
                width: object.width,
                requested_width: object.requested_width,
                requested_width_tolerance: object.requested_width_tolerance,
                articlestr: object.articlestr,
                gramm: object.gramm,
                requested_grammage: object.requested_grammage,
                requested_grammage_tolerance:
                  object.requested_grammage_tolerance,
                batchprocess: object.batchprocess,
                color_depth: object.color_depth,
                waste: object.waste,
                pl_design_name: object.pl_design_name,
                pl_design_var_name: object.pl_design_var_name,
                bd_created_date: object.bd_created_date,
                invoice_opt_name: object.invoice_opt_name,
                p_name: object.p_name,
                debit: 0,
                creadit: 0,
                subtotal: object.subtotal,
              }
              dataArr.push(subObject)
            }
          }
        })
      }
      return dataArr
    },
  },

  // WATCH
  watch: {
    'valueObject.date.formattedDateTimeEnd': function (newDate) {
      this.currencyCounterPropObj.dateFrom = newDate || ''
    },
    transactionValue(newValue) {
      if (newValue) {
        this.acceptStatus = false
      }
      this.setNewValue('', 'companyGroupId')
      this.setNewValue('', 'branchCompanyId')
      this.setNewValue('', 'companyBranchId')
      this.setNewValue('', 'clusterSeasonId')
      this.setNewValue('', 'paymentTypeId')
      this.setNewValue('', 'currencyFilterId')
      this.setNewValue('', 'companyId')
      this.setNewValue('', 'cashboxId')
      this.setNewValue('', 'branchAccountId')
      this.setNewValue('', 'employeeId')
      this.setNewValue('', 'companyTypeId')
      this.companyRadioValue = '1'
    },
  },

  // MOUNTED
  mounted() {
    this.getTransactionInitialData()
  },

  // METHODS
  methods: {
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
    getCurrentDate() {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      const formattedDateTimeStart = `${day}/${month - 1}/${year} 00:00:00`
      const formattedDateTimeEnd = `${day}/${month}/${year} 23:59:59`
      return { formattedDateTimeStart, formattedDateTimeEnd }
    },
    async getTransactionInitialData() {
      try {
        const response = await this.$axios.post(
          'transactionDetailReport/transactionDetailReportInitData',
          {}
        )
        this.transactionPanelType = response.data.transactionPanelType
        this.transactionOptions = response.data.transactionLookUp
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err, 'err')
      }
    },
    updateNumber(number) {
      if (number) {
        const [integerPart, decimalPart] = number.toString().split('.')
        const formattedInteger = integerPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ' '
        )
        return decimalPart
          ? `${formattedInteger}.${decimalPart}`
          : formattedInteger
      }
      return number
    },
    async acceptValues() {
      if (!this.transactionValue) {
        this.$notify({
          title: 'Warning',
          message: 'Choose transaction type',
          type: 'warning',
        })
        this.acceptStatus = true
        return
      }

      if (this.transactionValue) {
        if (
          this.transactionValue === 'CASHBOX' &&
          !this.valueObject.cashboxId
        ) {
          this.setWarning('cashbox')
          return
        } else if (
          this.transactionValue === 'BANK' &&
          !this.valueObject.branchAccountId
        ) {
          this.setWarning('bank')
          return
        } else if (
          this.transactionValue === 'PERSON' &&
          !this.valueObject.employeeId
        ) {
          this.setWarning('person')
          return
        } else if (
          this.transactionValue === 'COMPANY' &&
          !this.valueObject.companyId
        ) {
          this.setWarning('company')
          return
        } else if (
          this.transactionValue === 'BRANCH' &&
          !this.valueObject.companyBranchId
        ) {
          this.setWarning('branch')
          return
        }
      }

      const data = {
        branchCompanyId: null,
        transaction_name: this.transactionValue ? this.transactionValue : null,
        cashboxId: null,
        branchAccountId: null,
        employeeId: null,
        companyBranchId: null,
        paymentTypeId: null,
        currencyFilterId: null,
        companyId: null,
        dateFrom: this.valueObject.startDate ? this.valueObject.startDate : '',
        dateTo: this.valueObject.endDate ? this.valueObject.endDate : '',
        detailsChecken: false,
        transactionRefSaldoView: false,
        currencyId: null,
        companyTypeId: null,
        clusterSeasonId: null,
        activeCompany: this.companyRadioValue,
        currencyRateVal: null,
        start: this.startPage,
        limit: this.pageLimit,
      }
      for (const key in this.valueObject) {
        if (
          typeof this.valueObject[key] === 'object' &&
          this.valueObject[key] &&
          this.valueObject[key].id
        ) {
          data[key] = this.valueObject[key].id
        } else if (
          typeof this.valueObject[key] === 'string' &&
          this.valueObject[key]
        ) {
          data[key] = this.valueObject[key]
        } else if (this.valueObject[key]) {
          data[key] = this.valueObject[key]
        }
      }
      this.fullscreenLoading = true
      try {
        const response = await this.$axios.post(
          'transactionDetailReport/transactionDetailList',
          data
        )
        this.customTableData = response.data
        this.maxPageSize = this.customTableData.maxSizeData
          ? this.customTableData.maxSizeData
          : 0
        this.customTableHead = this.customTableData.rightMap
          ? this.customTableData.rightMap
          : []
        this.customTableBody =
          this.customTableData.transactionMovementList &&
          this.customTableData.transactionMovementList.list
            ? this.customTableData.transactionMovementList.list
            : []
        this.customTableBody.forEach((item, id) => {
          item.uniqueOrderNumber = id + 1 + this.startPage
          item.uniqueVisibleStatus = true
        })

        this.fullscreenLoading = false
        this.customTableStatus = true
        this.$notify({
          title: 'Success',
          message: 'Data received',
          type: 'success',
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err, 'err')
        this.fullscreenLoading = false
        this.customTableStatus = false
        this.$notify({
          title: 'Error',
          message: 'No data',
          type: 'error',
        })
      }
    },
    setWarning(key) {
      this.lookupStatusObject[key] = true
      this.$notify({
        title: 'Warning',
        message: 'Fill up fields',
        type: 'warning',
      })
    },
    async findTransactionCurrencyRate(transactionName, id) {
      const data = {
        transaction_name: transactionName,
        id,
        dateFrom: this.valueObject.dateFrom,
      }

      try {
        const response = await this.$axios.post(
          'transactionMovements/findTransactionCurrencyRateUrl',
          data
        )
        this.currencySymbol = response.data.currencyObject.symbol
        this.currencySymbolSystem =
          response.data.currencyObject.currency_symbol_system
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err, 'err')
      }
    },
    changePage(value) {
      this.startPage = (value - 1) * this.pageLimit
      this.acceptValues()
    },
    async showColumnConfig() {
      if (this.customTableData) {
        const data = {
          actionUrl: 'transactionDetailReport.htm',
        }
        try {
          const response = await this.$axios.post('base/columnsConfig', data)
          this.showModal = true
          this.visibleHeaderArr = response.data.rightMap
          this.hiddenHeaderArr = response.data.leftMap
          this.tableActionUrl = response.data.actionUrl
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err, 'err')
        }
      } else {
        this.showModal = false
        this.visibleHeaderArr = ''
        this.hiddenHeaderArr = []
        this.tableActionUrl = []
      }
    },
    setNewColumnHeaders(value, status) {
      this.acceptValues()
    },

    // new methods
    setNewValue(value, objKey) {
      this.$handleNewValue(this.valueObject, objKey, value)
      if (objKey === 'companyId') {
        if (value && value.id) {
          this.openCompActionUrl = `preparePlanningPrice.htm?/${value.id}`
        } else {
          this.openCompActionUrl = '#'
        }
      }
    },
  },
}
</script>

<style scoped>
.dataTable {
  border-collapse: collapse;
  font-size: 13px;
}
.dataTable th,
.dataTable td {
  border: 1px solid grey;
  padding: 2px;
}
.border-red .el-input__inner {
  border-color: red !important;
}
</style>
