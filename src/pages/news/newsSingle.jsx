import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import newsItem from '../../components/newsItem/newsItem';
import { feedbackLike, feedbackComment } from '../../components/feedback/feedback';
import timeRelate from '../../components/timeRelate/timeRelate';

import { useStore, useActions } from 'easy-peasy';
import parse from 'html-react-parser'
import useInput from '../../hooks/useInput';
import formatDate from '../../functions/formatDate';

export default function NewsSingle(router) {
  const newsId = router.match.params.id

  const newsList = useStore(store => store.news.newsList)

  const getNewsContent = useActions(actions => actions.news.loadNewsItem)
  const [news, setNews] = useState({})

  async function loadNewsContent() {
    const newsContent = await getNewsContent(newsId)
    setNews(newsContent)
  }

  useEffect(() => {
    loadNewsContent()
    // eslint-disable-next-line
  }, [newsId])

  const loadNews = useActions(actions => actions.news.loadNews)

  const toggleLike = useActions(actions => actions.news.toggleLike)
  const likeHandler = (id) => {
    toggleLike(id).then(status => {
      if (status === 200) {
        loadNewsContent()
        loadNews()
      }
      else alert('Ошибка лайка')
    })
  }
  const user = useStore(store => store.profile.user)

  const { value: commentText, bind: commentBind, reset: commentReset } = useInput('')

  const comment = useActions(actions => actions.news.commentNews)
  const submitCommentHandler = () => {
    if (!commentText) return
    comment({
      newsId: newsId,
      comment: commentText
    }).then(responseStatus => {
      if (responseStatus === 200) {
        loadNewsContent()
        loadNews()
        commentReset()

      } else alert('Ошибка отправки комментария')
    })
  }

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
                    <button className="no-style" onClick={() => likeHandler(newsId)}>
                      {feedbackLike(news.likeCount, news.hasLike)}
                    </button>
                    <div className="ml-2">
                      {feedbackComment(news.newsComments && news.newsComments.length)}
                    </div>

                    <div className="ml-auto">
                      {news && news.createdAt ? formatDate(news.createdAt) : '...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-2">
            {cardBlock(
              <h2>Обсуждения</h2>,
              <div className="no-padding">
                <div className="list-card">
                  {news.newsComments && news.newsComments.length > 0
                    ? news.newsComments.map((item, index) => <div key={index} className="card list-card-item">
                      <div className="comment">

                        <div className="row no-gutters media-person">
                          <div className="media-person__photo">
                            <img src={item.user.photo} alt="person" />
                          </div>

                          <div className="comment__content col">
                            <div className="media-person__body">
                              <div className="media-person__name">
                                <span>{item.user.firstName} {item.user.surName}</span>
                              </div>
                            </div>
                            <p>{item.text}</p>
                          </div>
                        </div>

                        <div className="row no-gutters">
                          <div className="ml-auto">
                            {timeRelate(item.timeStamp)}
                          </div>
                        </div>

                      </div>
                    </div>
                    )
                    : <div className="px-2">
                      <p>К новости пока нет комментариев</p>
                    </div>
                  }
                </div>

                <div className="row align-items-center no-gutters mt-2 mx-2">
                  <div className="mr-1 media-person__photo d-none d-md-block">
                    <img src={user && user.photo} alt="person" />
                  </div>

                  <div className="col">
                    <textarea {...commentBind} className="w-100" placeholder="Напишите комментарий" type="text" />
                  </div>

                  <button style={{
                    fontSize: '24px'
                  }} onClick={submitCommentHandler} className="no-style ml-1"><i className="fab fa-telegram-plane"></i></button>

                </div>
              </div>
            )}
          </div>
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
