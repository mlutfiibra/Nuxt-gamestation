<template>
  <div class="container mb-5" style="margin-top: 8em;">
    <div class="row">
      <div class="col-md-5 item-photo">
        <img style="max-width:100%;"
          :src="product.picture_url ? product.picture_url : 'https://via.placeholder.com/150x150'" />
      </div>
      <div class="col-md-4" style="border:0px solid gray">
        <h1>{{product.name}}</h1>

        <h4 style="margin-top:0px;">{{convertToRupiah(product.price)}}</h4>
      </div>
      <div v-if="!isAdministrator" class="col-md-3 pay-container">
        <div>
          <h6 class="title-attr"><small>Quantity</small></h6>
        </div>
        <div class="section" style="padding-bottom:20px;">
          <div>
            <div style="display: flex;">
              <button @click="subsQty" class="qty-btn btn-minus" :disabled="product.stock===0"> - </button>
              <input :disabled="product.stock<=0" v-model="quantity" value="1" />
              <button @click="plusQty" class="qty-btn btn-plus" :disabled="product.stock===0"> + </button>
            </div>
          </div>
        </div>
        <div>
          <div v-if="errorMessage.trim()!==''" style="color: #f22323">{{errorMessage}}</div>
          <span>Stocks: {{product.stock}}</span>
        </div>
        <div class="section" style="padding-bottom:20px;">
          <button @click="buyItem(product._id)" class="btn btn-dark btn-block" v-if="product.stock>0"><i
              class="fas fa-shopping-cart" style="margin-right:5px;"></i>Add to Cart</button>
          <button class="btn btn-dark btn-block" v-else disabled>Product Out Of Stock</button>
        </div>
      </div>

      <div v-else class="text-center col-md-3" style="border-radius: 2em;">
        <div>
          <h5 style="background-color: rgb(26,26,26)">Administrator can't buy Product</h5>
        </div>
      </div>

      <div class="col-md-9">
        <ul class="menu-items" style="background-color: rgb(62, 62, 62);">
          <li class="active">Detail</li>
        </ul>
        <div style="width:100%;border-top:1px solid silver">
          <p style="padding:15px; background-color: rgb(27, 27, 27); color: #fff;">
            <small>
              {{product.detail}}
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService';
import CartService from '@/services/CartService';

import {
  convertToRupiah
} from '@/helpers/convertToRupiah'
import {
  mapActions,
  mapState
} from 'vuex';

export default {
  head() {
    return {
      title: `Jual ${this.product.name} | Gamestation`
    }
  },
  data() {
    return {
      product: {
        price: 0
      },
      quantity: 1,
      totalPrice: 0,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState(['user']),
    isAdministrator() {
      return this.$store.state.users.isAdministrator
    }
  },
  mounted() {
    this.fetchDetailProduct()
  },
  watch: {
    quantity() {
      if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock
        this.errorMessage = 'Out of stock'
      } else if (this.quantity <= 0) {
        this.quantity = 1
        this.errorMessage = 'Quantity minimum is 1'
      } else {
        this.totalPrice = this.quantity * this.product.price
      }
    }
  },
  methods: {
    ...mapActions(['createCart']),
    convertToRupiah,
    async fetchDetailProduct() {
      try{
        const {data} = await ProductService.getProduct(this.$route.params.id)
        this.product = data
        this.totalPrice = this.quantity * Number(this.product.price)
      }catch(err){
        console.log(err);
      }
    },
    buyItem(productId) {
      if (localStorage.token) {
        let payload = {
          productId,
          totalPrice: this.totalPrice,
          quantity: this.quantity,
          userId: localStorage.id
        }
        Swal.fire(
          'Add to Cart!',
          '',
          'success'
        )
        this.$store.dispatch('carts/createCart', payload)
      } else {
        this.$router.push('/login')
      }
    },
    plusQty() {
      this.quantity++
    },
    subsQty() {
      if (this.quantity <= 0) {
        this.quantity = 1
      } else {
        this.quantity--
      }
    }
  },
}
</script>

<style scoped>
  ul>li {
    margin-right: 25px;
    font-weight: lighter;
    cursor: pointer
  }

  li.active {
    border-bottom: 3px solid silver;
  }

  .item-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #f6f6f6;
  }

  .menu-items {
    list-style-type: none;
    font-size: 11px;
    display: inline-flex;
    margin-bottom: 0;
    margin-top: 20px
  }

  .btn-success {
    width: 100%;
    border-radius: 0;
  }

  .section {
    display: flex;
    justify-content: space-between;
  }

  .title-price {
    margin-top: 30px;
    margin-bottom: 0;
    color: black
  }

  .title-attr {
    margin-top: 0;
    margin-bottom: 0;
    color: #fff;
  }

  .btn-minus {
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid gray;
    border-radius: 2px;
    border-right: 0;
  }

  .btn-plus {
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid gray;
    border-radius: 2px;
    border-left: 0;
  }

  div.section>div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  div.section>div>input {
    margin: 0;
    padding-left: 5px;
    font-size: 10px;
    padding-right: 5px;
    max-width: 18%;
    text-align: center;
  }

  .attr,
  .attr2 {
    cursor: pointer;
    margin-right: 5px;
    height: 20px;
    font-size: 10px;
    padding: 2px;
    border: 1px solid gray;
    border-radius: 2px;
  }

  .attr.active,
  .attr2.active {
    border: 1px solid orange;
  }

  .btn-cart {
    cursor: pointer;
    color: orangered;
    display: block;
    text-align: center;
    font-weight: 600;
    margin: 10px auto 0px;
  }

  .pay-container {
    position: fixed;
    right: 65px;
    width: 20em;
  }

  .qty-btn {
    background-color: #000;
    color: #fff;
  }

  .qty-btn:disabled {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
    opacity: 0.899;
    cursor: unset;
  }

</style>
