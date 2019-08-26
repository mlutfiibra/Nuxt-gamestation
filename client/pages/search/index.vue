<template>
  <div style="margin-top: 7em;">
    <div class="row mb-2">
      <div>
        <h5>Result for "{{searchQuery}}"</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3" v-for="result in searchResult" :key="result._id">
        <Card>
          <router-link :to="/product/ + result._id">
            <div>
              <img :src="result.picture_url ? result.picture_url : 'https://via.placeholder.com/150x150'"
                class="card-img-top" alt="...">
            </div>
            <div class="card-body" style="color: #616161">
              <h5 class="card-title">{{result.name}}</h5>
              <p class="card-text">{{result.description}}</p>
              <p class="card-text"></p>

              <div class="price">
                {{convertToRupiah(result.price)}}
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
  import Card from '@/components/Card'
  import {
    convertToRupiah
  } from '@/helpers/convertToRupiah.js'

  export default {
    data() {
      return {
        searchResult: [],
        searchQuery: '',
        errorMessage: ''
      }
    },
    methods: {
      convertToRupiah,
      async search() {
        try{
          const {data} = await ProductService.searchProduct(this.searchQuery)
          this.searchResult = data
        }catch(err){
          this.errorMessage = 'Failed to receive data, check your internet connection'
        }
      }
    },
    components: {
      Card
    },
    async asyncData({ query, error }) {
      try {
        return {
          searchQuery : query.q
        }
      }catch(e) {
        error({ statusCode: 503, message: `Error: ${e}` })
      }
    },
    mounted() {
      this.search()
    },
    watch: {
      $route() {
        this.searchQuery = this.$route.query.q
        this.search()
      }
    },
  }
</script>