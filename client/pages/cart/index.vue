<template>
  <div class="row" style="margin-top: 8em;">
    <div class="col-md-8">
      <h5>Orders</h5>
      <div class="my-card mb-3 color-grey4" v-for="(cart, index) in carts" :key="index">
        <div class="row no-gutters">
          <div class="col-md-3">
            <img :src="cart.productId.picture_url ? cart.productId.picture_url : 'https://via.placeholder.com/50x50'"
              class="card-img" alt="...">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">{{cart.productId.name}}</h5>
              <p class="card-text">{{cart.productId.description}}</p>
              <p class="card-text">{{cart.productId ? convertToRupiah(cart.productId.price) : convertToRupiah(0)}} x
                {{cart.quantity}} = <span
                  style="color: orangered;">{{cart.totalPrice ? convertToRupiah(cart.totalPrice) : convertToRupiah(0)}}</span>
              </p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card-body">
              <div class="cart--delete" @click="deleteCart(cart._id)">
                Cancel Order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4" v-if="carts.length>0">
      <h5>Order Details</h5>
      <div class="my-card color-grey4" style="padding: 25px;">
        <div>
          <h5>Total: {{user ? convertToRupiah(user.totalPayment) : convertToRupiah(0)}}</h5>
        </div>
        <button class="btn btn-danger" @click="goToCheckoutPage">Confirm Orders</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/localapi'
  import {
    convertToRupiah
  } from '@/helpers/convertToRupiah.js'
  import {
    mapActions,
    mapState
  } from 'vuex';

  export default {
    computed: {
      user() {
        return this.$store.getters.getUser
      },
      carts() {
        return this.$store.getters.getUserCarts
      }
    },
    mounted() {
      this.getCart()
    },
    methods: {
      convertToRupiah,
      ...mapActions(['deleteFromCart', 'getCart']),
      deleteCart(id) {
        Swal.fire({
          title: 'Remove from carts?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.deleteFromCart(id)
          }
        })
      },
      goToCheckoutPage() {
        this.$router.push('/checkout')
      }
    },
  }

</script>

<style scope>
  .cart--delete {
    color: #dc3545;
    cursor: pointer;
  }

</style>
