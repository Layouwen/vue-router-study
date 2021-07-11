let Vue

class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matchList', [])
    addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1) || '/'
      this.matchList = []
      this.match(options.routes)
    })
    this.match(options.routes)
  }
  match(routes) {
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matchList.push(route)
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matchList.push(route)
      }
      if (route.children) this.match(route.children)
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
      let depth = 0
      this.$data.routerView = true
      let parent = this.$parent
      while (parent) {
        if (parent.$data && parent.$data.routerView) {
          console.log(parent)
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
