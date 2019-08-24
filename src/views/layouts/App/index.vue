<template>
  <div>
    <navbar />
    <b-container fluid>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Navbar from './../Modules/Navigation'

export default {
  name: "App",

  components: {
    Navbar
  }
};
</script>
