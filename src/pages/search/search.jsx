import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import personItem from '../../components/personItem/personItem';
import requestItem from '../../components/requestItem/requestItem';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { useActions, useStore } from 'easy-peasy';
import useLocation from '../../hooks/useLocation';
import requestFilter from '../../components/filters/requestFilter';
import peopleFilter from '../../components/filters/peopleFilter';
import formatDate from '../../functions/formatDate';

const FILTER_BY = {
  ALL: 0,
  PEOPLE: 1,
  REQUESTS: 2
}

export default function Search(router) {

  const [filterBy, filterBySet] = useState(FILTER_BY.ALL)

  const { value: search, bind: searchBind } = useInput('')

  // REQUESTS
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


  const [filteredRequests, filteredRequestsSet] = useState([])
  const loadFilterRequests = useActions(actions => actions.requests.loadFilterRequests)


  // PEOPLE
  const getFilterUserList = useActions(actions => actions.profile.getFilterUserList)

  const { value: graduationYear, bind: graduationYearBind, reset: graduationYearReset } = useInput('');
  const [filteredPeople, filteredPeopleSet] = useState([])


  useEffect(() => {
    // const query = router.match.params.query
    submitFiltersHandler()
    // eslint-disable-next-line
  }, [router.match.params.query])

  const submitFiltersHandler = e => {
    e && e.preventDefault()

    const payload = {
      countryId: selectedCountryId,
      cityId,
      categoryId: category,
      competence,
      hobbie,
      suggest,

      searchQuery: router.match.params.query,
      name: router.match.params.query,

      graduationYear
    }

    loadFilterRequests(payload).then(filteredRequestsSet)
    getFilterUserList(payload).then(filteredPeopleSet)
  }

  const resetHandler = () => {
    categoryReset()
    competenceReset()
    hobbieReset()
    suggestReset()
    setSelectedCountryId(0)
    setCityId(0)
    graduationYearReset()

    submitFiltersHandler()
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div>

            {(filterBy === FILTER_BY.ALL || filterBy === FILTER_BY.PEOPLE) &&
              <div className="mb-2">
                {cardBlock(
                  <div className="search">
                    <Link to={`/search/${search}`} className="search__icon no-style"><i className="fas fa-search"></i></Link>
                    <input {...searchBind} placeholder="Поиск" className="search__input" type="text" name="search" />
                  </div>,
                  <div className="no-padding">
                    <div className="mb-2 px-2">
                      <h2>Люди</h2>
                    </div>
                    <div className="card-list row">
                      {filteredPeople.length > 0
                        ? filteredPeople.map((item, index) => <div key={index} className="col-md-6">
                          <div style={{ height: '100%' }} className="card">
                            {personItem(
                              item.id,
                              `${item.firstName} ${item.surName}`,
                              `${item.city && item.city.country.nameRU}, ${item.city && item.city.nameRU}`,
                              {
                                graduationYear: item.graduationYear,
                                categories: ""
                              },
                              item.photo,
                            )}
                          </div>
                        </div>)
                        : <div className="px-3">
                          <p>Результатов не найдено</p>
                        </div>}
                    </div>
                    <div className="px-2 mt-2">
                      <button className="link" onClick={() => filterBySet(FILTER_BY.PEOPLE)} >Все люди <i className="fas fa-angle-double-right"></i></button>
                    </div>
                  </div>)}
              </div>}

            {(filterBy === FILTER_BY.ALL || filterBy === FILTER_BY.REQUESTS) &&
              <div>
                {cardBlock(
                  <div>
                    {filterBy === FILTER_BY.ALL
                      ? <h2>Запросы</h2>
                      : <div className="search">
                        <Link to={`/search/${search}`} className="search__icon no-style"><i className="fas fa-search"></i></Link>
                        <input {...searchBind} placeholder="Поиск" className="search__input" type="text" name="search" />
                      </div>}
                  </div>,
                  <div className="no-padding">
                    {filterBy !== FILTER_BY.ALL &&
                      <div className="mb-2 px-2">
                        <h2>Запросы</h2>
                      </div>}
                    <div className="card-list row">
                      {filteredRequests.length > 0
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
                                category: item.utility && item.utility.name,
                                // category: item.category.name,
                                location: item.location && item.location.city && `${item.location.city.country.nameRU}, ${item.location.city.nameRU}`,
                                expiredAt: item.expiredAt && formatDate(item.expiredAt)
                              },
                              item.text,
                              item.album && item.album.photos.length > 0 && item.album.photos[0].fullPreview,
                              item.id
                            )}
                          </div>
                        </div>)
                        : <div className="px-3">
                          <p>Результатов не найдено</p>
                        </div>}
                    </div>
                    <div className="px-2 mt-2">
                      <button className="link" onClick={() => filterBySet(FILTER_BY.REQUESTS)}>Все запросы <i className="fas fa-angle-double-right"></i></button>
                    </div>
                  </div>)}
              </div>}


          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              <div className="filter no-padding">
                <button onClick={() => filterBySet(FILTER_BY.ALL)} className={`no-style filter__item ${filterBy === FILTER_BY.ALL ? 'active' : ''} `}>Все</button>
                <button onClick={() => filterBySet(FILTER_BY.PEOPLE)} className={`no-style filter__item ${filterBy === FILTER_BY.PEOPLE ? 'active' : ''} `}>Люди</button>
                <button onClick={() => filterBySet(FILTER_BY.REQUESTS)} className={`no-style filter__item ${filterBy === FILTER_BY.REQUESTS ? 'active' : ''} `}>Запросы</button>
              </div>
            )}


            {filterBy === FILTER_BY.REQUESTS &&
              <div className="mt-2">
                {cardBlock(
                  <h2>Фильтр</h2>,
                  requestFilter(
                    submitFiltersHandler,

                    selectedCountryId, countryChoiceHandler, countriesList,
                    cities, cityId, cityChoiceHandler,

                    categoryBind, categoriesList,

                    competenceBind, competencesList,

                    hobbieBind, hobbiesList,

                    suggestBind, suggestsList,

                    resetHandler
                  )
                )}
              </div>}

            {filterBy === FILTER_BY.PEOPLE &&
              <div className="mt-2">
                {cardBlock(
                  <h2>Фильтр</h2>,
                  peopleFilter(
                    submitFiltersHandler,
                    competenceBind, competencesList,

                    suggestBind, suggestsList,

                    hobbieBind, hobbiesList,

                    graduationYearBind,

                    resetHandler
                  )
                )}
              </div>}

          </div>
        </div>
      </div>
    </div>
  )
}
