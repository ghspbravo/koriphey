import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

export const settings = {
  projectDescription: '',

  projectDescriptionLoad: thunk(async (actions, payload) => {
    const success = await fetch(API[CURRENT_PROFILE] + 'Settings/GetSettings', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.projectDescriptionSet(data.ProjectDescription);
      })
      .catch(console.error)

    return success
  }),

  projectDescriptionSet: action((state, payload) => {
    state.projectDescription = payload
  }),

}

export default settings