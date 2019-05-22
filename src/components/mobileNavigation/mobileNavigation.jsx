import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './mobileNavigation.scss'
import mediaPerson from '../mediaPerson/mediaPerson';

import { useActions } from 'easy-peasy';

export default function MobileNavigation(ref, closeHandler) {

  const logout = useActions(actions => actions.auth.logout)
  const logoutHandler = () => {
    localStorage.removeItem("refresh")
    logout()
  }
  return (
    <div ref={ref} onClick={closeHandler} className="mobile-navigation-wrapper d-md-none">
      <div className="container px-0">
        <div className="mobile-navigation">

          <div className="navigation-section">
            {mediaPerson(
              "https://picsum.photos/50",
              "Денис Петров",
              <span>Мой профиль</span>
            )}
            <Link className="expanded" to='/profile' />
          </div>
          
          <nav className="navigation-section">
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/people'>Люди</NavLink>
            </div>
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/requests'>Запросы</NavLink>
            </div>
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/news'>Новости</NavLink>
            </div>
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/demo'>Демо</NavLink>
            </div>
          </nav>

          <div className="navigation-section">
            <div className="py-1">
              <Link className="navigation-item no-style" to='/endaument'>Эндаумент</Link>
            </div>
            <div className="py-1">
              <Link className="navigation-item no-style" to='/endaument'>Сообщить о достижении</Link>
            </div>
          </div>

          <div className="navigation-section">
            <div className="py-1">
              <Link className="navigation-item no-style" to='/requests/create'>Создать запрос</Link>
            </div>
            <div className="py-1">
              <Link className="navigation-item no-style" to='/endaument'>Редактировать</Link>
            </div>
            <div className="py-1">
              <button onClick={logoutHandler} className="no-style navigation-item">Выход</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
