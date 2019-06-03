import { action, thunk } from 'easy-peasy'

export const register = {

  register: thunk(async (actions, payload, { dispatch }) => {
    const data = {
      email: payload.email,
      fio: payload.name,
      birthDate: payload.birthdate,
      password: payload.password,
      graduationYear: payload.graduationYear,
      type: payload.role,
      // work: payload.workPlace,
      // position: payload.workPosition,
      // workStart: payload.workYears,
      // competencies: payload.competences,
      // vkUrl: payload.socialVk,
      // vkUrl: payload.socialFb,
      // instagramUrl: payload.socialInsta,
      // photo: payload.photoFile !== {} ? payload.photoFile : {},
      // about: payload.about,
      // offersToGraduates: payload.suggests,
      // cityId: payload.cityId,
    }

    const success = await fetch(process.env.REACT_APP_API + 'Account/Register', {
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

export default register