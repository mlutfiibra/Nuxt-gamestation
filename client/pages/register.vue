<template>
  <div class="auth-bg">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="auth-container">
          <h4 class="text-center mb-3">Register</h4>
          <form @submit.prevent="onSubmitRegister">
            <div class="form-group">
              <input class="form-control" v-model="register.name" type="text" placeholder="Input your name" autocomplete="off"
                aria-autocomplete="off" required />
            </div>

            <div class="form-group">
              <input class="form-control" v-model="register.email" type="email" placeholder="Input your email" autocomplete="off"
                aria-autocomplete="off" required />
            </div>

            <div class="form-group">
              <input class="form-control" v-model="register.password" type="password" placeholder="Password" required />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-success btn-block">Register</button>
              <router-link :to="{ name: 'login' }">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AuthService from '@/services/AuthService'

  export default {
    name: 'register',
    head() {
    return {
        title: `Register | Gamestation`
      }
    },
    methods: {
      async onSubmitRegister() {
        const {
          name,
          email,
          password
        } = this.register;

        try{
          const user = await AuthService.register({name, email, password})
          Swal.fire(
            'Success!',
            `You successfully register ${user.data.name}!`,
            'success'
          )
          this.setDefaultRegisterForm()
          this.$router.push('/')
        }catch(err){
          console.log(err.response)
        }
      },
      setDefaultRegisterForm() {
        this.register = {
          name: '',
          email: '',
          password: '',
          role: 'customer'
        }
      }
    },
    data() {
      return {
        register: {
          name: '',
          email: '',
          password: '',
          role: 'customer'
        }
      }
    },
    mounted() {
      this.setDefaultRegisterForm()
    },
  }

</script>
