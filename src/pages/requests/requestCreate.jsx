import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import { Link } from 'react-router-dom'

import cardBlock from '../../components/cardBlock/cardBlock';
import { useStore, useActions } from 'easy-peasy';

import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';
import Modal from '../../components/modals/modal';

import IMask from 'imask';
// import categories from '../../components/categories/categories';
import location from '../../components/location/location';
import useFetch from '../../hooks/useFetch';
import useLocation from '../../hooks/useLocation';
// import competencesChoice from '../../components/competences/competencesChoice';
// import hobbiesChoice from '../../components/hobbies/hobbiesChoice';
import suggestsChoice from '../../components/suggests/suggestsChoice';

export default function RequestCreate(router) {

  const dateInput = useRef()

  // date mask
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

  // LOCATION
  const { selectedCountryId, cityId, countriesList, cities, countryChoiceHandler, cityChoiceHandler } = useLocation()

  const { value: category, /* bind: categoryBind */ } = useInput('');
  const requestCategoriesList = useActions(actions => actions.requests.loadCategories)
  const categoriesList = useStore(store => store.requests.categoriesList)
  useFetch(categoriesList, requestCategoriesList)

  const { value: competence, /* bind: competenceBind */ } = useInput('');
  const getCompetencesList = useActions(actions => actions.profile.getCompetencesList)
  const competencesList = useStore(store => store.profile.competencesList)
  useFetch(competencesList, getCompetencesList)

  const { value: hobbie, /* bind: hobbieBind */ } = useInput('');
  const getHobbiesList = useActions(actions => actions.profile.getHobbiesList)
  const hobbiesList = useStore(store => store.profile.hobbiesList)
  useFetch(hobbiesList, getHobbiesList)

  const { value: suggest, bind: suggestBind } = useInput('');
  const [suggestError, suggestErrorSet] = useState('')
  const getSuggestsList = useActions(actions => actions.profile.getSuggestsList)
  const suggestsList = useStore(store => store.profile.suggestsList)
  useFetch(suggestsList, getSuggestsList)

  const { value: content, bind: contentBind } = useInput('');
  const [contentError, contentErrorSet] = useState('')
  const { value: expiredDate, bind: expiredDateBind } = useInput('');
  const { value: photoFile, previewFile: photo, bind: photoBind } = useFileInput({}, '')

  // SUBMIT
  const createRequest = useActions(actions => actions.requests.createRequest)

  const [isSuccess, isSuccessSet] = useState(false)
  const [processing, processingSet] = useState(false)
  const submitHandler = async (e) => {
    e.preventDefault()
    let valid = true
    if (!suggest) {
      suggestErrorSet('Выберите категорию')
      valid = false
    }
    if (!content) {
      contentErrorSet('Заполните текст заявки')
      valid = false
    }
    if (!valid) return
    processingSet(true)

    const date = expiredDate.split('.')

    const payload = {
      content,
      category: parseInt(category),
      expiredDate: expiredDate ? `${date[2]}-${date[1]}-${date[0]}` : '',
      cityId: parseInt(cityId),
      competence, hobbie, suggest
    }

    let myFormData = new FormData();

    myFormData.append("text", payload.content);
    payload.category && myFormData.append("categoryId", payload.category);

    payload.competence && myFormData.append("CompetenceId", payload.competence);
    payload.hobbie && myFormData.append("HobbyId", payload.hobbie);
    payload.suggest && myFormData.append("UtilityId", payload.suggest);

    payload.expiredDate && myFormData.append("expiredAt", payload.expiredDate);
    payload.cityId && myFormData.append("location.cityId", payload.cityId);
    photoFile && myFormData.append("files[0]", photoFile);


    const success = await createRequest(myFormData)

    isSuccessSet(success)
    processingSet(false)
  }

  const modalCloseHandler = () => {
    router.history.push('/requests')
  }

  return (
    <form onSubmit={submitHandler} className="container">
      {
        document.getElementById('modal-root') && createPortal(
          <Modal isOpen={isSuccess} close={modalCloseHandler}>
            <h2>Запрос о помощи отправлен</h2>
            <p>Благодарим за использование сервиса! Ваш запрос о помощи принят и отправлен пользователям,
              подписаным на выбранную категорию помощи.</p>
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
                <div className="form-error">{contentError}</div>
              </div>

              <div className="d-none d-md-block form-group mb-1">
                <div className="mb-1">
                  <label htmlFor="request-photo">Фотография</label>
                </div>
                <label style={{ cursor: 'pointer' }} htmlFor="request-photo"><img src={photo} alt="" /></label>
                <label htmlFor="request-photo" className="link">Загрузить фотографию</label>
                <input accept="image/png, image/jpg" {...photoBind} id="request-photo" className="d-none" type="file" />
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
                  {/* {categories(
                    categoryBind,
                    categoriesList
                  )} */}
                  {suggestsChoice(suggestBind, suggestsList, 'Какая помощь/поддержка Вам нужна')}
                  <div className="form-error">{suggestError}</div>
                </div>

                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label htmlFor="request-location">Локация</label>
                  </div>
                  {location(
                    selectedCountryId,
                    countryChoiceHandler,
                    countriesList,

                    cities,
                    cityId,
                    cityChoiceHandler
                  )}
                </div>

                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label htmlFor="request-expire-date">Окончание необходимости</label>
                  </div>
                  <input ref={dateInput} {...expiredDateBind} id="request-expire-date" className="w-100" placeholder="Дата" type="text" />
                </div>

                {/* <div className="form-group mb-1">
                  <div className="mb-1">
                    <label>Компетенции</label>
                  </div>
                  {competencesChoice(competenceBind, competencesList)}
                </div>

                <div className="form-group mb-1">
                  <div className="mb-1">
                    <label>Хобби/увлечения</label>
                  </div>
                  {hobbiesChoice(hobbieBind, hobbiesList)}
                </div> */}

                {/* <div className="form-group">
                  <div className="mb-1">
                    <label>Категория пользы</label>
                  </div>
                  {suggestsChoice(suggestBind, suggestsList)}
                </div> */}
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
