import myService from '.'

export default {
  getTransactions() {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get(`/transactions`)
  },
  getTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  addTransactions(payload) {
    return myService.post('/transactions', payload)
  }
}