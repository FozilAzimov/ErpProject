import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _15ed15ce = () => interopDefault(import('..\\pages\\accounts.htm\\index.vue' /* webpackChunkName: "pages/accounts.htm/index" */))
const _b1e4b2d2 = () => interopDefault(import('..\\pages\\articles.htm\\index.vue' /* webpackChunkName: "pages/articles.htm/index" */))
const _6a78fdb4 = () => interopDefault(import('..\\pages\\attendanceschedule.htm\\index.vue' /* webpackChunkName: "pages/attendanceschedule.htm/index" */))
const _503dcf88 = () => interopDefault(import('..\\pages\\bands.htm\\index.vue' /* webpackChunkName: "pages/bands.htm/index" */))
const _0c862a43 = () => interopDefault(import('..\\pages\\banks.htm\\index.vue' /* webpackChunkName: "pages/banks.htm/index" */))
const _00d38147 = () => interopDefault(import('..\\pages\\basicTools.htm\\index.vue' /* webpackChunkName: "pages/basicTools.htm/index" */))
const _36bee89f = () => interopDefault(import('..\\pages\\batchColorDepthTariffs.htm\\index.vue' /* webpackChunkName: "pages/batchColorDepthTariffs.htm/index" */))
const _dc696cd6 = () => interopDefault(import('..\\pages\\batchColorMethodTariffs.htm\\index.vue' /* webpackChunkName: "pages/batchColorMethodTariffs.htm/index" */))
const _6e30c64e = () => interopDefault(import('..\\pages\\batchDetailsList.htm\\index.vue' /* webpackChunkName: "pages/batchDetailsList.htm/index" */))
const _f2a0dc9c = () => interopDefault(import('..\\pages\\batches.htm\\index.vue' /* webpackChunkName: "pages/batches.htm/index" */))
const _50ad4402 = () => interopDefault(import('..\\pages\\batchProccesStageTariffs.htm\\index.vue' /* webpackChunkName: "pages/batchProccesStageTariffs.htm/index" */))
const _d0159502 = () => interopDefault(import('..\\pages\\batchProcess.htm\\index.vue' /* webpackChunkName: "pages/batchProcess.htm/index" */))
const _83de6cec = () => interopDefault(import('..\\pages\\batchProcessStages.htm\\index.vue' /* webpackChunkName: "pages/batchProcessStages.htm/index" */))
const _658cd266 = () => interopDefault(import('..\\pages\\batchProductionInvoiceUi.htm\\index.vue' /* webpackChunkName: "pages/batchProductionInvoiceUi.htm/index" */))
const _79af2853 = () => interopDefault(import('..\\pages\\batchRepair.htm\\index.vue' /* webpackChunkName: "pages/batchRepair.htm/index" */))
const _4e260fa2 = () => interopDefault(import('..\\pages\\batchReports.htm\\index.vue' /* webpackChunkName: "pages/batchReports.htm/index" */))
const _e7405a52 = () => interopDefault(import('..\\pages\\batchStagesReport.htm\\index.vue' /* webpackChunkName: "pages/batchStagesReport.htm/index" */))
const _2703b0c8 = () => interopDefault(import('..\\pages\\batchunions.htm\\index.vue' /* webpackChunkName: "pages/batchunions.htm/index" */))
const _75c6aea4 = () => interopDefault(import('..\\pages\\branches.htm\\index.vue' /* webpackChunkName: "pages/branches.htm/index" */))
const _d3ff9752 = () => interopDefault(import('..\\pages\\branchess.htm\\index.vue' /* webpackChunkName: "pages/branchess.htm/index" */))
const _6283df51 = () => interopDefault(import('..\\pages\\branchProductsStockReportByLogic.htm\\index.vue' /* webpackChunkName: "pages/branchProductsStockReportByLogic.htm/index" */))
const _23e6ac2a = () => interopDefault(import('..\\pages\\calculationByColorVariantRecipe.htm\\index.vue' /* webpackChunkName: "pages/calculationByColorVariantRecipe.htm/index" */))
const _f64711ee = () => interopDefault(import('..\\pages\\capitals.htm\\index.vue' /* webpackChunkName: "pages/capitals.htm/index" */))
const _16286346 = () => interopDefault(import('..\\pages\\car.htm\\index.vue' /* webpackChunkName: "pages/car.htm/index" */))
const _5609314e = () => interopDefault(import('..\\pages\\cashboxs.htm\\index.vue' /* webpackChunkName: "pages/cashboxs.htm/index" */))
const _f973b24e = () => interopDefault(import('..\\pages\\changeProductColorVariant.htm\\index.vue' /* webpackChunkName: "pages/changeProductColorVariant.htm/index" */))
const _0a27e17b = () => interopDefault(import('..\\pages\\characterDetails.htm\\index.vue' /* webpackChunkName: "pages/characterDetails.htm/index" */))
const _54ae203c = () => interopDefault(import('..\\pages\\characteristics.htm\\index.vue' /* webpackChunkName: "pages/characteristics.htm/index" */))
const _dfd9d9a2 = () => interopDefault(import('..\\pages\\checkPoints.htm\\index.vue' /* webpackChunkName: "pages/checkPoints.htm/index" */))
const _11231429 = () => interopDefault(import('..\\pages\\city.htm\\index.vue' /* webpackChunkName: "pages/city.htm/index" */))
const _5a5deb8a = () => interopDefault(import('..\\pages\\clusterCamera.htm\\index.vue' /* webpackChunkName: "pages/clusterCamera.htm/index" */))
const _4d5fa286 = () => interopDefault(import('..\\pages\\clusterSeason.htm\\index.vue' /* webpackChunkName: "pages/clusterSeason.htm/index" */))
const _71994dea = () => interopDefault(import('..\\pages\\clusterSeasonPriceList.htm\\index.vue' /* webpackChunkName: "pages/clusterSeasonPriceList.htm/index" */))
const _5ff7c669 = () => interopDefault(import('..\\pages\\clusterSeasonReport.htm\\index.vue' /* webpackChunkName: "pages/clusterSeasonReport.htm/index" */))
const _4790cf3a = () => interopDefault(import('..\\pages\\clusterYear.htm\\index.vue' /* webpackChunkName: "pages/clusterYear.htm/index" */))
const _3fae4214 = () => interopDefault(import('..\\pages\\colorDepth.htm\\index.vue' /* webpackChunkName: "pages/colorDepth.htm/index" */))
const _96287b78 = () => interopDefault(import('..\\pages\\colors.htm\\index.vue' /* webpackChunkName: "pages/colors.htm/index" */))
const _d5000fdc = () => interopDefault(import('..\\pages\\colorVariant.htm\\index.vue' /* webpackChunkName: "pages/colorVariant.htm/index" */))
const _4def674c = () => interopDefault(import('..\\pages\\colorVariantRecipeStage.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStage.htm/index" */))
const _2170c8f4 = () => interopDefault(import('..\\pages\\colorVariantRecipeStageChild.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStageChild.htm/index" */))
const _ca9d707a = () => interopDefault(import('..\\pages\\colorVariantRecipeStageGroup.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStageGroup.htm/index" */))
const _3c2fc6b8 = () => interopDefault(import('..\\pages\\colorVariantRecipeStagePicture.htm\\index.vue' /* webpackChunkName: "pages/colorVariantRecipeStagePicture.htm/index" */))
const _1a2eddfb = () => interopDefault(import('..\\pages\\columnSettings.htm\\index.vue' /* webpackChunkName: "pages/columnSettings.htm/index" */))
const _72c8b7c2 = () => interopDefault(import('..\\pages\\companies.htm\\index.vue' /* webpackChunkName: "pages/companies.htm/index" */))
const _617ae0a9 = () => interopDefault(import('..\\pages\\contractRegistration.htm\\index.vue' /* webpackChunkName: "pages/contractRegistration.htm/index" */))
const _1468d5c4 = () => interopDefault(import('..\\pages\\country.htm\\index.vue' /* webpackChunkName: "pages/country.htm/index" */))
const _5d8caa36 = () => interopDefault(import('..\\pages\\currencies.htm\\index.vue' /* webpackChunkName: "pages/currencies.htm/index" */))
const _15c6dcbc = () => interopDefault(import('..\\pages\\currenRates.htm\\index.vue' /* webpackChunkName: "pages/currenRates.htm/index" */))
const _2fda1b74 = () => interopDefault(import('..\\pages\\dashboard.htm\\index.vue' /* webpackChunkName: "pages/dashboard.htm/index" */))
const _23a5b497 = () => interopDefault(import('..\\pages\\decrees.htm\\index.vue' /* webpackChunkName: "pages/decrees.htm/index" */))
const _62d93412 = () => interopDefault(import('..\\pages\\defectTypes.htm\\index.vue' /* webpackChunkName: "pages/defectTypes.htm/index" */))
const _9b7245ce = () => interopDefault(import('..\\pages\\departments.htm\\index.vue' /* webpackChunkName: "pages/departments.htm/index" */))
const _7c3b85f6 = () => interopDefault(import('..\\pages\\designs.htm\\index.vue' /* webpackChunkName: "pages/designs.htm/index" */))
const _263503df = () => interopDefault(import('..\\pages\\designTypes.htm\\index.vue' /* webpackChunkName: "pages/designTypes.htm/index" */))
const _c0419a70 = () => interopDefault(import('..\\pages\\designVariants.htm\\index.vue' /* webpackChunkName: "pages/designVariants.htm/index" */))
const _bddc1350 = () => interopDefault(import('..\\pages\\discharge.htm\\index.vue' /* webpackChunkName: "pages/discharge.htm/index" */))
const _7ca582f8 = () => interopDefault(import('..\\pages\\discountCards.htm\\index.vue' /* webpackChunkName: "pages/discountCards.htm/index" */))
const _642155c8 = () => interopDefault(import('..\\pages\\discounts.htm\\index.vue' /* webpackChunkName: "pages/discounts.htm/index" */))
const _24fae7ca = () => interopDefault(import('..\\pages\\distanceToTerminalList.htm\\index.vue' /* webpackChunkName: "pages/distanceToTerminalList.htm/index" */))
const _9c634db4 = () => interopDefault(import('..\\pages\\district.htm\\index.vue' /* webpackChunkName: "pages/district.htm/index" */))
const _145223b5 = () => interopDefault(import('..\\pages\\doors.htm\\index.vue' /* webpackChunkName: "pages/doors.htm/index" */))
const _3e53ceb9 = () => interopDefault(import('..\\pages\\dyeings.htm\\index.vue' /* webpackChunkName: "pages/dyeings.htm/index" */))
const _45874416 = () => interopDefault(import('..\\pages\\entryExitByDoors.htm\\index.vue' /* webpackChunkName: "pages/entryExitByDoors.htm/index" */))
const _ca16ee96 = () => interopDefault(import('..\\pages\\entryLaboratory.htm\\index.vue' /* webpackChunkName: "pages/entryLaboratory.htm/index" */))
const _7cb03a71 = () => interopDefault(import('..\\pages\\equipmentExpenses.htm\\index.vue' /* webpackChunkName: "pages/equipmentExpenses.htm/index" */))
const _f157cdfa = () => interopDefault(import('..\\pages\\equipmentReports.htm\\index.vue' /* webpackChunkName: "pages/equipmentReports.htm/index" */))
const _46efa822 = () => interopDefault(import('..\\pages\\equipments.htm\\index.vue' /* webpackChunkName: "pages/equipments.htm/index" */))
const _3b65790a = () => interopDefault(import('..\\pages\\equipmentsOnlineStatus.htm\\index.vue' /* webpackChunkName: "pages/equipmentsOnlineStatus.htm/index" */))
const _07d94d1e = () => interopDefault(import('..\\pages\\equipmentsOrderReports.htm\\index.vue' /* webpackChunkName: "pages/equipmentsOrderReports.htm/index" */))
const _6e07ee75 = () => interopDefault(import('..\\pages\\equipmentsPersonOnlineStatus.htm\\index.vue' /* webpackChunkName: "pages/equipmentsPersonOnlineStatus.htm/index" */))
const _e8e66116 = () => interopDefault(import('..\\pages\\equipmentsPersonReports.htm\\index.vue' /* webpackChunkName: "pages/equipmentsPersonReports.htm/index" */))
const _8f831a5c = () => interopDefault(import('..\\pages\\equipmentsRealTimeStatus.htm\\index.vue' /* webpackChunkName: "pages/equipmentsRealTimeStatus.htm/index" */))
const _5c77a04a = () => interopDefault(import('..\\pages\\equipmentsRealTimeStatus2.htm\\index.vue' /* webpackChunkName: "pages/equipmentsRealTimeStatus2.htm/index" */))
const _f9c6bf42 = () => interopDefault(import('..\\pages\\expenseInvoice.htm\\index.vue' /* webpackChunkName: "pages/expenseInvoice.htm/index" */))
const _d961e810 = () => interopDefault(import('..\\pages\\externalInvoice.htm\\index.vue' /* webpackChunkName: "pages/externalInvoice.htm/index" */))
const _5da670bc = () => interopDefault(import('..\\pages\\extraWorks.htm\\index.vue' /* webpackChunkName: "pages/extraWorks.htm/index" */))
const _a97cccfa = () => interopDefault(import('..\\pages\\files.htm\\index.vue' /* webpackChunkName: "pages/files.htm/index" */))
const _3cfdeab8 = () => interopDefault(import('..\\pages\\grades.htm\\index.vue' /* webpackChunkName: "pages/grades.htm/index" */))
const _5ebafdf9 = () => interopDefault(import('..\\pages\\holidays.htm\\index.vue' /* webpackChunkName: "pages/holidays.htm/index" */))
const _a70d0332 = () => interopDefault(import('..\\pages\\hrdevices.htm\\index.vue' /* webpackChunkName: "pages/hrdevices.htm/index" */))
const _000f9d5e = () => interopDefault(import('..\\pages\\hrEvents.htm\\index.vue' /* webpackChunkName: "pages/hrEvents.htm/index" */))
const _4b8b7c64 = () => interopDefault(import('..\\pages\\hronlines.htm\\index.vue' /* webpackChunkName: "pages/hronlines.htm/index" */))
const _47443194 = () => interopDefault(import('..\\pages\\inbox.htm\\index.vue' /* webpackChunkName: "pages/inbox.htm/index" */))
const _26659438 = () => interopDefault(import('..\\pages\\inputFromProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/inputFromProductionCompany.htm/index" */))
const _96dfac80 = () => interopDefault(import('..\\pages\\inputReturn.htm\\index.vue' /* webpackChunkName: "pages/inputReturn.htm/index" */))
const _c7b909ba = () => interopDefault(import('..\\pages\\inputStockDetailReport.htm\\index.vue' /* webpackChunkName: "pages/inputStockDetailReport.htm/index" */))
const _3d2bf33d = () => interopDefault(import('..\\pages\\inputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/inputToServiceInvoice.htm/index" */))
const _79dcc598 = () => interopDefault(import('..\\pages\\intangibleAssets.htm\\index.vue' /* webpackChunkName: "pages/intangibleAssets.htm/index" */))
const _0e3a652c = () => interopDefault(import('..\\pages\\internalInvoice.htm\\index.vue' /* webpackChunkName: "pages/internalInvoice.htm/index" */))
const _4b75d8a2 = () => interopDefault(import('..\\pages\\invoiceReports.htm\\index.vue' /* webpackChunkName: "pages/invoiceReports.htm/index" */))
const _2d729544 = () => interopDefault(import('..\\pages\\iplikLotStavka.htm\\index.vue' /* webpackChunkName: "pages/iplikLotStavka.htm/index" */))
const _fadc8204 = () => interopDefault(import('..\\pages\\iplikStages.htm\\index.vue' /* webpackChunkName: "pages/iplikStages.htm/index" */))
const _5c1613d7 = () => interopDefault(import('..\\pages\\knittingSewModelBarcodeReader.htm\\index.vue' /* webpackChunkName: "pages/knittingSewModelBarcodeReader.htm/index" */))
const _5774817a = () => interopDefault(import('..\\pages\\kroy.htm\\index.vue' /* webpackChunkName: "pages/kroy.htm/index" */))
const _721b3442 = () => interopDefault(import('..\\pages\\languages.htm\\index.vue' /* webpackChunkName: "pages/languages.htm/index" */))
const _e9f68cd0 = () => interopDefault(import('..\\pages\\leaves.htm\\index.vue' /* webpackChunkName: "pages/leaves.htm/index" */))
const _4096b6ae = () => interopDefault(import('..\\pages\\leaveType.htm\\index.vue' /* webpackChunkName: "pages/leaveType.htm/index" */))
const _2200bb5e = () => interopDefault(import('..\\pages\\login.htm\\index.vue' /* webpackChunkName: "pages/login.htm/index" */))
const _f4ff5136 = () => interopDefault(import('..\\pages\\logs.htm\\index.vue' /* webpackChunkName: "pages/logs.htm/index" */))
const _31e30050 = () => interopDefault(import('..\\pages\\maintable\\index.vue' /* webpackChunkName: "pages/maintable/index" */))
const _5b9336bf = () => interopDefault(import('..\\pages\\makeBill.htm\\index.vue' /* webpackChunkName: "pages/makeBill.htm/index" */))
const _4fbe0ad8 = () => interopDefault(import('..\\pages\\manufacturers.htm\\index.vue' /* webpackChunkName: "pages/manufacturers.htm/index" */))
const _3e0b4c92 = () => interopDefault(import('..\\pages\\marketSalesInvoice.htm\\index.vue' /* webpackChunkName: "pages/marketSalesInvoice.htm/index" */))
const _3a3b2512 = () => interopDefault(import('..\\pages\\menuSettings.htm\\index.vue' /* webpackChunkName: "pages/menuSettings.htm/index" */))
const _16f82212 = () => interopDefault(import('..\\pages\\newSimpleProductionInvoice.htm\\index.vue' /* webpackChunkName: "pages/newSimpleProductionInvoice.htm/index" */))
const _5126eb45 = () => interopDefault(import('..\\pages\\obligations.htm\\index.vue' /* webpackChunkName: "pages/obligations.htm/index" */))
const _443be3f8 = () => interopDefault(import('..\\pages\\openControlPage.htm\\index.vue' /* webpackChunkName: "pages/openControlPage.htm/index" */))
const _3b126dd4 = () => interopDefault(import('..\\pages\\openControlPageNew.htm\\index.vue' /* webpackChunkName: "pages/openControlPageNew.htm/index" */))
const _64a83b3c = () => interopDefault(import('..\\pages\\orderproductiontypes.htm\\index.vue' /* webpackChunkName: "pages/orderproductiontypes.htm/index" */))
const _6eca7159 = () => interopDefault(import('..\\pages\\orderSalePlannerCalendar.htm\\index.vue' /* webpackChunkName: "pages/orderSalePlannerCalendar.htm/index" */))
const _171cef72 = () => interopDefault(import('..\\pages\\outputproductioninvoice.htm\\index.vue' /* webpackChunkName: "pages/outputproductioninvoice.htm/index" */))
const _48af2c0a = () => interopDefault(import('..\\pages\\outputProductionReturn.htm\\index.vue' /* webpackChunkName: "pages/outputProductionReturn.htm/index" */))
const _7c1662d2 = () => interopDefault(import('..\\pages\\outputToProductionCompany.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompany.htm/index" */))
const _0c59117c = () => interopDefault(import('..\\pages\\outputToProductionCompanyReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToProductionCompanyReturn.htm/index" */))
const _040e1faa = () => interopDefault(import('..\\pages\\outputToPrOrder.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrder.htm/index" */))
const _2250321a = () => interopDefault(import('..\\pages\\outputToPrOrderReturn.htm\\index.vue' /* webpackChunkName: "pages/outputToPrOrderReturn.htm/index" */))
const _6f687400 = () => interopDefault(import('..\\pages\\outputToServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/outputToServiceInvoice.htm/index" */))
const _79e7bfa1 = () => interopDefault(import('..\\pages\\packagetypes.htm\\index.vue' /* webpackChunkName: "pages/packagetypes.htm/index" */))
const _b185ad12 = () => interopDefault(import('..\\pages\\packaging.htm\\index.vue' /* webpackChunkName: "pages/packaging.htm/index" */))
const _61765d61 = () => interopDefault(import('..\\pages\\paymenttypes.htm\\index.vue' /* webpackChunkName: "pages/paymenttypes.htm/index" */))
const _191b8291 = () => interopDefault(import('..\\pages\\permissionGroups.htm\\index.vue' /* webpackChunkName: "pages/permissionGroups.htm/index" */))
const _5e593833 = () => interopDefault(import('..\\pages\\personAndEquipments.htm\\index.vue' /* webpackChunkName: "pages/personAndEquipments.htm/index" */))
const _297d529a = () => interopDefault(import('..\\pages\\personEquipmentSews.htm\\index.vue' /* webpackChunkName: "pages/personEquipmentSews.htm/index" */))
const _94945426 = () => interopDefault(import('..\\pages\\personListReport.htm\\index.vue' /* webpackChunkName: "pages/personListReport.htm/index" */))
const _3a9650b7 = () => interopDefault(import('..\\pages\\personSalaries.htm\\index.vue' /* webpackChunkName: "pages/personSalaries.htm/index" */))
const _5307bb78 = () => interopDefault(import('..\\pages\\phoneNumbers.htm\\index.vue' /* webpackChunkName: "pages/phoneNumbers.htm/index" */))
const _5655cf3e = () => interopDefault(import('..\\pages\\planningTypes.htm\\index.vue' /* webpackChunkName: "pages/planningTypes.htm/index" */))
const _47e63abb = () => interopDefault(import('..\\pages\\plateNumber.htm\\index.vue' /* webpackChunkName: "pages/plateNumber.htm/index" */))
const _0092aca0 = () => interopDefault(import('..\\pages\\positions.htm\\index.vue' /* webpackChunkName: "pages/positions.htm/index" */))
const _65b22454 = () => interopDefault(import('..\\pages\\post.htm\\index.vue' /* webpackChunkName: "pages/post.htm/index" */))
const _7d4e3395 = () => interopDefault(import('..\\pages\\postStations.htm\\index.vue' /* webpackChunkName: "pages/postStations.htm/index" */))
const _1fe3130d = () => interopDefault(import('..\\pages\\prepareInternalInvoiceNewDevice.htm\\index.vue' /* webpackChunkName: "pages/prepareInternalInvoiceNewDevice.htm/index" */))
const _2608b219 = () => interopDefault(import('..\\pages\\prepareOutputToPrOrderSimple.htm\\index.vue' /* webpackChunkName: "pages/prepareOutputToPrOrderSimple.htm/index" */))
const _213e3aa5 = () => interopDefault(import('..\\pages\\prepareProductionOrderRecipeToChangeReserve.htm\\index.vue' /* webpackChunkName: "pages/prepareProductionOrderRecipeToChangeReserve.htm/index" */))
const _d399d4fe = () => interopDefault(import('..\\pages\\prepareSewOperatorsKPI.htm\\index.vue' /* webpackChunkName: "pages/prepareSewOperatorsKPI.htm/index" */))
const _1f4ceee8 = () => interopDefault(import('..\\pages\\prepareUser.htm\\index.vue' /* webpackChunkName: "pages/prepareUser.htm/index" */))
const _363560a0 = () => interopDefault(import('..\\pages\\productAnalogs.htm\\index.vue' /* webpackChunkName: "pages/productAnalogs.htm/index" */))
const _dec71ea2 = () => interopDefault(import('..\\pages\\productcategories.htm\\index.vue' /* webpackChunkName: "pages/productcategories.htm/index" */))
const _533fc461 = () => interopDefault(import('..\\pages\\productCompanyPriceList.htm\\index.vue' /* webpackChunkName: "pages/productCompanyPriceList.htm/index" */))
const _2827a824 = () => interopDefault(import('..\\pages\\productEntryTypes.htm\\index.vue' /* webpackChunkName: "pages/productEntryTypes.htm/index" */))
const _69480544 = () => interopDefault(import('..\\pages\\productionArticles.htm\\index.vue' /* webpackChunkName: "pages/productionArticles.htm/index" */))
const _e97bcac8 = () => interopDefault(import('..\\pages\\productionByEquipment.htm\\index.vue' /* webpackChunkName: "pages/productionByEquipment.htm/index" */))
const _ae0dc4b8 = () => interopDefault(import('..\\pages\\productionByPackage.htm\\index.vue' /* webpackChunkName: "pages/productionByPackage.htm/index" */))
const _b820f084 = () => interopDefault(import('..\\pages\\productionForQrCodeList.htm\\index.vue' /* webpackChunkName: "pages/productionForQrCodeList.htm/index" */))
const _1c0ff186 = () => interopDefault(import('..\\pages\\productioninvoice.htm\\index.vue' /* webpackChunkName: "pages/productioninvoice.htm/index" */))
const _2cc4e645 = () => interopDefault(import('..\\pages\\productionorder.htm\\index.vue' /* webpackChunkName: "pages/productionorder.htm/index" */))
const _b1a32094 = () => interopDefault(import('..\\pages\\productionOrderMovement.htm\\index.vue' /* webpackChunkName: "pages/productionOrderMovement.htm/index" */))
const _817b679a = () => interopDefault(import('..\\pages\\productionorderplannings.htm\\index.vue' /* webpackChunkName: "pages/productionorderplannings.htm/index" */))
const _c888496e = () => interopDefault(import('..\\pages\\productLoadingList.htm\\index.vue' /* webpackChunkName: "pages/productLoadingList.htm/index" */))
const _7201d503 = () => interopDefault(import('..\\pages\\productproductiontypes.htm\\index.vue' /* webpackChunkName: "pages/productproductiontypes.htm/index" */))
const _fcc4d6e0 = () => interopDefault(import('..\\pages\\products.htm\\index.vue' /* webpackChunkName: "pages/products.htm/index" */))
const _38c3d8e8 = () => interopDefault(import('..\\pages\\productsAndAutomaticSystemsCreateEdit.htm\\index.vue' /* webpackChunkName: "pages/productsAndAutomaticSystemsCreateEdit.htm/index" */))
const _72224ae8 = () => interopDefault(import('..\\pages\\producttransfercodes.htm\\index.vue' /* webpackChunkName: "pages/producttransfercodes.htm/index" */))
const _368c130a = () => interopDefault(import('..\\pages\\profitsAndLosses.htm\\index.vue' /* webpackChunkName: "pages/profitsAndLosses.htm/index" */))
const _3ef8cc93 = () => interopDefault(import('..\\pages\\purchaseAndTransferInvoices.htm\\index.vue' /* webpackChunkName: "pages/purchaseAndTransferInvoices.htm/index" */))
const _f9e4d6e4 = () => interopDefault(import('..\\pages\\purchaseinvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseinvoice.htm/index" */))
const _6140a966 = () => interopDefault(import('..\\pages\\purchaseorder.htm\\index.vue' /* webpackChunkName: "pages/purchaseorder.htm/index" */))
const _c6abd70a = () => interopDefault(import('..\\pages\\purchaseServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseServiceInvoice.htm/index" */))
const _238ec96a = () => interopDefault(import('..\\pages\\quickMenuSettings.htm\\index.vue' /* webpackChunkName: "pages/quickMenuSettings.htm/index" */))
const _2083093c = () => interopDefault(import('..\\pages\\retentionType.htm\\index.vue' /* webpackChunkName: "pages/retentionType.htm/index" */))
const _0d18bd8c = () => interopDefault(import('..\\pages\\salaries.htm\\index.vue' /* webpackChunkName: "pages/salaries.htm/index" */))
const _d6151e58 = () => interopDefault(import('..\\pages\\saleinvoice.htm\\index.vue' /* webpackChunkName: "pages/saleinvoice.htm/index" */))
const _59f60516 = () => interopDefault(import('..\\pages\\saleServiceInvoice.htm\\index.vue' /* webpackChunkName: "pages/saleServiceInvoice.htm/index" */))
const _828a159c = () => interopDefault(import('..\\pages\\salesorder.htm\\index.vue' /* webpackChunkName: "pages/salesorder.htm/index" */))
const _12181484 = () => interopDefault(import('..\\pages\\salesReturn.htm\\index.vue' /* webpackChunkName: "pages/salesReturn.htm/index" */))
const _01b3c792 = () => interopDefault(import('..\\pages\\sessions.htm\\index.vue' /* webpackChunkName: "pages/sessions.htm/index" */))
const _da9c5c0a = () => interopDefault(import('..\\pages\\sewBandEquipments.htm\\index.vue' /* webpackChunkName: "pages/sewBandEquipments.htm/index" */))
const _2282a010 = () => interopDefault(import('..\\pages\\sewmodel.htm\\index.vue' /* webpackChunkName: "pages/sewmodel.htm/index" */))
const _71f3b6fb = () => interopDefault(import('..\\pages\\sewModelBarcodeReader.htm\\index.vue' /* webpackChunkName: "pages/sewModelBarcodeReader.htm/index" */))
const _1a3530bd = () => interopDefault(import('..\\pages\\sewModelBarcodeReaderQualityControl.htm\\index.vue' /* webpackChunkName: "pages/sewModelBarcodeReaderQualityControl.htm/index" */))
const _02de07f6 = () => interopDefault(import('..\\pages\\sewModelBarcodeReaderSticker.htm\\index.vue' /* webpackChunkName: "pages/sewModelBarcodeReaderSticker.htm/index" */))
const _177356be = () => interopDefault(import('..\\pages\\sewModelManualBarcodeReader.htm\\index.vue' /* webpackChunkName: "pages/sewModelManualBarcodeReader.htm/index" */))
const _9471b028 = () => interopDefault(import('..\\pages\\sewModelOperationName.htm\\index.vue' /* webpackChunkName: "pages/sewModelOperationName.htm/index" */))
const _834457ca = () => interopDefault(import('..\\pages\\sewModelPackingType.htm\\index.vue' /* webpackChunkName: "pages/sewModelPackingType.htm/index" */))
const _074c499c = () => interopDefault(import('..\\pages\\sewModelReport.htm\\index.vue' /* webpackChunkName: "pages/sewModelReport.htm/index" */))
const _52d57012 = () => interopDefault(import('..\\pages\\sewModelSizeColorBarcode.htm\\index.vue' /* webpackChunkName: "pages/sewModelSizeColorBarcode.htm/index" */))
const _3e838d01 = () => interopDefault(import('..\\pages\\sewModelVariantsSize.htm\\index.vue' /* webpackChunkName: "pages/sewModelVariantsSize.htm/index" */))
const _412a3000 = () => interopDefault(import('..\\pages\\sewOperatorsKPI.htm\\index.vue' /* webpackChunkName: "pages/sewOperatorsKPI.htm/index" */))
const _662ecc86 = () => interopDefault(import('..\\pages\\sewOrderOnlineStatus.htm\\index.vue' /* webpackChunkName: "pages/sewOrderOnlineStatus.htm/index" */))
const _f5559fd0 = () => interopDefault(import('..\\pages\\shift.htm\\index.vue' /* webpackChunkName: "pages/shift.htm/index" */))
const _45d05f04 = () => interopDefault(import('..\\pages\\shippingTransportDislocationParentList.htm\\index.vue' /* webpackChunkName: "pages/shippingTransportDislocationParentList.htm/index" */))
const _03a24d38 = () => interopDefault(import('..\\pages\\simpleProductionInvoice.htm\\index.vue' /* webpackChunkName: "pages/simpleProductionInvoice.htm/index" */))
const _1dba8042 = () => interopDefault(import('..\\pages\\stages.htm\\index.vue' /* webpackChunkName: "pages/stages.htm/index" */))
const _1c3d515e = () => interopDefault(import('..\\pages\\street.htm\\index.vue' /* webpackChunkName: "pages/street.htm/index" */))
const _02db3593 = () => interopDefault(import('..\\pages\\subDepartments.htm\\index.vue' /* webpackChunkName: "pages/subDepartments.htm/index" */))
const _3ff54772 = () => interopDefault(import('..\\pages\\tableRowAccessSysUser.htm\\index.vue' /* webpackChunkName: "pages/tableRowAccessSysUser.htm/index" */))
const _418c1963 = () => interopDefault(import('..\\pages\\taras.htm\\index.vue' /* webpackChunkName: "pages/taras.htm/index" */))
const _73512f2a = () => interopDefault(import('..\\pages\\tariffs.htm\\index.vue' /* webpackChunkName: "pages/tariffs.htm/index" */))
const _ebde26c0 = () => interopDefault(import('..\\pages\\timeZones.htm\\index.vue' /* webpackChunkName: "pages/timeZones.htm/index" */))
const _ecd73c1c = () => interopDefault(import('..\\pages\\transactionCharacters.htm\\index.vue' /* webpackChunkName: "pages/transactionCharacters.htm/index" */))
const _5ea140d7 = () => interopDefault(import('..\\pages\\transactionDetailReport.htm\\index.vue' /* webpackChunkName: "pages/transactionDetailReport.htm/index" */))
const _d7c63c64 = () => interopDefault(import('..\\pages\\transactionMovements.htm\\index.vue' /* webpackChunkName: "pages/transactionMovements.htm/index" */))
const _65240713 = () => interopDefault(import('..\\pages\\transactionReports.htm\\index.vue' /* webpackChunkName: "pages/transactionReports.htm/index" */))
const _4db7a815 = () => interopDefault(import('..\\pages\\transactionSaldoReport.htm\\index.vue' /* webpackChunkName: "pages/transactionSaldoReport.htm/index" */))
const _4d064a62 = () => interopDefault(import('..\\pages\\unitmeasurement.htm\\index.vue' /* webpackChunkName: "pages/unitmeasurement.htm/index" */))
const _01efdc5c = () => interopDefault(import('..\\pages\\users.htm\\index.vue' /* webpackChunkName: "pages/users.htm/index" */))
const _303fdf61 = () => interopDefault(import('..\\pages\\viabranchreceive.htm\\index.vue' /* webpackChunkName: "pages/viabranchreceive.htm/index" */))
const _5d9f11b8 = () => interopDefault(import('..\\pages\\warehouses.htm\\index.vue' /* webpackChunkName: "pages/warehouses.htm/index" */))
const _8295ec82 = () => interopDefault(import('..\\pages\\weights.htm\\index.vue' /* webpackChunkName: "pages/weights.htm/index" */))
const _c36bdef2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _14b920fd = () => interopDefault(import('..\\pages\\decreePage.htm\\_id.vue' /* webpackChunkName: "pages/decreePage.htm/_id" */))
const _1c90ac72 = () => interopDefault(import('..\\pages\\newPrepareSimpleProductionInvoice.htm\\_id.vue' /* webpackChunkName: "pages/newPrepareSimpleProductionInvoice.htm/_id" */))
const _40c5aa18 = () => interopDefault(import('..\\pages\\planningsByProductionOrder.htm\\_id.vue' /* webpackChunkName: "pages/planningsByProductionOrder.htm/_id" */))
const _772a5eb6 = () => interopDefault(import('..\\pages\\prepareAccount.htm\\_id.vue' /* webpackChunkName: "pages/prepareAccount.htm/_id" */))
const _3c38aae6 = () => interopDefault(import('..\\pages\\prepareArticle.htm\\_id.vue' /* webpackChunkName: "pages/prepareArticle.htm/_id" */))
const _65522d26 = () => interopDefault(import('..\\pages\\prepareBand.htm\\_id.vue' /* webpackChunkName: "pages/prepareBand.htm/_id" */))
const _db3a9f02 = () => interopDefault(import('..\\pages\\prepareBank.htm\\_id.vue' /* webpackChunkName: "pages/prepareBank.htm/_id" */))
const _0decbb0e = () => interopDefault(import('..\\pages\\prepareBasicTools.htm\\_id.vue' /* webpackChunkName: "pages/prepareBasicTools.htm/_id" */))
const _7849a1e6 = () => interopDefault(import('..\\pages\\prepareBatchColorDepthTariffs.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchColorDepthTariffs.htm/_id" */))
const _12e21404 = () => interopDefault(import('..\\pages\\prepareBatchColorMethodTariffs.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchColorMethodTariffs.htm/_id" */))
const _c3568e16 = () => interopDefault(import('..\\pages\\prepareBatchNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchNew.htm/_id" */))
const _0619a36e = () => interopDefault(import('..\\pages\\prepareBatchProccesStageTariffs.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchProccesStageTariffs.htm/_id" */))
const _5ac03186 = () => interopDefault(import('..\\pages\\prepareBatchProcess.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchProcess.htm/_id" */))
const _266be73a = () => interopDefault(import('..\\pages\\prepareBatchProcessStage.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchProcessStage.htm/_id" */))
const _21a3f3f9 = () => interopDefault(import('..\\pages\\prepareBatchunionsNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareBatchunionsNew.htm/_id" */))
const _5e9565a0 = () => interopDefault(import('..\\pages\\prepareBranche.htm\\_id.vue' /* webpackChunkName: "pages/prepareBranche.htm/_id" */))
const _f9fbd5e0 = () => interopDefault(import('..\\pages\\prepareCapitals.htm\\_id.vue' /* webpackChunkName: "pages/prepareCapitals.htm/_id" */))
const _030c1b22 = () => interopDefault(import('..\\pages\\prepareCar.htm\\_id.vue' /* webpackChunkName: "pages/prepareCar.htm/_id" */))
const _39dd1dea = () => interopDefault(import('..\\pages\\prepareCashbox.htm\\_id.vue' /* webpackChunkName: "pages/prepareCashbox.htm/_id" */))
const _2747a929 = () => interopDefault(import('..\\pages\\prepareCharacterDetail.htm\\_id.vue' /* webpackChunkName: "pages/prepareCharacterDetail.htm/_id" */))
const _5c9a9c80 = () => interopDefault(import('..\\pages\\prepareCharacteristic.htm\\_id.vue' /* webpackChunkName: "pages/prepareCharacteristic.htm/_id" */))
const _e25a285a = () => interopDefault(import('..\\pages\\prepareCheckPoint.htm\\_id.vue' /* webpackChunkName: "pages/prepareCheckPoint.htm/_id" */))
const _64e101b0 = () => interopDefault(import('..\\pages\\prepareCity.htm\\_id.vue' /* webpackChunkName: "pages/prepareCity.htm/_id" */))
const _22d9d266 = () => interopDefault(import('..\\pages\\prepareClusterSeason.htm\\_id.vue' /* webpackChunkName: "pages/prepareClusterSeason.htm/_id" */))
const _46fa441e = () => interopDefault(import('..\\pages\\prepareClusterSeasonPriceList.htm\\_id.vue' /* webpackChunkName: "pages/prepareClusterSeasonPriceList.htm/_id" */))
const _0b4a0c68 = () => interopDefault(import('..\\pages\\prepareClusterYear.htm\\_id.vue' /* webpackChunkName: "pages/prepareClusterYear.htm/_id" */))
const _32dfb240 = () => interopDefault(import('..\\pages\\prepareColor.htm\\_id.vue' /* webpackChunkName: "pages/prepareColor.htm/_id" */))
const _622b4b1b = () => interopDefault(import('..\\pages\\prepareColorDepth.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorDepth.htm/_id" */))
const _999f064e = () => interopDefault(import('..\\pages\\prepareColorVariant.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariant.htm/_id" */))
const _7485d516 = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStage.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStage.htm/_id" */))
const _07c0cf4d = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStageChild.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStageChild.htm/_id" */))
const _493266ca = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStageGroup.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStageGroup.htm/_id" */))
const _1e6ef7aa = () => interopDefault(import('..\\pages\\prepareColorVariantRecipeStagePicture.htm\\_id.vue' /* webpackChunkName: "pages/prepareColorVariantRecipeStagePicture.htm/_id" */))
const _94a0657c = () => interopDefault(import('..\\pages\\prepareColumnSettings.htm\\_id.vue' /* webpackChunkName: "pages/prepareColumnSettings.htm/_id" */))
const _9a922334 = () => interopDefault(import('..\\pages\\prepareCompany.htm\\_id.vue' /* webpackChunkName: "pages/prepareCompany.htm/_id" */))
const _5b3363ed = () => interopDefault(import('..\\pages\\prepareCountry.htm\\_id.vue' /* webpackChunkName: "pages/prepareCountry.htm/_id" */))
const _05e66a6c = () => interopDefault(import('..\\pages\\prepareCurrency.htm\\_id.vue' /* webpackChunkName: "pages/prepareCurrency.htm/_id" */))
const _676c2dd0 = () => interopDefault(import('..\\pages\\prepareDefectType.htm\\_id.vue' /* webpackChunkName: "pages/prepareDefectType.htm/_id" */))
const _1d537a29 = () => interopDefault(import('..\\pages\\prepareDepartment.htm\\_id.vue' /* webpackChunkName: "pages/prepareDepartment.htm/_id" */))
const _7729a93d = () => interopDefault(import('..\\pages\\prepareDesign.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesign.htm/_id" */))
const _20c77fbb = () => interopDefault(import('..\\pages\\prepareDesignColorVariant.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesignColorVariant.htm/_id" */))
const _44f63923 = () => interopDefault(import('..\\pages\\prepareDesignType.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesignType.htm/_id" */))
const _7521c188 = () => interopDefault(import('..\\pages\\prepareDesignVariant.htm\\_id.vue' /* webpackChunkName: "pages/prepareDesignVariant.htm/_id" */))
const _8f78257e = () => interopDefault(import('..\\pages\\prepareDischarge.htm\\_id.vue' /* webpackChunkName: "pages/prepareDischarge.htm/_id" */))
const _3be6339a = () => interopDefault(import('..\\pages\\prepareDiscount.htm\\_id.vue' /* webpackChunkName: "pages/prepareDiscount.htm/_id" */))
const _3a60ccea = () => interopDefault(import('..\\pages\\prepareDiscountCard.htm\\_id.vue' /* webpackChunkName: "pages/prepareDiscountCard.htm/_id" */))
const _c5839062 = () => interopDefault(import('..\\pages\\prepareDistanceToTerminal.htm\\_id.vue' /* webpackChunkName: "pages/prepareDistanceToTerminal.htm/_id" */))
const _67604b26 = () => interopDefault(import('..\\pages\\prepareDistrict.htm\\_id.vue' /* webpackChunkName: "pages/prepareDistrict.htm/_id" */))
const _109c7c4d = () => interopDefault(import('..\\pages\\prepareDoor.htm\\_id.vue' /* webpackChunkName: "pages/prepareDoor.htm/_id" */))
const _6def37f5 = () => interopDefault(import('..\\pages\\prepareEquipment.htm\\_id.vue' /* webpackChunkName: "pages/prepareEquipment.htm/_id" */))
const _3bf75acc = () => interopDefault(import('..\\pages\\prepareEquipmentExpenses.htm\\_id.vue' /* webpackChunkName: "pages/prepareEquipmentExpenses.htm/_id" */))
const _7332d8a6 = () => interopDefault(import('..\\pages\\prepareExpenseInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareExpenseInvoice.htm/_id" */))
const _26af1dbc = () => interopDefault(import('..\\pages\\prepareExtraWork.htm\\_id.vue' /* webpackChunkName: "pages/prepareExtraWork.htm/_id" */))
const _543a5e6b = () => interopDefault(import('..\\pages\\prepareHoliday.htm\\_id.vue' /* webpackChunkName: "pages/prepareHoliday.htm/_id" */))
const _cef6314a = () => interopDefault(import('..\\pages\\prepareHrdevice.htm\\_id.vue' /* webpackChunkName: "pages/prepareHrdevice.htm/_id" */))
const _2a880eda = () => interopDefault(import('..\\pages\\prepareInputFromProductionCompanyNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputFromProductionCompanyNew.htm/_id" */))
const _5bd23655 = () => interopDefault(import('..\\pages\\prepareInputReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputReturnNew.htm/_id" */))
const _2cab25e6 = () => interopDefault(import('..\\pages\\prepareInputToServiceInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareInputToServiceInvoice.htm/_id" */))
const _808e0a0a = () => interopDefault(import('..\\pages\\prepareIntangibleAssets.htm\\_id.vue' /* webpackChunkName: "pages/prepareIntangibleAssets.htm/_id" */))
const _feb83f2a = () => interopDefault(import('..\\pages\\prepareInternalInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareInternalInvoiceNew.htm/_id" */))
const _4a8c2165 = () => interopDefault(import('..\\pages\\prepareIplikLotStavka.htm\\_id.vue' /* webpackChunkName: "pages/prepareIplikLotStavka.htm/_id" */))
const _5407f684 = () => interopDefault(import('..\\pages\\PrepareIplikStage.htm\\_id.vue' /* webpackChunkName: "pages/PrepareIplikStage.htm/_id" */))
const _1707ab4a = () => interopDefault(import('..\\pages\\prepareKroy.htm\\_id.vue' /* webpackChunkName: "pages/prepareKroy.htm/_id" */))
const _0529f2e3 = () => interopDefault(import('..\\pages\\prepareLanguage.htm\\_id.vue' /* webpackChunkName: "pages/prepareLanguage.htm/_id" */))
const _62917b1f = () => interopDefault(import('..\\pages\\prepareLeaves.htm\\_id.vue' /* webpackChunkName: "pages/prepareLeaves.htm/_id" */))
const _bca0085c = () => interopDefault(import('..\\pages\\prepareLeaveType.htm\\_id.vue' /* webpackChunkName: "pages/prepareLeaveType.htm/_id" */))
const _27f8510a = () => interopDefault(import('..\\pages\\prepareManufacturer.htm\\_id.vue' /* webpackChunkName: "pages/prepareManufacturer.htm/_id" */))
const _f134c5a4 = () => interopDefault(import('..\\pages\\prepareObligations.htm\\_id.vue' /* webpackChunkName: "pages/prepareObligations.htm/_id" */))
const _aa2fee3c = () => interopDefault(import('..\\pages\\prepareOrderProductionType.htm\\_id.vue' /* webpackChunkName: "pages/prepareOrderProductionType.htm/_id" */))
const _5a74da71 = () => interopDefault(import('..\\pages\\prepareOutputToEquipment.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToEquipment.htm/_id" */))
const _65d2a5a1 = () => interopDefault(import('..\\pages\\prepareOutputToEquipmentReturn.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToEquipmentReturn.htm/_id" */))
const _18737d43 = () => interopDefault(import('..\\pages\\prepareOutputToProductionCompanyNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToProductionCompanyNew.htm/_id" */))
const _3ff558da = () => interopDefault(import('..\\pages\\prepareOutputToProductionCompanyReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToProductionCompanyReturnNew.htm/_id" */))
const _1948c35a = () => interopDefault(import('..\\pages\\prepareOutputToPrOrder.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToPrOrder.htm/_id" */))
const _4c9b7803 = () => interopDefault(import('..\\pages\\prepareOutputToPrOrderReturn.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToPrOrderReturn.htm/_id" */))
const _821edcf2 = () => interopDefault(import('..\\pages\\prepareOutputToServiceInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareOutputToServiceInvoice.htm/_id" */))
const _02b43523 = () => interopDefault(import('..\\pages\\preparePackageType.htm\\_id.vue' /* webpackChunkName: "pages/preparePackageType.htm/_id" */))
const _638f5c20 = () => interopDefault(import('..\\pages\\preparePackaging.htm\\_id.vue' /* webpackChunkName: "pages/preparePackaging.htm/_id" */))
const _6e206f63 = () => interopDefault(import('..\\pages\\preparePaymentType.htm\\_id.vue' /* webpackChunkName: "pages/preparePaymentType.htm/_id" */))
const _4060e05a = () => interopDefault(import('..\\pages\\preparePermissionGroup.htm\\_id.vue' /* webpackChunkName: "pages/preparePermissionGroup.htm/_id" */))
const _6a52764f = () => interopDefault(import('..\\pages\\preparePersonAndEquipment.htm\\_id.vue' /* webpackChunkName: "pages/preparePersonAndEquipment.htm/_id" */))
const _1302e7cf = () => interopDefault(import('..\\pages\\preparePersonEquipmentSew.htm\\_id.vue' /* webpackChunkName: "pages/preparePersonEquipmentSew.htm/_id" */))
const _6ff5621c = () => interopDefault(import('..\\pages\\preparePersonSalary.htm\\_id.vue' /* webpackChunkName: "pages/preparePersonSalary.htm/_id" */))
const _ef1b3e68 = () => interopDefault(import('..\\pages\\preparePhoneNumber.htm\\_id.vue' /* webpackChunkName: "pages/preparePhoneNumber.htm/_id" */))
const _87215338 = () => interopDefault(import('..\\pages\\preparePlanningType.htm\\_id.vue' /* webpackChunkName: "pages/preparePlanningType.htm/_id" */))
const _bd035bb8 = () => interopDefault(import('..\\pages\\preparePlateNumber.htm\\_id.vue' /* webpackChunkName: "pages/preparePlateNumber.htm/_id" */))
const _2928ae9c = () => interopDefault(import('..\\pages\\preparePosition.htm\\_id.vue' /* webpackChunkName: "pages/preparePosition.htm/_id" */))
const _03bc209b = () => interopDefault(import('..\\pages\\preparePost.htm\\_id.vue' /* webpackChunkName: "pages/preparePost.htm/_id" */))
const _32bb25cf = () => interopDefault(import('..\\pages\\preparePostStation.htm\\_id.vue' /* webpackChunkName: "pages/preparePostStation.htm/_id" */))
const _7650b527 = () => interopDefault(import('..\\pages\\prepareProductAnalogs.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductAnalogs.htm/_id" */))
const _e2b8fc54 = () => interopDefault(import('..\\pages\\prepareProductCategory.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductCategory.htm/_id" */))
const _703bb3ca = () => interopDefault(import('..\\pages\\prepareProductCompanyPriceList.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductCompanyPriceList.htm/_id" */))
const _2d36e084 = () => interopDefault(import('..\\pages\\prepareProductEntryType.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductEntryType.htm/_id" */))
const _a3a53834 = () => interopDefault(import('..\\pages\\prepareProductionArticle.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionArticle.htm/_id" */))
const _38dc2822 = () => interopDefault(import('..\\pages\\prepareProductionInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionInvoiceNew.htm/_id" */))
const _171ec7fb = () => interopDefault(import('..\\pages\\prepareProductionOrderItem.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductionOrderItem.htm/_id" */))
const _2813b5a1 = () => interopDefault(import('..\\pages\\prepareProductProductionType.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductProductionType.htm/_id" */))
const _72aa2f52 = () => interopDefault(import('..\\pages\\prepareProducts.htm\\_id.vue' /* webpackChunkName: "pages/prepareProducts.htm/_id" */))
const _3fcf53c8 = () => interopDefault(import('..\\pages\\prepareProductTransferCode.htm\\_id.vue' /* webpackChunkName: "pages/prepareProductTransferCode.htm/_id" */))
const _5c64fa02 = () => interopDefault(import('..\\pages\\prepareProfitsAndLosses.htm\\_id.vue' /* webpackChunkName: "pages/prepareProfitsAndLosses.htm/_id" */))
const _14c254b2 = () => interopDefault(import('..\\pages\\preparePurchaseInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseInvoiceNew.htm/_id" */))
const _604f155c = () => interopDefault(import('..\\pages\\preparePurchaseServiceInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/preparePurchaseServiceInvoiceNew.htm/_id" */))
const _12bac00d = () => interopDefault(import('..\\pages\\prepareReceiveInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareReceiveInvoiceNew.htm/_id" */))
const _094d044b = () => interopDefault(import('..\\pages\\prepareRetentionType.htm\\_id.vue' /* webpackChunkName: "pages/prepareRetentionType.htm/_id" */))
const _41e2a9a1 = () => interopDefault(import('..\\pages\\prepareSaleInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleInvoiceNew.htm/_id" */))
const _12d506dc = () => interopDefault(import('..\\pages\\prepareSaleOrder.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleOrder.htm/_id" */))
const _5c8db422 = () => interopDefault(import('..\\pages\\prepareSaleServiceInvoiceNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSaleServiceInvoiceNew.htm/_id" */))
const _65e7ea17 = () => interopDefault(import('..\\pages\\prepareSalesReturnNew.htm\\_id.vue' /* webpackChunkName: "pages/prepareSalesReturnNew.htm/_id" */))
const _465b8d47 = () => interopDefault(import('..\\pages\\prepareSewBandEquipment.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewBandEquipment.htm/_id" */))
const _7a208ff7 = () => interopDefault(import('..\\pages\\prepareSewModel.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModel.htm/_id" */))
const _6699ba55 = () => interopDefault(import('..\\pages\\prepareSewModelOperationName.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelOperationName.htm/_id" */))
const _5d2a1af8 = () => interopDefault(import('..\\pages\\prepareSewModelPackingType.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelPackingType.htm/_id" */))
const _48571e59 = () => interopDefault(import('..\\pages\\prepareSewModelSizeColorBarcode.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelSizeColorBarcode.htm/_id" */))
const _04ca3288 = () => interopDefault(import('..\\pages\\prepareSewModelVariantsSize.htm\\_id.vue' /* webpackChunkName: "pages/prepareSewModelVariantsSize.htm/_id" */))
const _3da7ff81 = () => interopDefault(import('..\\pages\\prepareShift.htm\\_id.vue' /* webpackChunkName: "pages/prepareShift.htm/_id" */))
const _00888661 = () => interopDefault(import('..\\pages\\prepareSimpleProductionInvoice.htm\\_id.vue' /* webpackChunkName: "pages/prepareSimpleProductionInvoice.htm/_id" */))
const _c5a5528a = () => interopDefault(import('..\\pages\\prepareSimpleProductionInvoiceManual.htm\\_id.vue' /* webpackChunkName: "pages/prepareSimpleProductionInvoiceManual.htm/_id" */))
const _16ec1285 = () => interopDefault(import('..\\pages\\prepareStage.htm\\_id.vue' /* webpackChunkName: "pages/prepareStage.htm/_id" */))
const _6d8799d0 = () => interopDefault(import('..\\pages\\prepareStreet.htm\\_id.vue' /* webpackChunkName: "pages/prepareStreet.htm/_id" */))
const _0c3d2ada = () => interopDefault(import('..\\pages\\prepareSubDepartments.htm\\_id.vue' /* webpackChunkName: "pages/prepareSubDepartments.htm/_id" */))
const _f293f94a = () => interopDefault(import('..\\pages\\prepareTableRowAccessSysUser.htm\\_id.vue' /* webpackChunkName: "pages/prepareTableRowAccessSysUser.htm/_id" */))
const _59cfd542 = () => interopDefault(import('..\\pages\\prepareTara.htm\\_id.vue' /* webpackChunkName: "pages/prepareTara.htm/_id" */))
const _75b71758 = () => interopDefault(import('..\\pages\\prepareTariffs.htm\\_id.vue' /* webpackChunkName: "pages/prepareTariffs.htm/_id" */))
const _cd7c687c = () => interopDefault(import('..\\pages\\prepareTimeZone.htm\\_id.vue' /* webpackChunkName: "pages/prepareTimeZone.htm/_id" */))
const _cc46dda0 = () => interopDefault(import('..\\pages\\prepareTransactionCharacter.htm\\_id.vue' /* webpackChunkName: "pages/prepareTransactionCharacter.htm/_id" */))
const _29c589aa = () => interopDefault(import('..\\pages\\prepareUnitMeasurement.htm\\_id.vue' /* webpackChunkName: "pages/prepareUnitMeasurement.htm/_id" */))
const _f19f8820 = () => interopDefault(import('..\\pages\\prepareUserPersonal.htm\\_id.vue' /* webpackChunkName: "pages/prepareUserPersonal.htm/_id" */))
const _4764c0e0 = () => interopDefault(import('..\\pages\\prepareWarehouse.htm\\_id.vue' /* webpackChunkName: "pages/prepareWarehouse.htm/_id" */))
const _7616a6c3 = () => interopDefault(import('..\\pages\\prepareWeight.htm\\_id.vue' /* webpackChunkName: "pages/prepareWeight.htm/_id" */))
const _0461f3ef = () => interopDefault(import('..\\pages\\productLoading.htm\\_id.vue' /* webpackChunkName: "pages/productLoading.htm/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/accounts.htm",
    component: _15ed15ce,
    name: "accounts.htm"
  }, {
    path: "/articles.htm",
    component: _b1e4b2d2,
    name: "articles.htm"
  }, {
    path: "/attendanceschedule.htm",
    component: _6a78fdb4,
    name: "attendanceschedule.htm"
  }, {
    path: "/bands.htm",
    component: _503dcf88,
    name: "bands.htm"
  }, {
    path: "/banks.htm",
    component: _0c862a43,
    name: "banks.htm"
  }, {
    path: "/basicTools.htm",
    component: _00d38147,
    name: "basicTools.htm"
  }, {
    path: "/batchColorDepthTariffs.htm",
    component: _36bee89f,
    name: "batchColorDepthTariffs.htm"
  }, {
    path: "/batchColorMethodTariffs.htm",
    component: _dc696cd6,
    name: "batchColorMethodTariffs.htm"
  }, {
    path: "/batchDetailsList.htm",
    component: _6e30c64e,
    name: "batchDetailsList.htm"
  }, {
    path: "/batches.htm",
    component: _f2a0dc9c,
    name: "batches.htm"
  }, {
    path: "/batchProccesStageTariffs.htm",
    component: _50ad4402,
    name: "batchProccesStageTariffs.htm"
  }, {
    path: "/batchProcess.htm",
    component: _d0159502,
    name: "batchProcess.htm"
  }, {
    path: "/batchProcessStages.htm",
    component: _83de6cec,
    name: "batchProcessStages.htm"
  }, {
    path: "/batchProductionInvoiceUi.htm",
    component: _658cd266,
    name: "batchProductionInvoiceUi.htm"
  }, {
    path: "/batchRepair.htm",
    component: _79af2853,
    name: "batchRepair.htm"
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
    path: "/branchess.htm",
    component: _d3ff9752,
    name: "branchess.htm"
  }, {
    path: "/branchProductsStockReportByLogic.htm",
    component: _6283df51,
    name: "branchProductsStockReportByLogic.htm"
  }, {
    path: "/calculationByColorVariantRecipe.htm",
    component: _23e6ac2a,
    name: "calculationByColorVariantRecipe.htm"
  }, {
    path: "/capitals.htm",
    component: _f64711ee,
    name: "capitals.htm"
  }, {
    path: "/car.htm",
    component: _16286346,
    name: "car.htm"
  }, {
    path: "/cashboxs.htm",
    component: _5609314e,
    name: "cashboxs.htm"
  }, {
    path: "/changeProductColorVariant.htm",
    component: _f973b24e,
    name: "changeProductColorVariant.htm"
  }, {
    path: "/characterDetails.htm",
    component: _0a27e17b,
    name: "characterDetails.htm"
  }, {
    path: "/characteristics.htm",
    component: _54ae203c,
    name: "characteristics.htm"
  }, {
    path: "/checkPoints.htm",
    component: _dfd9d9a2,
    name: "checkPoints.htm"
  }, {
    path: "/city.htm",
    component: _11231429,
    name: "city.htm"
  }, {
    path: "/clusterCamera.htm",
    component: _5a5deb8a,
    name: "clusterCamera.htm"
  }, {
    path: "/clusterSeason.htm",
    component: _4d5fa286,
    name: "clusterSeason.htm"
  }, {
    path: "/clusterSeasonPriceList.htm",
    component: _71994dea,
    name: "clusterSeasonPriceList.htm"
  }, {
    path: "/clusterSeasonReport.htm",
    component: _5ff7c669,
    name: "clusterSeasonReport.htm"
  }, {
    path: "/clusterYear.htm",
    component: _4790cf3a,
    name: "clusterYear.htm"
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
    path: "/columnSettings.htm",
    component: _1a2eddfb,
    name: "columnSettings.htm"
  }, {
    path: "/companies.htm",
    component: _72c8b7c2,
    name: "companies.htm"
  }, {
    path: "/contractRegistration.htm",
    component: _617ae0a9,
    name: "contractRegistration.htm"
  }, {
    path: "/country.htm",
    component: _1468d5c4,
    name: "country.htm"
  }, {
    path: "/currencies.htm",
    component: _5d8caa36,
    name: "currencies.htm"
  }, {
    path: "/currenRates.htm",
    component: _15c6dcbc,
    name: "currenRates.htm"
  }, {
    path: "/dashboard.htm",
    component: _2fda1b74,
    name: "dashboard.htm"
  }, {
    path: "/decrees.htm",
    component: _23a5b497,
    name: "decrees.htm"
  }, {
    path: "/defectTypes.htm",
    component: _62d93412,
    name: "defectTypes.htm"
  }, {
    path: "/departments.htm",
    component: _9b7245ce,
    name: "departments.htm"
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
    path: "/discharge.htm",
    component: _bddc1350,
    name: "discharge.htm"
  }, {
    path: "/discountCards.htm",
    component: _7ca582f8,
    name: "discountCards.htm"
  }, {
    path: "/discounts.htm",
    component: _642155c8,
    name: "discounts.htm"
  }, {
    path: "/distanceToTerminalList.htm",
    component: _24fae7ca,
    name: "distanceToTerminalList.htm"
  }, {
    path: "/district.htm",
    component: _9c634db4,
    name: "district.htm"
  }, {
    path: "/doors.htm",
    component: _145223b5,
    name: "doors.htm"
  }, {
    path: "/dyeings.htm",
    component: _3e53ceb9,
    name: "dyeings.htm"
  }, {
    path: "/entryExitByDoors.htm",
    component: _45874416,
    name: "entryExitByDoors.htm"
  }, {
    path: "/entryLaboratory.htm",
    component: _ca16ee96,
    name: "entryLaboratory.htm"
  }, {
    path: "/equipmentExpenses.htm",
    component: _7cb03a71,
    name: "equipmentExpenses.htm"
  }, {
    path: "/equipmentReports.htm",
    component: _f157cdfa,
    name: "equipmentReports.htm"
  }, {
    path: "/equipments.htm",
    component: _46efa822,
    name: "equipments.htm"
  }, {
    path: "/equipmentsOnlineStatus.htm",
    component: _3b65790a,
    name: "equipmentsOnlineStatus.htm"
  }, {
    path: "/equipmentsOrderReports.htm",
    component: _07d94d1e,
    name: "equipmentsOrderReports.htm"
  }, {
    path: "/equipmentsPersonOnlineStatus.htm",
    component: _6e07ee75,
    name: "equipmentsPersonOnlineStatus.htm"
  }, {
    path: "/equipmentsPersonReports.htm",
    component: _e8e66116,
    name: "equipmentsPersonReports.htm"
  }, {
    path: "/equipmentsRealTimeStatus.htm",
    component: _8f831a5c,
    name: "equipmentsRealTimeStatus.htm"
  }, {
    path: "/equipmentsRealTimeStatus2.htm",
    component: _5c77a04a,
    name: "equipmentsRealTimeStatus2.htm"
  }, {
    path: "/expenseInvoice.htm",
    component: _f9c6bf42,
    name: "expenseInvoice.htm"
  }, {
    path: "/externalInvoice.htm",
    component: _d961e810,
    name: "externalInvoice.htm"
  }, {
    path: "/extraWorks.htm",
    component: _5da670bc,
    name: "extraWorks.htm"
  }, {
    path: "/files.htm",
    component: _a97cccfa,
    name: "files.htm"
  }, {
    path: "/grades.htm",
    component: _3cfdeab8,
    name: "grades.htm"
  }, {
    path: "/holidays.htm",
    component: _5ebafdf9,
    name: "holidays.htm"
  }, {
    path: "/hrdevices.htm",
    component: _a70d0332,
    name: "hrdevices.htm"
  }, {
    path: "/hrEvents.htm",
    component: _000f9d5e,
    name: "hrEvents.htm"
  }, {
    path: "/hronlines.htm",
    component: _4b8b7c64,
    name: "hronlines.htm"
  }, {
    path: "/inbox.htm",
    component: _47443194,
    name: "inbox.htm"
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
    path: "/intangibleAssets.htm",
    component: _79dcc598,
    name: "intangibleAssets.htm"
  }, {
    path: "/internalInvoice.htm",
    component: _0e3a652c,
    name: "internalInvoice.htm"
  }, {
    path: "/invoiceReports.htm",
    component: _4b75d8a2,
    name: "invoiceReports.htm"
  }, {
    path: "/iplikLotStavka.htm",
    component: _2d729544,
    name: "iplikLotStavka.htm"
  }, {
    path: "/iplikStages.htm",
    component: _fadc8204,
    name: "iplikStages.htm"
  }, {
    path: "/knittingSewModelBarcodeReader.htm",
    component: _5c1613d7,
    name: "knittingSewModelBarcodeReader.htm"
  }, {
    path: "/kroy.htm",
    component: _5774817a,
    name: "kroy.htm"
  }, {
    path: "/languages.htm",
    component: _721b3442,
    name: "languages.htm"
  }, {
    path: "/leaves.htm",
    component: _e9f68cd0,
    name: "leaves.htm"
  }, {
    path: "/leaveType.htm",
    component: _4096b6ae,
    name: "leaveType.htm"
  }, {
    path: "/login.htm",
    component: _2200bb5e,
    name: "login.htm"
  }, {
    path: "/logs.htm",
    component: _f4ff5136,
    name: "logs.htm"
  }, {
    path: "/maintable",
    component: _31e30050,
    name: "maintable"
  }, {
    path: "/makeBill.htm",
    component: _5b9336bf,
    name: "makeBill.htm"
  }, {
    path: "/manufacturers.htm",
    component: _4fbe0ad8,
    name: "manufacturers.htm"
  }, {
    path: "/marketSalesInvoice.htm",
    component: _3e0b4c92,
    name: "marketSalesInvoice.htm"
  }, {
    path: "/menuSettings.htm",
    component: _3a3b2512,
    name: "menuSettings.htm"
  }, {
    path: "/newSimpleProductionInvoice.htm",
    component: _16f82212,
    name: "newSimpleProductionInvoice.htm"
  }, {
    path: "/obligations.htm",
    component: _5126eb45,
    name: "obligations.htm"
  }, {
    path: "/openControlPage.htm",
    component: _443be3f8,
    name: "openControlPage.htm"
  }, {
    path: "/openControlPageNew.htm",
    component: _3b126dd4,
    name: "openControlPageNew.htm"
  }, {
    path: "/orderproductiontypes.htm",
    component: _64a83b3c,
    name: "orderproductiontypes.htm"
  }, {
    path: "/orderSalePlannerCalendar.htm",
    component: _6eca7159,
    name: "orderSalePlannerCalendar.htm"
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
    path: "/packagetypes.htm",
    component: _79e7bfa1,
    name: "packagetypes.htm"
  }, {
    path: "/packaging.htm",
    component: _b185ad12,
    name: "packaging.htm"
  }, {
    path: "/paymenttypes.htm",
    component: _61765d61,
    name: "paymenttypes.htm"
  }, {
    path: "/permissionGroups.htm",
    component: _191b8291,
    name: "permissionGroups.htm"
  }, {
    path: "/personAndEquipments.htm",
    component: _5e593833,
    name: "personAndEquipments.htm"
  }, {
    path: "/personEquipmentSews.htm",
    component: _297d529a,
    name: "personEquipmentSews.htm"
  }, {
    path: "/personListReport.htm",
    component: _94945426,
    name: "personListReport.htm"
  }, {
    path: "/personSalaries.htm",
    component: _3a9650b7,
    name: "personSalaries.htm"
  }, {
    path: "/phoneNumbers.htm",
    component: _5307bb78,
    name: "phoneNumbers.htm"
  }, {
    path: "/planningTypes.htm",
    component: _5655cf3e,
    name: "planningTypes.htm"
  }, {
    path: "/plateNumber.htm",
    component: _47e63abb,
    name: "plateNumber.htm"
  }, {
    path: "/positions.htm",
    component: _0092aca0,
    name: "positions.htm"
  }, {
    path: "/post.htm",
    component: _65b22454,
    name: "post.htm"
  }, {
    path: "/postStations.htm",
    component: _7d4e3395,
    name: "postStations.htm"
  }, {
    path: "/prepareInternalInvoiceNewDevice.htm",
    component: _1fe3130d,
    name: "prepareInternalInvoiceNewDevice.htm"
  }, {
    path: "/prepareOutputToPrOrderSimple.htm",
    component: _2608b219,
    name: "prepareOutputToPrOrderSimple.htm"
  }, {
    path: "/prepareProductionOrderRecipeToChangeReserve.htm",
    component: _213e3aa5,
    name: "prepareProductionOrderRecipeToChangeReserve.htm"
  }, {
    path: "/prepareSewOperatorsKPI.htm",
    component: _d399d4fe,
    name: "prepareSewOperatorsKPI.htm"
  }, {
    path: "/prepareUser.htm",
    component: _1f4ceee8,
    name: "prepareUser.htm"
  }, {
    path: "/productAnalogs.htm",
    component: _363560a0,
    name: "productAnalogs.htm"
  }, {
    path: "/productcategories.htm",
    component: _dec71ea2,
    name: "productcategories.htm"
  }, {
    path: "/productCompanyPriceList.htm",
    component: _533fc461,
    name: "productCompanyPriceList.htm"
  }, {
    path: "/productEntryTypes.htm",
    component: _2827a824,
    name: "productEntryTypes.htm"
  }, {
    path: "/productionArticles.htm",
    component: _69480544,
    name: "productionArticles.htm"
  }, {
    path: "/productionByEquipment.htm",
    component: _e97bcac8,
    name: "productionByEquipment.htm"
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
    path: "/productionOrderMovement.htm",
    component: _b1a32094,
    name: "productionOrderMovement.htm"
  }, {
    path: "/productionorderplannings.htm",
    component: _817b679a,
    name: "productionorderplannings.htm"
  }, {
    path: "/productLoadingList.htm",
    component: _c888496e,
    name: "productLoadingList.htm"
  }, {
    path: "/productproductiontypes.htm",
    component: _7201d503,
    name: "productproductiontypes.htm"
  }, {
    path: "/products.htm",
    component: _fcc4d6e0,
    name: "products.htm"
  }, {
    path: "/productsAndAutomaticSystemsCreateEdit.htm",
    component: _38c3d8e8,
    name: "productsAndAutomaticSystemsCreateEdit.htm"
  }, {
    path: "/producttransfercodes.htm",
    component: _72224ae8,
    name: "producttransfercodes.htm"
  }, {
    path: "/profitsAndLosses.htm",
    component: _368c130a,
    name: "profitsAndLosses.htm"
  }, {
    path: "/purchaseAndTransferInvoices.htm",
    component: _3ef8cc93,
    name: "purchaseAndTransferInvoices.htm"
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
    path: "/quickMenuSettings.htm",
    component: _238ec96a,
    name: "quickMenuSettings.htm"
  }, {
    path: "/retentionType.htm",
    component: _2083093c,
    name: "retentionType.htm"
  }, {
    path: "/salaries.htm",
    component: _0d18bd8c,
    name: "salaries.htm"
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
    path: "/sewModelBarcodeReader.htm",
    component: _71f3b6fb,
    name: "sewModelBarcodeReader.htm"
  }, {
    path: "/sewModelBarcodeReaderQualityControl.htm",
    component: _1a3530bd,
    name: "sewModelBarcodeReaderQualityControl.htm"
  }, {
    path: "/sewModelBarcodeReaderSticker.htm",
    component: _02de07f6,
    name: "sewModelBarcodeReaderSticker.htm"
  }, {
    path: "/sewModelManualBarcodeReader.htm",
    component: _177356be,
    name: "sewModelManualBarcodeReader.htm"
  }, {
    path: "/sewModelOperationName.htm",
    component: _9471b028,
    name: "sewModelOperationName.htm"
  }, {
    path: "/sewModelPackingType.htm",
    component: _834457ca,
    name: "sewModelPackingType.htm"
  }, {
    path: "/sewModelReport.htm",
    component: _074c499c,
    name: "sewModelReport.htm"
  }, {
    path: "/sewModelSizeColorBarcode.htm",
    component: _52d57012,
    name: "sewModelSizeColorBarcode.htm"
  }, {
    path: "/sewModelVariantsSize.htm",
    component: _3e838d01,
    name: "sewModelVariantsSize.htm"
  }, {
    path: "/sewOperatorsKPI.htm",
    component: _412a3000,
    name: "sewOperatorsKPI.htm"
  }, {
    path: "/sewOrderOnlineStatus.htm",
    component: _662ecc86,
    name: "sewOrderOnlineStatus.htm"
  }, {
    path: "/shift.htm",
    component: _f5559fd0,
    name: "shift.htm"
  }, {
    path: "/shippingTransportDislocationParentList.htm",
    component: _45d05f04,
    name: "shippingTransportDislocationParentList.htm"
  }, {
    path: "/simpleProductionInvoice.htm",
    component: _03a24d38,
    name: "simpleProductionInvoice.htm"
  }, {
    path: "/stages.htm",
    component: _1dba8042,
    name: "stages.htm"
  }, {
    path: "/street.htm",
    component: _1c3d515e,
    name: "street.htm"
  }, {
    path: "/subDepartments.htm",
    component: _02db3593,
    name: "subDepartments.htm"
  }, {
    path: "/tableRowAccessSysUser.htm",
    component: _3ff54772,
    name: "tableRowAccessSysUser.htm"
  }, {
    path: "/taras.htm",
    component: _418c1963,
    name: "taras.htm"
  }, {
    path: "/tariffs.htm",
    component: _73512f2a,
    name: "tariffs.htm"
  }, {
    path: "/timeZones.htm",
    component: _ebde26c0,
    name: "timeZones.htm"
  }, {
    path: "/transactionCharacters.htm",
    component: _ecd73c1c,
    name: "transactionCharacters.htm"
  }, {
    path: "/transactionDetailReport.htm",
    component: _5ea140d7,
    name: "transactionDetailReport.htm"
  }, {
    path: "/transactionMovements.htm",
    component: _d7c63c64,
    name: "transactionMovements.htm"
  }, {
    path: "/transactionReports.htm",
    component: _65240713,
    name: "transactionReports.htm"
  }, {
    path: "/transactionSaldoReport.htm",
    component: _4db7a815,
    name: "transactionSaldoReport.htm"
  }, {
    path: "/unitmeasurement.htm",
    component: _4d064a62,
    name: "unitmeasurement.htm"
  }, {
    path: "/users.htm",
    component: _01efdc5c,
    name: "users.htm"
  }, {
    path: "/viabranchreceive.htm",
    component: _303fdf61,
    name: "viabranchreceive.htm"
  }, {
    path: "/warehouses.htm",
    component: _5d9f11b8,
    name: "warehouses.htm"
  }, {
    path: "/weights.htm",
    component: _8295ec82,
    name: "weights.htm"
  }, {
    path: "/",
    component: _c36bdef2,
    name: "index"
  }, {
    path: "/decreePage.htm/:id?",
    component: _14b920fd,
    name: "decreePage.htm-id"
  }, {
    path: "/newPrepareSimpleProductionInvoice.htm/:id?",
    component: _1c90ac72,
    name: "newPrepareSimpleProductionInvoice.htm-id"
  }, {
    path: "/planningsByProductionOrder.htm/:id?",
    component: _40c5aa18,
    name: "planningsByProductionOrder.htm-id"
  }, {
    path: "/prepareAccount.htm/:id?",
    component: _772a5eb6,
    name: "prepareAccount.htm-id"
  }, {
    path: "/prepareArticle.htm/:id?",
    component: _3c38aae6,
    name: "prepareArticle.htm-id"
  }, {
    path: "/prepareBand.htm/:id?",
    component: _65522d26,
    name: "prepareBand.htm-id"
  }, {
    path: "/prepareBank.htm/:id?",
    component: _db3a9f02,
    name: "prepareBank.htm-id"
  }, {
    path: "/prepareBasicTools.htm/:id?",
    component: _0decbb0e,
    name: "prepareBasicTools.htm-id"
  }, {
    path: "/prepareBatchColorDepthTariffs.htm/:id?",
    component: _7849a1e6,
    name: "prepareBatchColorDepthTariffs.htm-id"
  }, {
    path: "/prepareBatchColorMethodTariffs.htm/:id?",
    component: _12e21404,
    name: "prepareBatchColorMethodTariffs.htm-id"
  }, {
    path: "/prepareBatchNew.htm/:id?",
    component: _c3568e16,
    name: "prepareBatchNew.htm-id"
  }, {
    path: "/prepareBatchProccesStageTariffs.htm/:id?",
    component: _0619a36e,
    name: "prepareBatchProccesStageTariffs.htm-id"
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
    path: "/prepareBranche.htm/:id?",
    component: _5e9565a0,
    name: "prepareBranche.htm-id"
  }, {
    path: "/prepareCapitals.htm/:id?",
    component: _f9fbd5e0,
    name: "prepareCapitals.htm-id"
  }, {
    path: "/prepareCar.htm/:id?",
    component: _030c1b22,
    name: "prepareCar.htm-id"
  }, {
    path: "/prepareCashbox.htm/:id?",
    component: _39dd1dea,
    name: "prepareCashbox.htm-id"
  }, {
    path: "/prepareCharacterDetail.htm/:id?",
    component: _2747a929,
    name: "prepareCharacterDetail.htm-id"
  }, {
    path: "/prepareCharacteristic.htm/:id?",
    component: _5c9a9c80,
    name: "prepareCharacteristic.htm-id"
  }, {
    path: "/prepareCheckPoint.htm/:id?",
    component: _e25a285a,
    name: "prepareCheckPoint.htm-id"
  }, {
    path: "/prepareCity.htm/:id?",
    component: _64e101b0,
    name: "prepareCity.htm-id"
  }, {
    path: "/prepareClusterSeason.htm/:id?",
    component: _22d9d266,
    name: "prepareClusterSeason.htm-id"
  }, {
    path: "/prepareClusterSeasonPriceList.htm/:id?",
    component: _46fa441e,
    name: "prepareClusterSeasonPriceList.htm-id"
  }, {
    path: "/prepareClusterYear.htm/:id?",
    component: _0b4a0c68,
    name: "prepareClusterYear.htm-id"
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
    path: "/prepareColumnSettings.htm/:id?",
    component: _94a0657c,
    name: "prepareColumnSettings.htm-id"
  }, {
    path: "/prepareCompany.htm/:id?",
    component: _9a922334,
    name: "prepareCompany.htm-id"
  }, {
    path: "/prepareCountry.htm/:id?",
    component: _5b3363ed,
    name: "prepareCountry.htm-id"
  }, {
    path: "/prepareCurrency.htm/:id?",
    component: _05e66a6c,
    name: "prepareCurrency.htm-id"
  }, {
    path: "/prepareDefectType.htm/:id?",
    component: _676c2dd0,
    name: "prepareDefectType.htm-id"
  }, {
    path: "/prepareDepartment.htm/:id?",
    component: _1d537a29,
    name: "prepareDepartment.htm-id"
  }, {
    path: "/prepareDesign.htm/:id?",
    component: _7729a93d,
    name: "prepareDesign.htm-id"
  }, {
    path: "/prepareDesignColorVariant.htm/:id?",
    component: _20c77fbb,
    name: "prepareDesignColorVariant.htm-id"
  }, {
    path: "/prepareDesignType.htm/:id?",
    component: _44f63923,
    name: "prepareDesignType.htm-id"
  }, {
    path: "/prepareDesignVariant.htm/:id?",
    component: _7521c188,
    name: "prepareDesignVariant.htm-id"
  }, {
    path: "/prepareDischarge.htm/:id?",
    component: _8f78257e,
    name: "prepareDischarge.htm-id"
  }, {
    path: "/prepareDiscount.htm/:id?",
    component: _3be6339a,
    name: "prepareDiscount.htm-id"
  }, {
    path: "/prepareDiscountCard.htm/:id?",
    component: _3a60ccea,
    name: "prepareDiscountCard.htm-id"
  }, {
    path: "/prepareDistanceToTerminal.htm/:id?",
    component: _c5839062,
    name: "prepareDistanceToTerminal.htm-id"
  }, {
    path: "/prepareDistrict.htm/:id?",
    component: _67604b26,
    name: "prepareDistrict.htm-id"
  }, {
    path: "/prepareDoor.htm/:id?",
    component: _109c7c4d,
    name: "prepareDoor.htm-id"
  }, {
    path: "/prepareEquipment.htm/:id?",
    component: _6def37f5,
    name: "prepareEquipment.htm-id"
  }, {
    path: "/prepareEquipmentExpenses.htm/:id?",
    component: _3bf75acc,
    name: "prepareEquipmentExpenses.htm-id"
  }, {
    path: "/prepareExpenseInvoice.htm/:id?",
    component: _7332d8a6,
    name: "prepareExpenseInvoice.htm-id"
  }, {
    path: "/prepareExtraWork.htm/:id?",
    component: _26af1dbc,
    name: "prepareExtraWork.htm-id"
  }, {
    path: "/prepareHoliday.htm/:id?",
    component: _543a5e6b,
    name: "prepareHoliday.htm-id"
  }, {
    path: "/prepareHrdevice.htm/:id?",
    component: _cef6314a,
    name: "prepareHrdevice.htm-id"
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
    path: "/prepareIntangibleAssets.htm/:id?",
    component: _808e0a0a,
    name: "prepareIntangibleAssets.htm-id"
  }, {
    path: "/prepareInternalInvoiceNew.htm/:id?",
    component: _feb83f2a,
    name: "prepareInternalInvoiceNew.htm-id"
  }, {
    path: "/prepareIplikLotStavka.htm/:id?",
    component: _4a8c2165,
    name: "prepareIplikLotStavka.htm-id"
  }, {
    path: "/PrepareIplikStage.htm/:id?",
    component: _5407f684,
    name: "PrepareIplikStage.htm-id"
  }, {
    path: "/prepareKroy.htm/:id?",
    component: _1707ab4a,
    name: "prepareKroy.htm-id"
  }, {
    path: "/prepareLanguage.htm/:id?",
    component: _0529f2e3,
    name: "prepareLanguage.htm-id"
  }, {
    path: "/prepareLeaves.htm/:id?",
    component: _62917b1f,
    name: "prepareLeaves.htm-id"
  }, {
    path: "/prepareLeaveType.htm/:id?",
    component: _bca0085c,
    name: "prepareLeaveType.htm-id"
  }, {
    path: "/prepareManufacturer.htm/:id?",
    component: _27f8510a,
    name: "prepareManufacturer.htm-id"
  }, {
    path: "/prepareObligations.htm/:id?",
    component: _f134c5a4,
    name: "prepareObligations.htm-id"
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
    path: "/preparePackageType.htm/:id?",
    component: _02b43523,
    name: "preparePackageType.htm-id"
  }, {
    path: "/preparePackaging.htm/:id?",
    component: _638f5c20,
    name: "preparePackaging.htm-id"
  }, {
    path: "/preparePaymentType.htm/:id?",
    component: _6e206f63,
    name: "preparePaymentType.htm-id"
  }, {
    path: "/preparePermissionGroup.htm/:id?",
    component: _4060e05a,
    name: "preparePermissionGroup.htm-id"
  }, {
    path: "/preparePersonAndEquipment.htm/:id?",
    component: _6a52764f,
    name: "preparePersonAndEquipment.htm-id"
  }, {
    path: "/preparePersonEquipmentSew.htm/:id?",
    component: _1302e7cf,
    name: "preparePersonEquipmentSew.htm-id"
  }, {
    path: "/preparePersonSalary.htm/:id?",
    component: _6ff5621c,
    name: "preparePersonSalary.htm-id"
  }, {
    path: "/preparePhoneNumber.htm/:id?",
    component: _ef1b3e68,
    name: "preparePhoneNumber.htm-id"
  }, {
    path: "/preparePlanningType.htm/:id?",
    component: _87215338,
    name: "preparePlanningType.htm-id"
  }, {
    path: "/preparePlateNumber.htm/:id?",
    component: _bd035bb8,
    name: "preparePlateNumber.htm-id"
  }, {
    path: "/preparePosition.htm/:id?",
    component: _2928ae9c,
    name: "preparePosition.htm-id"
  }, {
    path: "/preparePost.htm/:id?",
    component: _03bc209b,
    name: "preparePost.htm-id"
  }, {
    path: "/preparePostStation.htm/:id?",
    component: _32bb25cf,
    name: "preparePostStation.htm-id"
  }, {
    path: "/prepareProductAnalogs.htm/:id?",
    component: _7650b527,
    name: "prepareProductAnalogs.htm-id"
  }, {
    path: "/prepareProductCategory.htm/:id?",
    component: _e2b8fc54,
    name: "prepareProductCategory.htm-id"
  }, {
    path: "/prepareProductCompanyPriceList.htm/:id?",
    component: _703bb3ca,
    name: "prepareProductCompanyPriceList.htm-id"
  }, {
    path: "/prepareProductEntryType.htm/:id?",
    component: _2d36e084,
    name: "prepareProductEntryType.htm-id"
  }, {
    path: "/prepareProductionArticle.htm/:id?",
    component: _a3a53834,
    name: "prepareProductionArticle.htm-id"
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
    path: "/prepareProducts.htm/:id?",
    component: _72aa2f52,
    name: "prepareProducts.htm-id"
  }, {
    path: "/prepareProductTransferCode.htm/:id?",
    component: _3fcf53c8,
    name: "prepareProductTransferCode.htm-id"
  }, {
    path: "/prepareProfitsAndLosses.htm/:id?",
    component: _5c64fa02,
    name: "prepareProfitsAndLosses.htm-id"
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
    path: "/prepareRetentionType.htm/:id?",
    component: _094d044b,
    name: "prepareRetentionType.htm-id"
  }, {
    path: "/prepareSaleInvoiceNew.htm/:id?",
    component: _41e2a9a1,
    name: "prepareSaleInvoiceNew.htm-id"
  }, {
    path: "/prepareSaleOrder.htm/:id?",
    component: _12d506dc,
    name: "prepareSaleOrder.htm-id"
  }, {
    path: "/prepareSaleServiceInvoiceNew.htm/:id?",
    component: _5c8db422,
    name: "prepareSaleServiceInvoiceNew.htm-id"
  }, {
    path: "/prepareSalesReturnNew.htm/:id?",
    component: _65e7ea17,
    name: "prepareSalesReturnNew.htm-id"
  }, {
    path: "/prepareSewBandEquipment.htm/:id?",
    component: _465b8d47,
    name: "prepareSewBandEquipment.htm-id"
  }, {
    path: "/prepareSewModel.htm/:id?",
    component: _7a208ff7,
    name: "prepareSewModel.htm-id"
  }, {
    path: "/prepareSewModelOperationName.htm/:id?",
    component: _6699ba55,
    name: "prepareSewModelOperationName.htm-id"
  }, {
    path: "/prepareSewModelPackingType.htm/:id?",
    component: _5d2a1af8,
    name: "prepareSewModelPackingType.htm-id"
  }, {
    path: "/prepareSewModelSizeColorBarcode.htm/:id?",
    component: _48571e59,
    name: "prepareSewModelSizeColorBarcode.htm-id"
  }, {
    path: "/prepareSewModelVariantsSize.htm/:id?",
    component: _04ca3288,
    name: "prepareSewModelVariantsSize.htm-id"
  }, {
    path: "/prepareShift.htm/:id?",
    component: _3da7ff81,
    name: "prepareShift.htm-id"
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
  }, {
    path: "/prepareStreet.htm/:id?",
    component: _6d8799d0,
    name: "prepareStreet.htm-id"
  }, {
    path: "/prepareSubDepartments.htm/:id?",
    component: _0c3d2ada,
    name: "prepareSubDepartments.htm-id"
  }, {
    path: "/prepareTableRowAccessSysUser.htm/:id?",
    component: _f293f94a,
    name: "prepareTableRowAccessSysUser.htm-id"
  }, {
    path: "/prepareTara.htm/:id?",
    component: _59cfd542,
    name: "prepareTara.htm-id"
  }, {
    path: "/prepareTariffs.htm/:id?",
    component: _75b71758,
    name: "prepareTariffs.htm-id"
  }, {
    path: "/prepareTimeZone.htm/:id?",
    component: _cd7c687c,
    name: "prepareTimeZone.htm-id"
  }, {
    path: "/prepareTransactionCharacter.htm/:id?",
    component: _cc46dda0,
    name: "prepareTransactionCharacter.htm-id"
  }, {
    path: "/prepareUnitMeasurement.htm/:id?",
    component: _29c589aa,
    name: "prepareUnitMeasurement.htm-id"
  }, {
    path: "/prepareUserPersonal.htm/:id?",
    component: _f19f8820,
    name: "prepareUserPersonal.htm-id"
  }, {
    path: "/prepareWarehouse.htm/:id?",
    component: _4764c0e0,
    name: "prepareWarehouse.htm-id"
  }, {
    path: "/prepareWeight.htm/:id?",
    component: _7616a6c3,
    name: "prepareWeight.htm-id"
  }, {
    path: "/productLoading.htm/:id?",
    component: _0461f3ef,
    name: "productLoading.htm-id"
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
