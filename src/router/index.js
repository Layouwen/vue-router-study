import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../components/HelloWorld.vue'),
    },
    {
      path: '/a',
      component: () => import('../components/A.vue'),
      children: [{ path: '/a/b', component: () => import('../components/B.vue') }],
    },
  ],
})
