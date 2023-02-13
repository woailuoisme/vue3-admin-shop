import client from './http.client'

class AuthService {
  static login(data = {}) {
    return client.instance().post('/auth/login', {
      name: data.name,
      password: data.password,
    })
  }

  static logout() {
    return client.instance(true).post('/auth/logout')
  }

  static me() {
    return client.instance(true).post('/auth/me')
  }
}

export default AuthService
