<template>
  <div id="management">
    <h1>Add a New Boat</h1>
    <label>Name: </label><input type="text" placeholder="Boat Name"><br>
    <label>Make: </label><input type="text" placeholder="Manufacturer Name"><br>
    <label>Model: </label><input type="text" placeholder="Boat Model"><br>
    <label>Year: </label><input type="number" placeholder="Year Created"><br>
    <label>Capacity: </label><input type="number" placeholder="Maximum Riders"><br>
    <label>Availability: </label><input type="boolean" placeholder="Is the boat available"><br>
    <button>Add</button>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from 'node_modules/@firebase/firestore-types';

@Component
export default class BoatManagement extends Vue{

}

</script>

<style>
  
</style>