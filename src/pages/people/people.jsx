import React from 'react'
import { Link } from 'react-router-dom'
import personItem from '../../components/personItem/personItem';
import cardBlock from '../../components/cardBlock/cardBlock';

export default function peoples() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div>
            {cardBlock(
              <div className="search">
                <Link to='/search/people' className="search__icon no-style"><i className="fas fa-search"></i></Link>
                <input placeholder="Поиск по людям" className="search__input" type="text" name="search" />
              </div>,
              <div className="no-padding">
                <div className="card-list row">
                  {Array(9).fill().map((item, index) => <div key={index} className="col-md-6">
                    <div className="card">
                      {personItem(
                        1,
                        "Елена Алексеева",
                        "Москва, Россия",
                        {
                          graduationYear: 2012,
                          categories: "Путешестия, Спорт, Иностранные языки"
                        },
                        "https://picsum.photos/200"
                      )}
                    </div>
                  </div>)}
                </div>
              </div>)}
          </div>
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

                <p className="big">Роль</p>
                <div>
                  <input className="w-100" type="text" placeholder="Роль" />
                </div>

                <p className="big">Год выпуска</p>
                <div>
                  <input className="w-100" type="text" placeholder="Год выпуска" />
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
