let Vue

class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = window.location.hash.slice(1) || '/'
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) Vue.prototype.$router = this.$options.router
    },
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to,
          },
        },
        this.$slots.default
      )
    },
  })
  Vue.component('router-view', {
    render(h) {
      let component = null
      const route = this.$router.$options.routes.filter(route => route.path === this.$router.current)[0]
      if (route) component = route.component
      return h(component)
    },
  })
}

export default VueRouter
