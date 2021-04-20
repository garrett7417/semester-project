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
                <li><button class="navBtn" @click="rentNowRedirect()">Rent Now</button></li>
                <li><button class="navBtn" @click="homeRedirect()">Home</button></li>
                <li><button class="navBtn" v-if="isAdmin()" @click="managementRedirect()">Management</button></li>
                <li><button id="logOutBtn" v-if="userLoggedIn()" @click="doLogout">Logout</button></li>
              </ul>
            </nav>
            <div class="menu-toggle"><i class="fa fa-bars" aria-hidden="true"></i></div>
        </header>
      </div>

        <h1 id="header1">Account Information</h1><br>
        <table>
          <thead>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Date of birth</th>
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

        <div id="saveUserInfoDiv">
          <h2>Update User Info</h2>
          <label for="firstName" class="label">First name:</label>
          <input id="firstName" class="textInput" type="text" placeholder="First name" v-model="firstName"><br>

          <label for="lastName" class="label">Last name:</label>
          <input id="lastName" class="textInput" type="text" placeholder="Last name" v-model="lastName"><br>

          <label for="phone" class="label">Phone:</label>
          <input id="phone" class="textInput" type="text" placeholder="(XXX) XXX-XXXX" v-model="phoneNumber"><br>

          <label for="dob" class="label">Date of birth:</label>
          <input id="dob" class="textInput" type="date"  v-model="dob"><br>
          <button id="saveBtn" v-on:click="saveUserInfo" type="submit">Save</button>
        </div>
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
    private dob = "";
    private userInfoArray: any[] = [];

    //Saves user info
    saveUserInfo(): void {
      console.log("save user info button clicked");
      console.log("this is the user id", this.uid)
      this.$appDB
        .collection(`users`)
        .doc(`${this.uid}`)
        .set({ firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phoneNumber, dob: this.dob });
        this.userInfoArray = [this.firstName, this.lastName, this.phoneNumber, this.dob]
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
          console.log("active user dob: ", details.dob);
          this.userInfoArray = [details.firstName, details.lastName, details.phoneNumber, details.dob]
          console.log("userInforArray values: ", this.userInfoArray);
        }
      })
    }

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

  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }
  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.push({path: "/"});
  }

  //checks if the current user is admin, used to show management button
  isAdmin(): boolean{
    return this.$appAuth.currentUser?.uid === "uqdLaprxbDM4tLTXjeSbAxnodDb2"; 
  }
}
</script>

<style>
/* Save btn style */
#saveBtn{
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
}

/* div styles for input fields and labels*/
#saveUserInfoDiv{
  border-radius: 25px;
  border: 5px solid #00ccff;
  background: #101010;
  display: inline-block;
}

/* input field style */
.textInput{
  float: right;
  text-align: left;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}

/*label styles */
.label{
  float: left;
  text-align: right;
  margin-top: 10px;
  font-size: 18px;
  margin-right: 10px;
  margin-left: 10px;
  color: white;
}

h2{
  color: white;
}
</style>