import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _228336fa = () => interopDefault(import('..\\pages\\bands.htm\\index.vue' /* webpackChunkName: "pages/bands.htm/index" */))
const _306c67b1 = () => interopDefault(import('..\\pages\\batchReports.htm\\index.vue' /* webpackChunkName: "pages/batchReports.htm/index" */))
const _5403c495 = () => interopDefault(import('..\\pages\\batchStagesReport.htm\\index.vue' /* webpackChunkName: "pages/batchStagesReport.htm/index" */))
const _7371bfda = () => interopDefault(import('..\\pages\\batchunions.htm\\index.vue' /* webpackChunkName: "pages/batchunions.htm/index" */))
const _c443a1b4 = () => interopDefault(import('..\\pages\\branches.htm\\index.vue' /* webpackChunkName: "pages/branches.htm/index" */))
const _86bb0c5a = () => interopDefault(import('..\\pages\\branchProductsStockReportByLogic.htm\\index.vue' /* webpackChunkName: "pages/branchProductsStockReportByLogic.htm/index" */))
const _dbac8d30 = () => interopDefault(import('..\\pages\\calculationByColorVariantRecipe.htm\\index.vue' /* webpackChunkName: "pages/calculationByColorVariantRecipe.htm/index" */))
const _302d9a61 = () => interopDefault(import('..\\pages\\checkRealCountBarcode.htm\\index.vue' /* webpackChunkName: "pages/checkRealCountBarcode.htm/index" */))
const _8030abd4 = () => interopDefault(import('..\\pages\\colorDepth.htm\\index.vue' /* webpackChunkName: "pages/colorDepth.htm/index" */))
const _82e50974 = () => interopDefault(import('..\\pages\\colors.htm\\index.vue' /* webpackChunkName: "pages/colors.htm/index" */))
const _064bc708 = () => interopDefault(import('..\\pages\\colorVariantRecipeStageChild.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStageChild.htm/index" */))
const _488f6fa6 = () => interopDefault(import('..\\pages\\colorVariantRecipeStagePicture.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStagePicture.htm/index" */))
const _7a28fbf8 = () => interopDefault(import('..\\pages\\dashboard.htm\\index.vue' /* webpackChunkName: "pages/dashboard.htm/index" */))
const _2710b77a = () => interopDefault(import('..\\pages\\designs.htm\\index.vue' /* webpackChunkName: "pages/designs.htm/index" */))
const _1540c9ca = () => interopDefault(import('..\\pages\\designVariants.htm\\index.vue' /* webpackChunkName: "pages/designVariants.htm/index" */))
const _68e935f7 = () => interopDefault(import('..\\pages\\dyeings.htm\\index.vue' /* webpackChunkName: "pages/dyeings.htm/index" */))
const _90cea158 = () => interopDefault(import('..\\pages\\equipmentsRealTimeStatus.htm\\index.vue' /* webpackChunkName: "pages/equipmentsRealTimeStatus.htm/index" */))
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
const _f8aa917e = () => interopDefault(import('..\\pages\\makeBill.htm\\index.vue' /* webpackChunkName: "pages/makeBill.htm/index" */))
const _0dd49fb9 = () => interopDefault(import('..\\pages\\marketSalesInvoice.htm\\index.vue' /* webpackChunkName: "pages/marketSalesInvoice.htm/index" */))
const _dc8ad6d8 = () => interopDefault(import('..\\pages\\menuSettings.htm\\index.vue' /* webpackChunkName: "pages/menuSettings.htm/index" */))
const _0f510f18 = () => interopDefault(import('..\\pages\\openControlPageNew.htm\\index.vue' /* webpackChunkName: "pages/openControlPageNew.htm/index" */))
const _367cb385 = () => interopDefault(import('..\\pages\\outputproductioninvoice.htm\\index.vue' /* webpackChunkName: "pages/outputproductioninvoice.htm/index" */))
const _5312a10c = () => interopDefault(import('..\\pages\\outputProductionReturn.htm\\index.vue' /* webpackChunkName: "pages/outputProductionReturn.htm/index" */))
const _6803b690 = () => interopDefault(import('..\\pages\\outputToProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompany.htm/index" */))
const _68168480 = () => interopDefault(import('..\\pages\\outputToProductionCompanyReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompanyReturn.htm/index" */))
const _3adf68e8 = () => interopDefault(import('..\\pages\\outputToPrOrder.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrder.htm/index" */))
const _a1edd650 = () => interopDefault(import('..\\pages\\outputToPrOrderReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrderReturn.htm/index" */))
const _79cbe902 = () => interopDefault(import('..\\pages\\outputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/outputToServiceInvoice.htm/index" */))
const _59afd0f1 = () => interopDefault(import('..\\pages\\personEquipmentSews.htm\\index.vue' /* webpackChunkName: "pages/personEquipmentSews.htm/index" */))
const _e3b3bf6a = () => interopDefault(import('..\\pages\\prepareInternalInvoiceNewDevice.htm\\index.vue' /* webpackChunkName: "pages/prepareInternalInvoiceNewDevice.htm/index" */))
const _3d0cdd9b = () => interopDefault(import('..\\pages\\prepareOutputToPrOrderSimple.htm\\index.vue' /* webpackChunkName: "pages/prepareOutputToPrOrderSimple.htm/index" */))
const _176797e2 = () => interopDefault(import('..\\pages\\productionByPackage.htm\\index.vue' /* webpackChunkName: "pages/productionByPackage.htm/index" */))
const _340a9a08 = () => interopDefault(import('..\\pages\\productionForQrCodeList.htm\\index.vue' /* webpackChunkName: "pages/productionForQrCodeList.htm/index" */))
const _38983978 = () => interopDefault(import('..\\pages\\productioninvoice.htm\\index.vue' /* webpackChunkName: "pages/productioninvoice.htm/index" */))
const _63962f83 = () => interopDefault(import('..\\pages\\productionorder.htm\\index.vue' /* webpackChunkName: "pages/productionorder.htm/index" */))
const _82c6ee96 = () => interopDefault(import('..\\pages\\productionorderplannings.htm\\index.vue' /* webpackChunkName: "pages/productionorderplannings.htm/index" */))
const _8c424468 = () => interopDefault(import('..\\pages\\purchaseinvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseinvoice.htm/index" */))
const _67ce2c0b = () => interopDefault(import('..\\pages\\purchaseorder.htm\\index.vue' /* webpackChunkName: "pages/purchaseorder.htm/index" */))
const _b1e4ed06 = () => interopDefault(import('..\\pages\\purchaseServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseServiceInvoice.htm/index" */))
const _1be90912 = () => interopDefault(import('..\\pages\\saleinvoice.htm\\index.vue' /* webpackChunkName: "pages/saleinvoice.htm/index" */))
const _00417912 = () => interopDefault(import('..\\pages\\saleServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/saleServiceInvoice.htm/index" */))
const _3ef45d34 = () => interopDefault(import('..\\pages\\salesorder.htm\\index.vue' /* webpackChunkName: "pages/salesorder.htm/index" */))
const _7de78dfc = () => interopDefault(import('..\\pages\\salesReturn.htm\\index.vue' /* webpackChunkName: "pages/salesReturn.htm/index" */))
const _273d9cb9 = () => interopDefault(import('..\\pages\\sessions.htm\\index.vue' /* webpackChunkName: "pages/sessions.htm/index" */))
const _5a55c3b9 = () => interopDefault(import('..\\pages\\sewBandEquipments.htm\\index.vue' /* webpackChunkName: "pages/sewBandEquipments.htm/index" */))
const _4a9a2092 = () => interopDefault(import('..\\pages\\sewmodel.htm\\index.vue' /* webpackChunkName: "pages/sewmodel.htm/index" */))
const _7cade09e = () => interopDefault(import('..\\pages\\sewModelReport.htm\\index.vue' /* webpackChunkName: "pages/sewModelReport.htm/index" */))
const _c4374afa = () => interopDefault(import('..\\pages\\sewModelVariantsSize.htm\\index.vue' /* webpackChunkName: "pages/sewModelVariantsSize.htm/index" */))
const _45ad7876 = () => interopDefault(import('..\\pages\\simpleProductionInvoice.htm\\index.vue' /* webpackChunkName: "pages/simpleProductionInvoice.htm/index" */))
const _bea727d6 = () => interopDefault(import('..\\pages\\transactionDetailReport.htm\\index.vue' /* webpackChunkName: "pages/transactionDetailReport.htm/index" */))
const _dc0365d6 = () => interopDefault(import('..\\pages\\transactionReports.htm\\index.vue' /* webpackChunkName: "pages/transactionReports.htm/index" */))
const _581b1d17 = () => interopDefault(import('..\\pages\\transactionSaldoReport.htm\\index.vue' /* webpackChunkName: "pages/transactionSaldoReport.htm/index" */))
const _58d0843a = () => interopDefault(import('..\\pages\\viabranchreceive.htm\\index.vue' /* webpackChunkName: "pages/viabranchreceive.htm/index" */))
const _7607bc89 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _dfdb2392 = () => interopDefault(import('..\\pages\\prepareBatchunionsNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchunionsNew.htm/_id" */))
const _99cdcb7c = () => interopDefault(import('..\\pages\\prepareColor.htm\\_id.vue' /* webpackChunkName: "pages/prepareColor.htm/_id" */))
const _ce06d74e = () => interopDefault(import('..\\pages\\prepareColorDepth.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorDepth.htm/_id" */))
const _1d14f5ea = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStageChild.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStageChild.htm/_id" */))
const _4026c269 = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStagePicture.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStagePicture.htm/_id" */))
const _03c57d0a = () => interopDefault(import('..\\pages\\prepareDesign.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesign.htm/_id" */))
const _1b6d3584 = () => interopDefault(import('..\\pages\\prepareDesignVariant.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesignVariant.htm/_id" */))
const _3cbd5a38 = () => interopDefault(import('..\\pages\\prepareExpenseInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareExpenseInvoice.htm/_id" */))
const _379dfa95 = () => interopDefault(import('..\\pages\\prepareInputFromProductionCompanyNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputFromProductionCompanyNew.htm/_id" */))
const _6b7e9eda = () => interopDefault(import('..\\pages\\prepareInputReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputReturnNew.htm/_id" */))
const _832f6c30 = () => interopDefault(import('..\\pages\\prepareInputToServiceInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputToServiceInvoice.htm/_id" */))
const _7aa1e8ae = () => interopDefault(import('..\\pages\\prepareInternalInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInternalInvoiceNew.htm/_id" */))
const _64d84f73 = () => interopDefault(import('..\\pages\\prepareOutputToEquipment.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToEquipment.htm/_id" */))
const _7cd6d123 = () => interopDefault(import('..\\pages\\prepareOutputToEquipmentReturn.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToEquipmentReturn.htm/_id" */))
const _02283301 = () => interopDefault(import('..\\pages\\prepareOutputToProductionCompanyNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToProductionCompanyNew.htm/_id" */))
const _85037a5e = () => interopDefault(import('..\\pages\\prepareOutputToProductionCompanyReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToProductionCompanyReturnNew.htm/_id" */))
const _52bc6bd5 = () => interopDefault(import('..\\pages\\prepareOutputToPrOrder.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToPrOrder.htm/_id" */))
const _434ec7f6 = () => interopDefault(import('..\\pages\\prepareOutputToPrOrderReturn.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToPrOrderReturn.htm/_id" */))
const _64d7edc5 = () => interopDefault(import('..\\pages\\prepareOutputToServiceInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToServiceInvoice.htm/_id" */))
const _610180a6 = () => interopDefault(import('..\\pages\\prepareProductionInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionInvoiceNew.htm/_id" */))
const _1679047d = () => interopDefault(import('..\\pages\\prepareProductionOrderItem.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionOrderItem.htm/_id" */))
const _37aa00e5 = () => interopDefault(import('..\\pages\\preparePurchaseInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseInvoiceNew.htm/_id" */))
const _72132f44 = () => interopDefault(import('..\\pages\\preparePurchaseServiceInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseServiceInvoiceNew.htm/_id" */))
const _1d1e350f = () => interopDefault(import('..\\pages\\prepareReceiveInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareReceiveInvoiceNew.htm/_id" */))
const _9f5db842 = () => interopDefault(import('..\\pages\\prepareSaleInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleInvoiceNew.htm/_id" */))
const _236a4fb8 = () => interopDefault(import('..\\pages\\prepareSaleServiceInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleServiceInvoiceNew.htm/_id" */))
const _57533756 = () => interopDefault(import('..\\pages\\prepareSalesReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSalesReturnNew.htm/_id" */))
const _128f10b5 = () => interopDefault(import('..\\pages\\prepareSewModel.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModel.htm/_id" */))
const _1e90f374 = () => interopDefault(import('..\\pages\\prepareSewModelVariantsSize.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelVariantsSize.htm/_id" */))
const _178cb1e3 = () => interopDefault(import('..\\pages\\prepareSimpleProductionInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareSimpleProductionInvoice.htm/_id" */))
const _2be14e86 = () => interopDefault(import('..\\pages\\prepareSimpleProductionInvoiceManual.htm\\_id.vue' /* webpackChunkName: "pages/prepareSimpleProductionInvoiceManual.htm/_id" */))

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
    path: "/batchunions.htm",
    component: _7371bfda,
    name: "batchunions.htm"
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
    path: "/colorDepth.htm",
    component: _8030abd4,
    name: "colorDepth.htm"
  }, {
    path: "/colors.htm",
    component: _82e50974,
    name: "colors.htm"
  }, {
    path: "/colorVariantRecipeStageChild.htm",
    component: _064bc708,
    name: "colorVariantRecipeStageChild.htm"
  }, {
    path: "/colorVariantRecipeStagePicture.htm",
    component: _488f6fa6,
    name: "colorVariantRecipeStagePicture.htm"
  }, {
    path: "/dashboard.htm",
    component: _7a28fbf8,
    name: "dashboard.htm"
  }, {
    path: "/designs.htm",
    component: _2710b77a,
    name: "designs.htm"
  }, {
    path: "/designVariants.htm",
    component: _1540c9ca,
    name: "designVariants.htm"
  }, {
    path: "/dyeings.htm",
    component: _68e935f7,
    name: "dyeings.htm"
  }, {
    path: "/equipmentsRealTimeStatus.htm",
    component: _90cea158,
    name: "equipmentsRealTimeStatus.htm"
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
    path: "/makeBill.htm",
    component: _f8aa917e,
    name: "makeBill.htm"
  }, {
    path: "/marketSalesInvoice.htm",
    component: _0dd49fb9,
    name: "marketSalesInvoice.htm"
  }, {
    path: "/menuSettings.htm",
    component: _dc8ad6d8,
    name: "menuSettings.htm"
  }, {
    path: "/openControlPageNew.htm",
    component: _0f510f18,
    name: "openControlPageNew.htm"
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
    path: "/prepareInternalInvoiceNewDevice.htm",
    component: _e3b3bf6a,
    name: "prepareInternalInvoiceNewDevice.htm"
  }, {
    path: "/prepareOutputToPrOrderSimple.htm",
    component: _3d0cdd9b,
    name: "prepareOutputToPrOrderSimple.htm"
  }, {
    path: "/productionByPackage.htm",
    component: _176797e2,
    name: "productionByPackage.htm"
  }, {
    path: "/productionForQrCodeList.htm",
    component: _340a9a08,
    name: "productionForQrCodeList.htm"
  }, {
    path: "/productioninvoice.htm",
    component: _38983978,
    name: "productioninvoice.htm"
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
    path: "/purchaseServiceInvoice.htm",
    component: _b1e4ed06,
    name: "purchaseServiceInvoice.htm"
  }, {
    path: "/saleinvoice.htm",
    component: _1be90912,
    name: "saleinvoice.htm"
  }, {
    path: "/saleServiceInvoice.htm",
    component: _00417912,
    name: "saleServiceInvoice.htm"
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
    path: "/sewmodel.htm",
    component: _4a9a2092,
    name: "sewmodel.htm"
  }, {
    path: "/sewModelReport.htm",
    component: _7cade09e,
    name: "sewModelReport.htm"
  }, {
    path: "/sewModelVariantsSize.htm",
    component: _c4374afa,
    name: "sewModelVariantsSize.htm"
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
    path: "/viabranchreceive.htm",
    component: _58d0843a,
    name: "viabranchreceive.htm"
  }, {
    path: "/",
    component: _7607bc89,
    name: "index"
  }, {
    path: "/prepareBatchunionsNew.htm/:id?",
    component: _dfdb2392,
    name: "prepareBatchunionsNew.htm-id"
  }, {
    path: "/prepareColor.htm/:id?",
    component: _99cdcb7c,
    name: "prepareColor.htm-id"
  }, {
    path: "/prepareColorDepth.htm/:id?",
    component: _ce06d74e,
    name: "prepareColorDepth.htm-id"
  }, {
    path: "/prepareColorVariantRecipeStageChild.htm/:id?",
    component: _1d14f5ea,
    name: "prepareColorVariantRecipeStageChild.htm-id"
  }, {
    path: "/prepareColorVariantRecipeStagePicture.htm/:id?",
    component: _4026c269,
    name: "prepareColorVariantRecipeStagePicture.htm-id"
  }, {
    path: "/prepareDesign.htm/:id?",
    component: _03c57d0a,
    name: "prepareDesign.htm-id"
  }, {
    path: "/prepareDesignVariant.htm/:id?",
    component: _1b6d3584,
    name: "prepareDesignVariant.htm-id"
  }, {
    path: "/prepareExpenseInvoice.htm/:id?",
    component: _3cbd5a38,
    name: "prepareExpenseInvoice.htm-id"
  }, {
    path: "/prepareInputFromProductionCompanyNew.htm/:id?",
    component: _379dfa95,
    name: "prepareInputFromProductionCompanyNew.htm-id"
  }, {
    path: "/prepareInputReturnNew.htm/:id?",
    component: _6b7e9eda,
    name: "prepareInputReturnNew.htm-id"
  }, {
    path: "/prepareInputToServiceInvoice.htm/:id?",
    component: _832f6c30,
    name: "prepareInputToServiceInvoice.htm-id"
  }, {
    path: "/prepareInternalInvoiceNew.htm/:id?",
    component: _7aa1e8ae,
    name: "prepareInternalInvoiceNew.htm-id"
  }, {
    path: "/prepareOutputToEquipment.htm/:id?",
    component: _64d84f73,
    name: "prepareOutputToEquipment.htm-id"
  }, {
    path: "/prepareOutputToEquipmentReturn.htm/:id?",
    component: _7cd6d123,
    name: "prepareOutputToEquipmentReturn.htm-id"
  }, {
    path: "/prepareOutputToProductionCompanyNew.htm/:id?",
    component: _02283301,
    name: "prepareOutputToProductionCompanyNew.htm-id"
  }, {
    path: "/prepareOutputToProductionCompanyReturnNew.htm/:id?",
    component: _85037a5e,
    name: "prepareOutputToProductionCompanyReturnNew.htm-id"
  }, {
    path: "/prepareOutputToPrOrder.htm/:id?",
    component: _52bc6bd5,
    name: "prepareOutputToPrOrder.htm-id"
  }, {
    path: "/prepareOutputToPrOrderReturn.htm/:id?",
    component: _434ec7f6,
    name: "prepareOutputToPrOrderReturn.htm-id"
  }, {
    path: "/prepareOutputToServiceInvoice.htm/:id?",
    component: _64d7edc5,
    name: "prepareOutputToServiceInvoice.htm-id"
  }, {
    path: "/prepareProductionInvoiceNew.htm/:id?",
    component: _610180a6,
    name: "prepareProductionInvoiceNew.htm-id"
  }, {
    path: "/prepareProductionOrderItem.htm/:id?",
    component: _1679047d,
    name: "prepareProductionOrderItem.htm-id"
  }, {
    path: "/preparePurchaseInvoiceNew.htm/:id?",
    component: _37aa00e5,
    name: "preparePurchaseInvoiceNew.htm-id"
  }, {
    path: "/preparePurchaseServiceInvoiceNew.htm/:id?",
    component: _72132f44,
    name: "preparePurchaseServiceInvoiceNew.htm-id"
  }, {
    path: "/prepareReceiveInvoiceNew.htm/:id?",
    component: _1d1e350f,
    name: "prepareReceiveInvoiceNew.htm-id"
  }, {
    path: "/prepareSaleInvoiceNew.htm/:id?",
    component: _9f5db842,
    name: "prepareSaleInvoiceNew.htm-id"
  }, {
    path: "/prepareSaleServiceInvoiceNew.htm/:id?",
    component: _236a4fb8,
    name: "prepareSaleServiceInvoiceNew.htm-id"
  }, {
    path: "/prepareSalesReturnNew.htm/:id?",
    component: _57533756,
    name: "prepareSalesReturnNew.htm-id"
  }, {
    path: "/prepareSewModel.htm/:id?",
    component: _128f10b5,
    name: "prepareSewModel.htm-id"
  }, {
    path: "/prepareSewModelVariantsSize.htm/:id?",
    component: _1e90f374,
    name: "prepareSewModelVariantsSize.htm-id"
  }, {
    path: "/prepareSimpleProductionInvoice.htm/:id?",
    component: _178cb1e3,
    name: "prepareSimpleProductionInvoice.htm-id"
  }, {
    path: "/prepareSimpleProductionInvoiceManual.htm/:id?",
    component: _2be14e86,
    name: "prepareSimpleProductionInvoiceManual.htm-id"
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
