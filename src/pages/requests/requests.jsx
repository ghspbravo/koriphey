import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

import { useStore } from 'easy-peasy';

export default function Requests() {
  const requestList = useStore(store => store.requests.requestList)
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
                {requestList.length !== 0
                  ? requestList.map((item, index) => <div key={index} className="col-md-6">
                  <div className="card">
                    {requestItem(
                      {
                        id: item.user.id,
                        photo: item.user.photo ? item.user.photo : "https://picsum.photos/50",
                        name: `${item.user.firstName} ${item.user.surName}`,
                        location: `${item.user.city && item.user.city.country.nameRU}, ${item.user.city && item.user.city.nameRU}`
                      },
                      {
                        category: item.category.name,
                        location: item.location
                      },
                      item.text,
                      item.album,
                      item.id
                    )}
                  </div>
                </div>)
                : <div className="px-2">
                  <p>Loading...</p>
                </div> }
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
