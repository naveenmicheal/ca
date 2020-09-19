export { default as Sidebar } from '../../components/basics/sidebar.vue'
export { default as Topbar } from '../../components/basics/topbar.vue'
export { default as Dashcards } from '../../components/objects/dashcards.vue'
export { default as Productcards } from '../../components/objects/productcards.vue'

export const LazySidebar = import('../../components/basics/sidebar.vue' /* webpackChunkName: "components/basics/sidebar" */).then(c => c.default || c)
export const LazyTopbar = import('../../components/basics/topbar.vue' /* webpackChunkName: "components/basics/topbar" */).then(c => c.default || c)
export const LazyDashcards = import('../../components/objects/dashcards.vue' /* webpackChunkName: "components/objects/dashcards" */).then(c => c.default || c)
export const LazyProductcards = import('../../components/objects/productcards.vue' /* webpackChunkName: "components/objects/productcards" */).then(c => c.default || c)
