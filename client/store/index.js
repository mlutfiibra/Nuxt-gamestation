export const state = () => ({
  user: {
    id:'',
    name:'',
    email: '',
    role: '',
    address: null,
    phone: null,
    totalPayment: 0
  },
  isLoggedIn: false,
  isAdministrator: false,
  carts: [],
  products: [],
  loading: false
})

export const SET_LOADING = (state, condition) => state.loading = condition