<template>
  <div>
    <!-- <div v-if="loading" class="loader loader-default is-active"></div> -->
    <Navbar/>
    <div class="container" style="min-height: 100vh;">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  mounted() {
    if(localStorage.token) {
      this.$store.commit('SET_IS_LOGGED_IN', true)
      this.$store.dispatch('users/fetchUserData')
      this.$store.state.token = localStorage.token
    }else{
      this.$store.commit('SET_USER_DATA', {})
    }
  },
}
</script>
