import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';

import Swiper from 'swiper'

export default function ProfileEdit() {
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

  const renderCurrentMobileNavigationContent = () => {
    switch (mobileNavigation) {
      case MOBILE_NAVIGATION.main:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-city">Город проживания:</label>
            </div>
            <input placeholder="Город проживания" className="w-100" id='mobile-person-city' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation-year">Год выпуска: </label>
            </div>
            <input placeholder="Год выпуска" className="w-100" id='mobile-person-graduation-year' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation">Образование:</label>
            </div>
            <input placeholder="Образование" className="w-100" id='mobile-person-graduation' type="text" />
          </div>

        </div>
      case MOBILE_NAVIGATION.work:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-work">Место работы:</label>
            </div>
            <input placeholder="Место работы" className="w-100" id='mobile-person-work' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-graduation-post">Должность: </label>
            </div>
            <input placeholder="Должность" className="w-100" id='mobile-person-graduation-post' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-work-years">Года работы:</label>
            </div>
            <input placeholder="Года работы" className="w-100" id='mobile-person-work-years' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-activities">Текущая деятельность:</label>
            </div>
            <input placeholder="Текущая деятельность" className="w-100" id='mobile-person-activities' type="text" />
          </div>

        </div>
      case MOBILE_NAVIGATION.other:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-competence">Компетенции:</label>
            </div>
            <input placeholder="Компетенции" className="w-100" id='mobile-person-competence' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-socials-vk">Ссылка на vk: </label>
            </div>
            <input placeholder="Ссылка на vk" className="w-100" id='mobile-person-socials-vk' type="text" />
          </div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-socials-insta">Ссылка на instagram:</label>
            </div>
            <input placeholder="Ссылка на instagram" className="w-100" id='mobile-person-socials-insta' type="text" />
          </div>

        </div>
      case MOBILE_NAVIGATION.about:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-about">О себе:</label>
            </div>
            <textarea placeholder="О себе" className="w-100" id='mobile-person-about' rows="10" type="text" />
          </div>
          <div className="form-group mb-1">
            <div className="row no-gutters align-items-center">
              <label className="d-block mr-1" style={{ cursor: 'pointer' }} htmlFor="mobile-person-photo"><img style={{ width: '40px', height: '35px' }} src="https://picsum.photos/200/150" alt="" /></label>
              <label style={{ fontWeight: 'normal' }} className="link" htmlFor="mobile-person-photo">Изменить фото</label>
            </div>
            <input className="d-none" type="file" name="mobile-person-photo" id="mobile-person-photo" />
          </div>

        </div>
      case MOBILE_NAVIGATION.password:
        return <div>
          <div className="form-group mb-1">
            <div>
              <label className="d-block mb-1" htmlFor="mobile-person-password-old">Изменение пароля:</label>
            </div>
            <div className="form-group mb-1">
              <input id="mobile-person-password-old" type="password" className="w-100" placeholder="Старый пароль" />
            </div>
            <div className="form-group mb-1">
              <input type="password" className="w-100" placeholder="Новый пароль" />
            </div>
            <div className="form-group mb-1">
              <input type="password" className="w-100" placeholder="Повторите новый пароль" />
            </div>
          </div>


        </div>

      default:
        break;
    }
  }

  return [(
    <div key="editDesktop" className="container d-none d-md-block">
      <div className="row">
        <div className="col-md-7">
          <div>
            {cardBlock(
              <h2>Редактирование</h2>,
              <div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-city">Город проживания:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Город проживания" className="w-100" id='person-city' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-graduation-year">Год выпуска: </label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Год выпуска" className="w-100" id='person-graduation-year' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-graduation">Образование:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Образование" className="w-100" id='person-graduation' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-work">Место работы:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Место работы" className="w-100" id='person-work' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-post">Должность:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Должность" className="w-100" id='person-post' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-work-years">Года работы:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Года работы" className="w-100" id='person-work-years' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-activities">Текущая деятельность:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Текущая деятельность" className="w-100" id='person-activities' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-competence">Компетенции:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Основные компетенции" className="w-100" id='person-competence' type="text" />
                  </div>
                </div>

                <div className="row form-group mb-1">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-social-vk">Ссылка на vk:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Ссылка на страницу vk" className="w-100" id='person-social-vk' type="text" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-lg-6">
                    <label className="d-none d-lg-block" htmlFor="person-social-insta">Ссылка на instagram:</label>
                  </div>
                  <div className="col-lg-6">
                    <input placeholder="Ссылка на страницу instagram" className="w-100" id='person-social-insta' type="text" />
                  </div>
                </div>

              </div>
            )}
          </div>
          <div className="row no-gutters mt-2">
            <button className="button_expanded button_secondary">Сохранить изменения</button>
          </div>
        </div>
        <div className="col-md-5">

          <div>
            {cardBlock(
              <h2>Изменение пароля</h2>,
              <div>
                <div className="form-group mb-1">
                  <input type="password" className="w-100" placeholder="Старый пароль" />
                </div>
                <div className="form-group mb-1">
                  <input type="password" className="w-100" placeholder="Новый пароль" />
                </div>
                <div className="form-group mb-1">
                  <input type="password" className="w-100" placeholder="Повторите новый пароль" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-2">
            {cardBlock(
              <h2>О себе</h2>,
              <div className="row">
                <div className="order-2 order-xl-1 col-xl-6 mt-xl-0 mt-2">
                  <textarea className="w-100" name="person-about" rows="20" placeholder="О себе" />
                </div>
                <div className="order-1 order-xl-2 col-xl-6">
                  <div>
                    <label style={{ cursor: 'pointer' }} htmlFor="person-photo"><img src="https://picsum.photos/200/150" alt="" /></label>
                    <label style={{ fontWeight: 'normal' }} className="link" htmlFor="person-photo">Изменить фото</label>
                    <input className="d-none" type="file" name="person-photo" id="person-photo" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  ),
  (
    <div key='editMobile' className="container d-md-none">
      {cardBlock(
        <h2>Редактирование</h2>,
        <div>

          <div className="card-injection py-1">
            <div className="lead-block px-2">
              <div ref={swiperRef} className="swiper-container">
                <div className="swiper-wrapper">

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.main)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.main ? 'bold' : 'unset' }}
                      className="link alternative">Основное</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.work)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.work ? 'bold' : 'unset' }}
                      className="link alternative">Работа</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.other)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.other ? 'bold' : 'unset' }}
                      className="link alternative">Прочее</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.about)}
                      style={{ fontWeight: mobileNavigation === MOBILE_NAVIGATION.about ? 'bold' : 'unset' }}
                      className="link alternative">О себе</button>
                  </div>

                  <div style={{ width: 'fit-content' }} className="swiper-slide">
                    <button onClick={() => mobileNavigationChangeHandle(MOBILE_NAVIGATION.password)}
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
        <button className="button_secondary button_expanded">Сохранить изменения</button>
      </div>

      <div className="row no-gutters mt-2">
        <Link to='/profile/1'><i className="fas fa-angle-double-left"></i>В профиль</Link>
      </div>
    </div>
  )]
}
