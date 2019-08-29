import CartService from '@/services/CartService'
import {SET_LOADING} from '.'

export const getters = {
  getUserCarts: state => {
    return state.carts
  }
}

export const mutations = {
  SET_CARTS(state, carts) {
    state.carts = carts
  },
  ADD_CARTS(state, payload) {
    state.carts.push(payload)
  },
  REMOVE_CART(state, id) {
    state.carts = state.carts.filter(cart => cart._id !== id)
  },
  EMPTY_CARTS(state) {
    state.carts = []
  },
  SET_USER_TOTAL_PAYMENT(state, totalPayment) {
    // console.log(state)
    // state.users.user.totalPayment=totalPayment
  },
  PUSH_TO_USER_CARTS(state, cart) {
    state.carts.push(cart)
  },
  SET_LOADING
}

export const actions = {
  async fetchCarts({ commit }) {
    let totalPayment = 0
    commit('SET_LOADING', true)
    try{
      const {data} = await CartService.getCarts()
      data.forEach(cart => {
        totalPayment+=cart.totalPrice
      })
      commit('SET_USER_TOTAL_PAYMENT', totalPayment)
      commit('SET_CARTS', data)      
    }catch(err) {
      console.log(err);
    }finally{
      commit('SET_LOADING', false)
    }
  },
  async createCart({ commit }, payload) {
    // commit('SET_LOADING', true)
    try{
      const {data} = await CartService.addCart(payload)
      commit('PUSH_TO_USER_CARTS', data)
      // commit('SET_LOADING', false)
    }catch(err){
      console.log(err.response);
    }
  },
  async deleteCart({ commit }, id) {
    let totalPayment = this.state.users.user.totalPayment
    commit('SET_LOADING', true)

    try{
      const {data} = await CartService.removeCart(id)
      console.log('delete: ', data);
      totalPayment-=data.totalPrice
      commit('SET_USER_TOTAL_PAYMENT', totalPayment)
      commit('REMOVE_CART', data._id)
      commit('SET_LOADING', false)
      
      return data
    }catch(err) {
        console.log(err.response);
    }finally{
      commit('SET_LOADING', false)
    }
  }
}