<template>
  <div>
    <div class="row mb-2" style="margin-top: 7em;">
      <h5>{{$route.query.category.charAt(0).toUpperCase() + $route.query.category.slice(1)}} Games</h5>
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
