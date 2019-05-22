import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import newsItem from '../../components/newsItem/newsItem';
import { feedbackLike, feedbackComment } from '../../components/feedback/feedback';
import timeRelate from '../../components/timeRelate/timeRelate';

export default function newsSingle(router) {

  const title = "О трудоустройстве",
    content = "Нью-Йорк идеален для работы и карьеры, я уже писал почему. До приезда сюда я работал и в офисе, и был полтора года на фрилансе и вот опять вернулся в офис. За этот год снова убедился, что я совсем не офисный человек. Потому на вершине успеха я решил закончить свою карьеру веб-дизайнера. Работать только ради денег я не умею. Опыт работы тут бесценный, но когда для меня карьера перестала быть приоритетом я снова решил, что больше нет смысла сидеть в офисе, хоть даже и в Нью-Йорке.",
    thumbnail = "https://picsum.photos/700/350",
    feedback = {
      likesCount: 650,
      commentsCount: 2
    },
    postDate = new Date("2019-05-19")
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div>
            {cardBlock(
              <button className="link" onClick={router.history.goBack}><i className="fas fa-angle-double-left"></i> Назад</button>,
              <div className="news">
                <div className="news-title">
                  <p className="big alternative">{title}</p>
                </div>

                <div className="news-body my-1">
                  <p>{content}</p>

                  {thumbnail &&
                    <div style={{ position: 'relative' }}>
                      <img src={thumbnail} alt="" />
                    </div>}
                </div>

                <div className="news-meta">
                  <div className="row no-gutters">
                    <div>
                      {feedbackLike(feedback.likesCount)}
                    </div>
                    <div className="ml-2">
                      {feedbackComment(feedback.commentsCount)}
                    </div>

                    <div className="ml-auto">
                      {timeRelate(postDate)}
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
                    <img className="not-responsive" src={thumbnail} alt="person"/>
                  </div>

                  <div className="col">
                    <textarea className="w-100" placeholder="Напишите комментарий" type="text"/>
                  </div>

                  <button style={{
                    fontSize: '24px'
                  }} className="no-style ml-1"><i className="fab fa-telegram-plane"></i></button>

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
                {Array(3).fill().map((item, index) => <div key={index} className="card">
                  {newsItem(
                    1,
                    "О трудоустройстве",
                    "Нью-Йорк идеален для работы и карьеры, я уже писал почему. До приезда сюда я работал и в офисе, и был полтора года на фрилансе и вот опять вернулся в офис. За этот год снова убедился, что я совсем не офисный человек. Потому на вершине успеха я решил...",
                    "https://picsum.photos/700/350",
                    {
                      likesCount: 650,
                      commentsCount: 2
                    },
                    new Date("2019-05-01")
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
