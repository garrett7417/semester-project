import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth";
import { AppRouter } from "./app-routing";


const firebaseConfig = {
  apiKey: "AIzaSyAu0njIiLnx1Jho8u61dSi9Yc-anflNx4E",
    authDomain: "semesterproject-587dd.firebaseapp.com",
    projectId: "semesterproject-587dd",
    storageBucket: "semesterproject-587dd.appspot.com",
    messagingSenderId: "672861740990",
    appId: "1:672861740990:web:17f21a9e0f05f3f85f63ef"
}
firebase.initializeApp(firebaseConfig);
Vue.prototype.$appDB = firebase.firestore();
Vue.prototype.$appAuth = firebase.auth();

Vue.config.productionTip = false

new Vue({
  router: AppRouter,
  render: h => h(App),
}).$mount('#app')