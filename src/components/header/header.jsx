import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import './header.scss'
import notification from '../notification/notification';
import MobileNavigation from '../mobileNavigation/mobileNavigation';

import { useStore, useActions } from 'easy-peasy';

import logo from './logo.svg'
import useInput from '../../hooks/useInput';
export default function Header() {

  const profileControls = useRef()

  const profileClickHandler = () => {
    try {
      if (!profileControls.current.classList.contains('expanded')) {
        profileControls.current.classList.add('expanded')
        window.addEventListener('click', clickOutsideControlsHandler)
      }
      else {
        profileControls.current.classList.remove('expanded')
        window.removeEventListener('click', clickOutsideControlsHandler)
      }
    } catch (error) { console.error(error) }
  }

  const clickOutsideControlsHandler = e => {
    try {
      if (e.target.closest('.header__profile-controls')) return
      profileControls.current.classList.remove('expanded')
      window.removeEventListener('click', clickOutsideControlsHandler)
    } catch (error) { console.error(error) }
  }

  const mobileMenu = useRef()

  const mobileMenuOpenHandler = () => {
    mobileMenu.current.classList.add('opened')
    setMobileMenuOpened(true)
  }

  const mobileMenuCloseHandler = () => {
    mobileMenu.current.classList.remove('opened')
    setMobileMenuOpened(false)
  }

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false)

  const isAuth = useStore(store => store.auth.isAuth)

  const logout = useActions(actions => actions.auth.logout)
  const logoutHandler = () => {
    logout()
  }

  const user = useStore(store => store.profile.user)

  const { value: search, bind: searchBind } = useInput('');

  return (
    <div className="header">

      <div className="container">

        <div className="header-inner row no-gutters align-items-center">

          {isAuth && user.status === 1 &&
            <button onClick={isMobileMenuOpened ? mobileMenuCloseHandler : mobileMenuOpenHandler} className="header__navopen no-style d-md-none">
              <i className={`fas ${isMobileMenuOpened ? "fa-times" : "fa-bars"}`}></i>
            </button>}

          {createPortal(
            MobileNavigation(mobileMenu, mobileMenuCloseHandler),
            document.body
          )}

          <div className={`header__logo ${isAuth ? "mx-auto" : ""} mx-md-0`}>
            <img className="not-responsive" src={logo} alt="logo" />
            <Link to="/" className="expanded" />
          </div>

          {isAuth
            ? user.status === 1 &&
            [<div key={0} className="header__search d-none d-md-flex search ml-xl-4 ml-md-2">
              <Link style={{ fontSize: "18px" }} to={`/search/${search}`}
                className="search__icon no-style"><i className="fas fa-search"></i></Link>
              <input {...searchBind} placeholder="Поиск" className="search__input" type="text" name="search" />
            </div>,

            <nav key={1} className="header__navigation d-none d-md-block navigation ml-xl-4 ml-md-2">
              <NavLink className="navigation-item no-style" to='/people'>Выпускники</NavLink>
              <NavLink className="navigation-item no-style" to='/requests'>Запросы</NavLink>
              <NavLink className="navigation-item no-style" to='/news'>Новости</NavLink>
            </nav>,

            <div key={2} className="header__profile d-none d-md-block ml-1 ml-lg-auto">
              <div className="row no-gutters align-items-center">
                <div className="header__notifications">
                  {notification(0)}
                </div>

                <div onClick={profileClickHandler} className="header__profile-controls">
                  <img className='not-responsive' src={user && user.photo ? user.photo : "https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png"} alt="person thumbnail" />
                  <i className="fas fa-angle-down"></i>

                  <div ref={profileControls} className="d-none d-md-block profile-controls">

                    <div className="profile-controls-section">
                      <NavLink className="navigation-item no-style" to='/profile/my'>Мой профиль</NavLink>
                      <NavLink className="navigation-item no-style" to='/requests/create'>Создать запрос</NavLink>
                    </div>

                    {/* <div className="profile-controls-section">
                      <NavLink className="navigation-item no-style" to='/endaument'>Эндаумент</NavLink>
                      <NavLink className="navigation-item no-style" to='/endaument'>Сообщить о достижении</NavLink>
                    </div> */}

                    <div className="profile-controls-section">
                      <NavLink className="navigation-item no-style" to='/profile/edit'>Редактировать</NavLink>
                      <button onClick={logoutHandler} style={{
                        textAlign: 'left',
                        width: '100%'
                      }} className="no-style navigation-item">Выход</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>]
            : <div className="ml-auto">
              <Link to='/register' className="no-style d-none d-sm-inline-block"
                style={{ color: '#ffffffbb' }}
                onMouseOver={(e) => e.target.style.color = "white"}
                onMouseOut={(e) => e.target.style.color = "#ffffffbb"} >Зарегистрироваться</Link>
              <Link to='/login' className="button button_secondary ml-2">Войти</Link>
            </div>}

          {isAuth && (user.status === 0 || user.status === 2) &&
            <div className="ml-auto">
              <div onClick={profileClickHandler} className="header__profile-controls">
                <img className='not-responsive' src={user && user.photo ? user.photo : "https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png"} alt="person thumbnail" />
                <i className="fas fa-angle-down"></i>

                <div ref={profileControls} className="profile-controls">

                  <div className="profile-controls-section">
                    <button onClick={logoutHandler} style={{
                      textAlign: 'left',
                      width: '100%'
                    }} className="no-style navigation-item">Выход</button>
                  </div>

                </div>
              </div>
            </div>}

          {isAuth && user.status === 1 &&
            <div className="d-md-none">
              <Link to='/search/' className="search__icon no-style"><i className="fas fa-search"></i></Link>
            </div>}

        </div>

      </div>

    </div>
  )
}
