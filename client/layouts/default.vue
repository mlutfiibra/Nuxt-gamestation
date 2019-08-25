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
  }
}
</script>
