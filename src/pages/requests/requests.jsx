import React, { useState } from 'react'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

import { useStore, useActions } from 'easy-peasy';
import formatDate from '../../functions/formatDate';

import useInput from '../../hooks/useInput';
import useLocation from '../../hooks/useLocation';
import useFetch from '../../hooks/useFetch';
import requestFilter from '../../components/filters/requestFilter';

export default function Requests() {
  const requestList = useStore(store => store.requests.requestList)

  const [currentPage, currentPageSet] = useState(1)
  const loadRequests = useActions(actions => actions.requests.loadRequests)
  const nextPageHandler = async (e) => {
    const target = e.target
    target.disabled = true
    currentPageSet(currentPage + 1)
    const hasNextPage = await loadRequests(currentPage + 1)
    if (!hasNextPage) currentPageSet(null)
    target.disabled = false
  }

  // LOCATION
  const { selectedCountryId, cityId, countriesList, cities, countryChoiceHandler, cityChoiceHandler, setCityId, setSelectedCountryId } = useLocation()

  const { value: competence, bind: competenceBind, reset: competenceReset } = useInput('');
  const getCompetencesList = useActions(actions => actions.profile.getCompetencesList)
  const competencesList = useStore(store => store.profile.competencesList)
  useFetch(competencesList, getCompetencesList)

  const { value: hobbie, bind: hobbieBind, reset: hobbieReset } = useInput('');
  const getHobbiesList = useActions(actions => actions.profile.getHobbiesList)
  const hobbiesList = useStore(store => store.profile.hobbiesList)
  useFetch(hobbiesList, getHobbiesList)

  const { value: suggest, bind: suggestBind, reset: suggestReset } = useInput('');
  const getSuggestsList = useActions(actions => actions.profile.getSuggestsList)
  const suggestsList = useStore(store => store.profile.suggestsList)
  useFetch(suggestsList, getSuggestsList)

  const { value: category, bind: categoryBind, reset: categoryReset } = useInput('');
  const requestCategoriesList = useActions(actions => actions.requests.loadCategories)
  const categoriesList = useStore(store => store.requests.categoriesList)
  useFetch(categoriesList, requestCategoriesList)

  const [showFilterResults, showFilterResultsSet] = useState(false)
  const [filteredRequests, filteredRequestsSet] = useState([])
  const loadFilterRequests = useActions(actions => actions.requests.loadFilterRequests)

  const submitHandler = e => {
    e.preventDefault()

    showFilterResultsSet(true)
    const payload = {
      countryId: selectedCountryId,
      cityId,
      categoryId: category,
      competence,
      hobbie,
      suggest
    }

    loadFilterRequests(payload).then(filteredRequestsSet)
  }

  const resetHandler = () => {
    showFilterResultsSet(false)
    categoryReset()
    competenceReset()
    hobbieReset()
    suggestReset()
    setSelectedCountryId(0)
    setCityId(0)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {cardBlock(
            <div className="search">
              {/* <Link to='/search/requests' className="search__icon no-style disabled"><i className="fas fa-search"></i></Link>
              <input placeholder="Поиск по запросам" className="search__input" type="text" name="search" /> */}
              <h2>Запросы</h2>
            </div>,
            <div className="no-padding">
              <div className="card-list row">
                {requestList.length !== 0
                  ? showFilterResults === false
                    ? requestList.map((item, index) => <div key={index} className="col-md-6">
                      <div style={{ height: '100%' }} className="card">
                        {requestItem(
                          {
                            id: item.user.id,
                            photo: item.user.photo,
                            name: `${item.user.firstName} ${item.user.surName}`,
                            location: `${item.user.city && item.user.city.country.nameRU}, ${item.user.city && item.user.city.nameRU}`
                          },
                          {
                            // category: item.category.name,
                            category: item.utility && item.utility.name,
                            location: item.location && item.location.city && `${item.location.city.country.nameRU}, ${item.location.city.nameRU}`,
                            expiredAt: item.expiredAt && formatDate(item.expiredAt)
                          },
                          item.text,
                          item.album && item.album.photos.length > 0 && item.album.photos[0].fullPreview,
                          item.id
                        )}
                      </div>
                    </div>)
                    : filteredRequests.length > 0
                      ? filteredRequests.map((item, index) => <div key={index} className="col-md-6">
                        <div className="card">
                          {requestItem(
                            {
                              id: item.user.id,
                              photo: item.user.photo,
                              name: `${item.user.firstName} ${item.user.surName}`,
                              location: `${item.user.city && item.user.city.country.nameRU}, ${item.user.city && item.user.city.nameRU}`
                            },
                            {
                              category: item.category.name,
                              location: item.location && item.location.city && `${item.location.city.country.nameRU}, ${item.location.city.nameRU}`,
                              expiredAt: item.expiredAt && formatDate(item.expiredAt)
                            },
                            item.text,
                            item.album && item.album.photos.length > 0 && item.album.photos[0].fullPreview,
                            item.id
                          )}
                        </div>
                      </div>)
                      : <p className="px-2">...</p>
                  : <div className="px-2">
                    <p>Loading...</p>
                  </div>}
              </div>
            </div>)}
            
          <div className="row justify-content-center">
            {currentPage === null
              ? null
              : <button onClick={nextPageHandler} className="mt-2">Показать больше</button>
            }
          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              requestFilter(
                submitHandler,

                selectedCountryId, countryChoiceHandler, countriesList,
                cities, cityId, cityChoiceHandler,

                categoryBind, categoriesList,

                competenceBind, competencesList,

                hobbieBind, hobbiesList,

                suggestBind, suggestsList,

                resetHandler
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
