import Vue from 'vue'
import Popup from '@/components/vue/Popup'
import Switch from '@/components/vue/Switch'
import Storage from '@/utils/storage'
import '@/styles/index_popup.scss'

Vue.component('Switcher', Switch)

Vue.use({
  install: Vue => {
    Vue.prototype.$storage = Storage
  }
})

new Vue({
  el: '#app',
  components: {
    Popup
  },
  template: '<Popup/>'
})

Vue.config.devtools = false
Vue.config.slient = true
Vue.config.productionTip = false
