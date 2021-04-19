<template>
  <div id="rentalDetails">
    <div class="navBtns">
      <button class="navBtn" @click="homeRedirect()">Return Home</button>
      <button class="navBtn" @click="rentNowRedirect()">Rent Now</button>
      <button class="navBtn" @click="userInfoRedirect()">Account Information</button>
      <button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button>
    </div>
    
    <div class="indented">
      <div>
        <h1>Rental Confirmation</h1>
      </div>
      <div>
        Thank you for choosing Sunshine Water Sports to host your boating adventure. Come on down to the marina today
        at 13114 S. Marina DR. and we will send you out as fast as possible. Once you are here we will 
        get your payment information and give a short presentation on how to operate your boat. 
        Your rental time will not start until the presentation is over and you are beginning
        your adventure. Once your rental time is up, head on back to the marina and press the "Return Boat" button to confirm the boat is back
        at the shop. If you have any questions please call us at (111)222-3333, and thank you for choosing us!
      </div>
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
  private availableBoats: boatData[] = [];

  mounted(): void {
    this.$appDB
      .collection(`WaterCrafts`)
      .orderBy("name")
      .onSnapshot((qs: QuerySnapshot) => {
        this.allBoats.splice(0);
        this.availableBoats.splice(0);
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const boatName: boatData = qds.data() as boatData;
            this.allBoats.push({
              ...boatName
            });
          }
        });
        this.availableBoats = this.allBoats.filter((b: boatData) => b.isAvailable)    
      });
  }

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
}

</script>

<style>
.indented{
  padding-left: 50pt;
  padding-right: 50pt;
  width: 20%;
  position: fixed;
  overflow-x: hidden;
  margin-left: 280px;
  text-align: left;
  border-radius: 25px;
  border: 5px solid #0982a0;
  background: rgb(179, 178, 178);
  width: 320px;
}
.returnBtn{
  border: 0;
    background: white;
    display: inline;
    margin: 10px auto;
    text-align: center;
    border: 2px solid #0982a0;
    padding: 15px 50px;
    margin-right: 10px;
    outline: none;
    color: black;
    transition: 0.25s;
    border-radius: 10px;
    cursor: pointer;
    float: right;
}
</style>