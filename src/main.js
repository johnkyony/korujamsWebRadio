import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {library } from '@fortawesome/fontawesome-svg-core'
import {faHeart , 
faPlay ,faComment , 
faUsers ,
faPlayCircle , 
faStopCircle , 
faStop , faPause, faGlobe} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(
  faHeart,
  faPlay,
  faComment,
  faUsers,
 
  faGlobe,
  faPlayCircle,
  faStopCircle, 
  faPause, 
  faStop
)
import './assets/scss/bootstrap.css'
Vue.component('font-awesome-icon' , FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
