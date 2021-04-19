<template>
  <div id="rentalDetails">
    <div class="navBtns">
      <button class="navBtn" @click="homeRedirect()">Return Home</button>
      <button class="navBtn" @click="rentNowRedirect()">Rent Now</button>
      <button class="navBtn" @click="userInfoRedirect()">Account Information</button>
      <button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button>
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
  readonly $appAuth!: FirebaseAuth;
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

  //redirects to management page
  managementRedirect(){
    this.$router.push({ path: "/management" })
  }

  //checks if the current user is admin, used to show management button
  isAdmin(): boolean{
    return this.$appAuth.currentUser?.uid === "uqdLaprxbDM4tLTXjeSbAxnodDb2"; 
  }
}

</script>

<style>

</style>