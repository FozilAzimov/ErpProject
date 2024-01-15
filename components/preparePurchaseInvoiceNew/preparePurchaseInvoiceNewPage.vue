<template>
  <div class="w-full m-1 pr-2">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <div class="flex items-center gap-[10px]">
        <GenericButton
          name="Go Back"
          pl="10"
          pt="3"
          pr="10"
          pb="3"
          bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
          textsize="14"
          :url="img.goBack"
          :istherepicture="true"
          @click="$router.go(-1)"
        />
        <GenericButton
          name="onWay changeState"
          pl="10"
          pt="3"
          pr="10"
          pb="3"
          bggradient="linear-gradient(to bottom, rgb(108,33,38),rgba(108,33,38,0.65))"
          textsize="14"
        />
        <GenericButton
          name="Copy Invoice"
          pl="10"
          pt="3"
          pr="10"
          pb="3"
          bg="rgba(54, 155, 215, 0.8)"
          textsize="14"
          :url="img.copy"
          :istherepicture="true"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          {{ $t('pages.preparepurchaseinvoice.headerName') }}
        </h1>
      </div>
    </div>
    <div>
      <table class="w-full text-[13px]">
        <tbody>
          <tr
            class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <td
              class="w-[15%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              Date
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
              Payment Type
            </td>
            <td
              class="w-[17%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td
              class="w-[15%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              System Number
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
              Supplier
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
                @customEvent="getSelectedList"
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
              Value Date
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
              Invoice Bill Status
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
              Company Groups
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
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
              OnWay
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
              Branch
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
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
                  propsValue.branch.value || objData?.companyCurrencyRate?.text
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
              Invoice Status
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
              Department
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
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
              Invoice №
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
              Warehouse
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
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
              Note
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
              Currency
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
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
              Nominal
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
              Order Production Type
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
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
              Sequence Number
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
              Calculation Type
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                :defvalue="objData?.calc_type?.text"
                durl="invoiceBase/findAllInvoiceCalc_type"
                dwidth="100"
                widthtype="%"
                dlist="100"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              Contract
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
              Invoice Number
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
              Driver Name
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
              PlateNumber
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
              Car
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// Icons url
import goBack from '../../assets/icons/go-back.png'
import copy from '../../assets/icons/copy.png'
// Components
import GenericButton from '../Button/GenericButton.vue'
import LoadingPage from '../Loading/LoadingPage.vue'
import LookUp from '../Lookup/LookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    LookUp,
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
      ],
      isLoading: false,
      img: {
        goBack,
        copy,
      },
      objData: {},
      selectedRow: null,
      propsValue: {
        supplare: {},
        branch: {},
        currency: {},
      },
    }
  },

  // MOUNTED
  mounted() {
    this.getPageRequest()
  },

  // METHOD
  methods: {
    getPageRequest() {
      this.isLoading = !this.isLoading
      axios
        .post(
          `https://192.168.1.55:8443/api/invoice/preparePurchaseInvoiceNewAjaxLoad`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          this.isLoading = !this.isLoading
          this.objData = res.data
          this.$router.push('/preparePurchaseInvoiceNew.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    getSelectedList(data) {
      if (data[1] === 'Supplier') {
        this.propsValue.supplare = data[0]
      } else if (data[1] === 'Branch') {
        this.propsValue.branch = data[0]
      } else this.propsValue.currency = data[0]
    },

    getStaticTableNameValues() {
      axios
        .post(`https://192.168.1.55:8443/api/translate`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {})
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
