<template>
  <div id="topCotainer">
    <h1>Welcome to Sunshine Water Sports</h1>
    <p>Your boating adventure starts here!</p>
    <div class="gallary" align="center">
      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component
export default class Home extends Vue{}

</script>

<style>

</style>
