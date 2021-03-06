import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store';
import router from './router'
import freeText from './components/FormBlocks/FreeText.vue'
import higherThan from './components/AlertBlocks/HigherThan.vue'
import comboBox from './components/FormBlocks/ComboBox.vue'
import rating from './components/FormBlocks/Rating.vue'
import numberInput from './components/FormBlocks/NumberInput.vue'
import {VueFormBuilderPlugin} from 'v-form-builder'
import 'v-form-builder/dist/v-form-builder.css' //load CSS from your App
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import UUID from "vue-uuid";


library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.use(UUID);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('FreeText', freeText);
Vue.component('ComboBox', comboBox);
Vue.component('HigherThan', higherThan);
Vue.component('NumberInput', numberInput);
Vue.component('Rating', rating);
Vue.config.productionTip = false
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormBuilderPlugin)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')



