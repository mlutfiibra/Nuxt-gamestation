<template>
  <div class="voucher-container">
    <form @submit.prevent="submitVoucherForm">
      <div class="mb-3">
        <h5>Game Voucher Promo</h5>
      </div>
      <div class="form-group">
        <select id="game" class="form-control" v-model="voucher">
          <option disabled value="0">Choose Game</option>
          <option :key="index" v-for="(voucher, index) in voucherlist" :value="voucher">{{voucher.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <select id="amount" class="form-control" v-model="quantity">
          <option disabled value="0">Choose Amount</option>
          <option value="5">50 Cash Points</option>
          <option value="10">100 Cash Points</option>
          <option value="15">150 Cash Points</option>
          <option value="20">200 Cash Points</option>
        </select>
      </div>

      <div v-if="voucher.price && quantity">
        Total: {{convertToRupiah( Number(voucher.price) * Number(quantity) ) }}
      </div>

      <button type="submit" class="btn btn-secondary  btn-block mt-3">Buy</button>
    </form>
  </div>
</template>

<script>
  import {getCookieByName} from '@/helpers/cookie'
  import {
    mapActions,
    mapState
  } from 'vuex'
  import {
    convertToRupiah
  } from '@/helpers/convertToRupiah'

  export default {
    methods: { getCookieByName },
    data() {
      return {
        voucher: 0
          // id: '',
          // name: '',
          // price: 0,
          // totalPrice: ''
        ,
        quantity: 0
      }
    },
    computed: {
      ...mapState(['user'])
    },
    props: ['voucherlist'],
    methods: {
      ...mapActions([
        'getCart',
        'createCart'
      ]),
      convertToRupiah,
      submitVoucherForm() {
        if ( getCookieByName('token') ) {
          if (this.user.role !== 'customer') {
            Swal.fire(
              'Only customer can buy product!',
              '',
              'warning'
            )
          } else {
            let payload = {
              productId: this.voucher._id,
              totalPrice: Number(this.voucher.price) * Number(this.quantity),
              quantity: this.quantity,
              userId: getCookieByName('id')
            }
            Swal.fire(
              'Add to Cart!',
              '',
              'success'
            )
            this.createCart(payload)
          } 
        }else {
          this.$router.push('/login')
        }
      }
    },
  }

</script>

<style>
  .voucher-container {
    background-color: #292929;
    border-radius: 3px;
    padding: .5em 1em;
  }

</style>
