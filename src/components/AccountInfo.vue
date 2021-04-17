<template>
    <div id="topContainer">
        <div class="box">
            <h1>Account Information</h1>
            <input type="text" placeholder="First name" v-model="firstName">
            <input type="text" placeholder="Last name" v-model="lastName">
            <input type="text" placeholder="(XXX) XXX-XXXX" v-model="phoneNumber">
            <input type="text" placeholder="email@domain.com" v-model="email">
            <button id="saveBtn" v-on:click="saveUserInfo" type="submit">Save</button>
        </div>
        <div>{{message}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FirebaseFirestore, QuerySnapshot, QueryDocumentSnapshot } from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
    
@Component
export default class Login extends Vue {
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
    this.$appDB
      .collection(`users/${this.uid}/userInfo`)
      .add({ firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber, email: this.email });
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
}
</script>

<style>
    /* Style for page background */
    body{
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background: #34495e;
    }
    /* Style for the main form */
    .box{
        width: 300px;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #191919;
        text-align: center;
    }
    /* Style for the the h1 element in the form */
    .box h1{
        color: white;
        text-transform: uppercase;
        font-weight: 500;
    }
    /* Style for the email and password input fields */
    .box input[type="text"],.box input[type="password"]{
        border: 0;
        background: none;
        display: block;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #d62f23;
        padding: 14px 10px;
        width: 200px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
    }
    /* Selected input styling */
    .box input[type="text"]:focus,.box input[type="password"]:focus{
        width: 280px;
        border-color: #2e80cc;    
    }
    /* Button styling */
    .box button[type = "submit"]{
        border: 0;
        background: none;
        display: inline;
        margin: 20px auto;
        text-align: center;
        border: 2px solid #ffffff;
        padding: 14px 40px;
        margin-left: 10px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
        cursor: pointer;
    }
    /* Button hover styling */
    .box button[type = "submit"]:hover{
        background: #2e80cc;
    }
</style>