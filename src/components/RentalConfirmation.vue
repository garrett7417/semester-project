<template>
  <div id="rentalDetails">
    <head>
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap">
      <link href=https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css>
    </head>
    <div class="navBtns">
      <header>
          <div class="logo_container"><h1>Sunshine<span>WaterSports</span></h1></div>
          <nav>
            <ul>
              <li><button class="navBtn" @click="homeRedirect()">Home</button></li>
              <li><button class="navBtn" @click="rentNowRedirect()">Rent Now</button></li>
              <li><button class="navBtn" @click="userInfoRedirect()">Account Information</button></li>
              <li><button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button></li>
              <li><button id="logOutBtn" v-if="userLoggedIn()" @click="doLogout">Logout</button></li>
            </ul>
          </nav>
          <div class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>
      </header>
    </div>
    
    <div class="headerContainer" id="marginTop">
        <h1>Rental Confirmation</h1>
    </div>

    <div class="indented">
      <div>
        Thank you for choosing Sunshine Water Sports to host your boating adventure. Come on down to the marina today
        at 13114 S. Marina DR. and we will send you out as fast as possible. Once you are here we will 
        get your payment information and give a short presentation on how to operate your boat. 
        Your rental time will not start until the presentation is over and you are beginning
        your adventure. Once your rental time is up, head on back to the marina and press the "Return Boat" button to confirm the boat is back
        at the shop. If you have any questions please call us at (111)222-3333, and thank you for choosing us!
      </div>
      <label>Select the boat you're returning</label>
      <select class="right" v-model="selectedBoat">
        <option v-for="(c, pos) in rentedBoats" :value="c.name" :key="pos"> {{c.year}} {{ c.name }} </option>
      </select>
      <button class="returnBtn"  @click="returnBoat()">RETURN BOAT</button>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from 'node_modules/@firebase/firestore-types';

interface boatData{
  name: string;
  year: number;
  isAvailable: boolean;
}

@Component
export default class RentalConfirmation extends Vue{
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  private selectedBoat = ""
  private allBoats: boatData[] = [];
  private rentedBoats: boatData[] = [];

  mounted(): void {
    this.$appDB
      .collection(`WaterCrafts`)
      .orderBy("name")
      .onSnapshot((qs: QuerySnapshot) => {
        this.allBoats.splice(0);
        this.rentedBoats.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const boatName: boatData = qds.data() as boatData;
            this.allBoats.push({
              ...boatName
            });
          }
        });
        //Pulls the boats that aren't available
        this.rentedBoats = this.allBoats.filter((b: boatData) => b.isAvailable === false)    
      });
  }
  //Sets the selected boats availability to true when called
  returnBoat() {
    if(this.selectedBoat != null && this.selectedBoat != ""){
      console.log(this.selectedBoat)
      this.$appDB
          .collection(`WaterCrafts`)
          .doc(this.selectedBoat)
          .update({ isAvailable: true });
    }
  }

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
label{
  float: left;
}
.indented{
  margin-top: 4%;
  padding-left: 50pt;
  padding-right: 50pt;
  overflow-x: hidden;
  text-align: left;
  border-radius: 25px;
  border: 5px solid #00ccff;
  background: #101010;
  width: 320px;
  display: inline-block;
  color: white;
}
.returnBtn{
  border: 0;
    background: white;
    display: inline;
    margin: 10px auto;
    text-align: center;
    border: 2px solid #00ccff;
    padding: 15px 50px;
    margin-right: 10px;
    outline: none;
    color: black;
    transition: 0.25s;
    border-radius: 10px;
    cursor: pointer;
    float: right;
}

#marginTop{
  margin-top: 6%;
}
</style>