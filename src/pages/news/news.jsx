import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';
import newsItem from '../../components/newsItem/newsItem';

export default function news() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div>
            {cardBlock(
              <h2>Последние новости</h2>,
              <div className="list-card no-padding">
                {Array(9).fill().map((item, index) => <div key={index} className="card">
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
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Последние запросы</h2>,
              <div className="list-card no-padding">
                {Array(3).fill().map((item, index) => <div key={index} className="card">
                  {requestItem(
                    {
                      photo: "https://picsum.photos/50",
                      name: "Елена Алексеевна",
                      location: "Москва, Россия"
                    },
                    {
                      category: "путешествия",
                      location: "Новосибирск"
                    },
                    "Ребята, буду в Новосибирске проездом. Посоветуйте, чем там можно заняться?.."
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
