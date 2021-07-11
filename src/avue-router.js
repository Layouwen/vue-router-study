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
}

export default VueRouter
