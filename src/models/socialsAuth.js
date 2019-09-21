import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

export const socialsAuth = {

  externalRegister: thunk(async (actions, payload, { dispatch }) => {
    const success = await fetch(API[CURRENT_PROFILE] + 'Account/ExternalRegister', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/json'
      },
      body: payload
    }).then(response => {
      if (response.status !== 200) {
        if (response.status === 400)
          throw new Error('email')
        if (response.status === 500)
          throw new Error('server error')
      }
      return response.json()
    })
      .then(response => {
        dispatch.auth.login(response)
        return true
      })
      .catch(error => {
        return error.message
      })
    return success
  })


}

export default socialsAuth