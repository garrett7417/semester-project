<template>
  <div id="management">
    <button class="navBtn" @click="homeRedirect()">Return Home</button>
    <button class="navBtn" @click="rentNowRedirect()">Rent Now</button>
    <button class="navBtn" @click="userInfoRedirect()">Account Information</button>
    <h1 id="header1">Boat Management</h1>
    <div id="addBoat">
        <h2>Add a New Boat</h2>
        <label class="label">Name: </label><input type="text" class="txtBox" v-model="name" placeholder="Boat Name"><br>
        <label class="label">Make: </label><input type="text" class="txtBox" v-model="make" placeholder="Manufacturer Name"><br>
        <label class="label">Model: </label><input type="text" class="txtBox" v-model="model" placeholder="Boat Model"><br>
        <label class="label">Year: </label><input type="number" class="txtBox" v-model="year" placeholder="Year Created"><br>
        <label class="label">Capacity: </label><input type="number" class="txtBox" v-model="capacity" placeholder="Maximum Riders"><br>
        <label class="label">Availability: </label><input type="boolean" class="txtBox" v-model="availability" placeholder="Is the boat available"><br>
        <button id="add" @click="addBoat()">Add</button>
    </div>

    <div id="removeBoat">
        <h2>Remove a Boat</h2>
        <select id="boats" v-model="docName">
            <option v-for="(c,pos) in allBoatData" :value="c.docName" :key="pos"> {{c.docName}}</option>
        </select>
        <button id="remove" @click="removeBoat()">Remove</button>
    </div>

    <h2>Our Current Boats</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Capacity</th>
        </tr>
        <tr v-for="(z,pos) in allBoatData" :key="pos">
            <td id="left">{{z.name}}</td>
            <td id="left">{{z.make}}</td>
            <td id="left">{{z.model}}</td>
            <td id="right">{{z.year}}</td>
            <td id="right">{{z.capacity}}</td>
        </tr>
    </table>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from 'node_modules/@firebase/firestore-types';

@Component
export default class BoatManagement extends Vue{
    readonly $appDB!: FirebaseFirestore;
    private name = "";
    private make = "";
    private model = "";
    private year = "";
    private capacity = "";
    private docName = "";
    private availability = true;
    private allBoatData: any[] = [];

    mounted(): void{
        this.$appDB
            .collection("WaterCrafts")
            .orderBy("name")
            .onSnapshot((qs: QuerySnapshot) => {
                this.allBoatData.splice(0);
                qs.forEach((qds: QueryDocumentSnapshot) =>{
                    if(qds.exists){
                        const boatData = qds.data();
                        this.allBoatData.push({
                            name: boatData.name,
                            make: boatData.make,
                            model: boatData.model,
                            year: boatData.year,
                            capacity: boatData.capacity,
                        });
                    }
                });
            });

        this.$appDB
            .collection("WaterCrafts").get().then((qs: QuerySnapshot) => {
                qs.docs.forEach(docName => {
                        this.allBoatData.push({
                            docName: docName.id
                        })
                    
                })                
            })  
    } 

    addBoat(): void{
        this.$appDB
            .collection("WaterCrafts")
            .add({name: this.name, make: this.make, model: this.model, year: this.year, capacity: this.capacity, isAvailable: this.availability})
    }

    removeBoat(){
        this.$appDB
            .collection("WaterCrafts").doc(this.docName).delete();
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

    userInfoRedirect(){
    console.log("userInfoRedirect button clicked")
    this.$router.push({ path: "/accountinfo" })
  }
}

</script>

<style>
/* Add Button Styles */
#add{
    border: 0;
    background: white;
    display: inline;
    margin: 10px auto;
    text-align: center;
    border: 2px solid #0982a0;
    padding: 5px 30px;
    margin-right: 10px;
    outline: none;
    color: black;
    transition: 0.25s;
    border-radius: 10px;
    cursor: pointer;
    float: right;
}
/* Remove boat styles */
#removeBoat{
    border-radius: 25px;
    border: 5px solid #0982a0;
    background: rgb(179, 178, 178);
    margin: 15px;
    display: inline-block;
}
#boats{
    margin-left: 10px;
}
#remove{
    border: 0;
    background: white;
    display: inline;
    margin: 10px auto;
    text-align: center;
    border: 2px solid #0982a0;
    padding: 5px 20px;
    margin-right: 10px;
    margin-left: 10px;
    outline: none;
    color: black;
    transition: 0.25s;
    border-radius: 10px;
    cursor: pointer;
}
/* Add Boat Styles */
#addBoat{
    border-radius: 25px;
    border: 5px solid #0982a0;
    background: rgb(179, 178, 178);
    display: inline-block; 
}
.txtBox{
    float: right;
    text-align: left;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}
.label{
   float: left;
   text-align: right;
   margin-top: 10px;
   font-size: 18px;
   margin-right: 10px;
   margin-left: 10px;
   color: black;
}

/* Table Styles */
  th, td{
    padding: 10px 15px;
    font-family: sans-serif;
}

tr:nth-of-type(even){
    background-color: #f3f3f3;
    border-bottom: 2px solid rgb(196, 218, 247);
}

tr:nth-of-type(odd){
    background-color: rgb(230, 230, 230);
    border-bottom: 2px solid rgb(196, 218, 247);
}

th{
    background-color: #0982a0;
    color: white;
    text-align: left;
    font-family: sans-serif;
}

body{
    background-color: #34495e;
}

.header{
    text-align: center;
    font-size: 28px;
    color:#f3f3f3;
}

table{
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 0.9em;
    min-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

tr:hover{
    background-color: rgb(203, 238, 247);
}

#left{
    text-align: left;
}
#right{
    text-align: right;
}
</style>