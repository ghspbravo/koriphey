import React, { useState } from 'react'
import { useActions } from 'easy-peasy';

export default function Register() {
  const steps = 3
  const [currentStep, setCurrentStep] = useState(1)

  const nextStepHandler = () => {
    if (currentStep === steps) return
    setCurrentStep(currentStep + 1)
  }

  const previousStepHandler = () => {
    if (currentStep === 1) return
    setCurrentStep(currentStep - 1)
  }

  const login = useActions(actions => actions.auth.login)
  const loginHandler = () => {
    localStorage.setItem("refresh", 'place for token')
    login()
  }
  return (
    <div className="container">
      <div className="mt-0 mt-md-5 mx-auto col-xl-8 col-sm-10 px-0">
        <div className="card-auth">

          <div className="col-md-8">
            <div className="mb-2">
              <h2 style={{ textAlign: 'center' }}>Регистрация ({currentStep}/3)</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">

              {currentStep === 1 &&
                <div>
                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="ФИО*" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Email*" type="email" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Дата рождения*" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Роль*" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Год выпуска из школы" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Придумайте пароль*" type="password" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Повторите пароль*" type="password" />
                  </div>

                  <button onClick={nextStepHandler} className="mt-3 button_expanded">Следующий шаг</button>
                </div>}

              {currentStep === 2 &&
                <div>
                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Город проживания" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="ВУЗ" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Место работы" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Должность" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Года работы" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Текущая деятельность" type="text" />
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <button onClick={previousStepHandler} className="mt-3 button_expanded">Назад</button>
                    </div>
                    <div className="col-6">
                      <button onClick={nextStepHandler} className="mt-3 button_expanded button_secondary">Вперёд</button>
                    </div>
                  </div>
                </div>}

              {currentStep === 3 &&
                <div>
                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Основные компетенции" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <textarea rows="10" className="w-100" placeholder="О себе" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Ссылка на страницу vk" type="text" />
                  </div>

                  <div className="form-group mb-1">
                    <input className="w-100" placeholder="Ссылка на страницу instagram" type="text" />
                  </div>

                  <div className="row no-gutters align-items-center">
                    <label className="d-block mr-1" style={{ cursor: 'pointer' }} htmlFor="mobile-person-photo"><img style={{ width: '40px', height: '35px' }} src="https://picsum.photos/200/150" alt="" /></label>
                    <label style={{ fontWeight: 'normal' }} className="link" htmlFor="mobile-person-photo">Загрузить фото</label>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <button onClick={previousStepHandler} className="mt-3 button_expanded">Назад</button>
                    </div>
                    <div className="col-6">
                      <button onClick={loginHandler} className="mt-3 button_expanded button_secondary">Готово</button>
                    </div>
                  </div>
                </div>}
            </div>

            <div className="col-md-3 d-none d-md-block">
              <label style={{ cursor: 'pointer' }} htmlFor="person-photo"><img src="https://picsum.photos/200/150" alt="" /></label>
              <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Загрузить фото</label>
              <input className="d-none" type="file" name="person-photo" id="person-photo" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
