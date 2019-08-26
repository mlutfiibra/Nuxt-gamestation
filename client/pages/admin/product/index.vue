<template>
  <div style="margin-top: 8em;">
    <div class="text-center mb-3 mt-5">
      <h3>Product List</h3>
      <router-link to="/admin/product/create">
        Create Product
      </router-link>
    </div>
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product._id">
            <th scope="row">{{index+1}}</th>
            <td>
              <router-link :to="`/product/${product._id}`">{{product.name}}</router-link>
            </td>
            <td>{{convertToRupiah(product.price)}}</td>
            <td>
              <router-link :to="`/admin/product/edit/${product._id}`"><span class="btn-edit">Edit </span> </router-link>|
              <span @click="deleteProduct(product._id)" class="color-red cursor-pointer">Delete</span>
            </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import {
  convertToRupiah
} from '@/helpers/convertToRupiah'

export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    convertToRupiah,
    async fetchProducts() {
      try{
        const {data} = await ProductService.getProducts();
        this.products = data
      }catch(err) {
        console.log(err)
      }
    },
    deleteProduct(id) {
      Swal.fire({
        title: 'Delete this product?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          ProductService
            .removeProduct(id)
            .then(product => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.products = this.products.filter(el => {
                if (el._id !== product._id) {
                  return el
                }
              })
              this.fetchProducts()
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
    }
  },
}

</script>

<style scoped>
  .color-red {
    color: #e33012;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .btn-edit {
    color: cornflowerblue;
  }

  .btn-edit:hover {
    cursor: pointer;
  }

</style>
