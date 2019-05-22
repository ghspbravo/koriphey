import React from 'react'
import { Link } from "react-router-dom";
import cardBlock from '../../components/cardBlock/cardBlock';
import comment from '../../components/comment/comment';

import './profile.scss'
import { socialVkontakte, socialFacebook, socialInstagram } from '../../components/socials/socials';
import editIcon from '../../components/editIcon/editIcon';

export default function Profile() {
  return (
    <div className="container">
      <div className="row">

        <div className="col-lg-4">

          <div className="row no-gutters profile-person">
            <div className="col-6 pr-1 profile-person__photo">
              <img src="https://picsum.photos/200/250" alt="" />
            </div>
            <div className="col-6 pl-1">
              <h2 className="profile-person__name">Елена Алексеева</h2>
              <Link className="profile-person__button button button_expanded" to="/profile/requests">Мои запросы</Link>
              <Link className="profile-person__button button button_expanded button_secondary mt-1" to="/requests/create">Создать запрос</Link>
            </div>
          </div>

          <div className="mt-2">
            {cardBlock(
              <div className="row no-gutters">
                <h2 style={{ marginBottom: 0 }}>Информация</h2>
                <div className="ml-auto">
                  {editIcon('/profile/edit')}
                </div>
              </div>,
              <div className="pb-2">
                <table className="profile-info">
                  <tbody>
                    <tr>
                      <td className="profile-info__head">Роль:</td>
                      <td className="profile-info__content">Член клуба</td>
                    </tr>
                    <tr>
                      <td className="profile-info__head">Год выпуска:</td>
                      <td className="profile-info__content">2012</td>
                    </tr>
                    <tr>
                      <td className="profile-info__head">Страна:</td>
                      <td className="profile-info__content">США</td>
                    </tr>
                    <tr>
                      <td className="profile-info__head">Город:</td>
                      <td className="profile-info__content">Нью-Йорк</td>
                    </tr>
                    <tr>
                      <td className="profile-info__head">Категории: </td>
                      <td className="profile-info__content">Биология, Искусство, ИТ</td>
                    </tr>
                    <tr>
                      <td className="profile-info__head">Образование:</td>
                      <td className="profile-info__content">МГУ</td>
                    </tr>
                    <tr>
                      <td className="profile-info__head">Должность:</td>
                      <td className="profile-info__content">Разработчик</td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: 'bottom' }} className="profile-info__head">В соц.сетях:</td>
                      <td className="profile-info__content">
                        <div className="row no-gutters">
                          <div className="mr-1 mt-1">
                            {socialVkontakte("https://vk.com")}
                          </div>
                          <div className="mr-1 mt-1">
                            {socialFacebook("https://facebook.com")}
                          </div>
                          <div className="mr-1 mt-1">
                            {socialInstagram("https://instagram.com")}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        <div className="col-lg-8 mt-2 mt-lg-0">
          <div className="mb-2">
            {cardBlock(
              <h2>О себе</h2>,
              <div className="pb-2">
                <p>Веду активный образ жизни, занимаюсь большим теннисом, хожу в тренажерный зал, зимой катаюсь на сноуборде, однако сфера моих интересов не ограничена занятием спортом.
                 <br /> С раннего возраста изучаю английский и французский языки.</p>
              </div>
            )}
          </div>

          <div>
            {cardBlock(
              <h2>Отзывы</h2>,
              <div className="list-card no-padding">
                {Array(3).fill().map((item, key) => <div className="card list-card-item" key={key}>
                  {comment(
                    {
                      photo: "https://picsum.photos/50",
                      name: "Денис Петров",
                      location: "Нью-Йорк, США"
                    },
                    "Самое главное, чему меня научил Александр, - это умение бороться, ведь в современной жизни без этого никуда! Школа, безусловно, закалила мой характер - теперь уже не страшны ни бессонные ночи, ни огромные задания.",
                    1,
                    new Date("2019-05-02")
                  )}
                </div>)}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
