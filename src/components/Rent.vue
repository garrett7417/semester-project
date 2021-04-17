<template>
  <div id="rentalDetails">
    <h1>Rental Details</h1>
    <!-- <label>Group Size: </label><input type="number" max="15" placeholder="Enter number of adults" />
    <input type="number" max="15" placeholder="Enter number of children" /><br> -->
    <h3>Choose the boat(s) you want</h3><br>
    <button @click="homeRedirect()">Return Home</button>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component
export default class Rent extends Vue{
  //redirects to home page
  homeRedirect(){
    console.log("homeRedirect button clicked")
    this.$router.push({ path: "/home" })
  }
}

</script>

<style>
    #rentailDetails{
        color: white;
    }
    label{
        font-size: 20px;
        color: white;
    }
</style>