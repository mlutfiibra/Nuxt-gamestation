<template>
  <div>
    <div class="row mb-2" style="margin-top: 7em;">
      <h5>{{$route.query.category.charAt(0).toUpperCase() + $route.query.category.slice(1)}} Games</h5>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="cat in categoryItems" :key="cat._id">
        <Card>
          <router-link :to="/product/ + cat._id">
            <div>
              <img :src="cat.picture_url ? cat.picture_url : 'https://via.placeholder.com/150x150'" class="card-img-top"
                alt="...">
            </div>
            <div class="card-body" style="color: #616161">
              <h5 class="card-title">{{cat.name}}</h5>
              <p class="card-text">{{cat.description}}</p>
              <p class="card-text"></p>

              <div class="price">
                {{convertToRupiah(cat.price)}}
              </div>
            </div>
          </router-link>
        </Card>
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
        categoryItems: []
      }
    },
    methods: {
      convertToRupiah,
      fetchByCategory(query) {
        ProductService.getProductsByCategory(query)
          .then(({
            data
          }) => {
            this.categoryItems = data
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    mounted() {
      this.fetchByCategory(this.$route.query.category)
    },
    beforeRouteUpdate(to, from, next) {
      this.fetchByCategory(to.query.category)
      next()
    }
  }

</script>

<style>

</style>
