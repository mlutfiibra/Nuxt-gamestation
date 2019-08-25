import axios from 'axios'

export default axios.create({
  baseURL: `http://34.87.5.84/`,
  withCredentials: false, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})