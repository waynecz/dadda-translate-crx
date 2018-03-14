import Vue from 'vue'
import App from './App-popup'

Vue.config.devtools = false
Vue.config.slient = true
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
