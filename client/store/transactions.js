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
  }
}

export const actions = {
  async fetchTransactions({commit}) {
    try{
      console.log('amsfsfdf');
      const {data} = await TransactionService.fetchTransactions()
      console.info('actions', data);
      commit('SET_TRANSACTION_ITEMS', data)
    }catch(e){
      console.log(e)
    }
  }
}