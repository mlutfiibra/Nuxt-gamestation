<template>
  <div class="auth-bg">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="auth-container">
          <h4 class="text-center mb-3">Login</h4>
          <form @submit.prevent="onSubmitLogin">
            <div class="form-group">
              <input id="user-email" v-model="loginForm.email" type="email" placeholder="email" class="form-control"
                aria-autocomplete="off" required />
            </div>

            <div class="form-group">
              <input id="user-password" v-model="loginForm.password" type="password" placeholder="password" class="form-control"
                required />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-success btn-block">Login</button>
              <div> or </div>
              <router-link :to="{ name: 'register' }">Create account</router-link>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['SET_IS_LOGGED_IN', 'SET_IS_ADMINISTRATOR_TRUE', 'SET_USER_DATA']),
    ...mapActions(['fetchCarts']),
    async onSubmitLogin() {
      const {
        email,
        password
      } = this.loginForm;
      try{
        const data = await this.$store.dispatch('users/login', {email, password});

        Swal.fire(
          `Welcome ${data.name}`,
          '',
          'success'
        )
        this.token = data.token
        localStorage.token = data.token
        localStorage.id = data.id
        this.fetchCarts()

        this.loginForm = {}

        this.$router.push('/')
      }catch(err){
        console.log(err)
      }
      // AuthService.login({
      //     email,
      //     password
      //   })
      //   .then(({
      //     data
      //   }) => {
      //     if (data.role === 'administrator') {
      //       this.SET_IS_ADMINISTRATOR_TRUE()
      //     }
      //     Swal.fire(
      //       `Welcome ${data.name}`,
      //       '',
      //       'success'
      //     )
      //     this.SET_IS_LOGGED_IN(true)
      //     this.SET_USER_DATA(data)
      //     this.token = data.token
      //     localStorage.token = data.token
      //     localStorage.id = data.id
      //     this.fetchCarts()

      //     this.loginForm = {}

      //     this.$router.push('/')
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     Swal.fire({
      //       type: 'error',
      //       title: `${err.response.data.message}`
      //     })
      //   })
    }
  },
  data() {
    return {
      loginForm: {
        password: '',
        email: ''
      }
    }
  }
}

</script>

<style>
  .auth-bg {
    background: url('../assets/img/auth_bg.jpg');
    margin: 0px -130px;
    min-height: 100vh;
  }

  .auth-container {
    border: solid 1px #616161;
    border-radius: 5px;
    max-width: 520px;
    margin: 120px auto 0px;
    background-color: #2d2d2d;
    padding: 2em 3em;
  }

</style>
