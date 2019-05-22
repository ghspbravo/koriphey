import React from 'react'
import { Link } from 'react-router-dom'
import { socialVkontakte, socialFacebook } from '../../components/socials/socials';

import { useActions } from 'easy-peasy';

export default function Login() {
  const login = useActions(actions => actions.auth.login)
  const loginHandler = () => {
    localStorage.setItem("refresh", 'place for token')
    login()
  }
  return (
    <div className="container">
      <div className="mt-0 mt-md-5 mx-auto col-xl-5 col-lg-6 col-md-8 col-sm-10 px-0">
        <div className="card-auth">

          <div className="mb-2">
            <h2 style={{ textAlign: 'center' }}>Вход</h2>
          </div>

          <form onSubmit={loginHandler}>
            <div className="form-group mb-1">
              <input className="w-100" placeholder="Email" type="text" />
            </div>

            <div className="form-group mb-1">
              <input className="w-100" placeholder="Пароль" type="password" />
            </div>
            <Link to='/recover' className='light'>Забыли пароль?</Link>

            <button className="mt-3 button_expanded">Войти</button>
          </form>
          <Link to='/register' className="button button_expanded button_secondary mt-1" >Зарегестрироваться</Link>

          <div className="mt-3">
            <p>Зарегестрироваться  с помощью соцсетей: </p>
            <div className="row no-gutters">

              <div className="mr-1">
                {socialVkontakte("https://vk.com")}
              </div>

              <div className="mr-1">
                {socialFacebook("https://facebook.com")}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
