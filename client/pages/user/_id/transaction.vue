<template>
  <div>
    <h3>Your Order List</h3>
    <div class="row" style="width: 65em;">
      <div class="col-md-12">
        <table class="table table-borderless table-dark">
          <tr>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{userAddress ? userAddress : '-'}}</td>
            <td>{{convertToRupiah(transaction.totalPayment)}}</td>
            <td>{{transaction.status}}</td>
            <td v-if="transaction.status==='paid'">
              <button class="btn btn-danger" @click="delivered(transaction._id)">Delivered</button>
            </td>
            <td v-else>
              <div>Complete</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import TransactionService from '@/services/TransactionService'
  import {
    convertToRupiah
  } from '@/helpers/convertToRupiah.js'
  import {
    mapState
  } from 'vuex';

  export default {
    mounted() {
      this.fetchTransaction()
    },
    computed: {
      ...mapState({
        transactions: state => state.transactions.items
      }),
      userAddress() {
        return this.$store.state.users.user.address
      }
    },
    methods: {
      convertToRupiah,
      async fetchTransaction() {
        try{
          await this.$store.dispatch('transactions/fetchUserTransactions')
        }catch(err){
          console.log(err)
        }
      },
      async delivered(transactionId) {
        try{
          await this.$store.dispatch('transactions/changeTransactionToDelivered', transactionId)
          Swal.fire(
            'Thank you!',
            'success'
          )
        }catch(err){
          console.log(err);
        }
      }
    }
  }

</script>
