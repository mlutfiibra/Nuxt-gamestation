import UserService from '@/services/UserService'
import AuthService from '~/services/AuthService';

export const state = () => ({
  token: '',
  isLoggedIn: false,
  isAdministrator: false,
  user: {
    id:'',
    name:'',
    email: '',
    role: '',
    address: null,
    phone: null,
    totalPayment: 0
  },
})

export const getters = {
  getUser: state => {
    return state.user
  },
  getUserRole: state => {
    return state.user.role
  },
  cartLength: state => {
    return state.carts ? state.carts.length : 0
  },
  isAdministrator: state => {
    return state.user.role === 'administrator'
  },
  getIsLoggedIn: state => {
    return state.isLoggedIn
  },
  getLoading: state => {
    return state.loading
  }
}

export const mutations = {
  SET_DEFAULT_STATE(state) {
    state.user={}
  },
  SET_IS_LOGGED_IN(state, payload) {
    state.isLoggedIn = payload
  },
  SET_IS_ADMINISTRATOR(state, isAdmin) {
    state.isAdministrator = isAdmin
  },
  SET_USER_DATA(state, payload) {
    if(payload) {
      state.user=payload
      state.isLoggedIn=true

      if(payload.role==='administrator') {
        state.isAdministrator = true
      }
    }else{
      state.user = {}
    }
  },
}

export const actions = {
  async login({commit}, payload) {
    // commit('SET_LOADING', true)
    try{
      const {data} = await AuthService.login(payload)

      if(payload==='administrator') {
        commit("SET_IS_ADMINISTRATOR", true)
      }
      commit('SET_IS_LOGGED_IN', true)
      commit('SET_USER_DATA', data)

      return data
    }catch(err){
      console.log(err)
    }finally{
      // commit('SET_LOADING', false)      
    }
  },
  logout({commit}){
    Swal.fire(
      `Logout`,
      'see you around :)',
      'success'
    )
    localStorage.clear()
    commit('SET_IS_LOGGED_IN', false)
    commit("SET_IS_ADMINISTRATOR", false)
    commit("SET_DEFAULT_STATE", false)
    this.$router.push('/')
  },
  async fetchUserData({ commit }) {
    const id = localStorage.id

    // commit('SET_LOADING', true)
    if(id) {
      try{
        const {data} = await UserService.getUserData(id)
        commit("SET_USER_DATA", data)
      }catch(err){
        console.log(err);
        if(err.response.data.message === 'jwt expired') {
          commit('SET_LOADING', false)
          commit('SET_DEFAULT_STATE')
          localStorage.clear()
          this.$router.push('/')
        }
      }finally{
        commit('SET_LOADING', false)
      }
    }else{
      console.log('Cannot get id');
    }
  },
  async updateUser({commit}, payload) {
    const id = localStorage.id

    if(id) {
      try{
        const {data} = myService.updateUser(payload)
        commit("SET_USER_DATA", data)
      }catch(err){
        if(err.response.data.message === 'jwt expired') {
          commit('SET_DEFAULT_STATE')
          localStorage.clear()
          this.$router.push('/')
        }
      }finally{
        commit('SET_LOADING', false)
      }
    }
  }
}