<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightData"
        :left="leftData"
        :url="actionUrl"
        :createedit="true"
        :autoheight="autoHeight"
        :openpopup="openPopup"
        :editopen="editOpen"
        api="saveColumnConfigU"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <div
      v-if="showHideLogistic"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[10000]"
    >
      <GenericLogisticsCalculationPage :table-data="logisticsCalcData" />
    </div>
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <div class="flex items-center gap-[10px]">
        <generic-button
          name="Go Back"
          type="primary"
          icon-name-attribute="arrow-left"
          @click="$router.push('/inputToServiceInvoice.htm')"
        />
        <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
          Receive Batch from Service
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
                  userId
                    ? objData?.date
                    : new Date(objData?.date)
                        .toLocaleString('en-GB')
                        .split(',')
                        .join('')
                "
                :disabled="userId ? true : false"
                width="100"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="date"
                @customFunction="inputValue"
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
                v-if="objData?.paymentType?.text"
                :defvalue="objData?.paymentType?.text"
                durl="invoiceBase/findAllPaymentType"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="paymentType"
                :disabled="userId ? true : false"
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
                :value="userId ? objData?.systemNumber : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="systemNumber"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                :defvalue="
                  userId || parentID
                    ? objData?.company?.text
                    : objData?.supplierCurSymbol?.text
                "
                durl="invoiceBase/findAllCompanyForInvoice"
                dwidth="100"
                widthtype="%"
                dlist="100"
                :dparam="{
                  companyType: 'client',
                  branchcompany: false,
                }"
                name="supplier"
                :required="required.lookUp1"
                :disabled="userId ? true : false"
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
                  userId
                    ? objData.companyCurrencyRate
                    : propsValue.supplare.value ||
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
                name="companyCurrencyRate"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                  userId
                    ? objData?.sellDate
                    : new Date(objData?.sellDate)
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
                name="sellDate"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                :value="userId || parentID ? objData?.invoiceBillStatus : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="invoiceBillStatus"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                name="companyGroup"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
                :value="userId ? objData?.invoiceOnWayStatus : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="onWay"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                :defvalue="userId ? objData?.branch : objData?.branch?.text"
                durl="invoiceBase/findAllCompanyLogic"
                dwidth="100"
                widthtype="%"
                dlist="100"
                :dparam="{
                  companyType: 'Branch',
                }"
                name="branch"
                :disabled="userId ? true : false"
                @customEvent="getSelectedList"
                @customFunction="getLookUpValue"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ propsValue.branch.name }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="
                  userId
                    ? objData?.companyRefCurrencyRate
                    : propsValue.branch.value ||
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
                name="companyRefCurrencyRate"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.invoiceStatus }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="userId ? objData?.invoiceStatus : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="invoiceStatus"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                v-if="userId || objData?.department?.text"
                :defvalue="
                  userId ? objData?.department : objData?.department?.text
                "
                durl="invoiceBase/findAllDepartmentLogic"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="department"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
                :value="userId ? objData?.invoiceNo : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="invoiceNo"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                :defvalue="userId || parentID ? objData?.warehouse?.text : ''"
                durl="invoiceBase/findAllWarehouseLogic"
                :dparam="{ departmentId }"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="warehouse"
                :required="required.lookUp2"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
                :value="userId ? objData?.notes : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="personSalary"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                  companyType: 'Currency',
                  dateFrom: new Date(objData?.date)
                    .toLocaleString('en-GB')
                    .split(',')
                    .join(''),
                }"
                name="currency"
                :disabled="userId ? true : false"
                @customEvent="getSelectedList"
                @customFunction="getLookUpValue"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ propsValue.currency.name }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="
                  userId
                    ? objData?.currencyRate
                    : propsValue.currency.value || objData?.currencyRate?.text
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
                name="currencyRate"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.postNominal }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <GenericInput
                :value="userId ? objData?.invoiceNominal : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="postNominal"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                name="orderProductionType"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
                :value="userId ? objData?.sequenceNumber : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="sequenceNumber"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                name="calc_type"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
              />
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              {{ tableNameTranslateObj.contract }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[2px]">
              <LookUp
                :value="userId ? objData?.order?.text : ''"
                durl="invoiceBase/findAllContracts"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="contract"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
                name="invoiceNominal"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                :value="userId ? objData?.invoiceNumber : ''"
                width="50"
                widthtype="%"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                name="driverName"
                :disabled="userId ? true : false"
                @customFunction="inputValue"
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
                :value="userId ? objData?.plateNumber : ''"
                durl="invoiceBase/findAllPlateNumber"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="plateNumber"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
                :defvalue="userId ? objData?.car : ''"
                durl="invoiceBase/findAllCar"
                dwidth="100"
                widthtype="%"
                dlist="100"
                name="car"
                :disabled="userId ? true : false"
                @customFunction="getLookUpValue"
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
      <div>
        <generic-button
          v-if="subTable || userId"
          name="Logistics Calculation"
          type="success"
          :margin="true"
          @click="logisticsCalculationAction"
        />
        <generic-button
          v-else
          name="Accept"
          type="primary"
          :margin="true"
          @click="additionInvoiceItem"
        />
      </div>
      <div
        class="w-full bg-[rgba(224,230,238,0.6)] overflow-hidden"
        :class="
          isInvoiceItem || userId
            ? 'duration-[1s] h-fit'
            : 'duration-[1s] h-[0px]'
        "
      >
        <div
          class="border-[1px] border-solid border-[rgba(119,136,153,0.5)] p-[8px_0_8px_8px]"
        >
          <h1 class="text-[13px]">Invoice Item</h1>
          <div class="flex gap-1 flex-wrap">
            <generic-button
              name="Column Setting"
              type="warning"
              icon-name-attribute="setting"
              @click="openColumnConfig"
            />
            <generic-button
              v-if="hideButton"
              name="Save"
              type="primary"
              :disabled="disabledButton"
              @click="saveInvoice"
              @customInputValueObj="getFilterData"
            />
            <generic-button
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="editInvoice"
            />
            <generic-button
              v-if="isMakeAndUnBill"
              name="Un Bill"
              type="info"
              @click="makeAndUnBillAction"
            />
            <generic-button
              v-else
              name="Make Bill"
              type="primary"
              @click="makeAndUnBillAction"
            />
            <generic-button
              name="Print Preview"
              type="success"
              icon-name-attribute="printer"
            />
            <generic-button
              v-if="!isMakeAndUnBill && !undoPayment.topUndoPayment"
              name="Delete"
              type="danger"
              icon-name-attribute="delete"
              @click="deleteInvoice"
            />
            <template v-if="isEdit || staticBtns">
              <generic-button name="copyToInternal" type="primary" />
              <generic-button name="copyToExternal" type="primary" />
              <generic-button name="Print Barcode" type="primary" />
              <generic-button name="Sms notify" type="primary" />
              <generic-button name="Calculate Gramm 1" type="primary" />
              <generic-button name="Calculate Gramm 2" type="primary" />
              <generic-button name="Print all Barcode" type="primary" />
              <generic-button
                name="changeUsedItemsPriceAccess"
                type="danger"
                @click="
                  changePriceAccessAndCompanyAction('changeUsedInvoiceItems')
                "
              />
              <GenericInput
                width="100"
                height="28"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                placeholder="Barcode"
              />
              <GenericInput
                width="100"
                height="28"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                placeholder="External barcode"
              />
            </template>
          </div>
          <div class="my-3 flex items-end gap-1">
            <span v-if="false">
              <label class="text-[15px]"
                >{{ tableNameTranslateObj.allEdit }}
                {{ tableNameTranslateObj.supplier }}</label
              >
              <LookUp
                durl="invoiceBase/searchProductList"
                dwidth="200"
                dlist="200"
              />
            </span>
            <span>
              <label class="text-[13px]"
                >{{ tableNameTranslateObj.allEdit }}
                {{ tableNameTranslateObj.supplier }}</label
              >
              <LookUp
                durl="invoiceBase/findAllCompanyForInvoice"
                dwidth="200"
                dlist="200"
                name="supplier"
                @customFunction="getLookUpValue"
              />
            </span>
            <span>
              <label class="text-[13px]"
                >{{ tableNameTranslateObj.allEdit }}
                {{ tableNameTranslateObj.paymentType }}</label
              >
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="200"
                dlist="200"
                name="paymentType"
                @customFunction="getLookUpValue"
              />
            </span>
            <generic-button
              name="Change Invoice Company"
              type="danger"
              @click="
                changePriceAccessAndCompanyAction('changeUsedInvoiceCompany')
              "
            />
          </div>
          <GenericPrepareTablePage
            ref="invoiceRef"
            :tablehead="tableData"
            :tableheadlength="tableData.length"
            :addmodalorrow="openPopup"
            :response-data="responseData"
            :ui-show-hide="uiShowHide"
            :isedit="isEdit"
            :height="450"
            :default-values="productValues"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="getRowElements"
            @getNewList="getList"
            @requiredAction="getDisabledValue"
          />

          <!-- sub list -->
          <div
            v-if="subListShowHide || isEdit"
            class="flex items-center justify-end gap-1"
          >
            <div class="flex flex-col items-end">
              <span
                v-for="(name, index) in subListArrayLeft"
                :key="index"
                class="text-[13px]"
                >{{ name }}{{ ' -' }}</span
              >
            </div>
            <div class="flex flex-col items-start">
              <span
                v-for="(value, index) in subListArrayRight"
                :key="index"
                class="text-[13px]"
                >{{ value }}</span
              >
            </div>
          </div>
          <!-- sub list -->

          <template v-if="subTable || isEdit">
            <strong class="text-[15px]"
              >Payment Details.
              <span class="text-[14px] text-[rgb(156,0,78)]"
                >Parent ID = {{ parentID ? parentID : userId }}</span
              ></strong
            >
            <div class="flex items-center gap-1">
              <generic-button
                v-if="undoPayment.topUndoPayment"
                name="Undo Payment"
                type="info"
                @click="undoPaymentTransactionColumns('topUP')"
              />
              <template v-else>
                <generic-button
                  v-if="editPayDiscard.editPayShowHide1"
                  name="Edit"
                  type="success"
                  icon-name-attribute="edit"
                  @click="editTransactionColumns('topE')"
                />
                <generic-button
                  v-else
                  name="Pay"
                  :disabled="subDisabledButton"
                  type="primary"
                  @click="payTransactionColumns('topP')"
                />
                <generic-button
                  v-if="editPayDiscard.discardShowHide1"
                  name="Discard"
                  @click="discardTransactionColumns('topD')"
                />
              </template>
            </div>
            <GenericSubPrepareTablePage
              ref="transactionColumnsRef"
              :tablehead="transactionColumnsData"
              :tableheadlength="transactionColumnsData.length"
              :addmodalorrow="openPopup"
              :sub-ui-show-hide="subUiShowHide"
              :isedit="isEdit"
              :height="350"
              :default-values="transactionsList"
              class="bg-[rgba(255,255,255,0.5)] mt-2"
              @rowValues="getSubRowElements"
              @requiredAction="getDisabledValue"
            />
          </template>
          <template v-if="subTable || isEdit">
            <strong class="text-[15px]"
              >Extra Payment Details.
              <span class="text-[14px] text-[rgb(156,0,78)]"
                >Parent ID = {{ parentID ? parentID : userId }}</span
              ></strong
            >
            <div class="flex items-center gap-1">
              <generic-button
                v-if="undoPayment.subUndoPayment"
                name="Undo Payment"
                type="info"
                @click="undoPaymentTransactionColumns('subUP')"
              />
              <template v-else>
                <generic-button
                  v-if="editPayDiscard.editPayShowHide2"
                  name="Edit"
                  type="success"
                  icon-name-attribute="edit"
                  @click="editTransactionColumns('subE')"
                />
                <generic-button
                  v-else
                  name="Pay"
                  type="primary"
                  :disabled="subTwoDisabledButton"
                  @click="payTransactionColumns('subP')"
                />
                <generic-button
                  v-if="editPayDiscard.discardShowHide2"
                  name="Discard"
                  @click="discardTransactionColumns('subD')"
                />
              </template>
            </div>
            <GenericSubPrepareTableTooPage
              ref="transactionColumnsTooRef"
              :tablehead="transactionColumnsData"
              :tableheadlength="transactionColumnsData.length"
              :addmodalorrow="openPopup"
              :sub-ui-show-hide-two="subUiShowHideTwo"
              :isedit="isEdit"
              :height="290"
              :default-values="transactionsExtraList"
              class="bg-[rgba(255,255,255,0.5)] mt-2"
              @rowValues="getSubRowElements"
              @requiredAction="getDisabledValue"
            />
          </template>
        </div>
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
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
import GenericSubPrepareTablePage from '@generics/GenericSubPrepareTable/GenericSubPrepareTablePage.vue'
import GenericSubPrepareTableTooPage from '@generics/GenericSubPrepareTableToo/GenericSubPrepareTableTooPage.vue'
import GenericLogisticsCalculationPage from '@generics/GenericLogisticsCalculation/GenericLogisticsCalculationPage.vue'
export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    LookUp,
    GenericInput,
    GenericPrepareTablePage,
    ColumnConfigPage,
    GenericSubPrepareTablePage,
    GenericSubPrepareTableTooPage,
    GenericLogisticsCalculationPage,
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
        'allEdit',
      ],
      subListArrayLeft: [
        'Net Amount: USD($)',
        'Total Discount: USD($)',
        'Discount Card: USD($)',
        'Total: USD($)',
        'Currency amount: UZS(сум)',
        'Supplier Amount:UZS(сум)',
      ],
      subListArrayRight: [],
      rightColumns: [],
      tableNameTranslateObj: {},
      isLoading: false,
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
      lookupValuesObj: new Map(),
      required: {
        lookUp1: true,
        lookUp2: true,
      },
      departmentId: null,
      isInvoiceItem: false,
      rightMap: {},
      leftMap: {},
      rightData: [],
      leftData: [],
      actionUrl: '',
      checkModal: false,
      openPopup: true,
      invoiceList: [],
      isEdit: false,
      showHideRow: false,
      lookUpValues: {},
      inputValues: {},
      hideButton: true,
      productValues: null,
      transactionsList: [],
      transactionsExtraList: [],
      editOpen: false,
      autoHeight: false,
      transactionColumns: [],
      transactionColumnsData: [],
      editPayDiscard: {
        editPayShowHide1: true,
        editPayShowHide2: true,
        discardShowHide1: false,
        discardShowHide2: false,
      },
      undoPayment: {
        topUndoPayment: false,
        subUndoPayment: false,
      },
      subTable: false,
      parentID: 0,
      id: null,
      responseData: [],
      logisticsCalcData: {},
      showHideLogistic: false,
      uiShowHide: false,
      subUiShowHide: false,
      subUiShowHideTwo: false,
      subListData: {},
      subListShowHide: false,
      makeAndUnBill: false,
      isMakeAndUnBill: false,
      staticBtns: false,
      newListData: [],
      disabledButton: false,
      subDisabledButton: false,
      subTwoDisabledButton: false,
    }
  },

  // WATCH
  watch: {
    objData(val) {
      const arr = [
        val?.subtotal,
        val?.totalDiscount,
        val?.discountCardAmount,
        val?.total,
        val?.currencyTotal,
        val?.currencyTotal,
      ]
      this.subListArrayRight = arr
    },
    subListData(val) {
      const arr = [
        val?.subtotal,
        val?.totalDiscount,
        val?.discountCardAmount,
        val?.total,
        val?.currencyTotal,
        val?.currencyTotal,
      ]
      this.subListArrayRight = arr
    },
  },

  // MOUNTED
  mounted() {
    this.getPageRequest()
    this.getStaticTableNameValues()
    // Close modal when clicking outside of it
    window.addEventListener('click', this.closeModalOutside)
  },

  beforeDestroy() {
    window.removeEventListener('click', this.closeModalOutside)
  },

  // CREATED
  created() {
    this.userId = this.$route.params?.id
    if (this.userId) {
      this.isEdit = true
      this.checkIsEdit = true
      this.hideButton = false
    }
  },

  // METHOD
  methods: {
    // GenericLogisticsCalculation show hide action
    closeModalOutside(event) {
      if (event.target.classList.contains('bg-gray-900')) {
        this.showHideLogistic = false
      }
    },
    // GenericLogisticsCalculation show hide action

    // preparePurchaseInvoiceNewAjaxLoad api
    getPageRequest() {
      const id = this.parentID
        ? this.parentID
        : this.userId
        ? this.userId
        : null
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `/invoices/prepareInputToServiceInvoice`,
          { id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then(({ data }) => {
          this.productValues = data?.invoiceJson?.invoiceItems
          this.transactionsList = data?.invoiceJson?.transactionsList
          this.transactionsExtraList = data?.invoiceJson?.transactionsExtraList
          this.objData = data?.invoiceJson
          this.actionUrl = data?.actionUrl
          this.rightColumns = data?.rightColumns
          this.openPopup = data?.openPopup
          this.editOpen = data?.autoEditOpen
          this.autoHeight = data?.autoHeight
          this.transactionColumns = data?.transactionsColumns
          this.departmentId = data?.invoiceJson?.department?.id
          if (this.isEdit) {
            if (data?.invoiceJson?.paymentType?.text) this.makeAndUnBill = true
            else this.makeAndUnBill = false
          }
          if (this.isEdit) {
            if (data?.invoiceJson?.invoiceBillStatus === 'BILLED')
              this.isMakeAndUnBill = true
            else this.isMakeAndUnBill = false
          }
          // function
          this.leftRightDataFilter()
          // function
          this.getFilterData()
          // function
          this.transactionColumnsFiltered()
          data?.invoiceJson?.transactionsList.length &&
            (this.undoPayment.topUndoPayment = true)
          if (data?.invoiceJson?.transactionsExtraList) {
            this.editPayDiscard.editPayShowHide2 = true
            this.editPayDiscard.discardShowHide2 = false
          }
          this.isLoading = !this.isLoading
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
        this.tableData = this.rightColumns.filter((value) => {
          return value.showUI && value
        })
        this.tableData2 = this.rightColumns.filter((value) => {
          return !value.showUI && value
        })
      }
    },

    // Filter Action
    transactionColumnsFiltered() {
      if (this.transactionColumns) {
        this.transactionColumnsData = this.transactionColumns.filter(
          (value) => {
            return value.showUI && value
          }
        )
      }
    },

    // Filter Action
    getFilterData() {
      this.tableData.forEach((obj) => {
        this.rightMap[obj.name] = obj
      })
      this.tableData2.forEach((obj) => {
        this.leftMap[obj.name] = obj
      })

      this.rightData = this.rightMap
      this.leftData = this.leftMap
    },

    // translate api
    getStaticTableNameValues() {
      this.$axios
        .post(
          `/translate`,
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

    // input values
    inputValue(key, value) {
      this.inputValuesObj.set(key, value)
      this.inputValues = Object.fromEntries(this.inputValuesObj)
    },

    // Lookup's Valuesini olish
    getLookUpValue(key, value, id) {
      this.lookupValuesObj.set(key, id)
      this.lookUpValues = Object.fromEntries(this.lookupValuesObj)

      // LookUp required action
      this.lookupValuesObj.get('supplier')
        ? (this.required.lookUp1 = true)
        : (this.required.lookUp1 = false)
      this.lookupValuesObj.get('warehouse')
        ? (this.required.lookUp2 = true)
        : (this.required.lookUp2 = false)
    },

    // Accept button action
    additionInvoiceItem() {
      // LookUp required action
      this.lookupValuesObj.get('supplier')
        ? (this.required.lookUp1 = true)
        : (this.required.lookUp1 = false)
      this.lookupValuesObj.get('warehouse')
        ? (this.required.lookUp2 = true)
        : (this.required.lookUp2 = false)

      if (this.required.lookUp1 && this.required.lookUp2) {
        this.isInvoiceItem = true
      } else {
        this.isInvoiceItem = false
      }
    },

    // Logistics Calculation api request action
    async apiRequestActionLC(propBody) {
      this.isLoading = !this.isLoading
      try {
        const res = await this.$axios.post(
          `/invoices/preparePurchaseInvoiceNewJson?id=${this.parentID}`,
          propBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        const data = await res.data
        this.isLoading = !this.isLoading
        if (!('statusType' in propBody)) {
          return data
        }
      } catch (error) {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.error('Xatolik yuz berdi:', error)
        throw error
      }
    },

    // Logistics Calculation action
    async logisticsCalculationAction() {
      this.logisticsCalcData = await this.apiRequestActionLC({
        id: this.parentID,
      })
      this.apiRequestActionLC({ id: this.parentID, statusType: true })
      this.showHideLogistic = true
    },

    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    // Save || Pay button'larni disabled qilish
    getDisabledValue(disabledVal, type) {
      if (type === 'top') this.disabledButton = disabledVal
      else if (type === 'bottom') this.subDisabledButton = disabledVal
      else if (type === 'subBottom') this.subTwoDisabledButton = disabledVal
    },

    // Change Price Access and Change Company action
    // new List olish
    getList(arr) {
      this.newListData = arr
    },
    changePriceAccessAndCompanyAction(prop) {
      this.$refs.invoiceRef.getNewList()
      if (prop === 'changeUsedInvoiceItems' && !this.hideButton) {
        let requestBody = ''
        this.newListData.forEach((obj, index) => {
          requestBody += obj?.id
          if (index !== this.responseData.length - 1) {
            requestBody += ','
          }
        })
        this.changePriceAccessAndCompanyRequest(prop, requestBody)
      } else if (prop === 'changeUsedInvoiceCompany' && !this.hideButton) {
        const requestBody = {
          id: this.parentID ? this.parentID : this.userId,
          company: { id: this.lookUpValues?.supplier },
          paymentType: { id: this.lookUpValues?.paymentType },
        }
        if (requestBody.id && requestBody.company && requestBody.paymentType)
          this.changePriceAccessAndCompanyRequest(prop, requestBody)
      }
    },

    // Change Price Access and Change Company action request
    changePriceAccessAndCompanyRequest(prop, requestBody) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `/invoices/${prop}`,

          prop === 'changeUsedInvoiceItems'
            ? { idsItems: requestBody }
            : { invoice: requestBody },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          this.isLoading = !this.isLoading
          if (res.status === 200) {
            this.getPageRequest()
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Make Bill and Un Bill action
    makeAndUnBillAction() {
      if (this.makeAndUnBill) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/invoices/makeBillInvoiceUrl`,
            {
              id: this.parentID ? Number(this.parentID) : Number(this.userId),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-auth-token': localStorage.getItem('authToken'),
              },
            }
          )
          .then((res) => {
            this.isLoading = !this.isLoading
            if (res.status === 200) {
              this.getPageRequest()
              this.isMakeAndUnBill = !this.isMakeAndUnBill
            }
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // delete Invoice
    deleteInvoice() {
      if (!this.hideButton) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(
            `/invoices/prepareDeleteInvoiceUrl`,
            {
              id: this.parentID ? Number(this.parentID) : Number(this.userId),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-auth-token': localStorage.getItem('authToken'),
              },
            }
          )
          .then((res) => {
            this.isLoading = !this.isLoading
            if (res.status === 200) this.$router.push('/purchaseinvoice.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // edit invoice
    editInvoice() {
      this.hideButton = !this.hideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.invoiceRef.getEditRowAction(
        this.parentID ? this.parentID : this.userId
      )
      this.uiShowHide = false
      this.makeAndUnBill = false
    },

    getRowElements(arr, hideBtn, id) {
      this.id = +id
      this.invoiceList = arr
      this.hideButton = !hideBtn
    },

    editTransactionColumns(prop) {
      if (prop === 'topE') {
        this.editPayDiscard.editPayShowHide1 = false
        this.editPayDiscard.discardShowHide1 = true
      } else if (prop === 'subE') {
        this.editPayDiscard.editPayShowHide2 = false
        this.editPayDiscard.discardShowHide2 = true
      }
      if (prop === 'topE') {
        // GenericSubTablePage da ishlab beruvchi function
        this.$refs.transactionColumnsRef.editAction()
      } else if (prop === 'subE') {
        // GenericSubTablePageToo da ishlab beruvchi function
        this.$refs.transactionColumnsTooRef.editAction()
      }
    },

    payTransactionColumns(prop) {
      if (prop === 'topP') {
        // GenericSubTablePage da ishlab beruvchi function
        this.$refs.transactionColumnsRef.payAction(prop)
      } else if (prop === 'subP') {
        // GenericSubTablePageToo da ishlab beruvchi function
        this.$refs.transactionColumnsTooRef.payAction(prop)
      }
    },

    discardTransactionColumns(prop) {
      if (prop === 'topD') {
        this.editPayDiscard.discardShowHide1 = false
        this.editPayDiscard.editPayShowHide1 = true
      } else if (prop === 'subD') {
        this.editPayDiscard.discardShowHide2 = false
        this.editPayDiscard.editPayShowHide2 = true
      }
      if (prop === 'topD') {
        // GenericSubTablePage da ishlab beruvchi function
        this.$refs.transactionColumnsRef.discardAndUndoPaymentAction(prop)
      } else if (prop === 'subD') {
        // GenericSubTablePageToo da ishlab beruvchi function
        this.$refs.transactionColumnsTooRef.discardAndUndoPaymentAction(prop)
      }
    },

    getResponseTransactionsAction(prop) {
      this.$axios
        .post(
          `/invoices/prepareInputToServiceInvoiceAjaxLoad`,
          { id: this.parentID ? this.parentID : this.userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then(({ data }) => {
          this.transactionsList = data?.invoiceJson?.transactionsList
          this.transactionsExtraList = data?.invoiceJson?.transactionsExtraList
          if (prop === 'topP' && this.transactionsList.length) {
            this.subUiShowHide = true
            this.undoPayment.topUndoPayment = true
          } else if (prop === 'subP' && this.transactionsExtraList) {
            this.subUiShowHideTwo = true
            this.editPayDiscard.editPayShowHide2 = true
            this.editPayDiscard.discardShowHide2 = false
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    undoPaymentTransactionColumns(prop) {
      if (prop === 'topUP') {
        // GenericSubTablePage da ishlab beruvchi function
        this.$refs.transactionColumnsRef.discardAndUndoPaymentAction(prop)
      } else if (prop === 'subUP') {
        // GenericSubTablePageToo da ishlab beruvchi function
        this.$refs.transactionColumnsTooRef.discardAndUndoPaymentAction(prop)
      }
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `/invoices/${prop === 'topUP' ? 'payUnPayUrl' : 'extraPayUnPay'}`,
          {
            id: this.parentID ? this.parentID : this.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then(({ status }) => {
          if (status === 200 && prop === 'topUP') {
            this.isLoading = !this.isLoading
            this.undoPayment.topUndoPayment = false
            this.editPayDiscard.editPayShowHide1 = true
            this.editPayDiscard.discardShowHide1 = false
          } else if (status === 200 && prop === 'subUP') {
            this.isLoading = !this.isLoading
            this.undoPayment.subUndoPayment = false
            this.editPayDiscard.discardShowHide2 = false
            this.editPayDiscard.editPayShowHide2 = true
          }
          this.getResponseTransactionsAction()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    getSubRowElements(arr, prop) {
      this.isLoading = !this.isLoading
      const topBodyP = {
        id: this.parentID ? this.parentID : Number(this.userId),
        transactionsList: arr,
      }
      const subBodyP = {
        id: this.parentID ? this.parentID : Number(this.userId),
        transactionsExtraList: arr,
      }
      this.$axios
        .post(
          `/invoices/${prop === 'topP' ? 'payUnPayUrl' : 'extraPayUnPay'}`,
          prop === 'topP' ? topBodyP : subBodyP,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          this.isLoading = !this.isLoading
          this.getResponseTransactionsAction(prop)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    saveInvoice() {
      if (!this.disabledButton) {
        // GenericTablePage da ishlab beruvchi function
        this.$refs.invoiceRef.getSaveRowAction()

        // GenericTablePage da subTable uchun
        this.subListShowHide = true
        this.subTable = true
        const inputValues = this.inputValues
        const lookupValues = this.lookUpValues
        const objData = this.objData

        // input values
        const dateBack = new Date(objData.date)
          .toLocaleString('en-GB')
          .split(',')
          .join('')

        let date = inputValues.date ? inputValues.date : dateBack
        const splitDate = date.split(' ')
        date = splitDate[0].split('/').reverse().join('-') + 'T' + splitDate[1]

        const sellDateBack = new Date(objData.date)
          .toLocaleString('en-GB')
          .split(',')
          .join('')

        let sellDate = inputValues.sellDate
          ? inputValues.sellDate
          : sellDateBack
        const splitSellDate = sellDate.split(' ')
        sellDate =
          splitSellDate[0].split('/').reverse().join('-') +
          'T' +
          splitSellDate[1]

        const currencyRate = this.propsValue?.supplare?.value
          ? this.propsValue?.supplare?.value
          : objData?.currencyRate?.text
          ? objData?.currencyRate?.text
          : objData?.currencyRate

        const driverName = inputValues?.driverName
          ? this.inputValues?.driverName
          : ''

        const companyRefCurrencyRate = inputValues?.companyRefCurrencyRate
          ? this.inputValues?.companyRefCurrencyRate
          : this.propsValue?.branch?.value
          ? this.propsValue?.branch?.value
          : objData?.companyRefCurrencyRate?.text
          ? objData?.companyRefCurrencyRate?.text
          : objData?.companyRefCurrencyRate

        const companyCurrencyRate = inputValues?.companyRefCurrencyRate
          ? this.inputValues?.companyCurrencyRate
          : this.propsValue?.supplare?.value
          ? this.propsValue?.supplare?.value
          : objData?.companyCurrencyRate?.text
          ? objData?.companyCurrencyRate?.text
          : objData?.companyCurrencyRate

        const invoiceNominal = this.inputValues?.invoiceNominal
          ? this.inputValues?.invoiceNominal
          : objData?.invoiceNominal?.text
          ? objData?.invoiceNominal?.text
          : objData?.invoiceNominal

        const systemNumber = inputValues?.systemNumber
          ? this.inputValues?.systemNumber
          : ''

        const invoiceStatus = inputValues?.invoiceStatus
          ? this.inputValues?.invoiceStatus
          : ''

        const invoiceBillStatus = inputValues?.invoiceBillStatus
          ? this.inputValues?.invoiceBillStatus
          : ''

        // lookup values
        const calcType = lookupValues?.calc_type
          ? lookupValues?.calc_type
          : objData?.calc_type?.id

        const order = lookupValues?.order
          ? lookupValues?.order
          : objData?.order?.id

        const branch = lookupValues?.branch
          ? lookupValues?.branch
          : objData.branch?.id

        const companyGroup = lookupValues?.companyGroup
          ? lookupValues?.companyGroup
          : objData?.companyGroup?.id

        const supplier = lookupValues?.supplier
          ? lookupValues?.supplier
          : objData?.supplier?.id

        const currency = lookupValues?.currency
          ? lookupValues?.currency
          : objData?.currency?.id

        const department = lookupValues?.department
          ? lookupValues?.department
          : objData?.department?.id

        const paymentType = lookupValues?.paymentType
          ? lookupValues?.paymentType
          : objData?.paymentType?.id

        const orderProductionType = lookupValues?.orderProductionType
          ? lookupValues?.orderProductionType
          : objData?.orderProductionType?.id

        const warehouse = lookupValues?.warehouse
          ? lookupValues?.warehouse
          : objData?.warehouse?.id

        const requestBody = {
          invoice: {
            branch: { id: Number(branch) },
            calc_type: calcType,
            company: { id: Number(supplier) },
            companyCurrencyRate,
            companyGroup: { id: Number(companyGroup) },
            companyRefCurrencyRate,
            currency: { id: Number(currency) },
            currencyRate,
            date,
            department: { id: Number(department) },
            driverName,
            id: this.isEdit ? this.id : this.parentID ? this.parentID : null,
            invoiceBillStatus,
            invoiceItems: this.invoiceList,
            invoiceNo: '',
            invoiceNominal,
            invoiceNumber: '',
            invoiceStatus,
            notes: '',
            order: { id: order },
            orderProductionType: { id: Number(orderProductionType) },
            paymentType: { id: Number(paymentType) },
            sellDate,
            sequenceNumber: '',
            systemNumber,
            warehouse: { id: Number(warehouse) },
          },
        }

        // Open qilib kirilganda jo'natiladigan 'request body'
        const editRequestBody = {
          invoice: {
            calc_type: calcType,
            companyCurrencyRate,
            companyRefCurrencyRate,
            currency: { id: Number(currency) },
            currencyRate,
            id: this.isEdit ? this.id : this.parentID ? this.parentID : null,
            invoiceItems: this.invoiceList,
            invoiceNominal,
            order: { id: order },
            paymentType: { id: Number(paymentType) },
          },
        }

        if (!paymentType) {
          delete editRequestBody.invoice.paymentType
          delete requestBody.invoice.paymentType
        }

        this.$axios
          .post(
            `/invoices/prepareCreateEditInputToServiceInvoice`,
            this.isEdit ? editRequestBody : requestBody,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-auth-token': localStorage.getItem('authToken'),
              },
            }
          )
          .then(({ data, status }) => {
            this.parentID = data?.id
            this.responseData = data?.invoiceItems
            this.subListData = data
            data?.invoiceItems.length && (this.uiShowHide = true)
            if (!this.isEdit && data?.paymentType?.text)
              this.makeAndUnBill = true
            else this.makeAndUnBill = false

            if (status === 200) {
              this.$router.push(
                `/prepareInputToServiceInvoice.htm/${this.parentID}`
              )
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
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
