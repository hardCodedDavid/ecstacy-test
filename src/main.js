import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

import vco from "v-click-outside"
import VueApexCharts from 'vue-apexcharts'
import VueSweetalert2 from 'vue-sweetalert2';
import VueSlideBar from 'vue-slide-bar'
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import store from '@/state/store' 

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import moment from 'moment';
import VueToastr from "vue-toastr";
import ToggleButton from 'vue-js-toggle-button'


import App from './App.vue'
// As a plugin
// import VueMask from 'v-mask'
Vue.config.productionTip = false

// import * as VueGoogleMaps from "vue2-google-maps";
import Lightbox from 'vue-easy-lightbox'
 
Vue.use(Lightbox)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
//     libraries: "places"
//   },
//   installComponents: true
// });

import { initFirebaseBackend } from './helpers/firebase/authUtils';

import { configureFakeBackend } from './helpers/fakebackend/fake-backend';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
  configureFakeBackend();
}

// import '@/assets/scss/app.scss'
 
Vue.component('VueSlideBar', VueSlideBar) 

Vue.use(VueAxios, axios)
Vue.use(VueCookies, { expire: '1d'})
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD MMMM, YYYY h:mma')
  }
});

Vue.filter('formatDay', function(value) {
  if (value) {
      return moment(String(value)).format('DD MMMM, YYYY')
  }
});
Vue.component("vue-toastr", VueToastr);
Vue.use(ToggleButton);


var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);


Vue.use(BootstrapVue)
Vue.use(vco)
Vue.component('apexchart', VueApexCharts)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);

Vue.use(require("vue-chartist"));
// Vue.use(VueMask);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
