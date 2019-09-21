import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

export const requests = {
  requestList: [],
  userRequestList: [],
  hasNextPage: false,

  categoriesList: [],

  createRequest: thunk(async (actions, payload, { getStoreState, dispatch }) => {

    const success = await fetch(API[CURRENT_PROFILE] + 'Request/Create', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
      body: payload
    }).then(response => {
      if (response.status !== 200) throw new Error('code: ' + response.status)
      return response.json()
    })
      .then(data => {
        actions.clearRequestsList();
        dispatch.requests.loadRequests();
        return true;
      })
      .catch((e) => window.alert(e.message))

    return success
  }),

  loadCategories: thunk(async (actions, payload) => {
    const success = await fetch(API[CURRENT_PROFILE] + 'Request/Categories', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.appendInCategoriesList(data)
      })
      .catch(console.error)

    return success
  }),

  loadRequests: thunk(async (actions, payload, { getStoreState }) => {
    const page = payload || 1
    const success = await fetch(API[CURRENT_PROFILE] + `Request/List?page=${page}&count=20`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.json())
      .then(data => {
        actions.appendInRequestList(data)
        return data.isExistNextPage
      })
      .catch(window.alert)

    return success
  }),

  loadFilterRequests: thunk(async (actions, payload, { getStoreState }) => {
    const data = await fetch(API[CURRENT_PROFILE]
      + `Request/List?page=1&count=100${payload.countryId ? `&country=${payload.countryId}` : ''}${payload.cityId ? `&city=${payload.cityId}` : ''}${payload.categoryId ? `&categoryId=${payload.categoryId}` : ''}${payload.competence ? `&competenceId=${payload.competence}` : ''}${payload.hobbie ? `&hobbyId=${payload.hobbie}` : ''}${payload.suggest ? `&utilityId=${payload.suggest}` : ''}${payload.searchQuery ? `&searchString=${payload.searchQuery}` : ''}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getStoreState().auth.access}`
        },
      }).then(response => response.json())
      .then(data => {
        // actions.appendInRequestList(data.requests)
        return data.requests
      })
      .catch(window.alert)

    return data
  }),

  loadUserRequests: thunk(async (actions, payload, { getStoreState }) => {
    const response = await fetch(API[CURRENT_PROFILE] + 'Request/UserList?page=1&count=20', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.json())
      .then(data => {
        return data.requests
      })
      .catch(window.alert)

    return response
  }),

  loadRequestItem: thunk(async (actions, payload, { getStoreState }) => {
    const response = await fetch(API[CURRENT_PROFILE] + `Request/Details?id=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.json())
      .then(data => {
        return data
      })
      .catch(window.alert)

    return response
  }),

  loadSimilarRequests: thunk(async (actions, payload, { getStoreState }) => {
    const response = await fetch(API[CURRENT_PROFILE] + `Request/Similar?id=${payload}&count=3`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.json())
      .then(data => {
        return data.requests
      })
      .catch(window.alert)

    return response
  }),

  appendInRequestList: action((state, payload) => {
    payload.requests.forEach(request => state.requestList.push(request))
    state.hasNextPage = payload.isExistNextPage
  }),

  clearRequestsList: action((state, payload) => {
    state.requestList = [];
  }),

  appendInCategoriesList: action((state, payload) => {
    payload.forEach(category => state.categoriesList.push(category))
  }),

}

export default requests