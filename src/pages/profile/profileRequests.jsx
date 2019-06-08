import React, { useEffect, useState } from 'react'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

import { useActions, useStore } from 'easy-peasy';

export default function ProfileRequests(router) {

  const [userRequests, userRequestsSet] = useState([])
  const loadUserRequests = useActions(actions => actions.requests.loadUserRequests)
  const user = useStore(store => store.profile.user)

  useState(() => {

    loadUserRequests().then(userRequestsSet)

  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {cardBlock(
            <button className="link" onClick={router.history.goBack}><i className="fas fa-angle-double-left"></i> Назад</button>,
            <div className="no-padding">
              <div className="card-list row">
                {userRequests.length > 0
                  ? userRequests.map((item, index) => <div key={index} className="col-md-6">
                    <div style={{height: '100%'}} className="card">
                      {requestItem(
                        {
                          photo: user.photo && user.photo,
                          name: user.firstName && `${user.firstName} ${user.surName}`,
                          location: user.city && `${user.city.nameRU}, ${user.city.country.nameRU}`,
                          // id: item.user.id
                        },
                        {
                          category: item.category && item.category.name,
                          location: item.location && item.location.city.nameRU
                        },
                        item.text,
                        item.album && item.album.photos.length > 0 && item.album.photos[0].preview,
                        item.id
                      )}
                    </div>
                  </div>)
                  : <div className="px-2">
                    <p>Loading...</p>
                  </div>}
              </div>
            </div>)}
        </div>

        {/* <div className="col-lg-3 d-none d-lg-block">
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
        </div> */}
      </div>
    </div>
  )
}
