import myService from '.'
import {getCookieByName} from '@/helpers/cookie'

export default {
  fetchTransactions() {
    myService.defaults.headers.common['token'] = getCookieByName('token')

    return myService.get(`/transactions`)
  },
  getUserTransactions() {
    myService.defaults.headers.common['token'] = getCookieByName('token')    

    return myService.get(`/transactions/user-transaction`)
  },
  getTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  addTransactions(payload) {
    myService.defaults.headers.common['token'] = getCookieByName('token')    

    return myService.post('/transactions', payload)
  },
  setTransactionToDelivered() {
    myService.defaults.headers.common['token'] = getCookieByName('token')    
    return myService.patch(`/transactions/change/delivered`)
  }
}