import { action, thunk } from 'easy-peasy'

export const requests = {
  requestList: [],
  userRequestList: [],

  categoriesList: [],

  createRequest: thunk(async (actions, payload, { getStoreState }) => {
    const data = {
      // "id": 0,
      "text": payload.content,
      // "expiredAt": payload.expiredDate,
      // "files": [
      //   {}
      // ],
      "categoryId": parseInt(payload.category),
      // "location": {
      //   "cityId": 0,
      //   "city": "string",
      //   "lontitude": "string",
      //   "latitude": "string"
      // },
      // "requestLocationId": 0
    }
    const success = await fetch(process.env.REACT_APP_API + 'Request/Create', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status !== 200) throw new Error('code: ' + response.status)
      return response.json()
    })
      .then(data => {
        return data
      })
      .catch((e) => window.alert(e.message))

    return success
  }),

  loadCategories: thunk(async (actions, payload) => {
    const success = await fetch(process.env.REACT_APP_API + 'Request/Categories', {
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

  loadRequests: thunk(async (actions, payload) => {
    const success = await fetch(process.env.REACT_APP_API + 'Request/List?page=1&count=20', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.appendInRequestList(data.requests)
      })
      .catch(window.alert)

    return success
  }),

  appendInRequestList: action((state, payload) => {
    payload.forEach(request => state.requestList.push(request))
  }),

  appendInCategoriesList: action((state, payload) => {
    payload.forEach(category => state.categoriesList.push(category))
  }),

}

export default requests