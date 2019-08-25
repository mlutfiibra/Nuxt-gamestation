<template>
  <div>
    <div>
      <div style="display:flex; justify-content: space-between;">
        <slot></slot>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="(category, index) in categories" :key="index">
        <Card :key="index">
          <router-link :to="/product/ + category._id">
            <div>
              <img :src="category.picture_url ? category.picture_url : 'https://via.placeholder.com/150x150'"
                class="card-img-top" alt="...">
            </div>
            <div class="card-body" style="background-color: rgb(21, 21, 21); color: #fff !important;">
              <h5 class="card-title">{{category.name}}</h5>
              <p class="card-text">{{category.description}}</p>
              <p class="card-text"></p>

              <div class="price">
                {{convertToRupiah(category.price)}}
              </div>
            </div>
          </router-link>
        </Card>
      </div>

    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { convertToRupiah } from '@/helpers/convertToRupiah.js'

export default {
  props: ['categories'],
  components: {
    Card
  },
  methods: {
    convertToRupiah
  },
}
</script>

<style>
.price {
  color: #84ab49;
  font-weight: 600;
  font-size: 16px;
}
</style>
