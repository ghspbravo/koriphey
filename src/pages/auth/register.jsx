import React, { useState, useEffect, useRef } from 'react'
import { useActions, useStore } from 'easy-peasy';
import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';
import IMask from 'imask';

import { createPortal } from 'react-dom'
import Modal from '../../components/modals/modal';

export default function Register(router) {
  const steps = 3
  const [currentStep, setCurrentStep] = useState(1)

  const nextStepHandler = () => {
    if (currentStep === steps) return
    let isValid = true
    switch (currentStep) {
      case 1:
        if (name === '') { nameErrorSet('Заполните Ваше имя'); isValid = false }
        if (surname === '') { surnameErrorSet('Заполните Вашу фамилию'); isValid = false }
        if (email === '') { emailErrorSet('Заполните Ваш Email'); isValid = false }
        // else if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        else if (!/\S+@\S+\.\S+/
          .test(email)) { emailErrorSet('Заполните валидный Email'); isValid = false }
        if (birthdate === '') { birthdateErrorSet('Заполните Вашу дату рождения'); isValid = false }
        else if (!/[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]/.test(birthdate)) { birthdateErrorSet('Заполните валидную дату рождения'); isValid = false }
        // if (role === 0) { roleErrorSet('Выберите роль'); isValid = false }
        if (graduationYear === '') { graduationYearErrorSet('Выберите год выпуска'); isValid = false }
        // else if (!/[0-9][0-9][0-9][0-9]/.test(graduationYear)) { graduationYearErrorSet('Заполните валидный год выпуска'); isValid = false }
        if (password === '') { passwordErrorSet('Заполните пароль'); isValid = false }
        else if (password.length < 8) { passwordErrorSet('Пароль должен быть не меньше 8 символов'); isValid = false }
        if (password !== repeatPassword) isValid = false
        break;
      case 2:
        if (competences.length === 0) { competensesErrorSet('Выберите подходящие Вам компетенции'); isValid = false }

        break;
      case 3:
        return

      default:
        alert('step not found')
        break;
    }
    isValid && setCurrentStep(currentStep + 1)
  }

  const previousStepHandler = () => {
    if (currentStep === 1) return
    setCurrentStep(currentStep - 1)
  }

  const dateInput = useRef()
  const yearInput = useRef()

  // add input mask
  useEffect(() => {
    const dateMask = dateInput.current && new IMask(dateInput.current, {
      mask: Date,
      blocks: {
        Y: {
          mask: IMask.MaskedRange,
          from: 1950,
          to: new Date().getFullYear() - 18,
        }
      },
    });
    var yearMask = yearInput.current && IMask(yearInput.current, {
      mask: IMask.MaskedRange,
      from: 1900,
      to: new Date().getFullYear(),
      autofix: true,  // bound value
    });
    // const phoneMask = new IMask(phoneInput.current, {
    //   mask: '+{7} (000) 000-00-00',
    // });
    return () => {
      dateMask && dateMask.destroy()
      yearMask && yearMask.destroy()
      // phoneMask.destroy()
    }
  }, [currentStep])

  const { value: name, bind: nameBind } = useInput('');
  const [nameError, nameErrorSet] = useState('')
  const { value: surname, bind: surnameBind } = useInput('');
  const [surnameError, surnameErrorSet] = useState('')
  const { value: email, bind: emailBind } = useInput('');
  const [emailError, emailErrorSet] = useState('')
  const { value: birthdate, bind: birthdateBind } = useInput('');
  const [birthdateError, birthdateErrorSet] = useState('')
  const { value: role, bind: roleBind } = useInput(0);
  const [roleError, roleErrorSet] = useState('')
  // const { value: city, bind: cityBind } = useInput('');
  const { value: graduationYear, bind: graduationYearBind } = useInput('');
  const [graduationYearError, graduationYearErrorSet] = useState('')
  const { value: education, bind: educationBind } = useInput('');
  const [educationYearError, educationYearErrorSet] = useState('')
  const { value: workPlace, bind: workPlaceBind } = useInput('');
  const [workPlaceError, workPlaceErrorSet] = useState('')
  const { value: workPosition, bind: workPositionBind } = useInput('');
  const [workPositionError, workPositionErrorSet] = useState('')
  const { value: workYears, bind: workYearsBind } = useInput('');
  const [workYearsError, workYearsErrorSet] = useState('')
  const { value: currentActivity, bind: currentActivityBind } = useInput('');
  const [currentActivityError, currentActivityErrorSet] = useState('')
  // const { value: competences, bind: competencesBind } = useInput('');
  const { value: socialVk, bind: socialVkBind } = useInput('');
  const [socialVkError, socialVkErrorSet] = useState('')
  const { value: socialFb, bind: socialFbBind } = useInput('');
  const [socialFbError, socialFbErrorSet] = useState('')
  const { value: socialInsta, bind: socialInstaBind } = useInput('');
  const [socialInstaError, socialInstaErrorSet] = useState('')
  const { value: password, bind: passwordBind } = useInput('');
  const [passwordError, passwordErrorSet] = useState('')
  const { value: repeatPassword, bind: repeatPasswordBind } = useInput('');
  const { value: about, bind: aboutBind } = useInput('');
  const [aboutError, aboutErrorSet] = useState('')
  // const { value: suggests, bind: suggestsBind } = useInput('');
  // const [suggestsError, suggestsErrorSet] = useState('')
  const { value: interests, bind: interestsBind } = useInput('');
  const [interestsError, interestsErrorSet] = useState('')
  const { value: photoFile, previewFile: photo, bind: photoBind } = useFileInput(false, 'https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png')
  const [photoError, photoErrorSet] = useState('')



  // CATALOGUE


  const [hobbies, hobbiesSet] = useState([])
  const [hobbiesError, hobbiesErrorSet] = useState('')
  const [hobbiesList, hobbiesListSet] = useState([])
  const fetchedHobbiesList = useStore(store => store.profile.hobbiesList)
  const getHobbiesList = useActions(actions => actions.profile.getHobbiesList)

  // HOBBIES HANDLERS
  // set loaded hobbies list
  useEffect(() => {
    hobbiesListSet(fetchedHobbiesList)
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
  // set loaded hobbies list
  useEffect(() => {
    suggestsListSet(fetchedSuggestsList)
  }, [fetchedSuggestsList])

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
        if (item.id === parseInt(suggest.id))
          valid = false
      })
      return valid
    }))
  }, [suggests])

  const suggestsRemoveHandler = (suggest) => {

    suggestsSet((prevState) => prevState
      .filter((item) => item.id !== parseInt(suggest.id)))
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


  const register = useActions(actions => actions.register.register)

  const user = useStore(store => store.profile.user)
  const [processing, processingSet] = useState(false)


  const submitHandler = async e => {
    e.preventDefault()
    let isValid = true
    if (about === '') { aboutErrorSet('Заполните информацию о себе'); isValid = false }
    if (suggests === '') { suggestsErrorSet('Заполните то, что Вы можете предложить другим'); isValid = false }
    if (competences.length === 0) { competensesErrorSet('Выберите подходящие Вам компетенции'); isValid = false }
    if (hobbies.length === 0) { hobbiesErrorSet('Выберите подходящие Вам хобби/увлечения'); isValid = false }
    if (suggests.length === 0) { suggestsErrorSet('Выберите подходящие Вам категории'); isValid = false }

    if (!isValid) return
    processingSet(true)
    const date = birthdate.split('.')

    const payload = {
      name, surname, email, cityName, cityId, education, workPlace, workPosition,
      currentActivity, socialVk, socialInsta, socialFb, password, about, photoFile, interests,
      competences: competences.map(competence => competence.id),
      workYears: workYears ? `${workYears}-01-01` : '',
      graduationYear: parseInt(graduationYear),
      role: 0,
      // role: parseInt(role),
      birthdate: `${date[2]}-${date[1]}-${date[0]}`,
      suggests: suggests.map(suggest => ({ id: suggest.id, comment: suggest.comment })),
      hobbies: hobbies.map(hobbie => hobbie.id),
    }

    let myFormData = new FormData();

    myFormData.append("firstname", name);
    myFormData.append("surname", surname);
    myFormData.append("email", email);
    myFormData.append("birthDate", payload.birthdate);
    myFormData.append("password", password);
    myFormData.append("graduationYear", payload.graduationYear);
    myFormData.append("type", payload.role);

    payload.competences.forEach((competence, index) => {
      myFormData.append(`competencies[${index}]`, competence);
    })

    payload.hobbies.forEach((hobbie, index) => {
      myFormData.append(`hobbies[${index}]`, hobbie);
    })

    payload.suggests.forEach((suggest, index) => {
      myFormData.append(`utilities[${index}].id`, suggest.id);
      myFormData.append(`utilities[${index}].comment`, suggest.comment);
    })


    if (payload.photoFile) myFormData.append("photo", payload.photoFile);
    if (payload.workPlace !== '') myFormData.append("work", payload.workPlace);
    if (payload.workPosition !== '') myFormData.append("position", payload.workPosition);
    if (payload.workYears !== '') myFormData.append("workStart", payload.workYears);
    // if (payload.interests !== '') myFormData.append("interests", payload.interests);
    if (payload.about !== '') myFormData.append("about", payload.about);
    if (payload.education !== '') myFormData.append("education", payload.education);
    // if (payload.suggests !== '') myFormData.append("offersToGraduates", payload.suggests);
    if (payload.cityId !== undefined) myFormData.append("cityId", payload.cityId);
    if (payload.socialFb !== '') myFormData.append("FacebookUrl", payload.socialFb);
    if (payload.socialInsta !== '') myFormData.append("instagramUrl", payload.socialInsta);
    if (payload.socialVk !== '') myFormData.append("vkUrl", payload.socialVk);


    const submitSuccess = await register(myFormData)
    processingSet(false)
    if (submitSuccess !== true) {
      try {
        if (submitSuccess === 'email') {
          setCurrentStep(1)
          emailErrorSet('Email должен быть уникальным')
        }
        if (submitSuccess === 'server error') window.alert('Code 500: server error')
      } catch (error) {
        window.alert(error)
      }

    }
  }

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
  return (
    <div className="container">
      {
        document.getElementById('modal-root') && createPortal(
          <Modal isOpen={user && user.status === 0} close={() => router.history.push('/')}>
            <h2>Заявка на регистрацию отправлена</h2>
            <p>Благодарим за использование сервиса! Ваша заявка отправлена модераторам на рассмотрение.</p>
            <p>После одобрения, на Вашу почту придет сообщение с реквизитами для входа.</p>
          </Modal>, document.getElementById('modal-root'))
      }
      <div className="mt-0 mt-md-5 mx-auto col-xl-8 col-sm-10 px-0">
        <div className="card-auth">

          <div className="col-md-8">
            <div className="mb-2">
              <h2 style={{ textAlign: 'center' }}>Регистрация ({currentStep}/3)</h2>
            </div>
          </div>
          <form autoComplete="on" id="regform" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-8">

                {currentStep === 1 &&
                  <div>
                    <div className="form-group mb-1">
                      <input {...nameBind} onBlur={() => nameErrorSet('')} name="name" className="w-100" required placeholder="Имя*" type="text" />
                      <div className="form-error">{nameError}</div>
                    </div>
                    
                    <div className="form-group mb-1">
                      <input {...surnameBind} onBlur={() => surnameErrorSet('')} name="surname" className="w-100" required placeholder="Фамилия*" type="text" />
                      <div className="form-error">{surnameError}</div>
                    </div>

                    <div className="form-group mb-1">
                      <input {...emailBind} onBlur={() => emailErrorSet('')} name="email" className="w-100" required placeholder="Email*" type="email" />
                      <div className="form-error">{emailError}</div>
                    </div>

                    <div className="form-group mb-1">
                      <input {...birthdateBind} onBlur={() => birthdateErrorSet('')} name="birthDate" ref={dateInput} className="w-100" required placeholder="Дата рождения*" type="text" />
                      <div className="form-error">{birthdateError}</div>
                    </div>

                    {/* <div className="form-group mb-1">
                      <select {...roleBind} onBlur={() => roleErrorSet('')} name='type' className="w-100" type='hidden' value='00' required placeholder="Роль*">
                        <option value="0" defaultValue>Роль*</option> 
                        <option value="00">Выпускник</option>
                        <option value="1">Член клуба</option>
                        <option value="2">Родитель</option>
                      </select>
                      <div className="form-error">{roleError}</div>
                    </div> */}

                    <div className="form-group mb-1">
                      {/* <input {...graduationYearBind} onBlur={() => graduationYearErrorSet('')} name="graduationYear" ref={yearInput} className="w-100" required placeholder="Год выпуска из школы*" type="text" /> */}
                      <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="mobile-person-graduation-year">
                        <option value="" defaultChecked>Выберите год выпуска*</option>
                        {Array(new Date().getFullYear() + 1 - 2004).fill().map((item, index) => <option value={2004 + index}>{2004 + index}</option>)}
                      </select>
                      <div className="form-error">{graduationYearError}</div>
                    </div>

                    <div className="form-group mb-1">
                      <input {...passwordBind} onBlur={() => passwordErrorSet('')} className="w-100" name='password' required placeholder="Придумайте пароль*" type="password" />
                      <div className="form-error">{passwordError}</div>
                    </div>

                    <div className="form-group mb-1">
                      <input {...repeatPasswordBind} className="w-100" placeholder="Повторите пароль*" type="password" />
                      <span className="form-error">{password !== repeatPassword && 'Пароли не совпадают'}</span>
                    </div>

                    <button type="button" onClick={nextStepHandler} className="mt-3 button_expanded">Следующий шаг</button>
                  </div>}

                {currentStep === 2 &&
                  <div>
                    <div className="form-group mb-1">
                      <select onChange={countryChoiceHandler} className="w-100">
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
                        <select onChange={cityChoiceHandler} className="w-100">
                          <option value="" defaultValue>Город проживания</option>
                          {cities.length > 0 &&
                            cities.map((item, index) => <option key={index} value={item.id}>
                              {item.nameRU}
                            </option>)}
                        </select>
                      </div>}

                    {/* <div className="form-group mb-1">
                      <input {...cityBind} className="w-100" placeholder="Город проживания" type="text" />
                    </div> */}

                    <div className="form-group mb-1">
                      <input {...educationBind} className="w-100" placeholder="ВУЗ" type="text" />
                    </div>

                    <h3>Компетенции</h3>

                    <div className="form-group mb-1">
                      <select onBlur={() => competensesErrorSet('')} required className="w-100" onChange={competencesChangeHandler}>
                        <option value="0">Выберите сферу деятельности*</option>
                        {competencesList.map((competence, index) => <option key={index} value={competence.id}>
                          {competence.name}
                        </option>)}
                      </select>

                      {competences.length !== 0 &&
                        competences.map((competence, index) => <div key={index}>
                          {competence.name}
                          <button type='button' style={{ float: 'right' }} onClick={() => competencesRemoveHandler(competence)} className="no-style"><i className="fas fa-times"></i></button>
                        </div>)
                      }

                      <div className="form-error">{competencesError}</div>
                    </div>

                    {/* <button type="button" className="link mb-1"><i className="fas fa-plus"></i> Добавить сферу деятельности</button> */}

                    <div className="form-group mb-1">
                      <input {...workPlaceBind} className="w-100" placeholder="Текущее место работы" type="text" />
                    </div>

                    <div className="form-group mb-1">
                      <input {...workPositionBind} className="w-100" placeholder="Должность" type="text" />
                    </div>

                    <div className="form-group mb-1">
                      <input {...workYearsBind} ref={yearInput} className="w-100" placeholder="Год начала работы" type="text" />
                    </div>

                    {/* <div className="form-group mb-1">
                      <input {...currentActivityBind} className="w-100" placeholder="Текущая деятельность" type="text" />
                    </div> */}

                    <div className="row">
                      <div className="col-6">
                        <button type="button" onClick={previousStepHandler} className="mt-3 button_expanded">Назад</button>
                      </div>
                      <div className="col-6">
                        <button type="button" onClick={nextStepHandler} className="mt-3 button_expanded button_secondary">Вперёд</button>
                      </div>
                    </div>
                  </div>}

                {currentStep === 3 &&
                  <div>

                    <h3>Что Вы можете предложить другим выпускникам?</h3>

                    <div className="form-group mb-1">
                      {/* <textarea onBlur={() => suggestsErrorSet('')} {...suggestsBind} rows="10" required className="w-100" placeholder="*" /> */}
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
                          <input onChange={(e) => suggestsCommentChangeHandler(suggest, e)} className="w-100" placeholder="Комментарий" type="text" />
                        </div>)
                      }
                      <div className="form-error">{suggestsError}</div>
                    </div>

                    <h3>Хобби и увлечения</h3>
                    <div className="form-group mb-1">
                      <select onBlur={() => hobbiesErrorSet('')} required className="w-100" onChange={hobbiesChangeHandler}>
                        <option value="0">Выберите хобби/увлечение*</option>
                        {hobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
                          {hobbie.name}
                        </option>)}
                      </select>

                      {hobbies.length !== 0 &&
                        hobbies.map((hobbie, index) => <div key={index}>
                          {hobbie.name}
                          <button type='button' style={{ float: 'right' }} onClick={() => hobbiesRemoveHandler(hobbie)} className="no-style"><i className="fas fa-times"></i></button>
                        </div>)
                      }

                      <div className="form-error">{hobbiesError}</div>
                    </div>

                    <div className="form-group mb-1">
                      <textarea onBlur={() => aboutErrorSet('')} {...aboutBind} rows="10" required className="w-100" placeholder="Пару слов о себе*" />
                      <div className="form-error">{aboutError}</div>
                    </div>

                    {/* <div className="form-group mb-1">
                      <textarea {...interestsBind} rows="10" className="w-100" placeholder="Ваши интересы" />
                    </div> */}

                    <div className="form-group mb-1">
                      <input {...socialVkBind} className="w-100" placeholder="Ссылка на страницу vk" type="text" />
                      <div className="form-hint">Ссылка должна быть в формате: https://vk.com/ваш id</div>
                    </div>

                    <div className="form-group mb-1">
                      <input {...socialFbBind} className="w-100" placeholder="Ссылка на страницу facebook" type="text" />
                      <div className="form-hint">Ссылка должна быть в формате: https://facebook.com/ваш id</div>
                    </div>

                    <div className="form-group mb-1">
                      <input {...socialInstaBind} className="w-100" placeholder="Ссылка на страницу instagram" type="text" />
                      <div className="form-hint">Ссылка должна быть в формате: https://instagram.com/ваш id</div>
                    </div>

                    <div className="d-md-none form-group">
                      <div className="row no-gutters align-items-center">
                        <label className="d-block mr-1" style={{ cursor: 'pointer' }} htmlFor="person-photo"><img style={{ width: '40px', height: '35px' }} src={photo} alt="" /></label>
                        <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Загрузить фото</label>
                        <div className="form-hint">Поддерживаемые форматы: png</div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <button type="button" onClick={previousStepHandler} className="mt-3 button_expanded">Назад</button>
                      </div>
                      <div className="col-6">
                        <button disabled={processing} className="mt-3 button_expanded button_secondary">{processing ? '...' : 'Готово'}</button>
                      </div>
                    </div>
                  </div>}
              </div>

              {/* right card */}
              <div className="col-md-3 d-none d-md-block form-group">
                <label style={{ cursor: 'pointer' }} htmlFor="person-photo"><img src={photo} alt="" /></label>
                <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Загрузить фото</label>
                <div className="form-hint">Поддерживаемые форматы: png</div>
                <input accept='image/png'
                  {...photoBind} className="d-none" type="file" name="photo" id="person-photo" />
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
