import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';

import IMask from 'imask';

import Swiper from 'swiper'
import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';

import { useStore, useActions } from 'easy-peasy';

export default function ProfileEdit() {
  const user = useStore(store => store.profile.user)

  const workYearInput = useRef()
  // const graduateYearInput = useRef()
  // add input mask
  useEffect(() => {
    var workYearMask = workYearInput.current && IMask(workYearInput.current, {
      mask: IMask.MaskedRange,
      from: 1900,
      to: new Date().getFullYear(),
      autofix: true,  // bound value
    });
    // var graduateYearMask = graduateYearInput.current && IMask(graduateYearInput.current, {
    //   mask: IMask.MaskedRange,
    //   from: 1900,
    //   to: new Date().getFullYear(),
    //   autofix: true,  // bound value
    // });
    return () => {
      workYearMask && workYearMask.destroy()
      // graduateYearMask && graduateYearMask.destroy()
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
  // const graduateYearInputMobile = useRef()
  const renderCurrentMobileNavigationContent = () => {
    var workYearMask = workYearInputMobile.current && IMask(workYearInputMobile.current, {
      mask: IMask.MaskedRange,
      from: 1900,
      to: new Date().getFullYear(),
      autofix: true,  // bound value
    });
    // var graduateYearMask = graduateYearInputMobile.current && IMask(graduateYearInputMobile.current, {
    //   mask: IMask.MaskedRange,
    //   from: 1900,
    //   to: new Date().getFullYear(),
    //   autofix: true,  // bound value
    // });
    switch (mobileNavigation) {
      case MOBILE_NAVIGATION.main:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-city">Город проживания:</label>
            </div>
            <div className="form-group mb-1">
              <select id="mobile-person-city" value={selectedCountryId} onChange={countryChoiceHandler} className="w-100">
                <option value="" defaultValue>Страна проживания</option>
                {countriesList.length > 0 &&
                  countriesList.map((item, index) => <option key={index} value={item.id}>
                    {item.nameRU}
                  </option>)}
              </select>
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
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation-year">Год выпуска: </label>
            </div>
            <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="mobile-person-graduation-year">
              <option value="" defaultChecked>Выберите год выпуска*</option>
              {Array(new Date().getFullYear() + 1 - 2004).fill().map((item, index) => <option value={2004 + index}>{2004 + index}</option>)}
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
              <label className="d-none d-lg-block" htmlFor="mobile-person-competences">Сферы деятельности:</label>
            </div>
            <select id="mobile-person-competences" onBlur={() => competensesErrorSet('')} required className="w-100" onChange={competencesChangeHandler}>
              <option value="0">Выберите сферу деятельности*</option>
              {competencesList.map((competence, index) => <option key={index} value={competence.id}>
                {competence.name}
              </option>)}
            </select>


            {competences.length !== 0 &&
              competences.map((competence, index) => <div className="mt-1" key={index}>
                {competence.name}
                <button type='button' style={{ float: 'right' }} onClick={() => competencesRemoveHandler(competence)} className="no-style"><i className="fas fa-times"></i></button>
              </div>)
            }

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
            <select onBlur={() => suggestsErrorSet('')} required className="w-100" onChange={suggestsChangeHandler}>
              <option value="0">Выберите категорию*</option>
              {suggestsList.map((suggest, index) => <option key={index} value={suggest.id}>
                {suggest.name}
              </option>)}
            </select>

            {suggests.length !== 0 &&
              suggests.map((suggest, index) => <div className="mt-1" key={index}>
                <div>
                  {suggest.name}
                  <button type='button' style={{ float: 'right' }} onClick={() => suggestsRemoveHandler(suggest)} className="no-style"><i className="fas fa-times"></i></button>
                </div>
                <input onChange={(e) => suggestsCommentChangeHandler(suggest, e)} defaultValue={suggest.comment} className="w-100" placeholder="Комментарий" type="text" />
              </div>)
            }
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
            <label htmlFor="mobile-person-hobbies">Хобби и увлечения</label>
            <select id="mobile-person-hobbies" onBlur={() => hobbiesErrorSet('')} required className="w-100" onChange={hobbiesChangeHandler}>
              <option value="0">Выберите хобби/увлечение*</option>
              {hobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
                {hobbie.name}
              </option>)}
            </select>

            {hobbies.length !== 0 &&
              hobbies.map((hobbie, index) => <div className="mt-1" key={index}>
                {hobbie.name}
                <button type='button' style={{ float: 'right' }} onClick={() => hobbiesRemoveHandler(hobbie)} className="no-style"><i className="fas fa-times"></i></button>
              </div>)
            }

            <div className="form-error">{hobbiesError}</div>
          </div>

          <div className="form-group mb-1">
            <div className="row no-gutters align-items-center">
              <label className="d-block mr-1" style={{ cursor: 'pointer' }} htmlFor="mobile-person-photo"><img style={{ width: '40px', height: '35px' }} src={photo} alt="" /></label>
              <label style={{ fontWeight: 'normal' }} className="link" htmlFor="mobile-person-photo">Изменить фото</label>
            </div>
            <input {...photoBind} accept="image/png" className="d-none" type="file" name="mobile-person-photo" id="mobile-person-photo" />
            <div className="form-hint">Поддерживаемые форматы: png</div>
          </div>

        </div>
      case MOBILE_NAVIGATION.password:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-password-old">Изменение пароля:</label>
            </div>
            <div className="form-group mb-1">
              <input {...oldPasswordBind} id="mobile-person-password-old" type="password" className="w-100" placeholder="Старый пароль" />
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

  // const { value: name, bind: nameBind } = useInput('');
  // const [nameError, nameErrorSet] = useState('')
  // const { value: email, bind: emailBind } = useInput('');
  // const [emailError, emailErrorSet] = useState('')
  // const { value: birthdate, bind: birthdateBind } = useInput('');
  // const [birthdateError, birthdateErrorSet] = useState('')
  // const { value: role, bind: roleBind } = useInput(0);
  // const [roleError, roleErrorSet] = useState('')
  const { value: graduationYear, bind: graduationYearBind, setValue: setGraduationYear } = useInput('');
  const [graduationYearError, graduationYearErrorSet] = useState('')
  const { value: education, bind: educationBind, setValue: setEducation } = useInput('');
  const [educationYearError, educationYearErrorSet] = useState('')
  const { value: workPlace, bind: workPlaceBind, setValue: setWorkPlace } = useInput('');
  const [workPlaceError, workPlaceErrorSet] = useState('')
  const { value: workPosition, bind: workPositionBind, setValue: setWorkPosition } = useInput('');
  const [workPositionError, workPositionErrorSet] = useState('')
  const { value: workYears, bind: workYearsBind, setValue: setWorkYears } = useInput('');
  const [workYearsError, workYearsErrorSet] = useState('')
  const { value: currentActivity, bind: currentActivityBind, setValue: setCurrentActivity } = useInput('');
  const [currentActivityError, currentActivityErrorSet] = useState('')
  const { value: socialVk, bind: socialVkBind, setValue: setSocialVk } = useInput('');
  const [socialVkError, socialVkErrorSet] = useState('')
  const { value: socialFb, bind: socialFbBind, setValue: setSocialFb } = useInput('');
  const [socialFbError, socialFbErrorSet] = useState('')
  const { value: socialInsta, bind: socialInstaBind, setValue: setSocialInsta } = useInput('');
  const [socialInstaError, socialInstaErrorSet] = useState('')
  const { value: oldPassword, bind: oldPasswordBind } = useInput('');
  const [oldPasswordError, oldPasswordErrorSet] = useState('')
  const { value: password, bind: passwordBind } = useInput('');
  const [passwordError, passwordErrorSet] = useState('')
  const { value: repeatPassword, bind: repeatPasswordBind } = useInput('');
  const { value: about, bind: aboutBind, setValue: setAbout } = useInput('');
  const [aboutError, aboutErrorSet] = useState('')
  // const { value: interests, bind: interestsBind, setValue: setInterests } = useInput('');
  // const [interestsError, interestsErrorSet] = useState('')
  const { value: photoFile, previewFile: photo, bind: photoBind, setPreviewFile: setPhoto } = useFileInput(false, 'https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png')
  const [photoError, photoErrorSet] = useState('')


  useEffect(() => {
    if (!(user && user.email)) return

    setGraduationYear(user.graduationYear)
    setWorkPlace(user.workExperiencies[0] && user.workExperiencies[0].name ? user.workExperiencies[0].name : '')
    setWorkPosition(user.workExperiencies[0] && user.workExperiencies[0].position ? user.workExperiencies[0].position : '')
    const workDateList = user.workExperiencies[0] && user.workExperiencies[0].start.match(/\d\d\d\d-\d\d-\d\d/)[0].split('-')
    setWorkYears(workDateList && workDateList[0] ? parseInt(workDateList[0]) : '')
    setEducation(user.education)
    // setInterests(user.interests)
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

    setCompetenses([])
    user.competencies.length !== 0 && user.competencies.forEach(competence => {
      const valueObj = {
        id: competence.id,
        name: competence.name
      }

      setCompetenses((prevState) => {
        return [...prevState, valueObj]
      })
    })

    if (user.city && user.city.id) {
      setSelectedCountryId(user.city.countryId)
      setCityId(user.city.id)
    }


  }, [user])


  // CATALOGUE


  const [hobbies, hobbiesSet] = useState([])
  const [hobbiesError, hobbiesErrorSet] = useState('')
  const [hobbiesList, hobbiesListSet] = useState([])
  const fetchedHobbiesList = useStore(store => store.profile.hobbiesList)
  const getHobbiesList = useActions(actions => actions.profile.getHobbiesList)

  // HOBBIES HANDLERS
  // set loaded hobbies list
  useEffect(() => {
    hobbiesListSet(fetchedHobbiesList.filter((item) => {
      let valid = true
      hobbies.forEach(hobbie => {
        if (item.id === parseInt(hobbie.id))
          valid = false
      })
      return valid
    }))
  }, [fetchedHobbiesList])

  const hobbiesChangeHandler = (e) => {
    const valueObj = {
      id: parseInt(e.target.value),
      name: e.target.options[e.target.selectedIndex].text
    }

    hobbiesSet((prevState) => {
      return [...prevState, valueObj]
    })

    e.target.value = 0
  }

  // update hobbies list on remove
  useEffect(() => {
    hobbiesListSet((prevState) => fetchedHobbiesList.filter((item) => {
      let valid = true
      hobbies.forEach(hobbie => {
        if (item.id === parseInt(hobbie.id))
          valid = false
      })
      return valid
    }))
  }, [hobbies])

  const hobbiesRemoveHandler = (hobbie) => {

    hobbiesSet((prevState) => prevState
      .filter((item) => item.id !== parseInt(hobbie.id)))
  }



  const [suggests, suggestsSet] = useState([])
  const [suggestsError, suggestsErrorSet] = useState('')
  const [suggestsList, suggestsListSet] = useState([])
  const fetchedSuggestsList = useStore(store => store.profile.suggestsList)
  const getSuggestsList = useActions(actions => actions.profile.getSuggestsList)


  // UTILITIES HANDLERS
  // TODO: filter by ID not name
  // set loaded utilities list
  useEffect(() => {
    suggestsListSet(fetchedSuggestsList.filter((item) => {
      let valid = true
      suggests.forEach(suggest => {
        if (item.name === suggest.name)
          // if (item.id === parseInt(suggest.id))
          valid = false
      })
      return valid
    }))

  }, [fetchedSuggestsList, user])

  const suggestsChangeHandler = (e) => {
    const valueObj = {
      id: parseInt(e.target.value),
      name: e.target.options[e.target.selectedIndex].text,
      comment: ''
    }

    suggestsSet((prevState) => {
      return [...prevState, valueObj]
    })

    e.target.value = 0
  }

  // update suggests list on remove
  useEffect(() => {
    suggestsListSet((prevState) => fetchedSuggestsList.filter((item) => {
      let valid = true
      suggests.forEach(suggest => {
        if (item.name === suggest.name)
          // if (item.id === parseInt(suggest.id))
          valid = false
      })
      return valid
    }))
  }, [suggests])

  const suggestsRemoveHandler = (suggest) => {

    suggestsSet((prevState) => prevState
      // .filter((item) => item.id !== parseInt(suggest.id)))
      .filter((item) => item.name !== suggest.name))
  }

  const suggestsCommentChangeHandler = (suggest, e) => {

    suggest.comment = e.target.value
  }



  const [competences, setCompetenses] = useState([])
  const [competencesError, competensesErrorSet] = useState('')
  const [competencesList, setCompetensesList] = useState([])
  const fetchedCompetencesList = useStore(store => store.profile.competencesList)
  const getCompetencesList = useActions(actions => actions.profile.getCompetencesList)


  // COMPETENCES HANDLERS
  // set loaded competences list
  useEffect(() => {
    setCompetensesList(fetchedCompetencesList)
  }, [fetchedCompetencesList])

  const competencesChangeHandler = (e) => {
    const valueObj = {
      id: parseInt(e.target.value),
      name: e.target.options[e.target.selectedIndex].text
    }

    setCompetenses((prevState) => {
      return [...prevState, valueObj]
    })

    e.target.value = 0
  }

  // update competences list on remove
  useEffect(() => {
    setCompetensesList((prevState) => fetchedCompetencesList.filter((item) => {
      let valid = true
      competences.forEach(competence => {
        if (item.id === parseInt(competence.id))
          valid = false
      })
      return valid
    }))
  }, [competences])

  const competencesRemoveHandler = (competence) => {

    setCompetenses((prevState) => prevState
      .filter((item) => item.id !== parseInt(competence.id)))
  }


  // load lists for registration selects
  useEffect(() => {
    !countriesList.length &&
      loadCountries()

    !fetchedCompetencesList.length &&
      getCompetencesList()

    !fetchedHobbiesList.length &&
      getHobbiesList()

    !fetchedSuggestsList.length &&
      getSuggestsList()
  }, [])


  const countriesList = useStore(store => store.locations.countriesList)
  const loadCountries = useActions(actions => actions.locations.loadCountries)
  const loadCities = useActions(actions => actions.locations.loadCities)

  const [selectedCountryId, setSelectedCountryId] = useState()
  const [cities, setCities] = useState([])

  const [cityName, setCityName] = useState('')
  const [cityId, setCityId] = useState()

  // load city list 
  useEffect(() => {
    if (!selectedCountryId) return

    setCities([])
    loadCities(selectedCountryId).then(setCities)
  }, [selectedCountryId])

  const countryChoiceHandler = (e) => {
    setSelectedCountryId(e.target.value)
  }

  const cityChoiceHandler = (e) => {
    setCityId(e.target.value)
    // setCityName('city')
  }

  const [processing, processingSet] = useState(false)

  const [resetPasswordSuccess, setResetPasswordSuccess] = useState('')


  const updatePhoto = useActions(actions => actions.profile.loadPhoto)
  const resetPassword = useActions(actions => actions.profile.resetPassword)
  const updateUser = useActions(actions => actions.profile.updateUser)

  const [resultMessage, setResultMessage] = useState('')

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
      currentActivity,
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

    if (submitSuccess === true) {
      setResultMessage('Данные обновлены')
      setTimeout(() => {
        setResultMessage('')
      }, 5000);
    }

    if (payload.oldPassword && payload.password) {
      const changePasswordSuccess = await resetPassword({
        oldPassword: payload.oldPassword,
        newPassword: payload.password
      })

      if (changePasswordSuccess === true) setResetPasswordSuccess('Пароль изменен')
      else oldPasswordErrorSet('Указан неверный пароль')
    }

    if (user.photo !== photo) {
      let photoFormData = new FormData();

      photoFormData.append("photo", photoFile);

      const success = updatePhoto(photoFormData)
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
                    {/* <input {...cityBind} placeholder="Город проживания" className="w-100" id='person-city' type="text" /> */}
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-graduation-year">Год выпуска: </label>
                  </div>
                  <div className="col-lg-6">
                    <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="person-graduation-year">
                      <option value="" defaultChecked>Выберите год выпуска*</option>
                      {Array(new Date().getFullYear() + 1 - 2004).fill().map((item, index) => <option value={2004 + index}>{2004 + index}</option>)}
                    </select>
                    {/* <input onBlur={() => graduationYearErrorSet('')} ref={graduateYearInput} {...graduationYearBind} placeholder="Год выпуска" className="w-100" id='person-graduation-year' type="text" /> */}
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
                    <select onBlur={() => competensesErrorSet('')} required className="w-100" onChange={competencesChangeHandler}>
                      <option value="0">Выберите сферу деятельности*</option>
                      {competencesList.map((competence, index) => <option key={index} value={competence.id}>
                        {competence.name}
                      </option>)}
                    </select>


                    {competences.length !== 0 &&
                      competences.map((competence, index) => <div className="mt-1" key={index}>
                        {competence.name}
                        <button type='button' style={{ float: 'right' }} onClick={() => competencesRemoveHandler(competence)} className="no-style"><i className="fas fa-times"></i></button>
                      </div>)
                    }

                    <div className="form-error">{competencesError}</div>
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-work">Текущее место работы:</label>
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
                    <select onBlur={() => suggestsErrorSet('')} required className="w-100" onChange={suggestsChangeHandler}>
                      <option value="0">Выберите категорию*</option>
                      {suggestsList.map((suggest, index) => <option key={index} value={suggest.id}>
                        {suggest.name}
                      </option>)}
                    </select>

                    {suggests.length !== 0 &&
                      suggests.map((suggest, index) => <div className="mt-1" key={index}>
                        <div>
                          {suggest.name}
                          <button type='button' style={{ float: 'right' }} onClick={() => suggestsRemoveHandler(suggest)} className="no-style"><i className="fas fa-times"></i></button>
                        </div>
                        <input onChange={(e) => suggestsCommentChangeHandler(suggest, e)} defaultValue={suggest.comment} className="w-100" placeholder="Комментарий" type="text" />
                      </div>)
                    }
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
                  <input {...oldPasswordBind} type="password" className="w-100" placeholder="Старый пароль" />
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
                      <input {...photoBind} accept="image/png" className="d-none" type="file" name="person-photo" id="person-photo" />
                      <div className="form-hint">Поддерживаемые форматы: png</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3>Хобби и увлечения</h3>
                  <div className="form-group mb-1">
                    <select onBlur={() => hobbiesErrorSet('')} required className="w-100" onChange={hobbiesChangeHandler}>
                      <option value="0">Выберите хобби/увлечение*</option>
                      {hobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
                        {hobbie.name}
                      </option>)}
                    </select>

                    {hobbies.length !== 0 &&
                      hobbies.map((hobbie, index) => <div className="mt-1" key={index}>
                        {hobbie.name}
                        <button type='button' style={{ float: 'right' }} onClick={() => hobbiesRemoveHandler(hobbie)} className="no-style"><i className="fas fa-times"></i></button>
                      </div>)
                    }

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
