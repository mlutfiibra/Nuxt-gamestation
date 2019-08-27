<template>
  <div class="my-card my-card--black">
    <div class="row">
      <div class="col-md-12">
        <h5>User Profile</h5>
      </div>
      <div class="col-md-3">
        <div class="card-title">{{user.name}}</div>
        <router-link :to="/user/+($route.params.id)+'/profile'">Profile</router-link>
        <router-link :to="/user/+($route.params.id)+'/transaction'">Transaction</router-link>
        <div class="card-body">
          <router-view :user="user"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  data() {
    return {
      user: {},
      transaction: {}
    }
  },
  methods: {
    async getUser() {
      try{
        const {data} = await UserService.getUserData(this.$route.params.id)
        this.user = data
      }catch(err){
        console.log(err)
      }
    }
  },
  mounted() {
    this.getUser()
  },
}
</script>
