import myService from '.'

export default {
  getTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  addTransactions(payload) {
    return myService.post('/transactions', payload)
  }
}