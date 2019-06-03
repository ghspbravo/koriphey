import { action, thunk } from 'easy-peasy'

export const auth = {
  isAuth: false,
  access: '',

  requestChangePassword: thunk(async (actions, payload) => {
    const success = await fetch(process.env.REACT_APP_API + `Account/ResetPassword?email=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.status !== 200) throw new Error('invalid')
      return true
    })
      .catch(error => error.message)

    return success
  }),

  requestToken: thunk(async (actions, payload) => {
    const data = {
      email: payload.username,
      password: payload.password
    }

    const success = await fetch(process.env.REACT_APP_API + 'Account/Login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status !== 200) throw new Error('not found')
      return response.json()
    })
      .then(response => {
        response !== undefined &&
          actions.login(response)
        return true
      })
      .catch(error => error.message)

    return success
  }),

  login: action((state, payload) => {
    localStorage.setItem('token', payload)
    state.access = payload
    state.isAuth = true
  }),

  logout: action((state) => {
    localStorage.removeItem('token')
    state.isAuth = false

  }),
}

export default auth