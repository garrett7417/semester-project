<template>
  <div id="topCotainer">
    <h1>Welcome to Sunshine Water Sports</h1>
    <p>Your boating adventure starts here!</p>
    <button v-if="userLoggedIn()" @click="doLogout">Logout</button>
    <div class="gallary" align="center">
      <h3>Boat Gallary</h3>
      <div class="thumbnails">
        <img onmouseover="preview.src=2021 Malibu Wakesetter.src" name ="2018 Malibu Wakesetter" src="2021 Malibu Wakesetter.jpg" alt=""/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component
export default class Home extends Vue{
  //logout of web app
  readonly $appAuth!: FirebaseAuth;
  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }
  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.back();
  }


}

</script>

<style>

</style>
