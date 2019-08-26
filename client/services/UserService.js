import myService from '.'

export default {
  getUser(id) {
    return myService.get(`/transactions/${id}`)
  },
  setUserData(id) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get(`users/${id}`)
  },
  updateUser(payload) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.put(`users/${id}`, payload)
  }
}