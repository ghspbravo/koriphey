import React from 'react'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

export default function ProfileRequests(router) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {cardBlock(
            <button className="link" onClick={router.history.goBack}><i className="fas fa-angle-double-left"></i> Назад</button>,
          <div className="no-padding">
            <div className="card-list row">
              {Array(9).fill().map((item, index) => <div key={index} className="col-md-6">
                <div className="card">
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
                    "Ребята, буду в Новосибирске проездом. Посоветуйте, чем там можно заняться?..",
                    "https://picsum.photos/150/50"
                  )}
                </div>
              </div>)}
            </div>
          </div>)}
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              <div>

                <p className="big">Локация</p>
                <div>
                  <input className="w-100" type="text" placeholder="Страна" />
                </div>
                <div className="mt-1">
                  <input className="w-100" type="text" placeholder="Город" />
                </div>

                <p className="big">Категория</p>
                <div>
                  <input className="w-100" type="text" placeholder="Категория" />
                </div>

                <div className="row no-gutters mt-1">
                  <button className="ml-auto">Фильтр</button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
