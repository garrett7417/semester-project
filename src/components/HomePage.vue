<template>
  <div id="topCotainer">
    <h1>Welcome to Sunshine Water Sports</h1>
    <p>Your boating adventure starts here!</p>
    <button @click="rentNowRedirect()">Rent Now</button>
    <div class="gallary" align="center">
      <h3>Boat Gallary</h3>
      <div class="thumbnails">
        <img name ="2021 Malibu Wakesetter" 
        src="../assets/2021 Malibu Wakesetter.jpg" alt="2021 Malibu Wakesetter">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component
export default class Home extends Vue{
  //redirects to rent now page
  rentNowRedirect(){
    console.log("rentNowRedirect button clicked")
    this.$router.push({ path: "/rent" })
  }

}

</script>

<style>

</style>
