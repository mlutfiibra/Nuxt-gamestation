import myService from '.'

export default {
  getCarts() {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get('/carts')
  },
  addCart(payload) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.post('/carts', payload)
  },
  removeCart(id) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.delete(`/carts/${id}`)
  }
}