import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _228336fa = () => interopDefault(import('..\\pages\\bands.htm\\index.vue' /* webpackChunkName: "pages/bands.htm/index" */))
const _306c67b1 = () => interopDefault(import('..\\pages\\batchReports.htm\\index.vue' /* webpackChunkName: "pages/batchReports.htm/index" */))
const _5403c495 = () => interopDefault(import('..\\pages\\batchStagesReport.htm\\index.vue' /* webpackChunkName: "pages/batchStagesReport.htm/index" */))
const _c443a1b4 = () => interopDefault(import('..\\pages\\branches.htm\\index.vue' /* webpackChunkName: "pages/branches.htm/index" */))
const _86bb0c5a = () => interopDefault(import('..\\pages\\branchProductsStockReportByLogic.htm\\index.vue' /* webpackChunkName: "pages/branchProductsStockReportByLogic.htm/index" */))
const _dbac8d30 = () => interopDefault(import('..\\pages\\calculationByColorVariantRecipe.htm\\index.vue' /* webpackChunkName: "pages/calculationByColorVariantRecipe.htm/index" */))
const _302d9a61 = () => interopDefault(import('..\\pages\\checkRealCountBarcode.htm\\index.vue' /* webpackChunkName: "pages/checkRealCountBarcode.htm/index" */))
const _82e50974 = () => interopDefault(import('..\\pages\\colors.htm\\index.vue' /* webpackChunkName: "pages/colors.htm/index" */))
const _7a28fbf8 = () => interopDefault(import('..\\pages\\dashboard.htm\\index.vue' /* webpackChunkName: "pages/dashboard.htm/index" */))
const _68e935f7 = () => interopDefault(import('..\\pages\\dyeings.htm\\index.vue' /* webpackChunkName: "pages/dyeings.htm/index" */))
const _0f03913e = () => interopDefault(import('..\\pages\\expenseInvoice.htm\\index.vue' /* webpackChunkName: "pages/expenseInvoice.htm/index" */))
const _469fa3ba = () => interopDefault(import('..\\pages\\grades.htm\\index.vue' /* webpackChunkName: "pages/grades.htm/index" */))
const _7e8a59e6 = () => interopDefault(import('..\\pages\\inputFromProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/inputFromProductionCompany.htm/index" */))
const _3b83c1fe = () => interopDefault(import('..\\pages\\inputReturn.htm\\index.vue' /* webpackChunkName: "pages/inputReturn.htm/index" */))
const _b2f21fb6 = () => interopDefault(import('..\\pages\\inputStockDetailReport.htm\\index.vue' /* webpackChunkName: "pages/inputStockDetailReport.htm/index" */))
const _6c36540a = () => interopDefault(import('..\\pages\\inputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/inputToServiceInvoice.htm/index" */))
const _2fb416a8 = () => interopDefault(import('..\\pages\\internalInvoice.htm\\index.vue' /* webpackChunkName: "pages/internalInvoice.htm/index" */))
const _7e5120b8 = () => interopDefault(import('..\\pages\\invoiceReports.htm\\index.vue' /* webpackChunkName: "pages/invoiceReports.htm/index" */))
const _39a1c10f = () => interopDefault(import('..\\pages\\login.htm\\index.vue' /* webpackChunkName: "pages/login.htm/index" */))
const _31b09e96 = () => interopDefault(import('..\\pages\\maintable\\index.vue' /* webpackChunkName: "pages/maintable/index" */))
const _0dd49fb9 = () => interopDefault(import('..\\pages\\marketSalesInvoice.htm\\index.vue' /* webpackChunkName: "pages/marketSalesInvoice.htm/index" */))
const _dc8ad6d8 = () => interopDefault(import('..\\pages\\menuSettings.htm\\index.vue' /* webpackChunkName: "pages/menuSettings.htm/index" */))
const _367cb385 = () => interopDefault(import('..\\pages\\outputproductioninvoice.htm\\index.vue' /* webpackChunkName: "pages/outputproductioninvoice.htm/index" */))
const _5312a10c = () => interopDefault(import('..\\pages\\outputProductionReturn.htm\\index.vue' /* webpackChunkName: "pages/outputProductionReturn.htm/index" */))
const _6803b690 = () => interopDefault(import('..\\pages\\outputToProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompany.htm/index" */))
const _68168480 = () => interopDefault(import('..\\pages\\outputToProductionCompanyReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompanyReturn.htm/index" */))
const _3adf68e8 = () => interopDefault(import('..\\pages\\outputToPrOrder.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrder.htm/index" */))
const _a1edd650 = () => interopDefault(import('..\\pages\\outputToPrOrderReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrderReturn.htm/index" */))
const _79cbe902 = () => interopDefault(import('..\\pages\\outputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/outputToServiceInvoice.htm/index" */))
const _59afd0f1 = () => interopDefault(import('..\\pages\\personEquipmentSews.htm\\index.vue' /* webpackChunkName: "pages/personEquipmentSews.htm/index" */))
const _2516533d = () => interopDefault(import('..\\pages\\preparePurchaseInvoiceNew.htm\\index.vue' /* webpackChunkName: "pages/preparePurchaseInvoiceNew.htm/index" */))
const _48379aad = () => interopDefault(import('..\\pages\\prepareSalesReturnNew.htm\\index.vue' /* webpackChunkName: "pages/prepareSalesReturnNew.htm/index" */))
const _12fc8f64 = () => interopDefault(import('..\\pages\\productionInvoice.htm\\index.vue' /* webpackChunkName: "pages/productionInvoice.htm/index" */))
const _63962f83 = () => interopDefault(import('..\\pages\\productionorder.htm\\index.vue' /* webpackChunkName: "pages/productionorder.htm/index" */))
const _82c6ee96 = () => interopDefault(import('..\\pages\\productionorderplannings.htm\\index.vue' /* webpackChunkName: "pages/productionorderplannings.htm/index" */))
const _8c424468 = () => interopDefault(import('..\\pages\\purchaseinvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseinvoice.htm/index" */))
const _67ce2c0b = () => interopDefault(import('..\\pages\\purchaseorder.htm\\index.vue' /* webpackChunkName: "pages/purchaseorder.htm/index" */))
const _1be90912 = () => interopDefault(import('..\\pages\\saleinvoice.htm\\index.vue' /* webpackChunkName: "pages/saleinvoice.htm/index" */))
const _3ef45d34 = () => interopDefault(import('..\\pages\\salesorder.htm\\index.vue' /* webpackChunkName: "pages/salesorder.htm/index" */))
const _7de78dfc = () => interopDefault(import('..\\pages\\salesReturn.htm\\index.vue' /* webpackChunkName: "pages/salesReturn.htm/index" */))
const _273d9cb9 = () => interopDefault(import('..\\pages\\sessions.htm\\index.vue' /* webpackChunkName: "pages/sessions.htm/index" */))
const _5a55c3b9 = () => interopDefault(import('..\\pages\\sewBandEquipments.htm\\index.vue' /* webpackChunkName: "pages/sewBandEquipments.htm/index" */))
const _7cade09e = () => interopDefault(import('..\\pages\\sewModelReport.htm\\index.vue' /* webpackChunkName: "pages/sewModelReport.htm/index" */))
const _45ad7876 = () => interopDefault(import('..\\pages\\simpleProductionInvoice.htm\\index.vue' /* webpackChunkName: "pages/simpleProductionInvoice.htm/index" */))
const _bea727d6 = () => interopDefault(import('..\\pages\\transactionDetailReport.htm\\index.vue' /* webpackChunkName: "pages/transactionDetailReport.htm/index" */))
const _dc0365d6 = () => interopDefault(import('..\\pages\\transactionReports.htm\\index.vue' /* webpackChunkName: "pages/transactionReports.htm/index" */))
const _581b1d17 = () => interopDefault(import('..\\pages\\transactionSaldoReport.htm\\index.vue' /* webpackChunkName: "pages/transactionSaldoReport.htm/index" */))
const _7607bc89 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _37aa00e5 = () => interopDefault(import('..\\pages\\preparePurchaseInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseInvoiceNew.htm/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bands.htm",
    component: _228336fa,
    name: "bands.htm"
  }, {
    path: "/batchReports.htm",
    component: _306c67b1,
    name: "batchReports.htm"
  }, {
    path: "/batchStagesReport.htm",
    component: _5403c495,
    name: "batchStagesReport.htm"
  }, {
    path: "/branches.htm",
    component: _c443a1b4,
    name: "branches.htm"
  }, {
    path: "/branchProductsStockReportByLogic.htm",
    component: _86bb0c5a,
    name: "branchProductsStockReportByLogic.htm"
  }, {
    path: "/calculationByColorVariantRecipe.htm",
    component: _dbac8d30,
    name: "calculationByColorVariantRecipe.htm"
  }, {
    path: "/checkRealCountBarcode.htm",
    component: _302d9a61,
    name: "checkRealCountBarcode.htm"
  }, {
    path: "/colors.htm",
    component: _82e50974,
    name: "colors.htm"
  }, {
    path: "/dashboard.htm",
    component: _7a28fbf8,
    name: "dashboard.htm"
  }, {
    path: "/dyeings.htm",
    component: _68e935f7,
    name: "dyeings.htm"
  }, {
    path: "/expenseInvoice.htm",
    component: _0f03913e,
    name: "expenseInvoice.htm"
  }, {
    path: "/grades.htm",
    component: _469fa3ba,
    name: "grades.htm"
  }, {
    path: "/inputFromProductionCompany.htm",
    component: _7e8a59e6,
    name: "inputFromProductionCompany.htm"
  }, {
    path: "/inputReturn.htm",
    component: _3b83c1fe,
    name: "inputReturn.htm"
  }, {
    path: "/inputStockDetailReport.htm",
    component: _b2f21fb6,
    name: "inputStockDetailReport.htm"
  }, {
    path: "/inputToServiceInvoice.htm",
    component: _6c36540a,
    name: "inputToServiceInvoice.htm"
  }, {
    path: "/internalInvoice.htm",
    component: _2fb416a8,
    name: "internalInvoice.htm"
  }, {
    path: "/invoiceReports.htm",
    component: _7e5120b8,
    name: "invoiceReports.htm"
  }, {
    path: "/login.htm",
    component: _39a1c10f,
    name: "login.htm"
  }, {
    path: "/maintable",
    component: _31b09e96,
    name: "maintable"
  }, {
    path: "/marketSalesInvoice.htm",
    component: _0dd49fb9,
    name: "marketSalesInvoice.htm"
  }, {
    path: "/menuSettings.htm",
    component: _dc8ad6d8,
    name: "menuSettings.htm"
  }, {
    path: "/outputproductioninvoice.htm",
    component: _367cb385,
    name: "outputproductioninvoice.htm"
  }, {
    path: "/outputProductionReturn.htm",
    component: _5312a10c,
    name: "outputProductionReturn.htm"
  }, {
    path: "/outputToProductionCompany.htm",
    component: _6803b690,
    name: "outputToProductionCompany.htm"
  }, {
    path: "/outputToProductionCompanyReturn.htm",
    component: _68168480,
    name: "outputToProductionCompanyReturn.htm"
  }, {
    path: "/outputToPrOrder.htm",
    component: _3adf68e8,
    name: "outputToPrOrder.htm"
  }, {
    path: "/outputToPrOrderReturn.htm",
    component: _a1edd650,
    name: "outputToPrOrderReturn.htm"
  }, {
    path: "/outputToServiceInvoice.htm",
    component: _79cbe902,
    name: "outputToServiceInvoice.htm"
  }, {
    path: "/personEquipmentSews.htm",
    component: _59afd0f1,
    name: "personEquipmentSews.htm"
  }, {
    path: "/preparePurchaseInvoiceNew.htm",
    component: _2516533d,
    name: "preparePurchaseInvoiceNew.htm"
  }, {
    path: "/prepareSalesReturnNew.htm",
    component: _48379aad,
    name: "prepareSalesReturnNew.htm"
  }, {
    path: "/productionInvoice.htm",
    component: _12fc8f64,
    name: "productionInvoice.htm"
  }, {
    path: "/productionorder.htm",
    component: _63962f83,
    name: "productionorder.htm"
  }, {
    path: "/productionorderplannings.htm",
    component: _82c6ee96,
    name: "productionorderplannings.htm"
  }, {
    path: "/purchaseinvoice.htm",
    component: _8c424468,
    name: "purchaseinvoice.htm"
  }, {
    path: "/purchaseorder.htm",
    component: _67ce2c0b,
    name: "purchaseorder.htm"
  }, {
    path: "/saleinvoice.htm",
    component: _1be90912,
    name: "saleinvoice.htm"
  }, {
    path: "/salesorder.htm",
    component: _3ef45d34,
    name: "salesorder.htm"
  }, {
    path: "/salesReturn.htm",
    component: _7de78dfc,
    name: "salesReturn.htm"
  }, {
    path: "/sessions.htm",
    component: _273d9cb9,
    name: "sessions.htm"
  }, {
    path: "/sewBandEquipments.htm",
    component: _5a55c3b9,
    name: "sewBandEquipments.htm"
  }, {
    path: "/sewModelReport.htm",
    component: _7cade09e,
    name: "sewModelReport.htm"
  }, {
    path: "/simpleProductionInvoice.htm",
    component: _45ad7876,
    name: "simpleProductionInvoice.htm"
  }, {
    path: "/transactionDetailReport.htm",
    component: _bea727d6,
    name: "transactionDetailReport.htm"
  }, {
    path: "/transactionReports.htm",
    component: _dc0365d6,
    name: "transactionReports.htm"
  }, {
    path: "/transactionSaldoReport.htm",
    component: _581b1d17,
    name: "transactionSaldoReport.htm"
  }, {
    path: "/",
    component: _7607bc89,
    name: "index"
  }, {
    path: "/preparePurchaseInvoiceNew.htm/:id",
    component: _37aa00e5,
    name: "preparePurchaseInvoiceNew.htm-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
