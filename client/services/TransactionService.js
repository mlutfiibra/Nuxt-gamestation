import myService from '.'

export default {
  fetchTransactions() {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get(`/transactions`)
  },
  getUserTransactions() {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get(`/transactions/user-transaction`)
  },
  getTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  addTransactions(payload) {
    return myService.post('/transactions', payload)
  },
  setTransactionToDelivered() {
    myService.defaults.headers.common['token'] = localStorage.token
    return myService.patch(`/transactions/change/delivered`)
  }
}