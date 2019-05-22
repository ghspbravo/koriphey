import React from 'react'
import { Link } from 'react-router-dom'
import cardBlock from '../../components/cardBlock/cardBlock';
import requestItem from '../../components/requestItem/requestItem';
import mediaPerson from '../../components/mediaPerson/mediaPerson';
import editIcon from '../../components/editIcon/editIcon';

export default function requestSingle(router) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div>
            {cardBlock(
              <button className="link" onClick={router.history.goBack}><i className="fas fa-angle-double-left"></i> Назад</button>,
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '5px', right: '5px'
                }}>
                  {editIcon('/requests/1/edit')}
                </div>
                {mediaPerson(
                  "https://picsum.photos/50",
                  "Елена Алексеевна",
                  <span>Москва, Россия</span>
                )}
                <p className="small"><b>Категория:</b> Спорт</p>
                <p className="small"><b>Локация:</b> Екатеринбург, Олимпийская набережная</p>
                <p className="small"><b>Окончание необходимости:</b> 23.04.19</p>

                <p>Суперлига. Уралочка-НТМК – Динамо-Казань Свободный вход. В рамках 15-го тура российской Суперлиги «Уралочка-НТМК» на домашней площадке в Екатеринбурге принимает «Динамо-Казань». Рассказываем о сопернике и анализируем турнирную ситуацию.</p>
                <p>В сезоне 2018/2019 «Уралочка» и «Динамо-Казань» соперничают не только на внутренней арене, но и в Лиге чемпионов. Всего за сезон друг с другом оппоненты из Екатеринбурга и столицы Татарстана проведут 4 встречи. Две – уже позади.</p>
                <p>Первое очное противостояние состоялось в конце ноября в Казани в рамках чемпионата России и тогда успех праздновали хозяйки площадки – 3:0, хотя во второй партии борьба была абсолютно равной, но завершился сет в пользу команды из Татарстана, что и стало определяющим фактором в игре.</p>

                <img src="https://picsum.photos/250/150" alt="" />

                <div className="row no-gutters mt-2">
                  <Link className="button button_secondary" to='/person/1'>Ответить</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Похожие запросы</h2>,
              <div className="list-card no-padding">
                {Array(3).fill().map((item, index) => <div key={index} className="card">
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
                </div>)}
                <div className="px-2 mt-2">
                  <Link to='/requests'>Все запросы <i className="fas fa-angle-double-right"></i></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
