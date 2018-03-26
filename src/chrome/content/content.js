import Vue from 'vue'
import VocabularyMachine from '@/utils/vocabulary'
import { _removeTag } from '@/utils'

import '@/styles/index_translator.scss'

// 组件注册
const componentsContext = require.context('@/components', true, /.vue$/)
componentsContext.keys().forEach(path => {
  const component = componentsContext(path).default
  Vue.component(component.name, component)
})

Vue.use({
  install: Vue => {
    Vue.filter('removeTag', _removeTag)
    Vue.prototype.$vocabulary = VocabularyMachine
  }
})

const initTranslator = _ => {
  const div = document.createElement('div')
  div.id = '__tr-container__'

  document.body.appendChild(div)

  new Vue({
    el: '#__tr-container__',
    data() {
      return {
        inExtension: false
      }
    },
    template: '<translator/>'
  })

  Vue.config.devtools = false
  Vue.config.slient = true
  Vue.config.productionTip = false
}

document.addEventListener('DOMContentLoaded', initTranslator)

export default initTranslator
