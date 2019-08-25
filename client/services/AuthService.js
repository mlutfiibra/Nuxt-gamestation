import myService from '.'

export default {
  login(payload) {
    return myService.post('/login', payload)
  },
  register(payload) {
    return myService.post('/register', payload)
  }
}