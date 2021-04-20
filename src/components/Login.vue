<template>
    <div id="topLogin">
        <div class="box">
            <h1>Login</h1>
            <input type="text" placeholder="Email" v-model="userEmail"  @keyup.enter="authenticate">
            <input type="password" placeholder="Password" v-model="userPassword" @keyup.enter="authenticate">
            <button id="loginBtn" v-on:click="authenticate" type="submit">Login</button>
            <button id="signupBtn" v-on:click="createAccount" type="submit">Sign Up</button>
        </div>
        <div>{{message}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
    
@Component
export default class Login extends Vue {
    readonly $appAuth!: FirebaseAuth;
    private uid = "none";
    private message = "";
    private userEmail = "";
    private userPassword = "";

    //Checks to see if either the email or password are empty and returns true or false
    get noInput(): boolean{
        if(this.userEmail.length === 0 || this.userPassword.length === 0){
            return true;
        }
        return false;
    }

    //Creates a new account
    createAccount(): void {
        this.$appAuth
            .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
            .then((u: UserCredential) => {
                this.showMessage(`User create UID ${u.user?.uid}`);
                this.$router.push({ path: "/home" })
            })
            .catch((err: any) => {
                this.showMessage(`Unable to create account ${err}`);
                console.log("hi")
            });
            console.log("hi")
    }

    //Checks if the email and password are registered and logins if so
    authenticate(): void{
        this.$appAuth
            .signInWithEmailAndPassword(this.userEmail, this.userPassword)
            .then((u: UserCredential) => {
                this.showMessage(`Login successful UID ${u.user?.uid}`);
                this.$router.push({ path: "/home" })
            })
            .catch((err: any) => {
                this.showMessage(`Unable to login ${err}`);
            });
    }

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
    .hidden{
        display: none;
    }
</style>