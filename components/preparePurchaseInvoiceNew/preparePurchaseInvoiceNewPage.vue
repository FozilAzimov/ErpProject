<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightData"
        :left="leftData"
        :url="actionUrl"
        api="saveColumnConfigU"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
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
          {{ tableNameTranslateObj.purchaseInvoice }}
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
      <GenericButton
        name="Accept"
        pl="10"
        pt="3"
        pr="10"
        pb="3"
        bg="rgba(54, 155, 215, 0.8)"
        textsize="14"
        class="mt-1 mb-2"
        @click="additionInvoiceItem"
      />
      <div
        class="w-full bg-[rgba(0,0,0,0.05)] overflow-hidden"
        :class="
          isInvoiceItam ? 'duration-[1s] h-[700px]' : 'duration-[1s] h-[0px]'
        "
      >
        <h1 class="text-[13px]">Invoice Item</h1>
        <div class="flex gap-1">
          <GenericButton
            name="Column Setting"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bggradient="linear-gradient(to top, rgb(25,52,79),rgba(25,52,79, 0.58))"
            textsize="14"
            :url="img.setting"
            :istherepicture="true"
            @click="openColumnConfig"
          />
          <GenericButton
            name="Save"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgb(119,191,66)"
            textsize="14"
            @click="saveInvoice"
            @customInputValueObj="getFilterData"
          />
          <GenericButton
            name="Edit"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgb(119,191,66)"
            textsize="14"
            @click="editInvoice"
          />
          <GenericButton
            name="Make Bill"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgba(54, 155, 215, 0.8)"
            textsize="14"
          />
          <GenericButton
            name="Print Preview"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgba(126,183,62, 0.8)"
            textsize="14"
            :url="img.printer"
            :istherepicture="true"
          />
          <GenericButton
            name="Delete"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bggradient="linear-gradient(to top, rgb(108,33,38),rgba(108,33,38,0.65))"
            textsize="14"
            :url="img.del"
            :istherepicture="true"
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
          :addmodalorrow="openPopup"
          :isedit="isEdit"
          height="300"
          class="bg-[rgba(255,255,255,0.5)] mt-2"
          @input-values-updated="handleInputValuesUpdated"
        />
      </div>
    </div>
    <template v-if="invoiceRightColumns !== null">
      <GenericPrepareTablePage
        :tablehead="invoiceRightColumns"
        :tableheadlength="tableData.length"
        :addmodalorrow="openPopup"
        :isedit="isEdit"
        height="300"
        class="bg-[rgba(255,255,255,0.5)] mt-2"
        @input-values-updated="handleInputValuesUpdated"
      />
    </template>
  </div>
</template>

<script>
// Icons url
import goBack from '../../assets/icons/go-back.png'
import copy from '../../assets/icons/copy.png'
import setting from '../../assets/icons/settings.png'
import printer from '../../assets/icons/printer.png'
import del from '../../assets/icons/delete.png'
// Components
import GenericButton from '../Button/GenericButton.vue'
import LoadingPage from '../Loading/LoadingPage.vue'
import LookUp from '../Lookup/LookUp.vue'
import GenericInput from '../Input/GenericInput.vue'
import GenericPrepareTablePage from '../GenericPrepareTable/GenericPrepareTablePage.vue'
import ColumnConfigPage from '../ColumnConfig/ColumnConfigPage.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    LookUp,
    GenericInput,
    GenericPrepareTablePage,
    ColumnConfigPage,
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
      rightColumns: [],
      tableNameTranslateObj: {},
      isLoading: false,
      img: {
        goBack,
        copy,
        setting,
        printer,
        del,
      },
      objData: {},
      selectedRow: null,
      propsValue: {
        supplare: {},
        branch: {},
        currency: {},
      },
      tableData: [],
      tableData2: [],
      inputValuesObj: new Map(),
      required: {
        lookUp1: true,
        lookUp2: true,
      },
      isInvoiceItam: false,
      rightMap: new Map(),
      leftMap: new Map(),
      rightData: [],
      leftData: [],
      actionUrl: '',
      checkModal: false,
      openPopup: true,
      invoiceRightColumns: null,
      invoiceList: [],
      isEdit: false,
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
          this.objData = res?.data?.invoiceJson
          this.actionUrl = res?.data?.actionUrl
          this.rightColumns = res?.data?.rightColumns
          this.openPopup = res?.data?.openPopup
          this.leftRightDataFilter()
          this.getFilterData()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Filter Action
    leftRightDataFilter() {
      if (this.rightColumns) {
        // eslint-disable-next-line array-callback-return
        this.tableData = this.rightColumns.filter((value) => {
          if (value.showUI) return value
        })
        // eslint-disable-next-line array-callback-return
        this.tableData2 = this.rightColumns.filter((value) => {
          if (!value.showUI) return value
        })
      }
    },

    // Filter Action
    getFilterData() {
      this.tableData.forEach((obj) => {
        this.rightMap.set(obj.name, obj)
      })
      this.tableData2.forEach((obj) => {
        this.leftMap.set(obj.name, obj)
      })

      this.rightData = Object.fromEntries(this.rightMap)
      this.leftData = Object.fromEntries(this.leftMap)
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

      // LookUp required action
      this.inputValuesObj.get('supplier')
        ? (this.required.lookUp1 = true)
        : (this.required.lookUp1 = false)
      this.inputValuesObj.get('paymentType')
        ? (this.required.lookUp2 = true)
        : (this.required.lookUp2 = false)
    },

    // button action addition rows
    additionInvoiceItem() {
      // LookUp required action
      this.inputValuesObj.get('supplier')
        ? (this.required.lookUp1 = true)
        : (this.required.lookUp1 = false)
      this.inputValuesObj.get('paymentType')
        ? (this.required.lookUp2 = true)
        : (this.required.lookUp2 = false)

      if (this.required.lookUp1 && this.required.lookUp2) {
        this.isInvoiceItam = true
      } else {
        this.isInvoiceItam = false
      }
    },

    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    // get invoice list
    handleInputValuesUpdated(updatedArr) {
      this.invoiceList = updatedArr
    },

    // edit invoice
    editInvoice() {
      this.isEdit = !this.isEdit
    },

    saveInvoice() {
      const data = {
        branch: { id: 2 },
        calc_type: 1,
        company: { id: 21 },
        companyCurrencyRate: '12390',
        companyGroup: { id: 1 },
        companyRefCurrencyRate: '12390',
        currency: { id: 1 },
        currencyRate: '12390',
        date: '2024-01-26T16:57:24',
        department: { id: 1 },
        driverName: '',
        id: null,
        invoiceBillStatus: '',
        invoiceItems: this.invoiceList,
        invoiceNo: '',
        invoiceNominal: '1',
        invoiceNumber: '',
        invoiceStatus: '',
        notes: '',
        order: { id: 1 },
        paymentType: { id: 45 },
        sellDate: '2024-01-26T16:57:24',
        sequenceNumber: '',
        systemNumber: '',
        warehouse: { id: 7 },
      }

      this.$axios
        .post(
          `${this.baseURL}/invoice/prepareCreateEditPurchaseInvoice`,
          data,
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
  },
}
</script>

<style>
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
