<template>
  <div id="rentalDetails">
    <div class="navBtns">
      <button class="navBtn" @click="homeRedirect()">Return Home</button>
      <button class="navBtn" @click="rentNowRedirect()">Rent Now</button>
      <button class="navBtn" @click="userInfoRedirect()">Account Information</button>
    </div>
    <h1>Rental Confirmation</h1>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from 'node_modules/@firebase/firestore-types';

@Component
export default class RentalConfirmation extends Vue{
  //redirects user home
  homeRedirect(){
    console.log("homeRedirect button clicked")
    this.$router.push({ path: "/home" })
  }

  //redirects to user info page
  userInfoRedirect(){
    console.log("userInfoRedirect button clicked")
    this.$router.push({ path: "/accountinfo" })
  }

  //redirects to rent now page
  rentNowRedirect(){
    console.log("rentNowRedirect button clicked")
    this.$router.push({ path: "/rent" })
  }
}

</script>

<style>

</style>