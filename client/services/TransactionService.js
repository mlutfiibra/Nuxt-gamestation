import myService from '.'

export default {
  getTransactions() {
    return myService.get(`/transactions`)
  },
  getTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  addTransactions(payload) {
    return myService.post('/transactions', payload)
  }
}