import http from './request.js'

const login = (param) => {return http(param, '/login')}

export default {
  login
}