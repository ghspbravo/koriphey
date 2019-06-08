import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './mobileNavigation.scss'
import mediaPerson from '../mediaPerson/mediaPerson';

import { useStore, useActions } from 'easy-peasy';

export default function MobileNavigation(ref, closeHandler) {

  const logout = useActions(actions => actions.auth.logout)
  const logoutHandler = () => {
    localStorage.removeItem("refresh")
    logout()
  }

  const user = useStore(store => store.profile.user)

  return (
    <div ref={ref} onClick={closeHandler} className="mobile-navigation-wrapper d-md-none">
      <div className="container px-0">
        <div className="mobile-navigation">

          <div className="navigation-section">
            {mediaPerson(
              user.photo ? user.photo : "https://www.dacgllc.com/site/wp-content/uploads/2015/12/DACG_Web_AboutUs_PersonPlaceholder.png",
              `${user.firstName} ${user.surName}`,
              <span>Мой профиль</span>
            )}
            <Link className="expanded" to='/profile/my' />
          </div>
          
          <nav className="navigation-section">
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/people'>Выпускники</NavLink>
            </div>
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/requests'>Запросы</NavLink>
            </div>
            <div className="py-1" >
              <NavLink className="navigation-item no-style" to='/news'>Новости</NavLink>
            </div>
          </nav>

          {/* <div className="navigation-section">
            <div className="py-1">
              <Link className="navigation-item no-style" to='/endaument'>Эндаумент</Link>
            </div>
            <div className="py-1">
              <Link className="navigation-item no-style" to='/endaument'>Сообщить о достижении</Link>
            </div>
          </div> */}

          <div className="navigation-section">
            <div className="py-1">
              <Link className="navigation-item no-style" to='/requests/create'>Создать запрос</Link>
            </div>
            <div className="py-1">
              <Link className="navigation-item no-style" to='/profile/edit'>Редактировать</Link>
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
