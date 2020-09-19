import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fae8a514 = () => interopDefault(import('../pages/addproduct.vue' /* webpackChunkName: "pages/addproduct" */))
const _51cfaf08 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _5e00a095 = () => interopDefault(import('../pages/invoice.vue' /* webpackChunkName: "pages/invoice" */))
const _4b3d5aa8 = () => interopDefault(import('../pages/products.vue' /* webpackChunkName: "pages/products" */))
const _7dff20fb = () => interopDefault(import('../pages/rec/index.vue' /* webpackChunkName: "pages/rec/index" */))
const _730d7049 = () => interopDefault(import('../pages/store.vue' /* webpackChunkName: "pages/store" */))
const _61dfd21d = () => interopDefault(import('../pages/transactions.vue' /* webpackChunkName: "pages/transactions" */))
const _ed4b446a = () => interopDefault(import('../pages/rec/products.vue' /* webpackChunkName: "pages/rec/products" */))
const _43db808c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addproduct",
    component: _fae8a514,
    name: "addproduct"
  }, {
    path: "/dashboard",
    component: _51cfaf08,
    name: "dashboard"
  }, {
    path: "/invoice",
    component: _5e00a095,
    name: "invoice"
  }, {
    path: "/products",
    component: _4b3d5aa8,
    name: "products"
  }, {
    path: "/rec",
    component: _7dff20fb,
    name: "rec"
  }, {
    path: "/store",
    component: _730d7049,
    name: "store"
  }, {
    path: "/transactions",
    component: _61dfd21d,
    name: "transactions"
  }, {
    path: "/rec/products",
    component: _ed4b446a,
    name: "rec-products"
  }, {
    path: "/",
    component: _43db808c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
