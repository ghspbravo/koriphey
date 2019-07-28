import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

import { useStore, useActions } from 'easy-peasy';
import parse from 'html-react-parser'
import formatDate from '../../functions/formatDate';
import newsListItem from '../../components/newsItem/newsListItem';

export default function News() {
  const [currentPage, currentPageSet] = useState(1)
  const nextPageHandler = async (e) => {
    const target = e.target
    target.disabled = true
    currentPageSet(currentPage + 1)
    const hasNextPage = await loadNews(currentPage + 1)
    if (!hasNextPage) currentPageSet(null)
    target.disabled = false
  }

  const newsList = useStore(store => store.news.newsList)
  const hasNextPage = useStore(store => store.news.hasNextPage)
  const requestList = useStore(store => store.requests.requestList)

  const loadNews = useActions(actions => actions.news.loadNews)

  const toggleLike = useActions(actions => actions.news.toggleLike)
  const likeHandler = async (id) => {
    const status = await toggleLike(id)
    if (status === 200) {
      // loadNews()
    }
    else alert('Ошибка лайка')
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div>
            {cardBlock(
              <h2>Новости</h2>,
              <div className="list-card no-padding">
                {newsList.length !== 0
                  ? newsList.map((item, index) => <div key={index} className="card">
                    {newsListItem(
                      item.id,
                      item.title,
                      item.announce ? <p>{item.announce}</p> : parse(item.content),
                      item.imagePreview,
                      {
                        likesCount: item.likeCount,
                        commentsCount: item.newsComments.length
                      },
                      item.createdAt,
                      () => likeHandler(item.id),
                      item.hasLike
                    )}
                  </div>)
                  : <div className="px-2">
                    <p>Loading...</p>
                  </div>
                }
              </div>
            )}
          </div>
          <div className="row justify-content-center">
            {!hasNextPage
              ? null
              : <button onClick={nextPageHandler} className="mt-2">Показать больше</button>
            }
          </div>
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Последние запросы</h2>,
              <div className="list-card no-padding">
                {requestList && requestList.slice(0, 3).map((item, index) => <div key={index} className="card">
                  {requestItem(
                    {
                      id: item.user.id,
                      photo: item.user.photo,
                      name: `${item.user.firstName} ${item.user.surName}`,
                      location: `${item.user.city && item.user.city.country.nameRU}, ${item.user.city && item.user.city.nameRU}`
                    },
                    {
                      category: item.category && item.category.name,
                      location: item.location && item.location.city.nameRu,
                      expiredAt: item.expiredAt && formatDate(item.expiredAt)
                    },
                    item.text,
                    item.album && item.album.photos.length > 0 && item.album.photos[0].fullPreview,
                    item.id
                  )}
                </div>)}
                <div className="px-2 mt-2">
                  <Link to='/requests'>Все запросы <i className="fas fa-angle-double-right"></i></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
