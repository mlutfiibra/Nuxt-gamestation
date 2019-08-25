import myService from '.'

export default {
  getProducts() {
    return myService.get(`/products`)
  },
  getProduct(id) {
    myService.defaults.headers.common['token'] = localStorage.token

    return myService.get(`/products/${id}`)
  },
  searchPrduct(query) {
    return myService.get(`/products/search?q=${query}`)
  },
  createProduct(payload) {
    return myService.post('/products', payload)
  },
  removeProduct(id) {
    return myService.delete(`/products/${id}`)
  }
}