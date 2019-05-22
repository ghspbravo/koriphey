import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

export default function requests() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {cardBlock(
            <div className="search">
              <Link to='/search/requests' className="search__icon no-style"><i className="fas fa-search"></i></Link>
              <input placeholder="Поиск по запросам" className="search__input" type="text" name="search" />
            </div>,
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
