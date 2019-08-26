<template>
  <div>
    <div>
      <div style="display:flex; justify-content: space-between;">
        <slot></slot>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="(category, index) in categories" :key="index">
        <router-link :to="/product/ + category._id">
          <Card :key="index" :data="category" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  props: ['categories'],
  components: {
    Card
  }
}
</script>

<style>
.price {
  color: #84ab49;
  font-weight: 600;
  font-size: 16px;
}
</style>
