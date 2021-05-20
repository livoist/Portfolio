import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faMedium, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

// use fontawesome
library.add(faGithub, faMedium, faInstagram, faLinkedin)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
