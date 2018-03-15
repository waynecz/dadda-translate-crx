import Vue from 'vue'
import App from './App-content'
import StorageConstructor from '@/utils/storage'
import { _removeTag } from '@/utils'
import '@/styles/index.scss'

// 组件注册
const componentsContext = require.context('@/components', true, /.vue$/)
componentsContext.keys().forEach(path => {
  const component = componentsContext(path).default
  Vue.component(component.name, component)
})

Vue.use({
  install: async Vue => {
    Vue.filter('removeTag', _removeTag)
    Vue.prototype.$storage = await StorageConstructor()
  }
})

document.addEventListener('DOMContentLoaded', _ => {
  const div = document.createElement('div')
  div.id = '__tr-container__'

  document.body.appendChild(div)

  new Vue({
    el: '#__tr-container__',
    components: { App },
    template: '<App/>'
  })

  Vue.config.devtools = false
  Vue.config.slient = true
  Vue.config.productionTip = false
})
