<template>
  <div style="margin-top: 8em;">
    <h3 class="mb-3">Checkout</h3>

    <h6>Shipment Address</h6>
    <h6><small style="color: orangered;">*Our service based on Jakarta</small></h6>

    <div>API RajaOngkir is in trouble, please input your information bellow</div>

    <div class="my-card color-grey4 fw-600" style="width: 29em;">
      <div>
        <h5>Received by: {{user.name}}</h5>
      </div>
      <form @submit.prevent="submitUserInformation">
        <div>
          <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Address" label-for="user-address">
            <b-form-input id="user-address" size="md" v-model.trim="user.address"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label-size="md" label="Phone" label-for="user-phone">
            <b-form-input id="user-phone" size="md" v-model.trim="user.phone"></b-form-input>
          </b-form-group>
        </div>
        <button class="btn btn-primary right" type="submit">Save Change</button>
      </form>
    </div>

    <div class="row mt-4">
      <h5 class="col-md-12">Your Carts</h5>
    </div>
    <div v-for="(cart, index) in carts" :key="index" class="my-card color-grey4">
      <div class="row">
        <div class="col-md-2">
          <div>
            <img :src="cart.productId.picture_url ? cart.productId.picture_url : 'https://via.placeholder.com/150x150'"
              alt="..." style="width: 100%">
          </div>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">{{cart.productId.name}}</h5>
            <p class="card-text">{{ convertToRupiah(cart.productId.price) }} x {{cart.quantity}} =
              {{convertToRupiah(cart.totalPrice)}}</p>
          </div>
        </div>
        <div class="col-md-3">

        </div>
      </div>
    </div>

    <div class="mt-2 mb-5">
      <button class="btn btn-success" @click="payNow">Pay</button>
    </div>
  </div>
</template>

<script>
  import api from '@/api/localapi'
  import {
    convertToRupiah
  } from '@/helpers/convertToRupiah'
  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex';

  export default {
    data() {
      return {
        transactions: [],
        cities: [],
        address: ''
      }
    },
    computed: {
      ...mapState(['user', 'carts'])
    },
    methods: {
      ...mapActions(['updateUser', 'setUserData']),
      ...mapMutations(['SET_USER_CARTS']),
      submitUserInformation() {
        let update = {
          address: this.user.address,
          phone: this.user.phone
        }
        this.updateUser(update)
      },
      fetchTransaction() {
        api.defaults.headers.common['token'] = localStorage.token

        api
          .get('/transactions')
          .then(({
            data
          }) => {
            this.transactions = data[0]
          })
          .catch(err => {
            console.log(err);
          })
      },
      convertToRupiah,
      fetchCities() {
        api.defaults.headers.common['key'] = 'dd4927c879c8016e2679a017eda70396'

        api
          .get('https://api.rajaongkir.com/starter/city')
          .then(cities => {
            this.cities = cities.rajaongkir.results
          })
          .catch(err => {
            console.log(err);
          })
      },
      payNow() {
        api.defaults.headers.common['token'] = localStorage.token

        let productId = []
        this.carts.forEach(cart => {
          productId.push(cart.productId)
        })

        let payload = {
          userId: this.user._id,
          productId,
          totalPayment: this.user.totalPayment
        }

        api
          .post(`/transactions`, payload)
          .then(transaction => {
            let emptyCarts = []
            Swal.fire(
              'Transaction Success!',
              'Thank you and wait for your goods to come~',
              'success'
            )
            this.SET_USER_CARTS(emptyCarts)
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err.response);
          })
      },
      mounted() {
        this.setUserData()
      },
    },
  }

</script>
