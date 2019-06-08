import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import { Link } from 'react-router-dom'

import cardBlock from '../../components/cardBlock/cardBlock';
import { useStore, useActions } from 'easy-peasy';

import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';
import Modal from '../../components/modals/modal';

import IMask from 'imask';

export default function RequestCreate() {

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

  const { value: content, bind: contentBind } = useInput('');
  const { value: category, bind: categoryBind } = useInput('');
  const { value: expiredDate, bind: expiredDateBind } = useInput('');
  const { value: photoFile, previewFile: photo, bind: photoBind } = useFileInput({}, '')

  const createRequest = useActions(actions => actions.requests.createRequest)

  // SUBMIT
  const [isSuccess, isSuccessSet] = useState(false)
  const [processing, processingSet] = useState(false)
  const submitHandler = async (e) => {
    e.preventDefault()
    processingSet(true)

    const date = expiredDate.split('.')

    const payload = {
      content,
      category: parseInt(category),
      expiredDate: `${date[2]}-${date[1]}-${date[0]}`,
      cityId: parseInt(cityId)
    }

    let myFormData = new FormData();

    myFormData.append("text", payload.content);
    myFormData.append("categoryId", payload.category);

    payload.expiredDate && myFormData.append("expiredAt", payload.expiredDate);
    payload.cityId && myFormData.append("location.cityId", payload.cityId);
    photoFile && myFormData.append("files[0]", photoFile);

    const success = await createRequest(myFormData)
    isSuccessSet(success)
    processingSet(false)
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
                <input accept="image/png" {...photoBind} id="request-photo" className="d-none" type="file" />
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
                  {/* <input id="request-location" className="w-100" placeholder="Локация" type="text" /> */}
                </div>

                <div className="form-group">
                  <div className="mb-1">
                    <label htmlFor="request-expire-date">Окончание необходимости</label>
                  </div>
                  <input ref={dateInput} {...expiredDateBind} id="request-expire-date" className="w-100" placeholder="Дата" type="text" />
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

          <button disabled={processing} className="button_expanded">{processing ? '...' : 'Создать запрос'}</button>

          <div style={{ textAlign: 'right' }} className="mt-2">
            <Link to='/profile/my'><i className="fas fa-angle-double-left"></i>В профиль</Link>
          </div>

        </div>
      </div>
    </form>
  )
}
