import TransactionService from '@/services/TransactionService'

export const state = () => ({
  items: []
})

export const getters = {
  getTransactions: state => {
    return state.items
  }
}

export const mutations = {
  SET_TRANSACTION_ITEMS(state, payload) {
    state.items = payload
  },
  UPDATE_TRANSACTION_ITEMS(state, payload) {
    const foundIndex = state.items.findIndex(item => item._id === payload._id)
    state.items[foundIndex].status = payload.status
  }
}

export const actions = {
  async fetchTransactions({commit}) {
    try{
      const {data} = await TransactionService.fetchTransactions()
      commit('SET_TRANSACTION_ITEMS', data)
    }catch(e){
      console.log(e)
    }
  },
  async fetchUserTransactions({commit}) {
    try{
      const {data} = await TransactionService.getUserTransactions()
      commit('SET_TRANSACTION_ITEMS', data)
    }catch(e){
      console.log(e)
    }
  },
  async addTransactions({commit}, payload) {
    try{
      const {data} = await TransactionService.addTransactions(payload)
      commit('ADD_TRANSACTION_ITEMS', data)
    }catch(e){
      console.log(e)
    }
  },
  async changeTransactionToDelivered({commit}, transactionId) {
    const payload = {transactionId}
    try{
      const {data} = await TransactionService.setTransactionToDelivered(payload)
      commit('UPDATE_TRANSACTION_ITEMS', data)
    }catch(e){
      console.log(e)
    }
  }
}