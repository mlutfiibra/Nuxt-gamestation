<template>
  <div class="form-black mb-5" style="margin-top: 8em;">
    <div class="text-center mb-3 mt-5">
      <h3>Edit Product</h3>
      <router-link to="/admin/product">
        List Product
      </router-link>
    </div>
    <form @submit.prevent="editFormProduct" enctype="multipart/form-data">
      <div class="form-group">
        <input type="file" name="picture_url" ref="file" accept="image/*" @change="handleFileUpload">
      </div>
      <div v-if="productForm.picture_url">
        <img :src="productForm.picture_url" :ref="'image'" alt="Picture" style="width:25%">
      </div>
      <div class="form-group">
        <label for="product-name">Name</label>
        <input id="product-name" type="text" class="form-control" v-model="productForm.name"
          aria-describedby="emailHelp" placeholder="Product Name" required>
      </div>

      <div class="form-group">
        <label for="product-price">Price</label>
        <input id="product-price" type="number" class="form-control" v-model="productForm.price"
          aria-describedby="emailHelp" placeholder="Price" required>
      </div>

      <div class="form-group">
        <label for="product-stock">Stock</label>
        <input id="product-stock" type="number" class="form-control" v-model="productForm.stock"
          aria-describedby="emailHelp" placeholder="Stock" required>
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
          <option value="voucher">Voucher Game</option>
        </select>
      </div>

      <div class="form-group">
        <label for="product-category">Detail</label>
        <div>
          <textarea id="product-category" v-model="productForm.detail" cols="103" rows="10" style="resize:vertical"
            required></textarea>
        </div>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-primary push-right">Edit</button>
      </div>
    </form>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'

export default {
  data() {
    return {
      productForm: {
        _id: '',
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
    handleFileUpload(event) {
      this.productForm.picture_url = event.target.files[0]
    },
    async findProduct() {
      const productId = this.$route.params.id
      try{
        const {data} = await ProductService.getProduct(productId)
        this.productForm._id = data._id
        this.productForm.name = data.name
        this.productForm.price = data.price
        this.productForm.stock = data.stock
        this.productForm.category = data.category
        this.productForm.detail = data.detail
        this.productForm.picture_url = data.picture_url
      }catch(err){
        console.log(err);
      }
    },
    editFormProduct() {
      this.$store.dispatch('products/editProduct', this.productForm)
    }
  },
  mounted() {
    this.findProduct()
  },
}

</script>

<style>

</style>
