<template>
  <div>
    <navbar />
    <router-view></router-view>
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
