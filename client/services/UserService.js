import myService from '.'

export default {
  getUser(id) {
    return myService.get(`/transactions/${id}`)
  },
  async setUserData(context) {
    const id = localStorage.id
    myService.defaults.headers.common['token'] = localStorage.token
    context.commit('SET_LOADING', true)

    if(id) {
      try{
        const {data} = await myService.get(`users/${id}`)
        context.commit("SET_USER_DATA", data)
      }catch(err){
        console.log(err);
        if(err.response.data.message === 'jwt expired') {
          context.commit('SET_LOADING', false)
          context.commit('SET_DEFAULT_STATE')
          localStorage.clear()
          this.$router.push('/')
        }
      }finally{
        context.commit('SET_LOADING', false)
      }
    }
  },
  async updateUser(context, payload) {
    const id = localStorage.id
    myService.defaults.headers.common['token'] = localStorage.token

    if(id) {
      try{
        const {data} = myService.put(`users/${id}`, payload)
        context.commit("SET_USER_DATA", data)
      }catch(err){
        if(err.response.data.message === 'jwt expired') {
          context.commit('SET_DEFAULT_STATE')
          localStorage.clear()
          this.$router.push('/')
        }
      }finally{
        context.commit('SET_LOADING', false)
      }
    }
  }
}