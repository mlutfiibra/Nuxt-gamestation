<template>
  <div 
      class="card" 
  >
    <div style="height: 8rem">
      <img :src="data.picture_url ? data.picture_url : 'https://via.placeholder.com/150x150'"
        class="card-img-top" :alt="data.name">
    </div>
    <div class="card-body" style="background-color: rgb(21, 21, 21); color: #fff !important;">
      <h6 class="card-title" style="height: 1rem;
    overflow: hidden;">{{data.name}}</h6>
      <p class="card-text">{{data.description}}</p>
      <p class="card-text"></p>

      <div class="price">
        {{convertToRupiah(data.price)}}
      </div>
    </div>
  </div>
</template>

<script>
import { convertToRupiah } from '@/helpers/convertToRupiah.js'

export default {
  props: ['data'],
  methods: {
    convertToRupiah
  }
}
</script>