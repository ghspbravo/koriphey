import { action } from 'easy-peasy'

export const search = {
  query: '',

  queryChange: action((state, payload) => {
    state.query = payload
  })
}

export default search