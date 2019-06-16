import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';

import IMask from 'imask';

import Swiper from 'swiper'
import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';

import { useStore, useActions } from 'easy-peasy';

import useHobbies from '../../hooks/useHobbies';
import useSuggests from '../../hooks/useSuggests';
import useCompetences from '../../hooks/useCompetences';
import useLocation from '../../hooks/useLocation';
import hobbiesEdit from '../../components/hobbies/hobbiesEdit';
import competencesEdit from '../../components/competences/competencesEdit';
import suggestsEdit from '../../components/suggests/suggestsEdit';
import location from '../../components/location/location';

import userThumb from '../../components/userThumb.png'
import graduationYearOptions from '../../components/graduationYear/graduationYearOptions';

export default function ProfileEdit() {
  const user = useStore(store => store.profile.user)

  const workYearInput = useRef()
  // add input mask
  useEffect(() => {
    var workYearMask = workYearInput.current && IMask(workYearInput.current, {
      mask: IMask.MaskedRange,
      from: 1900,
      to: new Date().getFullYear(),
      autofix: true,  // bound value
    });
    return () => {
      workYearMask && workYearMask.destroy()
    }
  }, [])


  const swiperRef = useRef()
  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      slidesPerView: 'auto',
      spaceBetween: 25,
    })
    return () => {
      swiper.destroy()
    }
  }, [])

  const MOBILE_NAVIGATION = {
    main: 0,
    work: 1,
    other: 2,
    about: 3,
    password: 4
  }

  const [mobileNavigation, setMobileNavigation] = useState(MOBILE_NAVIGATION.main)

  const mobileNavigationChangeHandle = setMobileNavigation

  const workYearInputMobile = useRef()
  const renderCurrentMobileNavigationContent = () => {
    // eslint-disable-next-line
    var workYearMask = workYearInputMobile.current && IMask(workYearInputMobile.current, {
      mask: IMask.MaskedRange,
      from: 1900,
      to: new Date().getFullYear(),
      autofix: true,  // bound value
    });
    switch (mobileNavigation) {
      case MOBILE_NAVIGATION.main:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-city">Город проживания:</label>
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
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation-year">Год выпуска: </label>
            </div>
            <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="mobile-person-graduation-year">
              <option value="" defaultChecked>Выберите год выпуска*</option>
              {graduationYearOptions()}
            </select>
            {/* <input onBlur={() => graduationYearErrorSet('')} ref={graduateYearInputMobile} {...graduationYearBind} placeholder="Год выпуска" className="w-100" id='mobile-person-graduation-year' type="text" /> */}
            <div className="form-error">{graduationYearError}</div>
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation">Образование:</label>
            </div>
            <input {...educationBind} placeholder="Образование" className="w-100" id='mobile-person-graduation' type="text" />
          </div>

        </div>
      case MOBILE_NAVIGATION.work:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-none d-lg-block">Сферы деятельности:</label>
            </div>
            {competencesEdit(
              competences,
              competencesList,
              competencesChangeHandler,
              competencesRemoveHandler,
              competensesErrorSet
            )}

            <div className="form-error">{competencesError}</div>
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-work">Место работы:</label>
            </div>
            <input {...workPlaceBind} placeholder="Место работы" className="w-100" id='mobile-person-work' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation-post">Должность: </label>
            </div>
            <input {...workPositionBind} placeholder="Должность" className="w-100" id='mobile-person-graduation-post' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-work-years">Год начала работы:</label>
            </div>
            <input ref={workYearInputMobile} {...workYearsBind} placeholder="Год начала работы" className="w-100" id='mobile-person-work-years' type="text" />
          </div>

        </div>
      case MOBILE_NAVIGATION.other:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-socials-vk">Ссылка на vk: </label>
            </div>
            <input {...socialVkBind} placeholder="Ссылка на vk" className="w-100" id='mobile-person-socials-vk' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-socials-fb">Ссылка на facebook: </label>
            </div>
            <input {...socialFbBind} placeholder="Ссылка на страницу facebook" className="w-100" id='mobile-person-social-fb' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-socials-insta">Ссылка на instagram:</label>
            </div>
            <input {...socialInstaBind} placeholder="Ссылка на instagram" className="w-100" id='mobile-person-socials-insta' type="text" />
          </div>

          <div className="form-group mb-1">
            <h3>Что Вы можете предложить другим выпускникам?</h3>
            {suggestsEdit(
              suggests,
              suggestsList,
              suggestsChangeHandler,
              suggestsCommentChangeHandler,
              suggestsRemoveHandler,
              suggestsErrorSet
            )}

            <div className="form-error">{suggestsError}</div>
          </div>

        </div>
      case MOBILE_NAVIGATION.about:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-about">О себе:</label>
            </div>
            <textarea id="mobile-person-about" onBlur={() => aboutErrorSet('')} {...aboutBind} className="w-100" name="person-about" rows="10" placeholder="О себе*" />
            <div className="form-error">{aboutError}</div>
          </div>

          <div className="form-group mb-1">
            <label>Хобби и увлечения</label>
            {hobbiesEdit(
              hobbies,
              hobbiesList,
              hobbiesChangeHandler,
              hobbiesRemoveHandler,
              hobbiesErrorSet
            )}

            <div className="form-error">{hobbiesError}</div>
          </div>

          <div className="form-group mb-1">
            <div className="row no-gutters align-items-center">
              <label className="d-block mr-1" style={{ cursor: 'pointer' }} htmlFor="mobile-person-photo"><img style={{ width: '40px', height: '35px' }} src={photo} alt="" /></label>
              <label style={{ fontWeight: 'normal' }} className="link" htmlFor="mobile-person-photo">Изменить фото</label>
            </div>
            <input {...photoBind} accept="image/png, image/jpeg" className="d-none" type="file" name="mobile-person-photo" id="mobile-person-photo" />
          </div>

        </div>
      case MOBILE_NAVIGATION.password:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-password-old">Изменение пароля:</label>
            </div>
            <div className="form-group mb-1">
              <input onBlur={() => oldPasswordErrorSet('')} {...oldPasswordBind} id="mobile-person-password-old" type="password" className="w-100" placeholder="Старый пароль" />
              <div className="form-error">{oldPasswordError}</div>
            </div>
            <div className="form-group mb-1">
              <input {...passwordBind} type="password" className="w-100" placeholder="Новый пароль" />
            </div>
            <div className="form-group mb-1">
              <input {...repeatPasswordBind} type="password" className="w-100" placeholder="Повторите новый пароль" />
              {password !== repeatPassword &&
                <div className="form-error">Пароли не совпадают</div>}
            </div>
          </div>


        </div>

      default:
        break;
    }
  }

  const { value: graduationYear, bind: graduationYearBind, setValue: setGraduationYear } = useInput('');
  const [graduationYearError, graduationYearErrorSet] = useState('')
  const { value: education, bind: educationBind, setValue: setEducation } = useInput('');
  // const [educationYearError, educationYearErrorSet] = useState('')
  const { value: workPlace, bind: workPlaceBind, setValue: setWorkPlace } = useInput('');
  // const [workPlaceError, workPlaceErrorSet] = useState('')
  const { value: workPosition, bind: workPositionBind, setValue: setWorkPosition } = useInput('');
  // const [workPositionError, workPositionErrorSet] = useState('')
  const { value: workYears, bind: workYearsBind, setValue: setWorkYears } = useInput('');
  // const [workYearsError, workYearsErrorSet] = useState('')
  // const { value: currentActivity, bind: currentActivityBind, setValue: setCurrentActivity } = useInput('');
  // const [currentActivityError, currentActivityErrorSet] = useState('')
  const { value: socialVk, bind: socialVkBind, setValue: setSocialVk } = useInput('');
  // const [socialVkError, socialVkErrorSet] = useState('')
  const { value: socialFb, bind: socialFbBind, setValue: setSocialFb } = useInput('');
  // const [socialFbError, socialFbErrorSet] = useState('')
  const { value: socialInsta, bind: socialInstaBind, setValue: setSocialInsta } = useInput('');
  // const [socialInstaError, socialInstaErrorSet] = useState('')
  const { value: oldPassword, bind: oldPasswordBind } = useInput('');
  const [oldPasswordError, oldPasswordErrorSet] = useState('')
  const { value: password, bind: passwordBind } = useInput('');
  // const [passwordError, passwordErrorSet] = useState('')
  const { value: repeatPassword, bind: repeatPasswordBind } = useInput('');
  const { value: about, bind: aboutBind, setValue: setAbout } = useInput('');
  const [aboutError, aboutErrorSet] = useState('')

  const { value: photoFile, previewFile: photo, bind: photoBind, setPreviewFile: setPhoto } = useFileInput(false, userThumb)
  // const [photoError, photoErrorSet] = useState('')

  // load existing user data
  useEffect(() => {
    if (!(user && user.email)) return

    setGraduationYear(user.graduationYear)
    setWorkPlace(user.workExperiencies[0] && user.workExperiencies[0].name ? user.workExperiencies[0].name : '')
    setWorkPosition(user.workExperiencies[0] && user.workExperiencies[0].position ? user.workExperiencies[0].position : '')
    const workDateList = user.workExperiencies[0] && user.workExperiencies[0].start.match(/\d\d\d\d-\d\d-\d\d/)[0].split('-')
    setWorkYears(workDateList && workDateList[0] ? parseInt(workDateList[0]) : '')
    setEducation(user.education)
    setAbout(user.about)
    setPhoto(user.photo)

    user.networks.forEach(social => {
      switch (social.network) {
        case 0:
          setSocialFb(social.link)
          break;
        case 1:
          setSocialVk(social.link)
          break;
        case 2:
          setSocialInsta(social.link)
          break;

        default:
          break;
      }
    })

    suggestsSet([])
    user.utilities.length !== 0 && user.utilities.forEach(suggest => {
      const valueObj = {
        id: suggest.id,
        name: suggest.name,
        comment: suggest.comment ? suggest.comment : ''
      }

      suggestsSet((prevState) => {
        return [...prevState, valueObj]
      })
    })

    hobbiesSet([])
    user.hobbies.length !== 0 && user.hobbies.forEach(hobbie => {
      const valueObj = {
        id: hobbie.id,
        name: hobbie.name
      }

      hobbiesSet((prevState) => {
        return [...prevState, valueObj]
      })
    })

    competencesSet([])
    user.competencies.length !== 0 && user.competencies.forEach(competence => {
      const valueObj = {
        id: competence.id,
        name: competence.name
      }

      competencesSet((prevState) => {
        return [...prevState, valueObj]
      })
    })

    if (user.city && user.city.id) {
      setSelectedCountryId(user.city.countryId)
      setCityId(user.city.id)
    }
    // eslint-disable-next-line
  }, [user])


  // HOBBIES
  const [hobbiesError, hobbiesErrorSet] = useState('')
  const { hobbies, hobbiesSet, hobbiesList, hobbiesChangeHandler, hobbiesRemoveHandler } = useHobbies()

  // SUGGESTS
  const [suggestsError, suggestsErrorSet] = useState('')
  const { suggests, suggestsSet, suggestsList, suggestsChangeHandler, suggestsCommentChangeHandler, suggestsRemoveHandler } = useSuggests()

  // COMPETENCES
  const [competencesError, competensesErrorSet] = useState('')
  const { competences, competencesSet, competencesList, competencesChangeHandler, competencesRemoveHandler } = useCompetences()

  // LOCATION
  const { selectedCountryId, cityId, setSelectedCountryId, setCityId, countriesList, cities, countryChoiceHandler, cityChoiceHandler } = useLocation()


  // SUBMIT
  const updatePhoto = useActions(actions => actions.profile.loadPhoto)
  const resetPassword = useActions(actions => actions.profile.resetPassword)
  const updateUser = useActions(actions => actions.profile.updateUser)

  const [resultMessage, setResultMessage] = useState('')

  const [processing, processingSet] = useState(false)
  const submitHandler = async e => {
    e.preventDefault()
    let isValid = true
    if (graduationYear === '') { graduationYearErrorSet('Выберите год выпуска'); isValid = false }
    if (about === '') { aboutErrorSet('Заполните информацию о себе'); isValid = false }
    if (competences.length === 0) { competensesErrorSet('Выберите подходящие Вам компетенции'); isValid = false }
    if (hobbies.length === 0) { hobbiesErrorSet('Выберите подходящие Вам хобби/увлечения'); isValid = false }
    if (suggests.length === 0) { suggestsErrorSet('Выберите подходящие Вам категории'); isValid = false }

    if (!isValid) return
    processingSet(true)

    const payload = {
      education: education ? education : '',
      workPlace: workPlace ? workPlace : '',
      workPosition: workPosition ? workPosition : '',
      socialVk: socialVk ? socialVk : '',
      socialInsta: socialInsta ? socialInsta : '',
      socialFb: socialFb ? socialFb : '',
      password, oldPassword, about,
      competences: competences.map(competence => competence.id),
      workYears: workYears ? `${workYears}-01-01` : '',
      graduationYear: parseInt(graduationYear),
      suggests,
      hobbies: hobbies.map(hobbie => hobbie.id),
      cityId: parseInt(cityId)
    }

    const submitSuccess = await updateUser(payload)
    if (submitSuccess !== true) {
      try {
        if (submitSuccess === 'server error') window.alert('Code 500: server error')
      } catch (error) {
        window.alert(error)
      }

    }

    // RESET PASSWORD
    if (payload.oldPassword && payload.password) {
      const changePasswordSuccess = await resetPassword({
        oldPassword: payload.oldPassword,
        newPassword: payload.password
      })

      if (changePasswordSuccess !== true) oldPasswordErrorSet('Указан неверный пароль')
    }

    // CHANGE PHOTO
    if (user.photo !== photo) {
      let photoFormData = new FormData();

      photoFormData.append("photo", photoFile);
      updatePhoto(photoFormData)
    }

    if (submitSuccess === true) {
      setResultMessage('Данные обновлены')
      setTimeout(() => {
        setResultMessage('')
      }, 5000);
    }
    processingSet(false)
  }

  return [(
    <form onSubmit={submitHandler} key="editDesktop" className="container d-none d-md-block">
      <div className="row">
        <div className="col-md-7">
          <div className="mb-2">
            {cardBlock(
              <h2>Редактирование</h2>,
              <div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-city">Город проживания:</label>
                  </div>
                  <div className="col-lg-6">
                    {location(
                      selectedCountryId,
                      countryChoiceHandler,
                      countriesList,

                      cities,
                      cityId,
                      cityChoiceHandler
                    )}
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-graduation-year">Год выпуска: </label>
                  </div>
                  <div className="col-lg-6">
                    <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="person-graduation-year">
                      <option value="" defaultChecked>Выберите год выпуска*</option>
                      {graduationYearOptions()}
                    </select>
                    <div className="form-error">{graduationYearError}</div>
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-graduation">Образование:</label>
                  </div>
                  <div className="col-lg-6">
                    <input {...educationBind} placeholder="Образование" className="w-100" id='person-graduation' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-graduation">Сферы деятельности:</label>
                  </div>
                  <div className="col-lg-6">
                    {competencesEdit(
                      competences,
                      competencesList,
                      competencesChangeHandler,
                      competencesRemoveHandler,
                      competensesErrorSet
                    )}

                    <div className="form-error">{competencesError}</div>
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-work">Место работы:</label>
                  </div>
                  <div className="col-lg-6">
                    <input {...workPlaceBind} placeholder="Место работы" className="w-100" id='person-work' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-post">Должность:</label>
                  </div>
                  <div className="col-lg-6">
                    <input {...workPositionBind} placeholder="Должность" className="w-100" id='person-post' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-work-years">Год начала работы:</label>
                  </div>
                  <div className="col-lg-6">
                    <input ref={workYearInput} {...workYearsBind} placeholder="Год начала работы" className="w-100" id='person-work-years' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-social-vk">Ссылка на vk:</label>
                  </div>
                  <div className="col-lg-6">
                    <input {...socialVkBind} placeholder="Ссылка на страницу vk" className="w-100" id='person-social-vk' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-social-fb">Ссылка на facebook:</label>
                  </div>
                  <div className="col-lg-6">
                    <input {...socialFbBind} placeholder="Ссылка на страницу facebook" className="w-100" id='person-social-fb' type="text" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-social-insta">Ссылка на instagram:</label>
                  </div>
                  <div className="col-lg-6">
                    <input {...socialInstaBind} placeholder="Ссылка на страницу instagram" className="w-100" id='person-social-insta' type="text" />
                  </div>
                </div>

              </div>
            )}
          </div>

          <div className="mb-2">
            {cardBlock(
              <h2>Что Вы можете предложить другим выпускникам?</h2>,
              <div>
                <div className="form-group">
                  <div className="form-group mb-1">
                    {suggestsEdit(
                      suggests,
                      suggestsList,
                      suggestsChangeHandler,
                      suggestsCommentChangeHandler,
                      suggestsRemoveHandler,
                      suggestsErrorSet
                    )}

                    <div className="form-error">{suggestsError}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="row no-gutters">
            <button disabled={processing} className='button_expanded button_secondary'>{processing ? '...' : 'Сохранить изменения'}</button>
          </div>

          {resultMessage &&
            <div className="mt-1"><i className="fas fa-check-circle"></i> {resultMessage}</div>}
        </div>
        <div className="col-md-5">

          {/* password reset */}
          <div>
            {cardBlock(
              <h2>Изменение пароля</h2>,
              <div>
                <div className="form-group mb-1">
                  <input onBlur={() => oldPasswordErrorSet('')} {...oldPasswordBind} type="password" className="w-100" placeholder="Старый пароль" />
                  <div className="form-error">{oldPasswordError}</div>
                </div>
                <div className="form-group mb-1">
                  <input {...passwordBind} type="password" className="w-100" placeholder="Новый пароль" />
                </div>
                <div className="form-group mb-1">
                  <input {...repeatPasswordBind} type="password" className="w-100" placeholder="Повторите новый пароль" />
                </div>
                {password !== repeatPassword &&
                  <div className="form-error">Пароли не совпадают</div>}
              </div>
            )}
          </div>

          {/* about and photo */}
          <div className="mt-2">
            {cardBlock(
              <h2>О себе</h2>,
              <div>
                <div className="mb-2 row">
                  <div className="order-2 order-xl-1 col-xl-6 mt-xl-0 mt-2">
                    <textarea onBlur={() => aboutErrorSet('')} {...aboutBind} className="w-100" name="person-about" rows="20" placeholder="О себе*" />
                    <div className="form-error">{aboutError}</div>
                  </div>
                  {/* photo */}
                  <div className="order-1 order-xl-2 col-xl-6">
                    <div>
                      <label style={{ cursor: 'pointer' }} htmlFor="person-photo"><img src={photo} alt="" /></label>
                      <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Изменить фото</label>
                      <input {...photoBind} accept="image/png, image/jpeg" className="d-none" type="file" name="person-photo" id="person-photo" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3>Хобби и увлечения</h3>
                  <div className="form-group mb-1">
                    {hobbiesEdit(
                      hobbies,
                      hobbiesList,
                      hobbiesChangeHandler,
                      hobbiesRemoveHandler,
                      hobbiesErrorSet
                    )}

                    <div className="form-error">{hobbiesError}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'right' }} className="mt-2">
            <Link to='/profile/my'><i className="fas fa-angle-double-left"></i>В профиль</Link>
          </div>

        </div>
      </div>
    </form>
  ),

  (
    <form onSubmit={submitHandler} key='editMobile' className="container d-md-none">
      {cardBlock(
        <h2>Редактирование</h2>,
        <div>

          {/* mobile nav */}
          <div className="card-injection py-1">
            <div className="lead-block px-2">
              <div ref={swiperRef} className="swiper-container">
                <div className="swiper-wrapper">

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button type="button" onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.main)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.main ? 'bold' : 'unset' }}
                      className="link alternative">Основное</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button type="button" onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.work)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.work ? 'bold' : 'unset' }}
                      className="link alternative">Работа</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button type="button" onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.other)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.other ? 'bold' : 'unset' }}
                      className="link alternative">Прочее</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button type="button" onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.about)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.about ? 'bold' : 'unset' }}
                      className="link alternative">О себе</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button type="button" onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.password)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.password ? 'bold' : 'unset' }}
                      className="link alternative">Изменение пароля</button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            {renderCurrentMobileNavigationContent()}
          </div>
        </div>
      )}

      <div className="row no-gutters mt-2">
        <button disabled={processing} className='button_expanded button_secondary'>{processing ? '...' : 'Сохранить изменения'}</button>
      </div>

      {resultMessage &&
        <div className="mt-1"><i className="fas fa-check-circle"></i> {resultMessage}</div>}

      <div className="row no-gutters mt-2">
        <Link to='/profile/my'><i className="fas fa-angle-double-left"></i>В профиль</Link>
      </div>
    </form>
  )

  ]
}
