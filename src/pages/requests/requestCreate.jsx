import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import cardBlock from '../../components/cardBlock/cardBlock';
import { useStore, useActions } from 'easy-peasy';

import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';
import Modal from '../../components/modals/modal';

export default function RequestCreate() {

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

  const { value: content, bind: contentBind } = useInput('');
  const { value: category, bind: categoryBind } = useInput('');
  const { value: expiredDate, bind: expiredDateBind } = useInput('');
  const { value: photoFile, previewFile: photo, bind: photoBind } = useFileInput({}, '')

  const createRequest = useActions(actions => actions.requests.createRequest)

  const [isSuccess, isSuccessSet] = useState(false)
  const submitHandler = async (e) => {
    e.preventDefault()

    const payload = {
      content, category, expiredDate
    }
    const success = await createRequest(payload)
    isSuccessSet(success)
  }
  return (
    <form onSubmit={submitHandler} className="container">
      {
        document.getElementById('modal-root') && createPortal(
          <Modal isOpen={isSuccess} close={() => isSuccessSet(false)}>
            <h2>Запрос о помощи отправлен</h2>
            <p>Благодарим за использование сервиса! Ваш запрос о помощи отправлен модераторам на рассмотрение.</p>
            <p>После одобрения, Ваш запрос появится в общем списке.</p>
          </Modal>, document.getElementById('modal-root'))
      }
      <div className="row">
        <div className="col-lg-8 col-md-7">
          {cardBlock(
            <h2>Создание запроса</h2>,
            <div>
              <div className="form-group mb-1">
                <div className="mb-1">
                  <label htmlFor="request-content">Описание запроса<sup>*</sup></label>
                </div>
                <textarea {...contentBind} rows="20" id="request-content" className="w-100" placeholder="Описание запроса" type="text" />
              </div>

              <div className="d-none d-md-block form-group mb-1">
                <div className="mb-1">
                  <label htmlFor="request-photo">Фотография</label>
                </div>
                <label style={{ cursor: 'pointer' }} htmlFor="request-photo"><img src={photo} alt="" /></label>
                <label htmlFor="request-photo" className="link">Загрузить фотографию</label>
                <input {...photoBind} id="request-photo" className="d-none" type="file" />
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-4 col-md-5 mt-2 mt-md-0">
          <div className="mb-2">
            {cardBlock(
              <h2>Настройки</h2>,
              <div>
                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label htmlFor="request-category">Категория<sup>*</sup></label>
                  </div>
                  <select {...categoryBind} className="w-100" id="request-category">
                    <option value="" defaultChecked>Выберите категорию</option>
                    {categoriesList &&
                      categoriesList.map(category => <option value={category.id}>{category.name}</option>)
                    }
                  </select>
                  {/* <input id="request-category" className="w-100" placeholder="Категория" type="text" /> */}
                </div>

                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label htmlFor="request-location">Локация</label>
                  </div>
                  <div className="form-group mb-1">
                    <select value={selectedCountryId} onChange={countryChoiceHandler} className="w-100">
                      <option value="" defaultValue>Страна проживания</option>
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
                        <option value="" defaultValue>Город проживания</option>
                        {cities.length > 0 &&
                          cities.map((item, index) => <option key={index} value={item.id}>
                            {item.nameRU}
                          </option>)}
                      </select>
                    </div>}
                  {/* <input id="request-location" className="w-100" placeholder="Локация" type="text" /> */}
                </div>

                <div className="form-group">
                  <div className="mb-1">
                    <label htmlFor="request-expire-date">Окончание необходимости</label>
                  </div>
                  <input {...expiredDateBind} id="request-expire-date" className="w-100" placeholder="Дата" type="date" />
                </div>
              </div>
            )}
          </div>

          <div className="d-md-none mb-2">
            {cardBlock(
              <h2>Фотография</h2>,
              <div className="form-group ">
                <label style={{ cursor: 'pointer' }} htmlFor="mobile-request-photo"><img src={photo} alt="" /></label>
                <label htmlFor="mobile-request-photo" className="link">Загрузить фотографию</label>
                <input {...photoBind} id="mobile-request-photo" className="d-none" type="file" />
              </div>
            )}
          </div>

          <button className="button_expanded">Создать запрос</button>
        </div>
      </div>
    </form>
  )
}
