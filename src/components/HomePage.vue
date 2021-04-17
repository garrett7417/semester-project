<template>
  <div id="topCotainer">
    <h1>Welcome to Sunshine Water Sports</h1>
    <p>Your boating adventure starts here!</p>
    <button @click="rentNowRedirect()">Rent Now</button>
    <button @click="userInfoRedirect()">Account Information</button>
    <div class="gallary" align="center">
      <h3>Boat Gallary</h3>
      <div class="thumbnails">
        <!-- Powerboat Images -->
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Malibu Wakesetter.jpg" alt="2021 Malibu Wakesetter">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/MasterCraft x26.jpeg" alt="2021 MasterCraft X26">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Supra.jpg" alt="2021 Supra">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2020 Pavati AL26.jpg" alt="2020 Pavati AL26">
        <!-- Pontoon Images -->
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2018 Manitou Pontoon.jpg" alt="2018 Manitou Pontoon">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2020 Bennington Pontoon.jpg" alt="2020 Bennington Pontoon">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Manitou Tri-toon.jpg" alt="2021 Manitou Tri-toon">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2019 Bennington Tri-toon.jpg" alt="2019 Bennington Tri-toon">
        <!-- Waverunner Images -->
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Seadoo Spark Trixx.jpg" alt="2021 Seadoo Spark Trixx">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Seadoo Spark.jpg" alt="2020 Seadoo Spark">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Yamaha Waverunner1.jpg" alt="2021 Yamaha Waverunner">
        <img onmouseover="getElementById('preview').src=this.src" src="../assets/2021 Yama Waverunner2.jpg" alt="2021 Yamaha Waverunner">

      </div>
      <div class="preview" align="center">
        <img id="preview" src="../assets/2021 Malibu Wakesetter.jpg" alt="2021 Malibu Wakesetter">
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

  //redirects to user info page
  userInfoRedirect(){
    console.log("userInfoRedirect button clicked")
    this.$router.push({ path: "/accountinfo" })
  }

}

</script>

<style>
  #topContainer{
    background: #222;
    margin: 0;
  }
  .thumbnails img{
    height: 80px;
    border: 4px solid #555;
    padding: 1px;
    margin: 0 10px 10px 0;
  }
  .thumbnails img:hover{
    border: 4px solid #00ccff;
    cursor: pointer;
  }
  .preview img{
    border: 4px solid #444;
    padding: 1px;
    width: 800px;
  }

</style>
