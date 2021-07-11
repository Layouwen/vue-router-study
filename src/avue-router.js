let Vue

class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matchList', [])
    addEventListener('hashchange', this.onHashChange.bind(this))
    addEventListener('load', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.current = window.location.hash.slice(1) || '/'
    this.matchList = []
    this.match()
  }
  match(routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matchList.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matchList.push(route)
        if (route.children) this.match(route.children)
        return
      }
    }
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
      this.$data.routerView = true
      let parent = this.$parent
      let depth = 0
      while (parent) {
        const vnodeData = parent.$data
        if (vnodeData && vnodeData.routerView) {
          depth++
        }
        parent = parent.$parent
      }
      let component = null
      const route = this.$router.matchList[depth]
      if (route) component = route.component
      return h(component)
    },
  })
}

export default VueRouter
