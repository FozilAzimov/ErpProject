export { default as ActualitySystem } from '../..\\components\\ActualitySystemPage\\ActualitySystem.vue'
export { default as BranchesPage } from '../..\\components\\Branches\\BranchesPage.vue'
export { default as ColumnConfigPage } from '../..\\components\\ColumnConfig\\ColumnConfigPage.vue'
export { default as ColorsPage } from '../..\\components\\ColorsPage\\ColorsPage.vue'
export { default as DashboardPage } from '../..\\components\\Dashboard\\DashboardPage.vue'
export { default as GenericButton } from '../..\\components\\Button\\GenericButton.vue'
export { default as DyeingsPage } from '../..\\components\\Dyeings\\DyeingsPage.vue'
export { default as ExpenseInvoice } from '../..\\components\\ExpenseInvoice\\ExpenseInvoice.vue'
export { default as GenericPrepareTablePage } from '../..\\components\\GenericPrepareTable\\GenericPrepareTablePage.vue'
export { default as GenericInvoiceItemModalPage } from '../..\\components\\GenericInvoiceItemModal\\GenericInvoiceItemModalPage.vue'
export { default as GenericTablePage } from '../..\\components\\GenericTable\\GenericTablePage.vue'
export { default as GenericTranslatePage } from '../..\\components\\GenericTranslate\\GenericTranslatePage.vue'
export { default as GenericInput } from '../..\\components\\Input\\GenericInput.vue'
export { default as GenericInputDatePage } from '../..\\components\\InputDate\\GenericInputDatePage.vue'
export { default as InternanlListPage } from '../..\\components\\InternalListPage\\InternanlListPage.vue'
export { default as LoadingPage } from '../..\\components\\Loading\\LoadingPage.vue'
export { default as LoginPage } from '../..\\components\\Login\\LoginPage.vue'
export { default as LookUp } from '../..\\components\\Lookup\\LookUp.vue'
export { default as LanguageSelector } from '../..\\components\\main\\LanguageSelector.vue'
export { default as MenuSettings } from '../..\\components\\MenuSettings\\MenuSettings.vue'
export { default as OutputProductionInvoice } from '../..\\components\\OutputProductionInvoice\\OutputProductionInvoice.vue'
export { default as PreparePurchaseInvoiceNewPage } from '../..\\components\\PreparePurchaseInvoiceNew\\PreparePurchaseInvoiceNewPage.vue'
export { default as PrepareSalesReturnNewPage } from '../..\\components\\PrepareSalesReturnNew\\PrepareSalesReturnNewPage.vue'
export { default as ProductionInvoice } from '../..\\components\\ProductionInvoice\\ProductionInvoice.vue'
export { default as ProductionOrderPage } from '../..\\components\\ProductionOrderPage\\ProductionOrderPage.vue'
export { default as ProductionOrderplannigs } from '../..\\components\\ProductionOrderPlannigs\\ProductionOrderplannigs.vue'
export { default as PurchaseInvoisePage } from '../..\\components\\PurchaseInvoice\\PurchaseInvoisePage.vue'
export { default as PurchaseOrderPage } from '../..\\components\\PurchaseOrderpage\\PurchaseOrderPage.vue'
export { default as PurchaseReturnPage } from '../..\\components\\PurchaseReturnPage\\PurchaseReturnPage.vue'
export { default as SaleInvoicePage } from '../..\\components\\SaleInvoice\\SaleInvoicePage.vue'
export { default as SalesOrderpage } from '../..\\components\\SalesOrderpage\\SalesOrderpage.vue'
export { default as SalesReturnPage } from '../..\\components\\SalesReturn\\SalesReturnPage.vue'
export { default as GenericSelect } from '../..\\components\\Select\\GenericSelect.vue'
export { default as SessionsPage } from '../..\\components\\Sessions\\SessionsPage.vue'
export { default as GenericActiveLookUpPage } from '../..\\components\\Generics\\GenericActiveLookUp\\GenericActiveLookUpPage.vue'
export { default as PageTable } from '../..\\components\\Reports\\TransactionReports\\PageTable.vue'
export { default as SummaryReportPage1 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage1.vue'
export { default as SummaryReportPage2 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage2.vue'
export { default as SummaryReportPage3 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage3.vue'
export { default as SummaryReportPage4 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage4.vue'
export { default as SummaryReportPage5 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage5.vue'
export { default as SummaryReportPage6 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage6.vue'
export { default as SummaryReportPage7 } from '../..\\components\\Reports\\TransactionReports\\SummaryReportPage7.vue'
export { default as TransactionReportsPage } from '../..\\components\\Reports\\TransactionReports\\TransactionReportsPage.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
