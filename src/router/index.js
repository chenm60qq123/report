import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => (require(["@/components/HelloWorld"], resolve))
    },
    {
      path: '/2',
      name: 'HelloWorld2',
      component: resolve => (require(["@/components/HelloWorld2"], resolve))
    },
    {
      path: '/view',
      name: 'view',
      component: resolve => (require(["@/views/window-view"], resolve))
    },
    {
      path: '/edit-view',
      name: 'edit-view',
      component: resolve => (require(["@/views/edit-view"], resolve))
    }
  ]
})
