import Vue from 'vue'
import App from './App.vue'
import router from './router'
import freeText from './components/FreeText.vue'

Vue.component('FreeText', freeText);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')