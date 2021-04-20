<template>
  <div id="topContainer">
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
              <li><button class="navBtn" @click="userInfoRedirect()">Account Information</button></li>
              <li><button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button></li>
              <li><button id="logOutBtn" v-if="userLoggedIn()" @click="doLogout">Logout</button></li>
            </ul>
          </nav>
          <div class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>
      </header>
    </div>

    <div class="userInputs">
      <label>Choose the boat you want: </label>
      <select class="right" v-model="selectedBoat">
        <option v-for="(c, pos) in availableBoats" :value="c.name" :key="pos"> {{c.year}} {{ c.name }} </option>
      </select>
      <button class="confirm" @click="confirm()">Confirm</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import {FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot,} from "@firebase/firestore-types";
import { FieldValue } from "@firebase/firestore-types";

interface boatData{
  name: string;
  year: number;
  isAvailable: boolean;
}

@Component
export default class Rent extends Vue {
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  private uid = "none";

  private allBoats: boatData[] = [];
  private availableBoats: boatData[] = [];
  private selectedBoat = "";
  private isAvailable = true;

  //Pulls the boat names from the Firebase collection
  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
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
  
  homeRedirect() {
    console.log("homeRedirect button clicked");
    this.$router.push({ path: "/home" });
  }

  confirm() {
    console.log("rental confirmation button clicked");
    this.$router.push({ path: "/rentalconfirmation" });
    if(this.selectedBoat != null || this.selectedBoat != ""){
      this.$appDB
          .collection(`WaterCrafts`)
          .doc(this.selectedBoat)
          .update({ isAvailable: false });
    }
  }

  //redirects to user info page
  userInfoRedirect() {
    console.log("userInfoRedirect button clicked");
    this.$router.push({ path: "/accountinfo" });
  }

  managementRedirect() {
    this.$router.push({ path: "/management" });
  }

  isAdmin(): boolean {
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

.confirm {
  border: 0;
  background: white;
  display: inline;
  margin: 10px auto;
  text-align: center;
  border: 2px solid #00ccff;
  padding: 5px 30px;
  margin-right: 10px;
  outline: none;
  color: black;
  transition: 0.25s;
  border-radius: 10px;
  cursor: pointer;
  float: right;
  margin-top: 20px;
}
label {
  text-align: right;
  float: left;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 33px;
  margin-right: 10px;
  color: white;
}
.userInputs {
  border-radius: 25px;
  border: 5px solid #00ccff;
  background: #101010;
  display: inline-block;
  width: 500px;
}
#rentailDetails {
  color: white;
}
</style>