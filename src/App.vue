<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {FirebaseFirestore} from "@firebase/firestore-types"
import{ FirebaseAuth } from "@firebase/auth-types";
import Login from './components/Login.vue';
import HomePage from './components/HomePage.vue';
import Rent from './components/Rent.vue';
import RentalConfirmation from './components/RentalConfirmation.vue';
import BoatManagement from './components/BoatManagement.vue';
import AccountInfo from './components/AccountInfo.vue';

@Component({
  components: {
    Login, HomePage, Rent, RentalConfirmation, BoatManagement, AccountInfo
  }
})

export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;

  //logout of web app
  readonly $appAuth!: FirebaseAuth;
  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }
  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.push({path: "/"});
  }
  
  mounted(): void {
    console.log("API Key", this.$appDB.app.options_.apiKey);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}

h1 {
  display: block;
}
/* Button styling */
    button{
        border: 0;
        background: none;
        display: inline;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #ffffff;
        padding: 14px 40px;
        margin-left: 10px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        cursor: pointer;
    } 
     
    button:hover{
        background: #00ccff;
    }

    .navBtn, #logOutBtn{
      float: right;
      display: block;
    } 
</style>
