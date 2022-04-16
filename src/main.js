import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localazeFilter from "@/filters/localize.filter";
import Vuelidate from "vuelidate";
import tooltipDirective from './directives/tooltip.directive';
Vue.config.productionTip = false;
import messagePlugin from "./utils/message.plugin";
import Loader from './components/app/Loader.vue'
import "firebase/auth";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database"
import Paginate from 'vuejs-paginate'
import {fbconfig} from './fbconfig'
import VueMeta from 'vue-meta'
Vue.component('paginate', Paginate)
Vue.filter("date", dateFilter);
Vue.filter("localize", localazeFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(VueMeta)
Vue.component('Loader', Loader)
Vue.directive('tooltip', tooltipDirective)


initializeApp(fbconfig)
let app 

export const auth = getAuth()
export const database = getDatabase()

onAuthStateChanged(auth, () => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})

