import Vue from 'vue'
import StorageConstructor from '@/utils/storage'
import { _removeTag } from '@/utils'

import '@/styles/index_content.scss'

// 组件注册
const componentsContext = require.context('@/components', true, /.vue$/)
componentsContext.keys().forEach(path => {
  const component = componentsContext(path).default
  Vue.component(component.name, component)
})

Vue.use({
  install: Vue => {
    Vue.filter('removeTag', _removeTag)
    Vue.prototype.$storage = new StorageConstructor()
  }
})

document.addEventListener('DOMContentLoaded', _ => {
  const div = document.createElement('div')
  div.id = '__tr-container__'

  document.body.appendChild(div)

  new Vue({
    el: '#__tr-container__',
    template: '<app/>'
  })

  Vue.config.devtools = false
  Vue.config.slient = true
  Vue.config.productionTip = false
})
