<template>
  <div id="rentalDetails">
    <h1>Rental Details</h1>
    <!-- <label>Group Size: </label><input type="number" max="15" placeholder="Enter number of adults" />
    <input type="number" max="15" placeholder="Enter number of children" /><br> -->
    <h3>Choose the boat(s) you want</h3><br>
    <select v-model="boatName">
        <option v-for="(c,pos) in allBoats" :value="c.name" :key="pos"> {{c.name}}</option>
    </select>
    <button @click="homeRedirect()">Return Home</button>
    <button @click="userInfoRedirect()">Account Information</button>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from 'node_modules/@firebase/firestore-types';

@Component
export default class Rent extends Vue{
    readonly $appAuth!: FirebaseAuth;
    readonly $appDB!: FirebaseFirestore;
    private uid = "none";
    private boatName = "";
    private allBoats: any[] = [];

    //Pulls the boat names from the Firebase collection
    mounted(): void{
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
        this.$appDB
            .collection(`WaterCrafts`)
            .orderBy("name")
            .onSnapshot ((qs: QuerySnapshot) =>{
                this.allBoats.splice(0);
                qs.forEach((qds: QueryDocumentSnapshot) => {
                    if(qds.exists){
                        const boatName = qds.data();
                        this.allBoats.push({
                            name: boatName.name
                        })
                    }
                })
            })
    }
  
  //redirects to home page
  homeRedirect(){
    console.log("homeRedirect button clicked")
    this.$router.push({ path: "/home" })
  }

  //redirects to user info page
  userInfoRedirect(){
    console.log("userInfoRedirect button clicked")
    this.$router.push({ path: "/accountinfo" })
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