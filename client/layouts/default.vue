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
import {getCookieByName} from '@/helpers/cookie'

export default {
  components: {
    Navbar,
    Footer
  },
  methods: { getCookieByName },
  mounted() {
    if( getCookieByName('token') ) {
      this.$store.commit('users/SET_IS_LOGGED_IN', true)
      this.$store.dispatch('users/fetchUserData')
      this.$store.state.token = getCookieByName('token')
    }else{
      this.$store.commit('users/SET_DEFAULT_STATE')
    }
  },
}
</script>
