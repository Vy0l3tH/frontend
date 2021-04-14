import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import freeText from './components/FreeText.vue'
import {VueFormBuilderPlugin} from 'v-form-builder'
import 'v-form-builder/dist/v-form-builder.css' //load CSS from your App
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('FreeText', freeText);
Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormBuilderPlugin)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



