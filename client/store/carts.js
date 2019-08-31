import CartService from '@/services/CartService'
import {SET_LOADING} from '.'

export const state = () => ({
  items: [],
  loading: false
})

export const getters = {
  getUserCarts: state => {
    return state.items
  },
  totalPayment: (state, getters) => {
    return state.items.reduce((acc, item) => acc + (item.totalPrice * getters.cartLength), 0)
  },
  cartLength: state => {
    return state.items.length
  }
}

export const mutations = {
  SET_CARTS(state, carts) {
    state.items = carts
  },
  ADD_CARTS(state, payload) {
    state.items.push(payload)
  },
  REMOVE_CART(state, id) {
    state.items = state.items.filter(item => item._id !== id)
  },
  EMPTY_CARTS(state) {
    state.items = []
  },
  PUSH_TO_USER_CARTS(state, cart) {
    state.carts.push(cart)
  },
  SET_LOADING
}

export const actions = {
  async fetchCarts({ commit }) {
    commit('SET_LOADING', true)
    try{
      const {data} = await CartService.getCarts()
      commit('SET_CARTS', data)      
    }catch(err) {
      console.log(err);
    }finally{
      commit('SET_LOADING', false)
    }
  },
  async createCart({ commit }, payload) {
    commit('SET_LOADING', true)
    try{
      const {data} = await CartService.addCart(payload)
      commit('PUSH_TO_USER_CARTS', data)
      commit('SET_LOADING', false)
    }catch(err){
      console.log(err.response);
    }
  },
  async deleteCart({ commit }, id) {
    commit('SET_LOADING', true)

    try{
      const {data} = await CartService.removeCart(id)
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