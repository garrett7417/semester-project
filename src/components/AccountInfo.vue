<template>
    <div id="testcontainer">
        <button class="navBtn" @click="homeRedirect()">Return Home</button>
        <button class="navBtn" @click="rentNowRedirect()">Rent Now</button>
        <button class="navBtn" @click="managementRedirect()">Management</button>
        <h1>Account Information</h1><br>
        <table>
          <thead>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
          </thead>
            <tr>
              <td>{{ userInfoArray[0]}}</td>
              <td>{{ userInfoArray[1]}}</td>
              <td>{{ userInfoArray[2]}}</td>
              <td>{{ userInfoArray[3]}}</td>
            </tr>
          <tbody>
          </tbody>
        </table>

        <section class="inputSection">
          <label for="firstName">First name</label>
          <input id="firstName" class="textInput" type="text" placeholder="First name" v-model="firstName">

          <label for="lastName">Last name</label>
          <input id="lastName" class="textInput" type="text" placeholder="Last name" v-model="lastName">

          <label for="phone">Phone</label>
          <input id="phone" class="textInput" type="text" placeholder="(XXX) XXX-XXXX" v-model="phoneNumber">

          <label for="email">Email</label>
          <input id="email" class="textInput" type="text" placeholder="email@domain.com" v-model="email">
          <button id="saveBtn" v-on:click="saveUserInfo" type="submit">Save</button>
        </section>
        <div>{{message}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FirebaseFirestore, QuerySnapshot, QueryDocumentSnapshot, DocumentReference, DocumentSnapshot } from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import firebase from "firebase/app";
    
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
    private userInfoArray: any[] = [];

    //Saves user info
    saveUserInfo(): void {
      console.log("save user info button clicked");
      console.log("this is the user id", this.uid)
      this.$appDB
        .collection(`users`)
        .doc(`${this.uid}`)
        .set({ firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber, email: this.email });
        this.userInfoArray = [this.firstName, this.lastName, this.phoneNumber, this.email]
    }

    mounted(): void{
      //sets uid to current user
      this.uid = this.$appAuth.currentUser?.uid ?? "none"
      
      //pulls user data from a firebase doc
      const root = firebase.firestore();      
      const activeUser : DocumentReference = root.doc(`users/${this.uid}`);
      activeUser.get().then((myDoc: DocumentSnapshot) => {
        if (myDoc.exists) {
          const details = myDoc.data()!;
          console.log("active user first name: ", details.firstName);
          console.log("active user last name: ", details.lastName);
          console.log("active user phone number: ", details.phoneNumber);
          console.log("active user email: ", details.email);
          this.userInfoArray = [details.firstName, details.lastName, details.phoneNumber, details.email]
          console.log("userInforArray values: ", this.userInfoArray);
        }
      })
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

    managementRedirect(){
    this.$router.push({ path: "/management" })
  }
}
</script>

<style>
.inputSection {
  margin: 5em auto;
  width: 22em;
  /* border: red 3px solid; */
  border-radius: 1em;
  /* overflow: hidden; */
 
}

.inputSection label {
  text-align: right;
  float: left;
  
  width: 100px;
  /* border: blue 2px solid; */
  margin-top: 1em;
}

.inputSection input {
  text-align: left;
  padding-top: .75em;
  width: 200px;
  margin-top: 1em;
  /* border: green 2px solid; */
}
</style>