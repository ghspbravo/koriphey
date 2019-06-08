import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import newsItem from '../../components/newsItem/newsItem';
import { feedbackLike, feedbackComment } from '../../components/feedback/feedback';
import timeRelate from '../../components/timeRelate/timeRelate';

import { useStore, useActions } from 'easy-peasy';
import parse from 'html-react-parser'

export default function NewsSingle(router) {
  const newsId = router.match.params.id

  const newsList = useStore(store => store.news.newsList)

  const getNewsContent = useActions(actions => actions.news.loadNewsItem)
  const [news, setNews] = useState({})
  useEffect(() => {
    async function loadNewsContent() {
      const newsContent = await getNewsContent(newsId)
      setNews(newsContent)
    }
    loadNewsContent()
  }, [newsId, getNewsContent])

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div>
            {cardBlock(
              <button className="link" onClick={router.history.goBack}><i className="fas fa-angle-double-left"></i> Назад</button>,
              <div className="news">
                <div className="news-title">
                  <p className="big alternative">{news && news.title ? news.title : '...'}</p>
                </div>

                <div className="news-body my-1">
                  {news.imagePrewiew &&
                    <div style={{ position: 'relative' }}>
                      <img src={news.imagePrewiew} alt="" />
                    </div>}

                  {news && news.content ? parse(news.content) : '...'}
                </div>

                <div className="news-meta">
                  <div className="row no-gutters">
                    <div>
                      {feedbackLike(0)}
                    </div>
                    <div className="ml-2">
                      {feedbackComment(0)}
                    </div>

                    <div className="ml-auto">
                      {news && news.updatedAt ? timeRelate(news.updatedAt) : '...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="mt-2">
            {cardBlock(
              <h2>Обсуждения</h2>,
              <div className="no-padding">
                <div className="list-card">
                  {Array(3).fill().map((item, index) => <div key={index} className="card list-card-item">
                    <div className="comment">

                      <div className="row no-gutters media-person">
                        <div className="media-person__photo">
                          <img className="not-responsive" src={thumbnail} alt="person" />
                        </div>

                        <div className="comment__content col">
                          <div className="media-person__body">
                            <div className="media-person__name">
                              <span>Елена Алексеевна</span>
                            </div>
                          </div>
                          <p>Самое главное, чему меня научил Александр, - это умение бороться, ведь в современной жизни без этого никуда! Школа, безусловно, закалила мой характер - теперь уже не страшны ни бессонные ночи, ни огромные задания.</p>
                        </div>
                      </div>

                      <div className="row no-gutters">
                        <div className="ml-auto">
                          {timeRelate(postDate)}
                        </div>
                      </div>

                    </div>
                  </div>
                  )}
                </div>

                <div className="row align-items-center no-gutters mt-2 mx-2">
                  <div className="mr-1 media-person__photo d-none d-md-block">
                    <img className="not-responsive" src={thumbnail} alt="person" />
                  </div>

                  <div className="col">
                    <textarea className="w-100" placeholder="Напишите комментарий" type="text" />
                  </div>

                  <button style={{
                    fontSize: '24px'
                  }} className="no-style ml-1"><i className="fab fa-telegram-plane"></i></button>

                </div>
              </div>
            )}
          </div> */}
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Последние новости</h2>,
              <div className="list-card no-padding">
                {newsList.length !== 0
                  ? newsList.slice(0, 3).map((item, index) => <div key={index} className="card">
                    {newsItem(
                      item.id,
                      item.title,
                      item.announce ? <p>{item.announce}</p> : parse(item.content),
                      item.imagePreviewPath,
                      {
                        likesCount: 0,
                        commentsCount: 0
                      },
                      item.updatedAt
                    )}
                  </div>)
                  : <div className="px-2">
                    <p>Loading...</p>
                  </div>}
                <div className="px-2 mt-2">
                  <Link to='/news'>Все новости <i className="fas fa-angle-double-right"></i></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
