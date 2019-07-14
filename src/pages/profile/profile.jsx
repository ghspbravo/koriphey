import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
import cardBlock from '../../components/cardBlock/cardBlock';
import comment from '../../components/comment/comment';

import './profile.scss'
import { socialVkontakte, socialFacebook, socialInstagram } from '../../components/socials/socials';

import { useActions, useStore } from 'easy-peasy';
import userThumb from '../../components/userThumb.png'
import useInput from '../../hooks/useInput';

export default function Profile(router) {
  const [user, setUser] = useState()

  const currentUser = useStore(store => store.profile.user)


  const getUserById = useActions(actions => actions.profile.getUserById)
  async function loadUserContent() {
    const userContent = await getUserById(router.match.params.id)
    setUser(userContent)
  }
  useEffect(() => {
    loadUserContent()
    // eslint-disable-next-line
  }, [router.match.params.id])

  const { value: reviewText, bind: reviewTextBind, reset: reviewTextReset } = useInput('')

  const review = useActions(actions => actions.profile.commentUser)
  const submitReviewHandler = () => {
    if (!reviewText) return
    review({
      id: router.match.params.id,
      reviewText
    }).then(response => {
      if (response === 200) {
        reviewTextReset()
        loadUserContent()
      } else alert('Ошибка отзыв')
    })
  }
  return (
    <div className="container">
      <div className="row">

        <div className="col-lg-4">

          <div className="row no-gutters profile-person">
            <div className="col-6 pr-1 profile-person__photo">
              <img src={user && user.photo ? user.photo : userThumb} alt="" />
            </div>
            <div className="col-6 pl-1">
              <h2 className="profile-person__name">{user && user.fio ? `${user.firstName} ${user.surName}` : '...'}</h2>
              <a href={`mailto:${user && user.email}`} className="profile-person__button button button_expanded">Написать</a>
              {/* <Link className="profile-person__button button button_expanded button_secondary mt-1 disabled" to={`/profile/${router.match.params.id}`}>Отзыв</Link> */}
            </div>
          </div>

          <div className="mt-2">
            {cardBlock(
              <h2>Информация</h2>,
              <div className="pb-2">
                {user && user.graduationYear
                  ? <div className="profile-info">
                    <div className="row mb-2">
                      <div className="profile-info__head col-6">Год выпуска:</div>
                      <div className="profile-info__content col-6">{user.graduationYear}</div>
                    </div>
                    {user.city && user.city.country &&
                      <div className="row mb-2">
                        <div className="profile-info__head col-6">Страна:</div>
                        <div className="profile-info__content col-6">{user.city.country.nameRU}</div>
                      </div>}
                    {user.city && user.city.nameRU &&
                      <div className="row mb-2">
                        <div className="profile-info__head col-6">Город:</div>
                        <div className="profile-info__content col-6">{user.city.nameRU}</div>
                      </div>}
                    {user && user.competencies.length !== 0 &&
                      <div>
                        <div className="row mb-1">
                          <div className="profile-info__head col-12">Сферы деятельности: </div>
                        </div>
                        <div className="row mb-2">
                          <div className="profile-info__content col-12">{user.competencies
                            .map(competence => competence.name).join(', ')}</div>
                        </div>
                      </div>}
                    {user && user.hobbies.length !== 0 &&
                      <div>
                        <div className="row mb-1">
                          <div className="profile-info__head col-12">Хобби: </div>
                        </div>
                        <div className="row mb-2">
                          <div className="profile-info__content col-12">{user.hobbies
                            .map(hobbie => hobbie.name).join(', ')}</div>
                        </div>
                      </div>}
                    {user && user.education &&
                      <div className="row mb-2">
                        <div className="profile-info__head col-6">Образование:</div>
                        <div className="profile-info__content col-6">{user.education}</div>
                      </div>}
                    {user.workExperiencies && user.workExperiencies.length !== 0 && user.workExperiencies[0].name &&
                      <div className="row mb-2">
                        <div className="profile-info__head col-6">Место работы:</div>
                        <div className="profile-info__content col-6">{user.workExperiencies[0].name}</div>
                      </div>}
                    {user.workExperiencies && user.workExperiencies.length !== 0 && user.workExperiencies[0].position &&
                      <div className="row mb-2">
                        <div className="profile-info__head col-6">Должность:</div>
                        <div className="profile-info__content col-6">{user.workExperiencies[0].position}</div>
                      </div>}
                    {user.workExperiencies && user.workExperiencies.length !== 0 && user.workExperiencies[0].start &&
                      <div className="row mb-2">
                        <div className="profile-info__head col-6">Год начала работы:</div>
                        <div className="profile-info__content col-6">{user.workExperiencies[0].start.split('-')[0]}</div>
                      </div>}
                    {user.networks && user.networks.length !== 0 &&
                      <div className="row mb-2">
                        <div style={{ alignSelf: 'flex-end' }} className="profile-info__head col-6">В соц.сетях:</div>
                        <div className="profile-info__content col-6">
                          <div className="row no-gutters">
                            {user.networks.map((social, index) => <div key={index} className="mr-1 mt-1">
                              {social.network === 0
                                ? socialFacebook(social.link)
                                : social.network === 1
                                  ? socialVkontakte(social.link)
                                  : socialInstagram(social.link)
                              }
                            </div>)}
                          </div>
                        </div>
                      </div>}
                  </div>
                  : <p>Loading...</p>}
              </div>
            )}
          </div>

        </div>

        <div className="col-lg-8 mt-2 mt-lg-0">
          <div className="mb-2">
            {cardBlock(
              <h2>О себе</h2>,
              <div className="pb-2">
                <p>{user && user.about}</p>
              </div>
            )}
          </div>

          {user && user.utilities.length !== 0 &&
            <div className="mb-2">
              {cardBlock(
                <h2>Что я могу предложить</h2>,
                <div>
                  {user.utilities.map((suggest, index) => <div className="mb-2" key={index}>
                    <h3>{suggest.name}</h3>
                    <p>{suggest.comment}</p>
                  </div>)}
                  <p>{user.offersToGraduates}</p>
                </div>
              )}
            </div>}

          <div>
            {cardBlock(
              <h2>Отзывы</h2>,
              <div className="list-card no-padding">
                {user && user.reviews && user.reviews.length
                  ? user.reviews.map((item, key) => <div className="card list-card-item" key={key}>
                    {comment(
                      {
                        photo: item.from.photo,
                        name: `${item.from.firstName} ${item.from.surName}`,
                        location: `${item.from.city.country.nameRU}, ${item.from.city.nameRU}`,
                      },
                      item.text,
                      new Date(item.timeStampUTC)
                    )}
                  </div>)
                  : <div className="px-2">
                    <p>Отзывов о пользователе пока нет</p>
                  </div>}

                <div className="row align-items-center no-gutters mt-2 mx-2">
                  <div className="mr-1 media-person__photo d-none d-md-block">
                    <img src={currentUser && currentUser.photo} alt="person" />
                  </div>

                  <div className="col">
                    <textarea {...reviewTextBind} className="w-100" placeholder="Напишите отзыв" type="text" />
                  </div>

                  <button style={{
                    fontSize: '24px'
                  }} onClick={submitReviewHandler} className="no-style ml-1"><i className="fab fa-telegram-plane"></i></button>

                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
