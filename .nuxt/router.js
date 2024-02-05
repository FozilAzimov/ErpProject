import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c443a1b4 = () => interopDefault(import('..\\pages\\branches.htm\\index.vue' /* webpackChunkName: "pages/branches.htm/index" */))
const _dbac8d30 = () => interopDefault(import('..\\pages\\calculationByColorVariantRecipe.htm\\index.vue' /* webpackChunkName: "pages/calculationByColorVariantRecipe.htm/index" */))
const _82e50974 = () => interopDefault(import('..\\pages\\colors.htm\\index.vue' /* webpackChunkName: "pages/colors.htm/index" */))
const _7a28fbf8 = () => interopDefault(import('..\\pages\\dashboard.htm\\index.vue' /* webpackChunkName: "pages/dashboard.htm/index" */))
const _68e935f7 = () => interopDefault(import('..\\pages\\dyeings.htm\\index.vue' /* webpackChunkName: "pages/dyeings.htm/index" */))
const _0f03913e = () => interopDefault(import('..\\pages\\expenseInvoice.htm\\index.vue' /* webpackChunkName: "pages/expenseInvoice.htm/index" */))
const _3b83c1fe = () => interopDefault(import('..\\pages\\inputReturn.htm\\index.vue' /* webpackChunkName: "pages/inputReturn.htm/index" */))
const _2fb416a8 = () => interopDefault(import('..\\pages\\internalInvoice.htm\\index.vue' /* webpackChunkName: "pages/internalInvoice.htm/index" */))
const _39a1c10f = () => interopDefault(import('..\\pages\\login.htm\\index.vue' /* webpackChunkName: "pages/login.htm/index" */))
const _31b09e96 = () => interopDefault(import('..\\pages\\maintable\\index.vue' /* webpackChunkName: "pages/maintable/index" */))
const _dc8ad6d8 = () => interopDefault(import('..\\pages\\menuSettings.htm\\index.vue' /* webpackChunkName: "pages/menuSettings.htm/index" */))
const _367cb385 = () => interopDefault(import('..\\pages\\outputproductioninvoice.htm\\index.vue' /* webpackChunkName: "pages/outputproductioninvoice.htm/index" */))
const _2516533d = () => interopDefault(import('..\\pages\\preparePurchaseInvoiceNew.htm\\index.vue' /* webpackChunkName: "pages/preparePurchaseInvoiceNew.htm/index" */))
const _48379aad = () => interopDefault(import('..\\pages\\prepareSalesReturnNew.htm\\index.vue' /* webpackChunkName: "pages/prepareSalesReturnNew.htm/index" */))
const _63962f83 = () => interopDefault(import('..\\pages\\productionorder.htm\\index.vue' /* webpackChunkName: "pages/productionorder.htm/index" */))
const _82c6ee96 = () => interopDefault(import('..\\pages\\productionorderplannings.htm\\index.vue' /* webpackChunkName: "pages/productionorderplannings.htm/index" */))
const _8c424468 = () => interopDefault(import('..\\pages\\purchaseinvoice.htm\\index.vue' /* webpackChunkName: "pages/purchaseinvoice.htm/index" */))
const _67ce2c0b = () => interopDefault(import('..\\pages\\purchaseorder.htm\\index.vue' /* webpackChunkName: "pages/purchaseorder.htm/index" */))
const _1be90912 = () => interopDefault(import('..\\pages\\saleinvoice.htm\\index.vue' /* webpackChunkName: "pages/saleinvoice.htm/index" */))
const _3ef45d34 = () => interopDefault(import('..\\pages\\salesorder.htm\\index.vue' /* webpackChunkName: "pages/salesorder.htm/index" */))
const _7de78dfc = () => interopDefault(import('..\\pages\\salesReturn.htm\\index.vue' /* webpackChunkName: "pages/salesReturn.htm/index" */))
const _273d9cb9 = () => interopDefault(import('..\\pages\\sessions.htm\\index.vue' /* webpackChunkName: "pages/sessions.htm/index" */))
const _dc0365d6 = () => interopDefault(import('..\\pages\\transactionReports.htm\\index.vue' /* webpackChunkName: "pages/transactionReports.htm/index" */))
const _7607bc89 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/branches.htm",
    component: _c443a1b4,
    name: "branches.htm"
  }, {
    path: "/calculationByColorVariantRecipe.htm",
    component: _dbac8d30,
    name: "calculationByColorVariantRecipe.htm"
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
    path: "/inputReturn.htm",
    component: _3b83c1fe,
    name: "inputReturn.htm"
  }, {
    path: "/internalInvoice.htm",
    component: _2fb416a8,
    name: "internalInvoice.htm"
  }, {
    path: "/login.htm",
    component: _39a1c10f,
    name: "login.htm"
  }, {
    path: "/maintable",
    component: _31b09e96,
    name: "maintable"
  }, {
    path: "/menuSettings.htm",
    component: _dc8ad6d8,
    name: "menuSettings.htm"
  }, {
    path: "/outputproductioninvoice.htm",
    component: _367cb385,
    name: "outputproductioninvoice.htm"
  }, {
    path: "/preparePurchaseInvoiceNew.htm",
    component: _2516533d,
    name: "preparePurchaseInvoiceNew.htm"
  }, {
    path: "/prepareSalesReturnNew.htm",
    component: _48379aad,
    name: "prepareSalesReturnNew.htm"
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
    path: "/transactionReports.htm",
    component: _dc0365d6,
    name: "transactionReports.htm"
  }, {
    path: "/",
    component: _7607bc89,
    name: "index"
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
