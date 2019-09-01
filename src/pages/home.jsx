import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../components/cardBlock/cardBlock';
import requestItem from '../components/requestItem/requestItem';

import cityStatsMap from '../components/cityStats/cityStatsMap';
import cityStats from '../components/cityStats/cityStats';
import { WorkDoughnutChart, HobbiesDoughnutChart } from '../components/charts/charts';

import { useStore, useActions } from 'easy-peasy';
import parse from 'html-react-parser'
import newsListItem from '../components/newsItem/newsListItem';
import registeredStats from '../components/registeredStats/registeredStats';

export default function Home() {
  const newsList = useStore(store => store.news.newsList)
  const requestList = useStore(store => store.requests.requestList)

  const loadNews = useActions(actions => actions.news.loadNews)

  const toggleLike = useActions(actions => actions.news.toggleLike)
  const likeHandler = (id) => {
    toggleLike(id).then(status => {
      if (status === 200) {
        loadNews()
      }
      else alert('Ошибка лайка')
    })
  }
  return (
    <div className="container">

      <div className="col-12 mb-2 px-0">
        {cardBlock(
          <h2>Карта выпускников</h2>,
          <div className="row">
            <div className="col-md-9 mb-2 mb-md-0">
              {cityStatsMap()}
            </div>

            <div className="col-md-3">
              {cityStats()}
            </div>

          </div>
        )}
      </div>
      <div className="row d-xl-none d-none d-lg-flex">
        <div className="col-md-6 mb-2">
          {cardBlock(
            <h2>Области занятости</h2>,
            WorkDoughnutChart()
          )}
        </div>

        <div className="col-md-6 mb-2">
          {cardBlock(
            <h2>Увлечения</h2>,
            HobbiesDoughnutChart()
          )}
        </div>

        <div className="col-12 mb-2">
          {cardBlock(<h2>Всего зарегистрировано</h2>,
            registeredStats()
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-md-6 mb-2 d-lg-none d-xl-block">
              {cardBlock(
                <h2>Области занятости</h2>,
                WorkDoughnutChart()
              )}
            </div>

            <div className="col-md-6 mb-2 d-lg-none d-xl-block">
              {cardBlock(
                <h2>Увлечения</h2>,
                HobbiesDoughnutChart()
              )}
            </div>

            <div className="col-12 mb-2">
              {cardBlock(<h2>Всего зарегистрировано</h2>,
                registeredStats()
              )}
            </div>

            <div className="col-12">
              {cardBlock(
                <h2>Последние новости</h2>,
                <div className="list-card no-padding">
                  {newsList.length !== 0
                    ? newsList.slice(0, 3).map((item, index) => <div key={index} className="card">
                      {
                        newsListItem(
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
                  <div className="px-2 mt-2">
                    <Link to='/news'>Все новости <i className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              )}
            </div>
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
                      location: item.location && item.location.city.nameRU,
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
