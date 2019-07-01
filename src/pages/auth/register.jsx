import React, { useState, useEffect, useRef } from 'react'
import { useActions, useStore } from 'easy-peasy';
import useInput from '../../hooks/useInput';
import useFileInput from '../../hooks/useFileInput';
import IMask from 'imask';

import { createPortal } from 'react-dom'
import Modal from '../../components/modals/modal';
import graduationYearOptions from '../../components/graduationYear/graduationYearOptions';

export default function Register(router) {

  const dateInput = useRef()

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
    return () => {
      dateMask && dateMask.destroy()
    }
  }, [])


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

  const { value: role, bind: roleBind } = useInput('');
  const [roleError, roleErrorSet] = useState('')

  const { value: photoFile, previewFile: photo, bind: photoBind } = useFileInput(false, 'https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png')
  // const [photoError, photoErrorSet] = useState('')


  const register = useActions(actions => actions.register.register)

  const user = useStore(store => store.profile.user)
  const [processing, processingSet] = useState(false)


  const submitHandler = async e => {
    e.preventDefault()
    let isValid = true
    if (name === '') { nameErrorSet('Заполните Ваше имя'); isValid = false }
    if (surname === '') { surnameErrorSet('Заполните Вашу фамилию'); isValid = false }
    if (email === '') { emailErrorSet('Заполните Ваш Email'); isValid = false }
    else if (!/\S+@\S+\.\S+/
      .test(email)) { emailErrorSet('Заполните валидный Email'); isValid = false }
    if (birthdate === '') { birthdateErrorSet('Заполните Вашу дату рождения'); isValid = false }
    else if (!/[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]/.test(birthdate)) { birthdateErrorSet('Заполните валидную дату рождения'); isValid = false }
    if (graduationYear === '') { graduationYearErrorSet('Выберите год выпуска'); isValid = false }
    if (password === '') { passwordErrorSet('Заполните пароль'); isValid = false }
    else if (password.length < 8) { passwordErrorSet('Пароль должен быть не меньше 8 символов'); isValid = false }
    if (password !== repeatPassword) isValid = false
    if (role === 0) { roleErrorSet('Выберите роль'); isValid = false }
    if (!isValid) return
    processingSet(true)
    const date = birthdate.split('.')

    const payload = {
      name, surname, email,
      graduationYear: parseInt(graduationYear),
      birthdate: `${date[2]}-${date[1]}-${date[0]}`
    }

    let myFormData = new FormData();

    myFormData.append("firstname", name);
    myFormData.append("surname", surname);
    myFormData.append("email", email);
    myFormData.append("birthDate", payload.birthdate);
    myFormData.append("password", password);
    myFormData.append("graduationYear", payload.graduationYear);
    myFormData.append("type", role);

    if (photoFile) myFormData.append("photo", photoFile);

    const submitSuccess = await register(myFormData)
    processingSet(false)
    if (submitSuccess !== true) {
      try {
        if (submitSuccess === 'email') {
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

                  <div className="form-group mb-1">
                    <select {...graduationYearBind} className="w-100" onBlur={() => graduationYearErrorSet('')} id="mobile-person-graduation-year">
                      <option value="" defaultChecked>Выберите год выпуска*</option>
                      {graduationYearOptions()}
                    </select>
                    <div className="form-error">{graduationYearError}</div>
                  </div>

                  <div className="form-group mb-1">
                    <div className="form-hint">Выберите роль</div>
                    <select {...roleBind} onBlur={() => roleErrorSet('')} name='type' className="w-100" required>
                      {/* <option value="" defaultChecked>Выберите роль*</option> */}
                      <option value="0" defaultChecked>Выпускник</option>
                      <option value="3">Учитель</option>
                      <option value="4">Старшеклассник</option>
                    </select>
                    <div className="form-error">{roleError}</div>
                  </div>

                  <div className="form-group mb-1">
                    <input {...passwordBind} onBlur={() => passwordErrorSet('')} className="w-100" name='password' required placeholder="Придумайте пароль*" type="password" />
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

                  <button disabled={processing} className="mt-3 button_expanded button_secondary">{processing ? '...' : 'Зарегистрироваться'}</button>
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
