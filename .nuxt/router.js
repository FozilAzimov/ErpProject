import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _503dcf88 = () => interopDefault(import('..\\pages\\bands.htm\\index.vue' /* webpackChunkName: "pages/bands.htm/index" */))
const _f2a0dc9c = () => interopDefault(import('..\\pages\\batches.htm\\index.vue' /* webpackChunkName: "pages/batches.htm/index" */))
const _d0159502 = () => interopDefault(import('..\\pages\\batchProcess.htm\\index.vue' /* webpackChunkName: "pages/batchProcess.htm/index" */))
const _83de6cec = () => interopDefault(import('..\\pages\\batchProcessStages.htm\\index.vue' /* webpackChunkName: "pages/batchProcessStages.htm/index" */))
const _4e260fa2 = () => interopDefault(import('..\\pages\\batchReports.htm\\index.vue' /* webpackChunkName: "pages/batchReports.htm/index" */))
const _e7405a52 = () => interopDefault(import('..\\pages\\batchStagesReport.htm\\index.vue' /* webpackChunkName: "pages/batchStagesReport.htm/index" */))
const _2703b0c8 = () => interopDefault(import('..\\pages\\batchunions.htm\\index.vue' /* webpackChunkName: "pages/batchunions.htm/index" */))
const _75c6aea4 = () => interopDefault(import('..\\pages\\branches.htm\\index.vue' /* webpackChunkName: "pages/branches.htm/index" */))
const _6283df51 = () => interopDefault(import('..\\pages\\branchProductsStockReportByLogic.htm\\index.vue' /* webpackChunkName: "pages/branchProductsStockReportByLogic.htm/index" */))
const _23e6ac2a = () => interopDefault(import('..\\pages\\calculationByColorVariantRecipe.htm\\index.vue' /* webpackChunkName: "pages/calculationByColorVariantRecipe.htm/index" */))
const _b91690ba = () => interopDefault(import('..\\pages\\checkRealCountBarcode.htm\\index.vue' /* webpackChunkName: "pages/checkRealCountBarcode.htm/index" */))
const _3fae4214 = () => interopDefault(import('..\\pages\\colorDepth.htm\\index.vue' /* webpackChunkName: "pages/colorDepth.htm/index" */))
const _96287b78 = () => interopDefault(import('..\\pages\\colors.htm\\index.vue' /* webpackChunkName: "pages/colors.htm/index" */))
const _d5000fdc = () => interopDefault(import('..\\pages\\colorVariant.htm\\index.vue' /* webpackChunkName: "pages/colorVariant.htm/index" */))
const _4def674c = () => interopDefault(import('..\\pages\\colorVariantRecipeStage.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStage.htm/index" */))
const _2170c8f4 = () => interopDefault(import('..\\pages\\colorVariantRecipeStageChild.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStageChild.htm/index" */))
const _ca9d707a = () => interopDefault(import('..\\pages\\colorVariantRecipeStageGroup.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStageGroup.htm/index" */))
const _3c2fc6b8 = () => interopDefault(import('..\\pages\\colorVariantRecipeStagePicture.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStagePicture.htm/index" */))
const _2fda1b74 = () => interopDefault(import('..\\pages\\dashboard.htm\\index.vue' /* webpackChunkName: "pages/dashboard.htm/index" */))
const _7c3b85f6 = () => interopDefault(import('..\\pages\\designs.htm\\index.vue' /* webpackChunkName: "pages/designs.htm/index" */))
const _263503df = () => interopDefault(import('..\\pages\\designTypes.htm\\index.vue' /* webpackChunkName: "pages/designTypes.htm/index" */))
const _c0419a70 = () => interopDefault(import('..\\pages\\designVariants.htm\\index.vue' /* webpackChunkName: "pages/designVariants.htm/index" */))
const _3e53ceb9 = () => interopDefault(import('..\\pages\\dyeings.htm\\index.vue' /* webpackChunkName: "pages/dyeings.htm/index" */))
const _8f831a5c = () => interopDefault(import('..\\pages\\equipmentsRealTimeStatus.htm\\index.vue' /* webpackChunkName: "pages/equipmentsRealTimeStatus.htm/index" */))
const _f9c6bf42 = () => interopDefault(import('..\\pages\\expenseInvoice.htm\\index.vue' /* webpackChunkName: "pages/expenseInvoice.htm/index" */))
const _3cfdeab8 = () => interopDefault(import('..\\pages\\grades.htm\\index.vue' /* webpackChunkName: "pages/grades.htm/index" */))
const _26659438 = () => interopDefault(import('..\\pages\\inputFromProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/inputFromProductionCompany.htm/index" */))
const _96dfac80 = () => interopDefault(import('..\\pages\\inputReturn.htm\\index.vue' /* webpackChunkName: "pages/inputReturn.htm/index" */))
const _c7b909ba = () => interopDefault(import('..\\pages\\inputStockDetailReport.htm\\index.vue' /* webpackChunkName: "pages/inputStockDetailReport.htm/index" */))
const _3d2bf33d = () => interopDefault(import('..\\pages\\inputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/inputToServiceInvoice.htm/index" */))
const _0e3a652c = () => interopDefault(import('..\\pages\\internalInvoice.htm\\index.vue' /* webpackChunkName: "pages/internalInvoice.htm/index" */))
const _4b75d8a2 = () => interopDefault(import('..\\pages\\invoiceReports.htm\\index.vue' /* webpackChunkName: "pages/invoiceReports.htm/index" */))
const _2200bb5e = () => interopDefault(import('..\\pages\\login.htm\\index.vue' /* webpackChunkName: "pages/login.htm/index" */))
const _31e30050 = () => interopDefault(import('..\\pages\\maintable\\index.vue' /* webpackChunkName: "pages/maintable/index" */))
const _5b9336bf = () => interopDefault(import('..\\pages\\makeBill.htm\\index.vue' /* webpackChunkName: "pages/makeBill.htm/index" */))
const _3e0b4c92 = () => interopDefault(import('..\\pages\\marketSalesInvoice.htm\\index.vue' /* webpackChunkName: "pages/marketSalesInvoice.htm/index" */))
const _3a3b2512 = () => interopDefault(import('..\\pages\\menuSettings.htm\\index.vue' /* webpackChunkName: "pages/menuSettings.htm/index" */))
const _3b126dd4 = () => interopDefault(import('..\\pages\\openControlPageNew.htm\\index.vue' /* webpackChunkName: "pages/openControlPageNew.htm/index" */))
const _64a83b3c = () => interopDefault(import('..\\pages\\orderproductiontypes.htm\\index.vue' /* webpackChunkName: "pages/orderproductiontypes.htm/index" */))
const _171cef72 = () => interopDefault(import('..\\pages\\outputproductioninvoice.htm\\index.vue' /* webpackChunkName: "pages/outputproductioninvoice.htm/index" */))
const _48af2c0a = () => interopDefault(import('..\\pages\\outputProductionReturn.htm\\index.vue' /* webpackChunkName: "pages/outputProductionReturn.htm/index" */))
const _7c1662d2 = () => interopDefault(import('..\\pages\\outputToProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompany.htm/index" */))
const _0c59117c = () => interopDefault(import('..\\pages\\outputToProductionCompanyReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompanyReturn.htm/index" */))
const _040e1faa = () => interopDefault(import('..\\pages\\outputToPrOrder.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrder.htm/index" */))
const _2250321a = () => interopDefault(import('..\\pages\\outputToPrOrderReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrderReturn.htm/index" */))
const _6f687400 = () => interopDefault(import('..\\pages\\outputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/outputToServiceInvoice.htm/index" */))
const _b185ad12 = () => interopDefault(import('..\\pages\\packaging.htm\\index.vue' /* webpackChunkName: "pages/packaging.htm/index" */))
const _297d529a = () => interopDefault(import('..\\pages\\personEquipmentSews.htm\\index.vue' /* webpackChunkName: "pages/personEquipmentSews.htm/index" */))
const _5655cf3e = () => interopDefault(import('..\\pages\\planningTypes.htm\\index.vue' /* webpackChunkName: "pages/planningTypes.htm/index" */))
const _1fe3130d = () => interopDefault(import('..\\pages\\prepareInternalInvoiceNewDevice.htm\\index.vue' /* webpackChunkName: "pages/prepareInternalInvoiceNewDevice.htm/index" */))
const _2608b219 = () => interopDefault(import('..\\pages\\prepareOutputToPrOrderSimple.htm\\index.vue' /* webpackChunkName: "pages/prepareOutputToPrOrderSimple.htm/index" */))
const _ae0dc4b8 = () => interopDefault(import('..\\pages\\productionByPackage.htm\\index.vue' /* webpackChunkName: "pages/productionByPackage.htm/index" */))
const _b820f084 = () => interopDefault(import('..\\pages\\productionForQrCodeList.htm\\index.vue' /* webpackChunkName: "pages/productionForQrCodeList.htm/index" */))
const _1c0ff186 = () => interopDefault(import('..\\pages\\productioninvoice.htm\\index.vue' /* webpackChunkName: "pages/productioninvoice.htm/index" */))
const _2cc4e645 = () => interopDefault(import('..\\pages\\productionorder.htm\\index.vue' /* webpackChunkName: "pages/productionorder.htm/index" */))
const _817b679a = () => interopDefault(import('..\\pages\\productionorderplannings.htm\\index.vue' /* webpackChunkName: "pages/productionorderplannings.htm/index" */))
const _7201d503 = () => interopDefault(import('..\\pages\\productproductiontypes.htm\\index.vue' /* webpackChunkName: "pages/productproductiontypes.htm/index" */))
const _f9e4d6e4 = () => interopDefault(import('..\\pages\\purchaseinvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseinvoice.htm/index" */))
const _6140a966 = () => interopDefault(import('..\\pages\\purchaseorder.htm\\index.vue' /* webpackChunkName: "pages/purchaseorder.htm/index" */))
const _c6abd70a = () => interopDefault(import('..\\pages\\purchaseServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseServiceInvoice.htm/index" */))
const _d6151e58 = () => interopDefault(import('..\\pages\\saleinvoice.htm\\index.vue' /* webpackChunkName: "pages/saleinvoice.htm/index" */))
const _59f60516 = () => interopDefault(import('..\\pages\\saleServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/saleServiceInvoice.htm/index" */))
const _828a159c = () => interopDefault(import('..\\pages\\salesorder.htm\\index.vue' /* webpackChunkName: "pages/salesorder.htm/index" */))
const _12181484 = () => interopDefault(import('..\\pages\\salesReturn.htm\\index.vue' /* webpackChunkName: "pages/salesReturn.htm/index" */))
const _01b3c792 = () => interopDefault(import('..\\pages\\sessions.htm\\index.vue' /* webpackChunkName: "pages/sessions.htm/index" */))
const _da9c5c0a = () => interopDefault(import('..\\pages\\sewBandEquipments.htm\\index.vue' /* webpackChunkName: "pages/sewBandEquipments.htm/index" */))
const _2282a010 = () => interopDefault(import('..\\pages\\sewmodel.htm\\index.vue' /* webpackChunkName: "pages/sewmodel.htm/index" */))
const _9471b028 = () => interopDefault(import('..\\pages\\sewModelOperationName.htm\\index.vue' /* webpackChunkName: "pages/sewModelOperationName.htm/index" */))
const _074c499c = () => interopDefault(import('..\\pages\\sewModelReport.htm\\index.vue' /* webpackChunkName: "pages/sewModelReport.htm/index" */))
const _3e838d01 = () => interopDefault(import('..\\pages\\sewModelVariantsSize.htm\\index.vue' /* webpackChunkName: "pages/sewModelVariantsSize.htm/index" */))
const _662ecc86 = () => interopDefault(import('..\\pages\\sewOrderOnlineStatus.htm\\index.vue' /* webpackChunkName: "pages/sewOrderOnlineStatus.htm/index" */))
const _03a24d38 = () => interopDefault(import('..\\pages\\simpleProductionInvoice.htm\\index.vue' /* webpackChunkName: "pages/simpleProductionInvoice.htm/index" */))
const _1dba8042 = () => interopDefault(import('..\\pages\\stages.htm\\index.vue' /* webpackChunkName: "pages/stages.htm/index" */))
const _5ea140d7 = () => interopDefault(import('..\\pages\\transactionDetailReport.htm\\index.vue' /* webpackChunkName: "pages/transactionDetailReport.htm/index" */))
const _65240713 = () => interopDefault(import('..\\pages\\transactionReports.htm\\index.vue' /* webpackChunkName: "pages/transactionReports.htm/index" */))
const _4db7a815 = () => interopDefault(import('..\\pages\\transactionSaldoReport.htm\\index.vue' /* webpackChunkName: "pages/transactionSaldoReport.htm/index" */))
const _303fdf61 = () => interopDefault(import('..\\pages\\viabranchreceive.htm\\index.vue' /* webpackChunkName: "pages/viabranchreceive.htm/index" */))
const _c36bdef2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _c3568e16 = () => interopDefault(import('..\\pages\\prepareBatchNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchNew.htm/_id" */))
const _5ac03186 = () => interopDefault(import('..\\pages\\prepareBatchProcess.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchProcess.htm/_id" */))
const _266be73a = () => interopDefault(import('..\\pages\\prepareBatchProcessStage.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchProcessStage.htm/_id" */))
const _21a3f3f9 = () => interopDefault(import('..\\pages\\prepareBatchunionsNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchunionsNew.htm/_id" */))
const _32dfb240 = () => interopDefault(import('..\\pages\\prepareColor.htm\\_id.vue' /* webpackChunkName: "pages/prepareColor.htm/_id" */))
const _622b4b1b = () => interopDefault(import('..\\pages\\prepareColorDepth.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorDepth.htm/_id" */))
const _999f064e = () => interopDefault(import('..\\pages\\prepareColorVariant.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariant.htm/_id" */))
const _7485d516 = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStage.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStage.htm/_id" */))
const _07c0cf4d = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStageChild.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStageChild.htm/_id" */))
const _493266ca = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStageGroup.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStageGroup.htm/_id" */))
const _1e6ef7aa = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStagePicture.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStagePicture.htm/_id" */))
const _7729a93d = () => interopDefault(import('..\\pages\\prepareDesign.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesign.htm/_id" */))
const _44f63923 = () => interopDefault(import('..\\pages\\prepareDesignType.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesignType.htm/_id" */))
const _7521c188 = () => interopDefault(import('..\\pages\\prepareDesignVariant.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesignVariant.htm/_id" */))
const _7332d8a6 = () => interopDefault(import('..\\pages\\prepareExpenseInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareExpenseInvoice.htm/_id" */))
const _2a880eda = () => interopDefault(import('..\\pages\\prepareInputFromProductionCompanyNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputFromProductionCompanyNew.htm/_id" */))
const _5bd23655 = () => interopDefault(import('..\\pages\\prepareInputReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputReturnNew.htm/_id" */))
const _2cab25e6 = () => interopDefault(import('..\\pages\\prepareInputToServiceInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputToServiceInvoice.htm/_id" */))
const _feb83f2a = () => interopDefault(import('..\\pages\\prepareInternalInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInternalInvoiceNew.htm/_id" */))
const _aa2fee3c = () => interopDefault(import('..\\pages\\prepareOrderProductionType.htm\\_id.vue' /* webpackChunkName: "pages/prepareOrderProductionType.htm/_id" */))
const _5a74da71 = () => interopDefault(import('..\\pages\\prepareOutputToEquipment.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToEquipment.htm/_id" */))
const _65d2a5a1 = () => interopDefault(import('..\\pages\\prepareOutputToEquipmentReturn.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToEquipmentReturn.htm/_id" */))
const _18737d43 = () => interopDefault(import('..\\pages\\prepareOutputToProductionCompanyNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToProductionCompanyNew.htm/_id" */))
const _3ff558da = () => interopDefault(import('..\\pages\\prepareOutputToProductionCompanyReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToProductionCompanyReturnNew.htm/_id" */))
const _1948c35a = () => interopDefault(import('..\\pages\\prepareOutputToPrOrder.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToPrOrder.htm/_id" */))
const _4c9b7803 = () => interopDefault(import('..\\pages\\prepareOutputToPrOrderReturn.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToPrOrderReturn.htm/_id" */))
const _821edcf2 = () => interopDefault(import('..\\pages\\prepareOutputToServiceInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToServiceInvoice.htm/_id" */))
const _638f5c20 = () => interopDefault(import('..\\pages\\preparePackaging.htm\\_id.vue' /* webpackChunkName: "pages/preparePackaging.htm/_id" */))
const _87215338 = () => interopDefault(import('..\\pages\\preparePlanningType.htm\\_id.vue' /* webpackChunkName: "pages/preparePlanningType.htm/_id" */))
const _38dc2822 = () => interopDefault(import('..\\pages\\prepareProductionInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionInvoiceNew.htm/_id" */))
const _171ec7fb = () => interopDefault(import('..\\pages\\prepareProductionOrderItem.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionOrderItem.htm/_id" */))
const _2813b5a1 = () => interopDefault(import('..\\pages\\prepareProductProductionType.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductProductionType.htm/_id" */))
const _14c254b2 = () => interopDefault(import('..\\pages\\preparePurchaseInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseInvoiceNew.htm/_id" */))
const _604f155c = () => interopDefault(import('..\\pages\\preparePurchaseServiceInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseServiceInvoiceNew.htm/_id" */))
const _12bac00d = () => interopDefault(import('..\\pages\\prepareReceiveInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareReceiveInvoiceNew.htm/_id" */))
const _41e2a9a1 = () => interopDefault(import('..\\pages\\prepareSaleInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleInvoiceNew.htm/_id" */))
const _5c8db422 = () => interopDefault(import('..\\pages\\prepareSaleServiceInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleServiceInvoiceNew.htm/_id" */))
const _65e7ea17 = () => interopDefault(import('..\\pages\\prepareSalesReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSalesReturnNew.htm/_id" */))
const _7a208ff7 = () => interopDefault(import('..\\pages\\prepareSewModel.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModel.htm/_id" */))
const _6699ba55 = () => interopDefault(import('..\\pages\\prepareSewModelOperationName.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelOperationName.htm/_id" */))
const _04ca3288 = () => interopDefault(import('..\\pages\\prepareSewModelVariantsSize.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelVariantsSize.htm/_id" */))
const _00888661 = () => interopDefault(import('..\\pages\\prepareSimpleProductionInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareSimpleProductionInvoice.htm/_id" */))
const _c5a5528a = () => interopDefault(import('..\\pages\\prepareSimpleProductionInvoiceManual.htm\\_id.vue' /* webpackChunkName: "pages/prepareSimpleProductionInvoiceManual.htm/_id" */))
const _16ec1285 = () => interopDefault(import('..\\pages\\prepareStage.htm\\_id.vue' /* webpackChunkName: "pages/prepareStage.htm/_id" */))

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
    component: _503dcf88,
    name: "bands.htm"
  }, {
    path: "/batches.htm",
    component: _f2a0dc9c,
    name: "batches.htm"
  }, {
    path: "/batchProcess.htm",
    component: _d0159502,
    name: "batchProcess.htm"
  }, {
    path: "/batchProcessStages.htm",
    component: _83de6cec,
    name: "batchProcessStages.htm"
  }, {
    path: "/batchReports.htm",
    component: _4e260fa2,
    name: "batchReports.htm"
  }, {
    path: "/batchStagesReport.htm",
    component: _e7405a52,
    name: "batchStagesReport.htm"
  }, {
    path: "/batchunions.htm",
    component: _2703b0c8,
    name: "batchunions.htm"
  }, {
    path: "/branches.htm",
    component: _75c6aea4,
    name: "branches.htm"
  }, {
    path: "/branchProductsStockReportByLogic.htm",
    component: _6283df51,
    name: "branchProductsStockReportByLogic.htm"
  }, {
    path: "/calculationByColorVariantRecipe.htm",
    component: _23e6ac2a,
    name: "calculationByColorVariantRecipe.htm"
  }, {
    path: "/checkRealCountBarcode.htm",
    component: _b91690ba,
    name: "checkRealCountBarcode.htm"
  }, {
    path: "/colorDepth.htm",
    component: _3fae4214,
    name: "colorDepth.htm"
  }, {
    path: "/colors.htm",
    component: _96287b78,
    name: "colors.htm"
  }, {
    path: "/colorVariant.htm",
    component: _d5000fdc,
    name: "colorVariant.htm"
  }, {
    path: "/colorVariantRecipeStage.htm",
    component: _4def674c,
    name: "colorVariantRecipeStage.htm"
  }, {
    path: "/colorVariantRecipeStageChild.htm",
    component: _2170c8f4,
    name: "colorVariantRecipeStageChild.htm"
  }, {
    path: "/colorVariantRecipeStageGroup.htm",
    component: _ca9d707a,
    name: "colorVariantRecipeStageGroup.htm"
  }, {
    path: "/colorVariantRecipeStagePicture.htm",
    component: _3c2fc6b8,
    name: "colorVariantRecipeStagePicture.htm"
  }, {
    path: "/dashboard.htm",
    component: _2fda1b74,
    name: "dashboard.htm"
  }, {
    path: "/designs.htm",
    component: _7c3b85f6,
    name: "designs.htm"
  }, {
    path: "/designTypes.htm",
    component: _263503df,
    name: "designTypes.htm"
  }, {
    path: "/designVariants.htm",
    component: _c0419a70,
    name: "designVariants.htm"
  }, {
    path: "/dyeings.htm",
    component: _3e53ceb9,
    name: "dyeings.htm"
  }, {
    path: "/equipmentsRealTimeStatus.htm",
    component: _8f831a5c,
    name: "equipmentsRealTimeStatus.htm"
  }, {
    path: "/expenseInvoice.htm",
    component: _f9c6bf42,
    name: "expenseInvoice.htm"
  }, {
    path: "/grades.htm",
    component: _3cfdeab8,
    name: "grades.htm"
  }, {
    path: "/inputFromProductionCompany.htm",
    component: _26659438,
    name: "inputFromProductionCompany.htm"
  }, {
    path: "/inputReturn.htm",
    component: _96dfac80,
    name: "inputReturn.htm"
  }, {
    path: "/inputStockDetailReport.htm",
    component: _c7b909ba,
    name: "inputStockDetailReport.htm"
  }, {
    path: "/inputToServiceInvoice.htm",
    component: _3d2bf33d,
    name: "inputToServiceInvoice.htm"
  }, {
    path: "/internalInvoice.htm",
    component: _0e3a652c,
    name: "internalInvoice.htm"
  }, {
    path: "/invoiceReports.htm",
    component: _4b75d8a2,
    name: "invoiceReports.htm"
  }, {
    path: "/login.htm",
    component: _2200bb5e,
    name: "login.htm"
  }, {
    path: "/maintable",
    component: _31e30050,
    name: "maintable"
  }, {
    path: "/makeBill.htm",
    component: _5b9336bf,
    name: "makeBill.htm"
  }, {
    path: "/marketSalesInvoice.htm",
    component: _3e0b4c92,
    name: "marketSalesInvoice.htm"
  }, {
    path: "/menuSettings.htm",
    component: _3a3b2512,
    name: "menuSettings.htm"
  }, {
    path: "/openControlPageNew.htm",
    component: _3b126dd4,
    name: "openControlPageNew.htm"
  }, {
    path: "/orderproductiontypes.htm",
    component: _64a83b3c,
    name: "orderproductiontypes.htm"
  }, {
    path: "/outputproductioninvoice.htm",
    component: _171cef72,
    name: "outputproductioninvoice.htm"
  }, {
    path: "/outputProductionReturn.htm",
    component: _48af2c0a,
    name: "outputProductionReturn.htm"
  }, {
    path: "/outputToProductionCompany.htm",
    component: _7c1662d2,
    name: "outputToProductionCompany.htm"
  }, {
    path: "/outputToProductionCompanyReturn.htm",
    component: _0c59117c,
    name: "outputToProductionCompanyReturn.htm"
  }, {
    path: "/outputToPrOrder.htm",
    component: _040e1faa,
    name: "outputToPrOrder.htm"
  }, {
    path: "/outputToPrOrderReturn.htm",
    component: _2250321a,
    name: "outputToPrOrderReturn.htm"
  }, {
    path: "/outputToServiceInvoice.htm",
    component: _6f687400,
    name: "outputToServiceInvoice.htm"
  }, {
    path: "/packaging.htm",
    component: _b185ad12,
    name: "packaging.htm"
  }, {
    path: "/personEquipmentSews.htm",
    component: _297d529a,
    name: "personEquipmentSews.htm"
  }, {
    path: "/planningTypes.htm",
    component: _5655cf3e,
    name: "planningTypes.htm"
  }, {
    path: "/prepareInternalInvoiceNewDevice.htm",
    component: _1fe3130d,
    name: "prepareInternalInvoiceNewDevice.htm"
  }, {
    path: "/prepareOutputToPrOrderSimple.htm",
    component: _2608b219,
    name: "prepareOutputToPrOrderSimple.htm"
  }, {
    path: "/productionByPackage.htm",
    component: _ae0dc4b8,
    name: "productionByPackage.htm"
  }, {
    path: "/productionForQrCodeList.htm",
    component: _b820f084,
    name: "productionForQrCodeList.htm"
  }, {
    path: "/productioninvoice.htm",
    component: _1c0ff186,
    name: "productioninvoice.htm"
  }, {
    path: "/productionorder.htm",
    component: _2cc4e645,
    name: "productionorder.htm"
  }, {
    path: "/productionorderplannings.htm",
    component: _817b679a,
    name: "productionorderplannings.htm"
  }, {
    path: "/productproductiontypes.htm",
    component: _7201d503,
    name: "productproductiontypes.htm"
  }, {
    path: "/purchaseinvoice.htm",
    component: _f9e4d6e4,
    name: "purchaseinvoice.htm"
  }, {
    path: "/purchaseorder.htm",
    component: _6140a966,
    name: "purchaseorder.htm"
  }, {
    path: "/purchaseServiceInvoice.htm",
    component: _c6abd70a,
    name: "purchaseServiceInvoice.htm"
  }, {
    path: "/saleinvoice.htm",
    component: _d6151e58,
    name: "saleinvoice.htm"
  }, {
    path: "/saleServiceInvoice.htm",
    component: _59f60516,
    name: "saleServiceInvoice.htm"
  }, {
    path: "/salesorder.htm",
    component: _828a159c,
    name: "salesorder.htm"
  }, {
    path: "/salesReturn.htm",
    component: _12181484,
    name: "salesReturn.htm"
  }, {
    path: "/sessions.htm",
    component: _01b3c792,
    name: "sessions.htm"
  }, {
    path: "/sewBandEquipments.htm",
    component: _da9c5c0a,
    name: "sewBandEquipments.htm"
  }, {
    path: "/sewmodel.htm",
    component: _2282a010,
    name: "sewmodel.htm"
  }, {
    path: "/sewModelOperationName.htm",
    component: _9471b028,
    name: "sewModelOperationName.htm"
  }, {
    path: "/sewModelReport.htm",
    component: _074c499c,
    name: "sewModelReport.htm"
  }, {
    path: "/sewModelVariantsSize.htm",
    component: _3e838d01,
    name: "sewModelVariantsSize.htm"
  }, {
    path: "/sewOrderOnlineStatus.htm",
    component: _662ecc86,
    name: "sewOrderOnlineStatus.htm"
  }, {
    path: "/simpleProductionInvoice.htm",
    component: _03a24d38,
    name: "simpleProductionInvoice.htm"
  }, {
    path: "/stages.htm",
    component: _1dba8042,
    name: "stages.htm"
  }, {
    path: "/transactionDetailReport.htm",
    component: _5ea140d7,
    name: "transactionDetailReport.htm"
  }, {
    path: "/transactionReports.htm",
    component: _65240713,
    name: "transactionReports.htm"
  }, {
    path: "/transactionSaldoReport.htm",
    component: _4db7a815,
    name: "transactionSaldoReport.htm"
  }, {
    path: "/viabranchreceive.htm",
    component: _303fdf61,
    name: "viabranchreceive.htm"
  }, {
    path: "/",
    component: _c36bdef2,
    name: "index"
  }, {
    path: "/prepareBatchNew.htm/:id?",
    component: _c3568e16,
    name: "prepareBatchNew.htm-id"
  }, {
    path: "/prepareBatchProcess.htm/:id?",
    component: _5ac03186,
    name: "prepareBatchProcess.htm-id"
  }, {
    path: "/prepareBatchProcessStage.htm/:id?",
    component: _266be73a,
    name: "prepareBatchProcessStage.htm-id"
  }, {
    path: "/prepareBatchunionsNew.htm/:id?",
    component: _21a3f3f9,
    name: "prepareBatchunionsNew.htm-id"
  }, {
    path: "/prepareColor.htm/:id?",
    component: _32dfb240,
    name: "prepareColor.htm-id"
  }, {
    path: "/prepareColorDepth.htm/:id?",
    component: _622b4b1b,
    name: "prepareColorDepth.htm-id"
  }, {
    path: "/prepareColorVariant.htm/:id?",
    component: _999f064e,
    name: "prepareColorVariant.htm-id"
  }, {
    path: "/prepareColorVariantRecipeStage.htm/:id?",
    component: _7485d516,
    name: "prepareColorVariantRecipeStage.htm-id"
  }, {
    path: "/prepareColorVariantRecipeStageChild.htm/:id?",
    component: _07c0cf4d,
    name: "prepareColorVariantRecipeStageChild.htm-id"
  }, {
    path: "/prepareColorVariantRecipeStageGroup.htm/:id?",
    component: _493266ca,
    name: "prepareColorVariantRecipeStageGroup.htm-id"
  }, {
    path: "/prepareColorVariantRecipeStagePicture.htm/:id?",
    component: _1e6ef7aa,
    name: "prepareColorVariantRecipeStagePicture.htm-id"
  }, {
    path: "/prepareDesign.htm/:id?",
    component: _7729a93d,
    name: "prepareDesign.htm-id"
  }, {
    path: "/prepareDesignType.htm/:id?",
    component: _44f63923,
    name: "prepareDesignType.htm-id"
  }, {
    path: "/prepareDesignVariant.htm/:id?",
    component: _7521c188,
    name: "prepareDesignVariant.htm-id"
  }, {
    path: "/prepareExpenseInvoice.htm/:id?",
    component: _7332d8a6,
    name: "prepareExpenseInvoice.htm-id"
  }, {
    path: "/prepareInputFromProductionCompanyNew.htm/:id?",
    component: _2a880eda,
    name: "prepareInputFromProductionCompanyNew.htm-id"
  }, {
    path: "/prepareInputReturnNew.htm/:id?",
    component: _5bd23655,
    name: "prepareInputReturnNew.htm-id"
  }, {
    path: "/prepareInputToServiceInvoice.htm/:id?",
    component: _2cab25e6,
    name: "prepareInputToServiceInvoice.htm-id"
  }, {
    path: "/prepareInternalInvoiceNew.htm/:id?",
    component: _feb83f2a,
    name: "prepareInternalInvoiceNew.htm-id"
  }, {
    path: "/prepareOrderProductionType.htm/:id?",
    component: _aa2fee3c,
    name: "prepareOrderProductionType.htm-id"
  }, {
    path: "/prepareOutputToEquipment.htm/:id?",
    component: _5a74da71,
    name: "prepareOutputToEquipment.htm-id"
  }, {
    path: "/prepareOutputToEquipmentReturn.htm/:id?",
    component: _65d2a5a1,
    name: "prepareOutputToEquipmentReturn.htm-id"
  }, {
    path: "/prepareOutputToProductionCompanyNew.htm/:id?",
    component: _18737d43,
    name: "prepareOutputToProductionCompanyNew.htm-id"
  }, {
    path: "/prepareOutputToProductionCompanyReturnNew.htm/:id?",
    component: _3ff558da,
    name: "prepareOutputToProductionCompanyReturnNew.htm-id"
  }, {
    path: "/prepareOutputToPrOrder.htm/:id?",
    component: _1948c35a,
    name: "prepareOutputToPrOrder.htm-id"
  }, {
    path: "/prepareOutputToPrOrderReturn.htm/:id?",
    component: _4c9b7803,
    name: "prepareOutputToPrOrderReturn.htm-id"
  }, {
    path: "/prepareOutputToServiceInvoice.htm/:id?",
    component: _821edcf2,
    name: "prepareOutputToServiceInvoice.htm-id"
  }, {
    path: "/preparePackaging.htm/:id?",
    component: _638f5c20,
    name: "preparePackaging.htm-id"
  }, {
    path: "/preparePlanningType.htm/:id?",
    component: _87215338,
    name: "preparePlanningType.htm-id"
  }, {
    path: "/prepareProductionInvoiceNew.htm/:id?",
    component: _38dc2822,
    name: "prepareProductionInvoiceNew.htm-id"
  }, {
    path: "/prepareProductionOrderItem.htm/:id?",
    component: _171ec7fb,
    name: "prepareProductionOrderItem.htm-id"
  }, {
    path: "/prepareProductProductionType.htm/:id?",
    component: _2813b5a1,
    name: "prepareProductProductionType.htm-id"
  }, {
    path: "/preparePurchaseInvoiceNew.htm/:id?",
    component: _14c254b2,
    name: "preparePurchaseInvoiceNew.htm-id"
  }, {
    path: "/preparePurchaseServiceInvoiceNew.htm/:id?",
    component: _604f155c,
    name: "preparePurchaseServiceInvoiceNew.htm-id"
  }, {
    path: "/prepareReceiveInvoiceNew.htm/:id?",
    component: _12bac00d,
    name: "prepareReceiveInvoiceNew.htm-id"
  }, {
    path: "/prepareSaleInvoiceNew.htm/:id?",
    component: _41e2a9a1,
    name: "prepareSaleInvoiceNew.htm-id"
  }, {
    path: "/prepareSaleServiceInvoiceNew.htm/:id?",
    component: _5c8db422,
    name: "prepareSaleServiceInvoiceNew.htm-id"
  }, {
    path: "/prepareSalesReturnNew.htm/:id?",
    component: _65e7ea17,
    name: "prepareSalesReturnNew.htm-id"
  }, {
    path: "/prepareSewModel.htm/:id?",
    component: _7a208ff7,
    name: "prepareSewModel.htm-id"
  }, {
    path: "/prepareSewModelOperationName.htm/:id?",
    component: _6699ba55,
    name: "prepareSewModelOperationName.htm-id"
  }, {
    path: "/prepareSewModelVariantsSize.htm/:id?",
    component: _04ca3288,
    name: "prepareSewModelVariantsSize.htm-id"
  }, {
    path: "/prepareSimpleProductionInvoice.htm/:id?",
    component: _00888661,
    name: "prepareSimpleProductionInvoice.htm-id"
  }, {
    path: "/prepareSimpleProductionInvoiceManual.htm/:id?",
    component: _c5a5528a,
    name: "prepareSimpleProductionInvoiceManual.htm-id"
  }, {
    path: "/prepareStage.htm/:id?",
    component: _16ec1285,
    name: "prepareStage.htm-id"
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
