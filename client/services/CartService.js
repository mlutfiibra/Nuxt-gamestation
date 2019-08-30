import myService from '.'
import {getCookieByName} from '@/helpers/cookie'

export default {
  getCarts() {
    myService.defaults.headers.common['token'] = getCookieByName('token')

    return myService.get('/carts')
  },
  addCart(payload) {
    myService.defaults.headers.common['token'] = getCookieByName('token')

    return myService.post('/carts', payload)
  },
  removeCart(id) {
    myService.defaults.headers.common['token'] = getCookieByName('token')

    return myService.delete(`/carts/${id}`)
  }
}