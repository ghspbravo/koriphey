import { action, thunk } from 'easy-peasy'

export const news = {
  newsList: [],

  loadNews: thunk(async (actions, payload, { getStoreState }) => {
    const page = payload || 1
    const success = await fetch(process.env.REACT_APP_API + `News/List?count=10&page=${page}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.json())
      .then(data => {
        actions.appendInNewsList(data)
        return data.isExistNextPage
      })
      .catch(console.error)

    return success
  }),

  loadNewsItem: thunk(async (actions, payload, { getStoreState }) => {

    const newsContent = await fetch(process.env.REACT_APP_API + `News/Details?id=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => {
      let newsContent = {}
      try {
        newsContent = response.json()
      } catch (error) { console.error(error) }
      finally {
        return newsContent
      }
    }).catch(console.error)

    return newsContent
  }),

  appendInNewsList: action((state, payload) => {
    payload.forEach(news => state.newsList.push(news))
  }),

  setNewsList: action((state, payload) => {
    state.newsList = []
    payload.forEach(news => state.newsList.push(news))
  }),

  toggleLike: thunk(async (actions, payload, { getStoreState }) => {
    const success = await fetch(process.env.REACT_APP_API + `News/AddRemoveLike?newsId=${payload}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.status)
      .catch(window.alert)

    return success
  }),

  commentNews: thunk(async (actions, payload, { getStoreState }) => {
    const success = await fetch(process.env.REACT_APP_API + `News/AddComment/?newsId=${payload.newsId}&text=${payload.comment}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      },
    }).then(response => response.status)
      .catch(console.error)

    return success
  }),

}

export default news