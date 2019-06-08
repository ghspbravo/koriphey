import { action, thunk } from 'easy-peasy'

export const settings = {
  projectDescription: '',

  projectDescriptionLoad: thunk(async (actions, payload) => {
    const success = await fetch(process.env.REACT_APP_API + 'Settings/GetProjectDescription', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.projectDescriptionSet(data)
      })
      .catch(console.error)

    return success
  }),

  projectDescriptionSet: action((state, payload) => {
    state.projectDescription = payload
  }),

}

export default settings