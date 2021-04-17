<template>
  <div id="management">
    <h1>Add a New Boat</h1>
    <label>Name: </label><input type="text" v-model="name" placeholder="Boat Name"><br>
    <label>Make: </label><input type="text" v-model="make" placeholder="Manufacturer Name"><br>
    <label>Model: </label><input type="text" v-model="model" placeholder="Boat Model"><br>
    <label>Year: </label><input type="number" v-model="year" placeholder="Year Created"><br>
    <label>Capacity: </label><input type="number" v-model="capacity" placeholder="Maximum Riders"><br>
    <label>Availability: </label><input type="boolean" v-model="availability" placeholder="Is the boat available"><br>

    <tbody>
        <tr>
            <th>Name</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Capacity</th>
        </tr>
        <tr v-for="(z,pos) in allBoatData" :key="pos">
            <td>{{z.name}}</td>
            <td>{{z.make}}</td>
            <td>{{z.model}}</td>
            <td>{{z.year}}</td>
            <td>{{z.capacity}}</td>
        </tr>
    </tbody>

    <button @click="addBoat()">Add</button>
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
    }

    addBoat(): void{
        this.$appDB
            .collection(`WaterCrafts`)
            .add({name: this.name, make: this.make, model: this.model, year: this.year, capacity: this.capacity, isAvailable: this.availability})
    }
}

</script>

<style>
  th, td{
    padding: 12px 15px;
    font-family: sans-serif;
}

tr:nth-of-type(even){
    background-color: #f3f3f3;
}

tr:nth-of-type(odd){
    background-color: rgb(230, 230, 230);
    border-bottom: 2px solid lightgoldenrodyellow;
}

tr:nth-of-type(even){
    border-bottom: 2px solid lightgoldenrodyellow;
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
</style>