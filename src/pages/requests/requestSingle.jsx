import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';
import mediaPerson from '../../components/mediaPerson/mediaPerson';
// import editIcon from '../../components/editIcon/editIcon';

import { useActions, useStore } from 'easy-peasy'
import formatDate from '../../functions/formatDate';

export default function RequestSingle(router) {
  const requestId = router.match.params.id
  const user = useStore(store => store.profile.user)

  const [request, requestSet] = useState([])
  const loadRequestItem = useActions(actions => actions.requests.loadRequestItem)

  const loadSimilarRequests = useActions(actions => actions.requests.loadSimilarRequests)
  const [similarRequest, similarRequestSet] = useState([])

  useEffect(() => {
    loadRequestItem(requestId).then(requestSet).then(() => {
      loadSimilarRequests(requestId).then(similarRequestSet)
    })
  }, [requestId, loadRequestItem, loadSimilarRequests])

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div>
            {cardBlock(
              <button className="link" onClick={router.history.goBack}><i className="fas fa-angle-double-left"></i> Назад</button>,
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '5px', right: '5px'
                }}>
                  {/* {editIcon('/requests/1/edit')} */}
                </div>
                {request && request.user &&
                  mediaPerson(
                  request.user.photo ? request.user.photo : "",
                  `${request.user.firstName} ${request.user.surName}`,
                  <span>{`${request.user.city && request.user.city.country.nameRU}, ${request.user.city && request.user.city.nameRU}`}</span>
                )}
                {/* {request.category && request.category.name &&
                  <p className="small"><b>Категория:</b> {request.category.name}</p>} */}
                {request.utility && request.utility.name &&
                  <p className="small"><b>Категория:</b> {`${request.utility.name}`}</p>}
                {request.location && request.location.city &&
                  <p className="small"><b>Локация:</b> {`${request.location.city.country.nameRU}, ${request.location.city.nameRU}`}</p>}
                {/* {request.competence && request.competence.name &&
                  <p className="small"><b>Сфера деятельности:</b> {`${request.competence.name}`}</p>}
                {request.hobby && request.hobby.name &&
                  <p className="small"><b>Хобби/увлечение:</b> {`${request.hobby.name}`}</p>} */}
                {request.expiredAt &&
                  <p className="small"><b>Окончание необходимости:</b> {formatDate(request.expiredAt)}</p>}

                {request.text
                  ? <p>{request.text}</p>
                  : <p>Loading...</p>}

                {request.album && request.album.photos.length > 0 &&
                  <img src={request.album.photos[0].fullPreview} alt="request gallery" />}

                {user.id !== (request.user && request.user.id) &&
                  <div className="row no-gutters mt-2">
                    <Link className="button button_secondary" to={`/profile/${request.user && request.user.id}`}>Ответить</Link>
                  </div>}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Похожие запросы</h2>,
              <div className="list-card no-padding">
                {similarRequest.length > 0 &&
                  similarRequest.map((item, index) => <div key={index} className="card">
                    {requestItem(
                      {
                        id: item.user.id,
                          photo: item.user.photo ? item.user.photo : "https://picsum.photos/50",
                          name: `${item.user.firstName} ${item.user.surName}`,
                          location: `${item.user.city && item.user.city.country.nameRU}, ${item.user.city && item.user.city.nameRU}`
                      },
                      {
                        // category: item.category && item.category.name,
                        category: item.utility && item.utility.name,
                        location: item.location && item.location.city.nameRU,
                        expiredAt: item.expiredAt && formatDate(item.expiredAt)
                      },
                      item.text && item.text.substring(0, 50),
                      item.album && item.album.photos.length > 0 && item.album.photos[0].fullPreview,
                      item.id && item.id
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
