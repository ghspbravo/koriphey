import React from 'react'
import { Link } from 'react-router-dom'
import personItem from '../../components/personItem/personItem';
import cardBlock from '../../components/cardBlock/cardBlock';

import { useStore } from 'easy-peasy';

export default function Peoples() {
  const userList = useStore(store => store.profile.userList)

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
                  {userList.length !== 0
                    ? userList.map((item, index) => <div key={index} className="col-md-6">
                      <div style={{height: '100%'}} className="card">
                        {personItem(
                          item.id,
                          `${item.firstName} ${item.surName}`,
                          `${item.city && item.city.country.nameRU}, ${item.city && item.city.nameRU}`,
                          {
                            graduationYear: item.graduationYear,
                            categories: ""
                          },
                          item.photo ? item.photo : "https://picsum.photos/50",
                        )}
                      </div>
                    </div>)
                    : <div className="px-2">
                      <p>Loading...</p>
                    </div>}
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
