import { action, thunk } from 'easy-peasy'

export const news = {
  newsList: [],

  loadNews: thunk(async (actions, payload) => {
    const success = await fetch(process.env.REACT_APP_API + 'News/List?count=20&page=1', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.appendInNewsList(data)
      })
      .catch(console.error)

    return success
  }),

  loadNewsItem: thunk(async (actions, payload) => {

    const newsContent = await fetch(process.env.REACT_APP_API + `News/Details?id=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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

  toggleLike: thunk(async (actions, payload) => {
    const success = await fetch(process.env.REACT_APP_API + `News/AddRemoveLike?newsId=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.status)
      .catch(console.error)

    return success
  }),

  commentNews: thunk(async (actions, payload) => {
    const data = {
      "newsId": payload.newsId,
      "text": payload.comment
    }
    const success = await fetch(process.env.REACT_APP_API + 'News/AddComment', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.status)
      .catch(console.error)

    return success
  }),

}

export default news