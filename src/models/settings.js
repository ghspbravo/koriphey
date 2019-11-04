import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

export const settings = {

  loadSettings: thunk(async (actions, payload) => {
    const success = await fetch(API[CURRENT_PROFILE] + 'Settings/GetSettings', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.settingsSet(data);
      })
      .catch(console.error)

    return success
  }),

  settingsSet: action((state, payload) => {
    return {
      ...state,
      ...payload
    }
  }),

}

export default settings