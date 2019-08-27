<template>
  <div class="my-card my-card--black mt-2" style="padding: 10px; width: 45em;">
    <h5>User Profile</h5>
    <p>Email: {{user.email}}</p>
    <p>Address: {{user.address}}</p>
    <p>Phone: {{user.phone}}</p>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    computed: {
      user() {
        return this.$store.state.users.user
      }
    },
  }

</script>

<style>

</style>
