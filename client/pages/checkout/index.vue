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
          <div class="form-group">
            <input id="user-email" v-model.trim="deliveryForm.address" type="text" placeholder="Address" class="form-control"
                aria-autocomplete="off" />
          </div>
          <div class="form-group">
            <input id="user-email" v-model.trim="deliveryForm.phone" type="text" placeholder="Phone" class="form-control"
                aria-autocomplete="off" />
          </div>
        </div>
        <button class="btn btn-primary right" type="submit">Save Change</button>
      </form>
    </div>

    <div class="row mt-4">
      <h5 class="col-md-12">Checkout Product</h5>
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

    <div style="display: flex" class="mt-2 mb-5">
      <div style="margin-right:1rem">{{convertToRupiah(totalPayment)}}</div>
      <button class="btn btn-success" @click="payNow">Checkout</button>
    </div>
  </div>
</template>

<script>
import {
  convertToRupiah
} from '@/helpers/convertToRupiah'
import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} from 'vuex';

export default {
  data() {
    return {
      transactions: [],
      cities: [],
      deliveryForm: {
        address: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user,
      carts: state => state.carts.items
    }),
    ...mapGetters({
      totalPayment: 'carts/totalPayment'
    })
  },
  watch: {
    user() {
      this.deliveryForm.address = this.user.address
      this.deliveryForm.phone = this.user.phone
    }
  },
  methods: {
    ...mapMutations(['SET_USER_CARTS']),
    submitUserInformation() {
      let update = {
        address: this.deliveryForm.address,
        phone: this.deliveryForm.phone
      }
      this.$store.dispatch('users/updateUserData', update)
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
    }
  },
}

</script>
