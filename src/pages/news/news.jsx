import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';
import newsItem from '../../components/newsItem/newsItem';

import { useStore, useActions } from 'easy-peasy';
import parse from 'html-react-parser'
import formatDate from '../../functions/formatDate';

export default function News() {
  const newsList = useStore(store => store.news.newsList)
  const requestList = useStore(store => store.requests.requestList)

  const toggleLike = useActions(actions => actions.news.toggleLike)
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
                    {newsItem(
                      item.id,
                      item.title,
                      item.announce ? <p>{item.announce}</p> : parse(item.content),
                      item.imagePrewiew,
                      {
                        likesCount: 0,
                        commentsCount: 0
                      },
                      item.updatedAt,
                      () => toggleLike(item.id)
                    )}
                  </div>)
                  : <div className="px-2">
                    <p>Loading...</p>
                  </div>
                }
              </div>
            )}
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
                      photo: item.user.photo ? item.user.photo : "https://picsum.photos/50",
                      name: `${item.user.firstName} ${item.user.surName}`,
                      location: `${item.user.city && item.user.city.country.nameRU}, ${item.user.city && item.user.city.nameRU}`
                    },
                    {
                      category: item.category.name,
                      location: item.location && item.location.city.nameRu,
                      expiredAt: item.expiredAt && formatDate(item.expiredAt)
                    },
                    item.text,
                    item.album && item.album.photos.length > 0 && item.album.photos[0].preview,
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
