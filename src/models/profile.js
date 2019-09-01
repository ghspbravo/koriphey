import { action, thunk, listen } from 'easy-peasy'
import auth from './auth'
export const profile = {
  user: {},
  userList: [],
  competencesList: [],
  hobbiesList: [],
  suggestsList: [],
  hasNextPage: false,

  resetPassword: thunk(async (actions, payload, { dispatch, getStoreState }) => {

    const data = {
      currentPass: payload.oldPassword,
      newPass: payload.newPassword,
    }
    const success = await fetch(process.env.REACT_APP_API + 'User/PasswordUpdate', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`,
        // 'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status !== 200) {
        if (response.status === 400)
          throw new Error('password')
        if (response.status === 500)
          throw new Error('server error')
      }
      return response.json()
    })
      .then(response => {
        // dispatch.auth.login(response)
        return true
      })
      .catch(error => {
        return error.message
      })
    return success
  }),

  loadPhoto: thunk(async (actions, payload, { dispatch, getStoreState }) => {

    const success = await fetch(process.env.REACT_APP_API + 'User/UpdatePhoto', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
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
        actions.updatePhoto(response.path)
        return true
      })
      .catch(error => {
        return false
      })
    return success
  }),

  updateUser: thunk(async (actions, payload, { dispatch, getStoreState }) => {
    const data = {
      "interests": "",
      "offersToGraduates": "",
      "about": payload.about,
      "cityId": payload.cityId,
      "workExperiencies": payload.works,
      "educations": payload.educations,
      "graduationYear": payload.graduationYear,
      "competencies": payload.competences,
      "hobbies": payload.hobbies,
      "utilities": payload.suggests,
      "vkUrl": payload.socialVk,
      "instagramUrl": payload.socialInsta,
      "facebookUrl": payload.socialFb
    }
    const success = await fetch(process.env.REACT_APP_API + 'User/UpdateProfile', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`,
        // 'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      // body: payload
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
        // actions.getUser()
        actions.setUser(response)
        return true
      })
      .catch(error => {
        return error.message
      })
    return success
  }),


  commentUser: thunk(async (actions, payload, { getStoreState }) => {
    const data = await fetch(process.env.REACT_APP_API + `User/AddReview?TargetUserId=${payload.id}&Text=${payload.reviewText}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      }
    }).then(response => response.status)
      .catch(console.error)

    return data

  }),

  getUserById: thunk(async (actions, payload, { getStoreState }) => {
    const data = await fetch(process.env.REACT_APP_API + `User/Details?id=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      }
    }).then(response => response.json())
      .then(response => {
        return response
      })
      .catch(console.error)

    return data

  }),

  getUser: thunk(async (actions, payload, { getStoreState, dispatch }) => {
    const status = await fetch(process.env.REACT_APP_API + 'User/Profile', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      }
    }).then(response => {
      if (response.status === 401) throw new Error()
      return response.json()
    })
      .then(response => {
        actions.setUser(response)

        return true
      })
      .catch(dispatch.auth.logout)

    return status

  }),

  getUserList: thunk(async (actions, payload, { getStoreState }) => {
    const page = payload || 1
    const status = await fetch(process.env.REACT_APP_API + `User/List?page=${page}&count=20`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      }
    }).then(response => response.json())
      .then(data => {
        actions.appendInUserList(data)
        return data.isExistNextPage
      })
      .catch(console.error)

    return status

  }),

  getFilterUserList: thunk(async (actions, payload, { getStoreState }) => {
    const status = await fetch(process.env.REACT_APP_API +
      `User/List?page=1&count=1000${payload.hobbies ? `&hobby=${payload.hobbies}` : ''}${payload.suggests ? `&utility=${payload.suggests}` : ''}${payload.competences ? `&competence=${payload.competences}` : ''}${payload.graduationYear ? `&graduationYear=${payload.graduationYear}` : ''}${payload.name ? `&name=${payload.name}` : ''}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getStoreState().auth.access}`
        }
      }).then(response => response.json())
      .then(response => response.news)
      .catch(console.error)

    return status

  }),

  setUser: action((state, payload) => {
    state.user = payload
  }),

  // action on logout
  listeners: listen((on) => {

    // Action handler
    on(auth.logout, action((state) => {
      state.user = {}
    }))
  }),

  appendInUserList: action((state, payload) => {
    payload.news.forEach(user => state.userList.push(user))
    state.hasNextPage = payload.isExistNextPage
  }),

  getSuggestsList: thunk(async (actions, payload) => {
    const status = await fetch(process.env.REACT_APP_API + 'utilities', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(data => {
        actions.appendInSuggestsList(data)
      })
      .catch(console.error)

    return status

  }),

  appendInSuggestsList: action((state, payload) => {
    payload.forEach(suggest => state.suggestsList.push(suggest))
  }),

  getHobbiesList: thunk(async (actions, payload) => {
    const status = await fetch(process.env.REACT_APP_API + 'hobbies', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(data => {
        actions.appendInHobbiesList(data)
      })
      .catch(console.error)

    return status

  }),

  appendInHobbiesList: action((state, payload) => {
    payload.forEach(hobbie => state.hobbiesList.push(hobbie))
  }),

  getCompetencesList: thunk(async (actions, payload) => {
    const status = await fetch(process.env.REACT_APP_API + 'competencies', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(data => {
        actions.appendInCompetencesList(data)
      })
      .catch(console.error)

    return status

  }),

  appendInCompetencesList: action((state, payload) => {
    payload.forEach(competence => state.competencesList.push(competence))
  }),

  updatePhoto: action((state, payload) => {
    state.user.photo = payload
  }),
}

export default profile