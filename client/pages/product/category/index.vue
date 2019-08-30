<template>
  <div>
    <div class="row mb-2" style="margin-top: 7em;">
      <h5>{{categoryName}} Games</h5>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="category in categoryItems" :key="category._id">
        <router-link :to="/product/ + category._id">
          <Card :key="index" :data="category" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductService from '@/services/ProductService'
  import Card from '@/components/Card.vue'
  import {
    convertToRupiah
  } from '@/helpers/convertToRupiah.js'

  export default {
    name: 'product-category',
    head() {
    return {
        title: `Jual ${this.categoryName} Games | Gamestation`
      }
    },
    components: {
      Card,
    },
    data() {
      return {
        categoryItems: [],
        query: this.$route.query.category
      }
    },
    methods: {
      convertToRupiah,
      async fetchByCategory(query) {
        try{
          const {data} = await ProductService.getProductsByCategory(query);
          this.categoryItems = data
        }catch(err){
          console.log(err);
        }
      }
    },
    computed: {
      categoryName() {
        return this.$route.query.category.charAt(0).toUpperCase() + this.$route.query.category.slice(1)
      }
    },
    mounted() {
      this.fetchByCategory(this.query)
    },
    beforeRouteUpdate(to, from, next) {
      this.fetchByCategory(to.query.category)
      next()  
    }
  }

</script>

<style>

</style>
