import myService from '.'

export default {
  getUserTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  getUserData(id) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get(`users/${id}`)
  },
  updateUser(payload) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.put(`users/${id}`, payload)
  }
}