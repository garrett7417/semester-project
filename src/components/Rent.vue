<template>
  <div id="rentalDetails">
    <button class="navBtn" @click="homeRedirect()">Return Home</button>
    <button class="navBtn" @click="userInfoRedirect()">Account Information</button>
    <button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button>
    <h1>Rental Details</h1>
    <!-- <label>Group Size: </label><input type="number" max="15" placeholder="Enter number of adults" />
    <input type="number" max="15" placeholder="Enter number of children" /><br> -->
    
    <div class="userInputs">
      <label>Choose the boat you want: </label><select v-model="boatName" v-if="isAvailable" class="right">
          <option v-for="(c,pos) in allBoats" :value="c.name" :key="pos"> {{c.name}}</option>
      </select>
      <label>Group Size: </label><input type="number" placeholder="Number of adults" class="right">

      <label>Rental Duration: </label><select class="right">
        <option></option>
        <option>4 Hours</option>
        <option>8 Hours</option>
      </select>
    </div>
    <footer>
        <button @click="confirm()">Confirm</button>
    </footer>
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
    private isAvailable = true;

    //Pulls the boat names from the Firebase collection
    mounted(): void{
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
        this.$appDB
            .collection(`WaterCrafts`)
            .orderBy("name")
            .onSnapshot ((qs: QuerySnapshot) =>{
                this.allBoats.splice(0);
                qs.forEach((qds: QueryDocumentSnapshot) => {
                    if(qds.exists && this.isAvailable){
                        const boatName = qds.data();
                        this.allBoats.push({                           
                            name: boatName.name
                        })
                    }
                })
            })
    }

    homeRedirect(){
    console.log("homeRedirect button clicked")
    this.$router.push({ path: "/home" })
  }

  confirm(){
      this.$router.push({ path: "/rentalconfirmation"})
      this.isAvailable = false;
  }

  //redirects to user info page
  userInfoRedirect(){
    console.log("userInfoRedirect button clicked")
    this.$router.push({ path: "/accountinfo" })
  }

  managementRedirect(){
    this.$router.push({ path: "/management" })
  }

  isAdmin(): boolean{
    return this.$appAuth.currentUser?.uid === "uqdLaprxbDM4tLTXjeSbAxnodDb2"; 
  }
}
</script>

<style>
  .right{
    float: right;
    margin-right: 10px;
  }
  label{
    text-align: right;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .userInputs{
    border-radius: 25px;
    border: 5px solid #0982a0;
    background: rgb(179, 178, 178);
    display: inline-block;
    width: 500px;
  }
  footer{
    position: absolute;
    bottom: 0;
  }
    #rentailDetails{
        color: white;
    }

</style>