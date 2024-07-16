<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <div class="flex items-center gap-[10px]">
        <generic-button
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('')"
        />
        <GenericButton name="onWay changeState" type="danger" />
        <GenericButton
          name="Copy Invoice"
          icon-name-attribute="document-copy"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Output Production Invoice
        </h1>
      </div>
    </div>
    <div>
      <table class="w-full text-[13px] mt-2">
        <tbody>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td
              class="w-[15%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              {{ tableNameTranslateObj.date }}
            </td>
            <td
              class="w-[16%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <GenericInput
                :value="
                  new Date(objData?.date)
                    .toLocaleString('en-GB')
                    .split(',')
                    .join('')
                "
                width="100"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
            <td
              class="w-[16%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              {{ tableNameTranslateObj.paymentType }}
            </td>
            <td
              class="w-[17%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="paymentType"
                :required="required.lookUp2"
                @customFunction="getLookUpValue"
              />
            </td>
            <td
              class="w-[15%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              {{ tableNameTranslateObj.systemNumber }}
            </td>
            <td
              class="w-[17%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.supplier }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                :value="objData?.supplierCurSymbol?.text"
                durl="invoiceBase/findAllCompanyForInvoice"
                dwidth="100"
                widthtype="%"
                dlist="100"
                :dparam="{
                  param: true,
                  branchId: true,
                  companyType: 'Supplier',
                  dateFrom: new Date(objData?.date)
                    .toLocaleString('en-GB')
                    .split(',')
                    .join(''),
                }"
                name="supplier"
                :required="required.lookUp1"
                @customEvent="getSelectedList"
                @customFunction="getLookUpValue"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ propsValue.supplare.name }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="
                  propsValue.supplare.value ||
                  objData?.companyCurrencyRate?.text
                "
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.valueDate }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="
                  new Date(objData?.sellDate)
                    .toLocaleString('en-GB')
                    .split(',')
                    .join('')
                "
                width="100"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.invoiceBillStatus }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj['menu.companies.group'] }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.companyGroup?.text"
                :defvalue="objData?.companyGroup?.text"
                durl="invoiceBase/findAllCompanyGroups"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.onWay }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.branch }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.branch?.text"
                :defvalue="objData?.branch?.text"
                durl="invoiceBase/findAllCompanyLogic"
                dwidth="100"
                widthtype="%"
                dlist="100"
                :dparam="{
                  branchId: true,
                  companyType: 'Branch',
                  param: true,
                }"
                @customEvent="getSelectedList"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ propsValue.branch.name }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="
                  propsValue.branch.value ||
                  objData?.companyRefCurrencyRate?.text
                "
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.invoiceStatus }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.department }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.department?.text"
                :defvalue="objData?.department?.text"
                durl="invoiceBase/findAllDepartmentLogic"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.invoiceNo }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.warehouse }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.warehouse?.text"
                :defvalue="objData?.warehouse?.text"
                durl="invoiceBase/findAllWarehouseLogic"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj['personSalary.note'] }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.currency }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.currency?.text"
                :defvalue="objData?.currency?.text"
                durl="invoiceBase/findAllCurrency"
                dwidth="100"
                widthtype="%"
                dlist="100"
                :dparam="{
                  currencyId: true,
                  param: true,
                  companyType: 'Currency',
                  dateFrom: new Date(objData?.date)
                    .toLocaleString('en-GB')
                    .split(',')
                    .join(''),
                }"
                @customEvent="getSelectedList"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ propsValue.currency.name }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="
                  propsValue.currency.value || objData?.currencyRate?.text
                "
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.postNominal }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.orderProductionType }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.orderProductionType?.text"
                :defvalue="objData?.orderProductionType?.text"
                durl="invoiceBase/findAllOrderProductionType"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.order_sequence_number }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.calculationType }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                v-if="objData?.calc_type?.text"
                :defvalue="objData?.calc_type?.text"
                durl="invoiceBase/findAllInvoiceCalc_type"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.contract }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                durl="invoiceBase/findAllContracts"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj['invoice.invoiceNumber'] }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="objData?.invoiceNominal?.text"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.driverName }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.plateNumber }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                durl="invoiceBase/findAllPlateNumber"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
          </tr>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.car }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                durl="invoiceBase/findAllCar"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            ></td>
          </tr>
        </tbody>
      </table>
      <generic-button
        name="Accept"
        type="primary"
        :margin="true"
        @click="additionInvoiceItem"
      />
      <div
        class="w-full bg-[rgba(0,0,0,0.05)] overflow-hidden"
        :class="
          isInvoiceItam ? 'duration-[1s] h-[755px]' : 'duration-[1s] h-[0px]'
        "
      >
        <h1 class="text-[13px]">Invoice Item</h1>
        <div class="flex gap-1">
          <generic-button
            name="Column Setting"
            type="warning"
            icon-name-attribute="setting"
          />
          <generic-button name="Save" type="primary" />
          <generic-button name="Make Bill" type="primary" />
          <generic-button
            name="Print Preview"
            type="success"
            icon-name-attribute="printer"
          />
          <generic-button
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
          />
          <GenericInput
            width="120"
            height="30"
            pl="10"
            pr="10"
            pt="2"
            pb="2"
            textsize="13"
            type="number"
            placeholder="Change price"
          />
          <GenericInput
            width="120"
            height="30"
            pl="10"
            pr="10"
            pt="2"
            pb="2"
            textsize="13"
            type="number"
            placeholder="Change vat"
          />
        </div>
        <div class="mt-1">
          <LookUp
            durl="invoiceBase/findAllCompanyForInvoice"
            dwidth="200"
            dlist="200"
          />
          <LookUp
            durl="invoiceBase/findAllPaymentType"
            dwidth="200"
            dlist="200"
          />
        </div>
        <GenericPrepareTablePage
          :tablehead="tableData"
          :tableheadlength="tableData.length"
          height="fit-content"
          class="bg-[rgba(255,255,255,0.5)] mt-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LookUp from '@generics/LookUp.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    LookUp,
    GenericInput,
    GenericPrepareTablePage,
  },

  // DATA
  data() {
    return {
      tableNameTranslate: [
        'purchaseInvoice',
        'date',
        'supplier',
        'valueDate',
        'menu.companies.group',
        'branch',
        'department',
        'warehouse',
        'currency',
        'orderProductionType',
        'calculationType',
        'paymentType',
        'contract',
        'systemNumber',
        'invoiceBillStatus',
        'onWay',
        'invoiceStatus',
        'invoiceNo',
        'personSalary.note',
        'postNominal',
        'order_sequence_number',
        'invoice.invoiceNumber',
        'driverName',
        'plateNumber',
        'car',
      ],
      tableNameTranslateObj: {},
      isLoading: false,
      objData: {},
      selectedRow: null,
      propsValue: {
        supplare: {},
        branch: {},
        currency: {},
      },
      inputValuesObj: new Map(),
      required: {
        lookUp1: true,
        lookUp2: true,
      },
      isInvoiceItam: false,
      tableData: [],
    }
  },

  // MOUNTED
  mounted() {
    this.getPageRequest()
    this.getStaticTableNameValues()
  },

  // METHOD
  methods: {
    // preparePurchaseInvoiceNewAjaxLoad api
    getPageRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `${this.baseURL}/invoice/preparePurchaseInvoiceNewAjaxLoad`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          this.isLoading = !this.isLoading
          this.objData = res.data.invoiceJson
          // eslint-disable-next-line array-callback-return
          this.tableData = res.data.rightColumns.filter((value) => {
            if (value.showUI) return value
          })

          this.$router.push('/preparePurchaseInvoiceNew.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // translate api
    getStaticTableNameValues() {
      this.$axios
        .post(
          `${this.baseURL}/translate`,
          { messages: this.tableNameTranslate },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          this.tableNameTranslateObj = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // 3 ta lookup ni boshqarish
    getSelectedList(data) {
      if (data[1] === 'Supplier') {
        this.propsValue.supplare = data[0]
      } else if (data[1] === 'Branch') {
        this.propsValue.branch = data[0]
      } else this.propsValue.currency = data[0]
    },

    // Lookup's Valuesini olish
    getLookUpValue(key, value) {
      this.inputValuesObj.set(key, value)
      this.inputValuesObj.get('supplier')
        ? (this.required.lookUp1 = true)
        : (this.required.lookUp1 = false)
      this.inputValuesObj.get('paymentType')
        ? (this.required.lookUp2 = true)
        : (this.required.lookUp2 = false)
    },

    // button action addition rows
    additionInvoiceItem() {
      this.inputValuesObj.get('supplier')
        ? (this.required.lookUp1 = true)
        : (this.required.lookUp1 = false)
      this.inputValuesObj.get('paymentType')
        ? (this.required.lookUp2 = true)
        : (this.required.lookUp2 = false)

      // if (this.required.lookUp1 && this.required.lookUp2) {
      //   this.isInvoiceItam = true
      // } else {
      //   this.isInvoiceItam = false
      // }
      this.isInvoiceItam = true
    },
  },
}
</script>
