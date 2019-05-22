import { action } from 'easy-peasy'

export const auth = {
  isAuth: false,

  login: action((state) => {
    state.isAuth = true
  }),

  logout: action((state) => {
    state.isAuth = false
  }),
}

export default auth