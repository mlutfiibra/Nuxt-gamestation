<template>
  <div style="margin-top: 8em;">
    <div class="text-center mb-3 mt-5">
      <h3>Transaction List</h3>
    </div>
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Phone</th>
          <th scope="col">Status</th>
          <th scope="col">Total Payment</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            v-for="(transaction, index) in transactions"
            :key="index"
        >
          <th scope="row">{{index+1}}</th>
          <td>{{transaction.createdAt | moment("MMMM, Do YYYY")}}</td>
          <td>
              {{transaction.userId.name}}
          </td>
          <td>{{transaction.userId.address}}</td>
          <td>{{transaction.userId.phone}}</td>
          <td>{{transaction.status}}</td>
          <td>{{convertToRupiah(transaction.totalPayment)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TransactionService from '@/services/TransactionService'
import { convertToRupiah } from '@/helpers/convertToRupiah'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      transactions:[]
    }
  },
  mounted() {
    this.fetchTransactions()
  },
  methods: {
    async fetchTransactions() {
      try{
        const {data} = await TransactionService.getTransactions()
        this.transactions = data
      }catch(err){
        console.log(err.response);
      }
    },
    convertToRupiah
  },
}
</script>

<style>

</style>
