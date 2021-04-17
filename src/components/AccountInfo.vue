<template>
    <div id="testcontainer">
        <h1>Account Information</h1>
        <button @click="rentNowRedirect()">Rent Now</button>
        <button @click="homeRedirect()">Return Home</button>
        <input type="text" placeholder="First name" v-model="firstName">
        <input type="text" placeholder="Last name" v-model="lastName">
        <input type="text" placeholder="(XXX) XXX-XXXX" v-model="phoneNumber">
        <input type="text" placeholder="email@domain.com" v-model="email">
        <button id="saveBtn" v-on:click="saveUserInfo" type="submit">Save</button>
        <div>{{message}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FirebaseFirestore, QuerySnapshot, QueryDocumentSnapshot } from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
    
@Component
export default class AccountInfo extends Vue {
    readonly $appAuth!: FirebaseAuth;
    readonly $appDB!: FirebaseFirestore;
    private uid = "none";
    private message = "";
    private firstName = "";
    private lastName = "";
    private phoneNumber = "";
    private email = "";

    //Saves user info
    saveUserInfo(): void {
        console.log("save user info button clicked");
        console.log("this is the user id", this.uid)
        this.$appDB
            .collection(`users`)
            .doc(`${this.uid}`)
            .set({ firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber, email: this.email });
    }

    mounted(): void{
        console.log("Welcome to the AccountInfo page")
        this.uid = this.$appAuth.currentUser?.uid ?? "none"
    }

    /* mounted(): void {
    console.log("In mounted function")
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
      .collection(`users/${this.uid}/userInfo`)
      .orderBy("firstName") //Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allCategories.splice(0); //remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allCategories.push({
              name: catData.name,
              limit: catData.monthlyLimit,
            });
          }
        });
      });
  } */


    //Displays a message depending on the button pressed
    showMessage(m: string): void {
        this.message = m;
        setTimeout(() => {
            this.message = "";
        },  5000);
    }

    //redirects to home page
    homeRedirect(){
        console.log("homeRedirect button clicked")
        this.$router.push({ path: "/home" })
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