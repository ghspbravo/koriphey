import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';

import { useStore, useActions } from 'easy-peasy';
import formatDate from '../../functions/formatDate';

import IMask from 'imask';

import useInput from '../../hooks/useInput';

export default function Requests() {
  const requestList = useStore(store => store.requests.requestList)

  const dateInput = useRef()

  useEffect(() => {
    const dateMask = dateInput.current && new IMask(dateInput.current, {
      mask: Date,
      blocks: {
        Y: {
          mask: IMask.MaskedRange,
          from: new Date().getFullYear(),
          to: new Date().getFullYear() + 5
        }
      },
    });

    return (() => {
      dateMask && dateMask.destroy()
    })
  }, [])

  const requestCategoriesList = useActions(actions => actions.requests.loadCategories)
  const categoriesList = useStore(store => store.requests.categoriesList)

  const countriesList = useStore(store => store.locations.countriesList)
  const loadCountries = useActions(actions => actions.locations.loadCountries)
  const loadCities = useActions(actions => actions.locations.loadCities)

  useEffect(() => {
    !countriesList.length &&
      loadCountries()

    !categoriesList.length &&
      requestCategoriesList()

  }, [])

  const [selectedCountryId, setSelectedCountryId] = useState()
  const [cities, setCities] = useState([])

  const [cityId, setCityId] = useState()

  const countryChoiceHandler = (e) => {
    setSelectedCountryId(e.target.value)
  }

  const cityChoiceHandler = (e) => {
    setCityId(e.target.value)
  }

  useEffect(() => {
    if (!selectedCountryId) return

    setCities([])
    loadCities(selectedCountryId).then(setCities)
  }, [selectedCountryId])

  const { value: category, bind: categoryBind } = useInput('');

  const [showFilterResults, showFilterResultsSet] = useState(false)
  const [filteredRequests, filteredRequestsSet] = useState([])
  const loadFilterRequests = useActions(actions => actions.requests.loadFilterRequests)

  const submitHandler = e => {
    e.preventDefault()

    showFilterResultsSet(true)
    const payload = {
      countryId: selectedCountryId,
      cityId,
      categoryId: category
    }

    loadFilterRequests(payload).then(filteredRequestsSet)
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
                      <div style={{height: '100%'}} className="card">
                        {requestItem(
                          {
                            id: item.user.id,
                            photo: item.user.photo ? item.user.photo : "https://picsum.photos/50",
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
                    : filteredRequests.length > 0
                      ? filteredRequests.map((item, index) => <div key={index} className="col-md-6">
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
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              <form onSubmit={submitHandler}>

                <p className="big">Локация</p>

                <div>
                  <div className="form-group mb-1">
                    <select value={selectedCountryId} onChange={countryChoiceHandler} className="w-100">
                      <option value="" defaultValue>Страна</option>
                      {countriesList.length > 0 &&
                        countriesList.map((item, index) => <option key={index} value={item.id}>
                          {item.nameRU}
                        </option>)}
                    </select>
                    <div className="form-hint">Начните вводить название при выборе</div>
                  </div>

                  {cities.length > 0 &&
                    <div className="form-group mb-1">
                      <select value={cityId} onChange={cityChoiceHandler} className="w-100">
                        <option value="" defaultValue>Город</option>
                        {cities.length > 0 &&
                          cities.map((item, index) => <option key={index} value={item.id}>
                            {item.nameRU}
                          </option>)}
                      </select>
                    </div>}
                </div>

                <p className="big">Категория</p>
                <div className="form-group mb-1">
                  <select {...categoryBind} className="w-100" id="request-category">
                    <option value="" defaultChecked>Выберите категорию</option>
                    {categoriesList &&
                      categoriesList.map(category => <option value={category.id}>{category.name}</option>)
                    }
                  </select>
                  {/* <input id="request-category" className="w-100" placeholder="Категория" type="text" /> */}
                </div>

                <div className="row no-gutters mt-1">
                  <button className="ml-auto">Фильтр</button>
                </div>

                <div className="row no-gutters mt-1">
                  <button type="button" onClick={() => showFilterResultsSet(false)} className="ml-auto button_secondary">Сбросить</button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
