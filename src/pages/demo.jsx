import React from 'react'

import { socialVkontakte, socialFacebook, socialInstagram } from '../components/socials/socials';
import cardBlock from '../components/cardBlock/cardBlock';
import notification from '../components/notification/notification';
import { feedbackLike, feedbackComment } from '../components/feedback/feedback';
import timeRelate from '../components/timeRelate/timeRelate';
import mediaPerson from '../components/mediaPerson/mediaPerson';
import requestItem from '../components/requestItem/requestItem';
import newsItem from '../components/newsItem/newsItem';
import personItem from '../components/personItem/personItem';
import comment from '../components/comment/comment';

export default function demo() {
  return (
    <div className="container">

      <h1>Components guideline</h1>

      <h3>Social (vk/fb/insta)</h3>
      <div className="row no-gutters">

        <div className="mr-2">
          {socialVkontakte("https://vk.com")}
        </div>

        <div className="mr-2">
          {socialFacebook("https://facebook.com")}
        </div>

        <div className="mr-2">
          {socialInstagram("https://instagram.com")}
        </div>

      </div>

      <h3>Card block (template)</h3>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12 mb-1 mb-md-0">
          {cardBlock(
            <h2>Цель проекта</h2>,
            <p><b>Цель проекта</b> – создать платформу для выпускников разных лет,
                 чтобы разрозненные поколения объединились в
                 сообщество благодарных выпускников, готовых
                 поддерживать школу, способствовать её развитию.
                  </p>
          )}
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          {cardBlock(
            <h2>О трудоустройстве</h2>,
            <div className="no-padding">
              <p>Нью-Йорк идеален для работы и карьеры, я уже писал почему.
                До приезда сюда я работал и в офисе, и был полтора года на
                фрилансе и вот опять вернулся в офис. За этот год снова убедился,
                что я совсем не офисный человек. Потому на вершине успеха я решил
                закончить свою карьеру веб-дизайнера. Работать только ради денег я не умею.
                  </p>
            </div>
          )}
        </div>
      </div>

      <h3>Notification</h3>
      <div className="row no-gutters">

        <div className="mr-2">
          {notification(9)}
        </div>

        <div className="mr-2">
          {notification(22)}
        </div>

        <div className="mr-2">
          {notification(0)}
        </div>

      </div>

      <h3>Feedback (liek/comment)</h3>
      <div className="row no-gutters">

        <div className="mr-2">
          {feedbackLike(100, false)}
        </div>

        <div className="mr-2">
          {feedbackLike(101, true)}
        </div>

        <div className="mr-2">
          {feedbackComment(20)}
        </div>

      </div>

      <h3>Time relate</h3>
      {timeRelate(new Date(2019, 4, 1, 22, 30))}

      <h3>Media person</h3>
      <div className="row">
        <div className="col-sm-3">
          {mediaPerson(
            "https://picsum.photos/50",
            "Денис Петров",
            <span>Нью-Йорк, США</span>
          )}
        </div>

        <div className="col-sm-3">
          {mediaPerson(
            "https://picsum.photos/50",
            "Денис Петров",
            <div>
              <p>Контентом может быть <u>все</u>, что угодно</p>
              <p>Даже в несколько абзацев <b>с форматированием</b></p>
            </div>
          )}
        </div>
      </div>

      <h3>Request</h3>
      <div className="row">
        <div className="col-sm-6">
          {requestItem(
            {
              photo: "https://picsum.photos/50",
              name: "Елена Алексеевна",
              location: "Москва, Россия"
            },
            {
              category: "путешествия",
              location: "Новосибирск"
            },
            "Ребята, буду в Новосибирске проездом. Посоветуйте, чем там можно заняться?.."
          )}
        </div>
        <div className="col-sm-6">
          {requestItem(
            {
              photo: "https://picsum.photos/50",
              name: "Елена Алексеевна",
              location: "Москва, Россия"
            },
            {
              category: "путешествия",
              location: "Новосибирск"
            },
            "Ребята, буду в Новосибирске проездом. Посоветуйте, чем там можно заняться?..",
            "https://picsum.photos/700/350"
          )}
        </div>
      </div>

      <h3>News</h3>
      {newsItem(
        1,
        "О трудоустройстве",
        "Нью-Йорк идеален для работы и карьеры, я уже писал почему. До приезда сюда я работал и в офисе, и был полтора года на фрилансе и вот опять вернулся в офис. За этот год снова убедился, что я совсем не офисный человек. Потому на вершине успеха я решил...",
        "https://picsum.photos/700/350",
        {
          likesCount: 650,
          commentsCount: 2
        },
        new Date("2019-05-01")
      )}

      <h3>Person</h3>
      {personItem(
        1,
        "Елена Алексеева",
        "Москва, Россия",
        {
          graduationYear: 2012,
          categories: "Путешестия, Спорт, Иностранные языки"
        },
        "https://picsum.photos/200"
      )}

      <h3>Comments</h3>
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

      <h3>Block card with list</h3>
      {cardBlock(
        <h2>Цель проекта</h2>,
        <div className="row no-padding list-card-2columns">
          {Array(6).fill().map((item, index) =>
            <div key={index} className="col-md-6 list-card-item">
              <div className="card">
                {personItem(
                  1,
                  "Елена Алексеева",
                  "Москва, Россия",
                  {
                    graduationYear: 2012,
                    categories: "Путешестия, Спорт, Иностранные языки"
                  },
                  "https://picsum.photos/200"
                )}
              </div>
            </div>)}
        </div>
      )}
      
      <h3>Block card with vertical list</h3>
      {cardBlock(
        <h2>Цель проекта</h2>,
        <div className="row no-padding list-card-1column">
          {Array(3).fill().map((item, index) =>
            <div key={index} className="col-12 list-card-item">
              <div className="card">
                {personItem(
                  1,
                  "Елена Алексеева",
                  "Москва, Россия",
                  {
                    graduationYear: 2012,
                    categories: "Путешестия, Спорт, Иностранные языки"
                  },
                  "https://picsum.photos/200"
                )}
              </div>
            </div>)}
        </div>
      )}

    </div>
  )
}
