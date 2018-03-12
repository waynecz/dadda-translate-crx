import Vue from 'vue'
import App from './App-content'
import '@/styles/index.scss'

const componentsContext = require.context('@/components', true, /.vue$/)
componentsContext.keys().forEach(path => {
  const component = componentsContext(path).default
  Vue.component(component.name, component)
})

Vue.filter('replaceTag', str => str.replace(/<.*>(.*)<.*>/g, '$1'))

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
