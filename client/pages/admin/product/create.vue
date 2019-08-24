<template>
  <div class="form-black mb-5" style="margin-top: 8em;">
    <div class="text-center mb-3 mt-5">
      <h3>Add Product</h3>
      <router-link 
          :to="{'name': 'admin-list-product'}">
          List Product
      </router-link>
    </div>
    <form 
      @submit.prevent="submitFormProduct" 
      enctype="multipart/form-data"
    >
      <div class="form-group">
        <input 
            type="file" 
            name="picture_url"
            ref="file"
            accept="image/*"
            v-on:change="handleFileUpload"
        >
      </div>
      <div class="form-group">
        <label for="product-name">Name</label>
        <input
          id="product-name"
          type="text" 
          class="form-control"
          v-model="productForm.name"
          aria-describedby="emailHelp" 
          placeholder="Product Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="product-price">Price</label>
        <input
            id="product-price"
            type="number" 
            class="form-control" 
            v-model="productForm.price"
            aria-describedby="emailHelp" 
            placeholder="Price"
            required
        >
      </div>

      <div class="form-group">
        <label for="product-stock">Stock</label>
        <input 
            id="product-stock"
            type="number" 
            class="form-control" 
            v-model="productForm.stock"
            aria-describedby="emailHelp" 
            placeholder="Stock"
            required
        >
      </div>

      <div class="form-group">
        <label for="product-category">Category</label>
        <select class="form-control" v-model="productForm.category" id="product-category" required>
          <option value="" disabled>Choose Category</option>
          <option value="action">Action Game</option>
          <option value="rpg">RPG Game</option>
          <option value="puzzle">Puzzle Game</option>
          <option value="fps">FPS Game</option>
          <option value="casual">Casual Game</option>
          <option value="voucher">Voucher</option>
        </select>
      </div>

      <div class="form-group">
        <label for="product-detail">Detail</label>
        <div>
          <textarea 
            id="product-detail"
            v-model="productForm.detail" 
            cols="103" 
            rows="10" 
            style="resize:vertical"
            required
          ></textarea>
        </div>
      </div>

      <div class="mb-3">
        <button 
            type="submit" 
            class="btn btn-success push-right"
        >Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
    data() {
        return {
            productForm: {
                name: '',
                price: '',
                stock: '',
                category: '',
                detail: '',
                picture_url: ''
            }
        }
    },
    methods: {
        ...mapMutations(['CHANGE_PRODUCTS']),
        submitFormProduct() {
            this.$emit('submit-product', this.productForm)
        },
        handleFileUpload(event) {
            this.productForm.picture_url = event.target.files[0]
        }
    },
    mounted() {
        this.productForm = {}        
    },
}
</script>
