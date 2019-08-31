import myService from '.'
import {getCookieByName} from '@/helpers/cookie'

export default {
  getUserTransaction(id) {
    return myService.get(`/transactions/${id}`)
  },
  getUserData(id) {
    myService.defaults.headers.common['token'] = getCookieByName('token')

    return myService.get(`users/${id}`)
  },
  updateUser(payload, id) {
    myService.defaults.headers.common['token'] = getCookieByName('token')

    return myService.put(`users/${id}`, payload)
  }
}