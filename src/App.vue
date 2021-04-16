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

@Component({
  components: {
    Login, HomePage
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;

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
</style>
