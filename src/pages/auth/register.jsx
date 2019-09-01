import React, { useState, useEffect, useRef } from 'react'
import { useActions, useStore } from 'easy-peasy';
import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';
import IMask from 'imask';

import { createPortal } from 'react-dom'
import Modal from '../../components/modals/modal';
import graduationYearOptions from '../../components/graduationYear/graduationYearOptions';
import useLocation from '../../hooks/useLocation';
import useCompetences from '../../hooks/useCompetences';
import useHobbies from '../../hooks/useHobbies';
import location from '../../components/location/location';
import hobbiesEdit from '../../components/hobbies/hobbiesEdit';
import competencesEdit from '../../components/competences/competencesEdit';

export default function Register(router) {

  const ROLE = {
    GRADUATE: 0,
    TEACHER: 3,
    STUDENT: 4
  }

  const dateInput = useRef()
  const workYearInput = useRef()

  const { value: role, bind: roleBind } = useInput(ROLE.GRADUATE, 'number');
  const [roleError, roleErrorSet] = useState('')

  // add input mask
  useEffect(() => {
    const dateMask = dateInput.current && new IMask(dateInput.current, {
      mask: Date,
      blocks: {
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: new Date().getFullYear() - 18,
        }
      },
    });
    const workYearMask = workYearInput.current && IMask(workYearInput.current, {
      mask: IMask.MaskedRange,
      from: 1900,
      to: new Date().getFullYear(),
      autofix: true,  // bound value
    });
    return () => {
      dateMask && dateMask.destroy()
      workYearMask && workYearMask.destroy()
    }
  }, [role])

  // Steps handlers
  const totalSteps = 2
  const [currentStep, currentStepSet] = useState(1)
  const prevStep = () => currentStepSet(currentStep - 1)
  const nextStep = () => {
    validateFirstStep() && currentStepSet(currentStep + 1)
  }


  // STEP 1 

  const { value: name, bind: nameBind } = useInput('');
  const [nameError, nameErrorSet] = useState('')
  const { value: surname, bind: surnameBind } = useInput('');
  const [surnameError, surnameErrorSet] = useState('')
  const { value: email, bind: emailBind } = useInput('');
  const [emailError, emailErrorSet] = useState('')

  const { value: birthdate, bind: birthdateBind } = useInput('');
  const [birthdateError, birthdateErrorSet] = useState('')
  const { value: graduationYear, bind: graduationYearBind } = useInput('');
  const [graduationYearError, graduationYearErrorSet] = useState('')

  const { value: password, bind: passwordBind } = useInput('');
  const [passwordError, passwordErrorSet] = useState('')
  const { value: repeatPassword, bind: repeatPasswordBind } = useInput('');

  const { value: workingYear, bind: workingYearBind } = useInput('');
  const [workingYearError, workingYearErrorSet] = useState('')

  const validateFirstStep = () => {
    let isValid = true
    if (name === '') { nameErrorSet('Заполните Ваше имя'); isValid = false }
    if (surname === '') { surnameErrorSet('Заполните Вашу фамилию'); isValid = false }
    if (email === '') { emailErrorSet('Заполните Ваш Email'); isValid = false }
    else if (!/\S+@\S+\.\S+/
      .test(email)) { emailErrorSet('Заполните валидный Email'); isValid = false }
    if (birthdate === '') { birthdateErrorSet('Заполните Вашу дату рождения'); isValid = false }
    else if (!/[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]/.test(birthdate)) { birthdateErrorSet('Заполните валидную дату рождения'); isValid = false }

    if (role === ROLE.GRADUATE && graduationYear === '') { graduationYearErrorSet('Выберите год выпуска'); isValid = false }
    if (role === ROLE.TEACHER && workingYear === '') { workingYearErrorSet('Заполните год начала работы'); isValid = false }

    if (password === '') { passwordErrorSet('Заполните пароль'); isValid = false }
    else if (password.length < 8) { passwordErrorSet('Пароль должен быть не меньше 8 символов'); isValid = false }
    if (password !== repeatPassword) isValid = false

    return isValid
  }

  // STEP 2
  const { selectedCountryId, cityId,
    countriesList, cities, countryChoiceHandler, cityChoiceHandler } = useLocation()
  const [countryError, countryErrorSet] = useState('')
  const [cityError, cityErrorSet] = useState('')
  const { competences,
    competencesList, competencesChangeHandler, competencesRemoveHandler } = useCompetences()
  const [competencesError, competencesErrorSet] = useState('')
  const { hobbies, hobbiesList, hobbiesChangeHandler, hobbiesRemoveHandler } = useHobbies()
  const [hobbiesError, hobbiesErrorSet] = useState('')



  const { value: photoFile, previewFile: photo, bind: photoBind } = useFileInput(false, 'https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png')
  // const [photoError, photoErrorSet] = useState('')


  const register = useActions(actions => actions.register.register)

  const user = useStore(store => store.profile.user)
  const [processing, processingSet] = useState(false)


  const submitHandler = async e => {
    e.preventDefault()
    let isValid = true
    if (selectedCountryId === undefined) { countryErrorSet('Выберите страну проживания'); isValid = false }
    if (selectedCountryId !== undefined && cityId === undefined) { cityErrorSet('Выберите город проживания'); isValid = false }
    if (competences.length === 0) { competencesErrorSet('Выберите хоть одну область занятости'); isValid = false }
    if (hobbies.length === 0) { hobbiesErrorSet('Выберите хоть одно хобби'); isValid = false }

    if (!isValid) return

    processingSet(true)

    const date = birthdate.split('.')

    const payload = {
      name, surname, email,
      graduationYear: parseInt(graduationYear),
      workingYear: parseInt(workingYear),
      birthdate: `${date[2]}-${date[1]}-${date[0]}`
    }

    let myFormData = new FormData();

    myFormData.append("firstname", name);
    myFormData.append("surname", surname);
    myFormData.append("email", email.trim().toLowerCase());
    myFormData.append("birthDate", payload.birthdate);
    myFormData.append("password", password);

    role === ROLE.GRADUATE && myFormData.append("graduationYear", payload.graduationYear);

    if (role === ROLE.TEACHER) {
      myFormData.append("WorkStart", payload.workingYear);
      myFormData.append("Work", 'Гимназия №210 «Корифей»');
      myFormData.append("Position", 'Учитель');
    }
    myFormData.append("type", role);

    myFormData.append("CityId", cityId);

    competences.forEach((competence, index) => myFormData.append(`Competencies[${index}]`, competence.id))
    hobbies.forEach((hobby, index) => myFormData.append(`Hobbies[${index}]`, hobby.id))

    if (photoFile) myFormData.append("photo", photoFile);

    const submitSuccess = await register(myFormData)
    processingSet(false)
    if (submitSuccess !== true) {
      try {
        if (submitSuccess === 'email') {
          currentStepSet(1)
          emailErrorSet('Email должен быть уникальным')
        }
        if (submitSuccess === 'server error') window.alert('Code 500: server error')
      } catch (error) {
        window.alert(error)
      }

    }
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
              <h2 style={{ textAlign: 'center' }}>Регистрация</h2>
            </div>
          </div>
          <form autoComplete="on" id="regform" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-8">

                <div>
                  {currentStep === 1 &&
                    <div>

                      <div className="form-group mb-1">
                        <input {...nameBind} onBlur={() => nameErrorSet('')} name="name" className="w-100" placeholder="Имя*" type="text" />
                        <div className="form-error">{nameError}</div>
                      </div>

                      <div className="form-group mb-1">
                        <input {...surnameBind} onBlur={() => surnameErrorSet('')} name="surname" className="w-100" placeholder="Фамилия*" type="text" />
                        <div className="form-error">{surnameError}</div>
                      </div>

                      <div className="form-group mb-1">
                        <input {...emailBind} onBlur={() => emailErrorSet('')} name="email" className="w-100" placeholder="Email*" type="email" />
                        <div className="form-error">{emailError}</div>
                      </div>

                      <div className="form-group mb-1">
                        <input {...birthdateBind} onBlur={() => birthdateErrorSet('')} name="birthDate" ref={dateInput} className="w-100" placeholder="Дата рождения*" type="text" />
                        <div className="form-error">{birthdateError}</div>
                      </div>

                      <div className="form-group mb-1">

                        <div className="form-hint">Выберите роль</div>
                        <select {...roleBind} onBlur={() => roleErrorSet('')} name='type' className="w-100">
                          <option value={ROLE.GRADUATE} defaultChecked>Выпускник</option>
                          <option value={ROLE.TEACHER}>Учитель</option>
                          <option value={ROLE.STUDENT}>Старшеклассник</option>
                        </select>
                        <div className="form-error">{roleError}</div>
                      </div>

                      {role === ROLE.GRADUATE &&
                        <div className="form-group mb-1">
                          <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="mobile-person-graduation-year">
                            <option value="" defaultChecked>Выберите год выпуска*</option>
                            {graduationYearOptions()}
                          </select>
                          <div className="form-error">{graduationYearError}</div>
                        </div>}

                      {role === ROLE.TEACHER &&
                        <div className="form-group mb-1">
                          <input ref={workYearInput} {...workingYearBind}
                            onBlur={() => workingYearErrorSet('')} className="w-100"
                            name='workingYear' placeholder="Введите год начала работы*" type="text" />
                          <div className="form-error">{workingYearError}</div>
                        </div>}

                      <div className="form-group mb-1">
                        <input {...passwordBind} onBlur={() => passwordErrorSet('')} className="w-100" name='password' placeholder="Придумайте пароль*" type="password" />
                        <div className="form-hint">Пароль должен быть не менее 8 символов</div>
                        <div className="form-error">{passwordError}</div>
                      </div>

                      <div className="form-group mb-1">
                        <input {...repeatPasswordBind} className="w-100" placeholder="Повторите пароль*" type="password" />
                        <span className="form-error">{password !== repeatPassword && 'Пароли не совпадают'}</span>
                      </div>

                      <div className="d-md-none form-group">
                        <div className="row no-gutters align-items-center">
                          <label className="d-block mr-1" style={{ cursor: 'pointer' }} htmlFor="person-photo"><img style={{ width: '40px', height: '35px' }} src={photo} alt="" /></label>
                          <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Загрузить фото</label>
                          <p className="small">Друзьям будет проще узнать Вас, если Вы загрузите свою настоящую фотографию, на которой отчетливо будет видно лицо.</p>
                        </div>
                      </div>

                    </div>}

                  {currentStep === 2 &&
                    <div>
                      <div className="form-group mb-1">
                        {location(
                          selectedCountryId,
                          countryChoiceHandler,
                          countriesList,

                          cities,
                          cityId,
                          cityChoiceHandler,

                          {
                            countryErrorSet,
                            cityErrorSet
                          }
                        )}

                        <div className="form-error">{countryError}</div>
                        <div className="form-error">{!countryError && cityError}</div>
                      </div>

                      <div className="form-group mb-1">
                        {competencesEdit(
                          competences,
                          competencesList,
                          competencesChangeHandler,
                          competencesRemoveHandler,
                          competencesErrorSet
                        )}

                        <div className="form-error">{competencesError}</div>
                      </div>

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

                    </div>}

                  <div className="row justify-content-center mt-3">
                    {currentStep > 1 && currentStep <= totalSteps &&
                      <div className="col-6">
                        <button type='button' className="button_expanded" onClick={prevStep} >Назад</button>
                      </div>
                    }

                    {currentStep < totalSteps &&
                      <div className="col-6">
                        <button type='button' className="button_expanded" onClick={nextStep} >Вперед</button>
                      </div>
                    }

                    {currentStep === totalSteps &&
                      <div className="col-6">
                        <button disabled={processing} className="button_expanded button_secondary">{processing ? '...' : 'Зарегистрироваться'}</button>
                      </div>
                    }
                  </div>
                </div>

              </div>

              {/* right card */}
              <div className="col-md-3 d-none d-md-block form-group">
                <label style={{ cursor: 'pointer' }} htmlFor="person-photo"><img src={photo} alt="" /></label>
                <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Загрузить фото</label>
                <input accept='image/png, image/jpeg'
                  {...photoBind} className="d-none" type="file" name="photo" id="person-photo" />
                <p className="small">Друзьям будет проще узнать Вас, если Вы загрузите свою настоящую фотографию, на которой отчетливо будет видно лицо.</p>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
