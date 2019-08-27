<template>
  <form @submit.prevent="onSubmitRegister" style="margin-top: 8em;">
    <div class="mt-3 mb-4 text-center">
      <h4>Register Admin</h4>
    </div>

    <div class="input-group">
      <input class="form-control" v-model="adminRegisterForm.name" type="text" placeholder="Input your name"
        aria-autocomplete="off" required />
    </div>

    <div class="input-group">
      <input class="form-control" v-model="adminRegisterForm.email" type="email" placeholder="Input your email"
        aria-autocomplete="off" required />
    </div>

    <div class="input-group">
      <input class="form-control" v-model="adminRegisterForm.password" type="password" placeholder="Password"
        required />
    </div>

    <div class="text-center">
      <button type="submit" class="btn btn-primary">Register</button>
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
  </form>
</template>

<script>
  import AuthService from '@/services/AuthService'

  export default {
    name: 'RegisterAdmin',
    methods: {
      async onSubmitRegister() {
        const {
          name,
          email,
          password
        } = this.adminRegisterForm;

        try{
          const user = await AuthService.register({name, email, password})
          Swal.fire(
            'Success!',
            `You successfully register ${user.data.name}!`,
            'success'
          )
          this.$router.push('/')
          this.adminRegisterForm = {}
        }catch(err){
          console.log(err.response)
        }
      },
    },
    data() {
      return {
        adminRegisterForm: {
          name: '',
          email: '',
          password: '',
          role: 'administrator'
        }
      }
    },
  }

</script>
