let Vue

class VueRouter {
  constructor(options) {
    this.$options = options
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
      return h('div', '我是router-view')
    },
  })
}

export default VueRouter
