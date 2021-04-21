<template>
  <div id="topCotainer">
    <head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap">
      <link href=https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css>
    </head>
    <div class="navBtns">
      <header>
          <div class="logo_container"><h1>Sunshine<span>WaterSports</span></h1></div>
          <nav>
            <ul>
              <li><button class="navBtn" @click="rentNowRedirect()">Rent Now</button></li>
              <li><button class="navBtn" @click="userInfoRedirect()">Account Information</button></li>
              <li><button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button></li>
              <li><button class="navBtn" @click="rentalReturnRedirect()">Return Rental</button></li>
              <li><button id="logOutBtn" v-if="userLoggedIn()" @click="doLogout">Logout</button></li>
            </ul>
          </nav>
          <div class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>
      </header>
    </div>
    <div class="backgroundImg" style="background-image: url('../assets/mapOfLake2.jpg');">
      <div class="gallary" align="center">
        <p>Your boating adventure starts here!</p>
        <div class="headerContainer">
        <h1>Boat Gallery</h1>
        </div>
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
      </div> <!--background image div-->
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
  readonly $appAuth!: FirebaseAuth;
  rentNowRedirect(){
    console.log("rentNowRedirect button clicked")
    this.$router.push({ path: "/rent" })
  }

  //redirects to user info page
  userInfoRedirect(){
    console.log("userInfoRedirect button clicked")
    this.$router.push({ path: "/accountinfo" })
  }

  managementRedirect(){
    console.log("management redirect")
    this.$router.push({ path: "/management" })
  }

  isAdmin(): boolean{
    return this.$appAuth.currentUser?.uid === "uqdLaprxbDM4tLTXjeSbAxnodDb2"; 
  }

  rentalReturnRedirect(){
    this.$router.push({ path: "/rentalconfirmation" })
  }

  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }
  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.push({path: "/"});
  }
}

</script>

<style>
  .navBtns{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #eff1f5;
  }
  /* Header Styles */
  header{
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 100px;
    background-color: #101010;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 3px solid #00ccff;
  }

  /* Logo Styles */
  .logo_container{
    height: 100%;
    display: table;
    float: left;
  }
  .logo_container h1{
    color: white;
    height: 50px;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 200;
    margin-top: 20px;
  }
  .logo_container h1 span{
    font-weight: 800;
    color: #00ccff;
  }
  /* Nav Button Styles */
  header nav{
    float: right;
  }
  header nav ul{
    margin: 0;
    padding: 0;
    display: flex;
  }
  header nav ul li{
    list-style: none;
  }
  header nav ul li button{
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    color: white;
    text-decoration: none;
    display: block;
  }
  header nav ul li button:hover,
  header nav ul li button:active{
    color: white;
    font-style: italic;
    background: #00ccff;
  }
  .menu-toggle{
    
    float: right;
    line-height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
  }
  button{
    background: #101010;
  }

  #topContainer{
    margin: 0;
    max-width: 100%;
    padding: 70px 0 20px;
    width: 100%;
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
  h1{
    margin-top: 50px;
  }
</style>
