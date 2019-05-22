import React from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import cardBlock from '../components/cardBlock/cardBlock';
import personItem from '../components/personItem/personItem';
import requestItem from '../components/requestItem/requestItem';

export default function search() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div>
            <Switch>

              <Route exact path="/search" render={() => <div>
                <div>
                  {cardBlock(
                    <div className="search">
                      <Link to='/search' className="search__icon no-style"><i className="fas fa-search"></i></Link>
                      <input placeholder="Поиск" className="search__input" type="text" name="search" />
                    </div>,
                    <div className="no-padding">
                      <div className="mb-2 px-2">
                        <h2>Люди</h2>
                      </div>
                      <div className="card-list row">
                        {Array(4).fill().map((item, index) => <div key={index} className="col-md-6">
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
                      <div className="px-2 mt-2">
                        <Link to='/people'>Все люди <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>)}
                </div>

                <div className="mt-2">
                  {cardBlock(
                    <h2>Запросы</h2>,
                    <div className="no-padding">
                      <div className="card-list row">
                        {Array(4).fill().map((item, index) => <div key={index} className="col-md-6">
                          <div className="card">
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
                        </div>)}
                      </div>
                      <div className="px-2 mt-2">
                        <Link to='/requests'>Все запросы <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>)}
                </div>

              </div>} />

              <Route path="/search/people" render={() => <div>
                <div>
                  {cardBlock(
                    <div className="search">
                      <Link to='/search' className="search__icon no-style"><i className="fas fa-search"></i></Link>
                      <input placeholder="Поиск" className="search__input" type="text" name="search" />
                    </div>,
                    <div className="no-padding">
                      <div className="mb-2 px-2">
                        <h2>Люди</h2>
                      </div>
                      <div className="card-list row">
                        {Array(12).fill().map((item, index) => <div key={index} className="col-md-6">
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
                    </div>)}
                </div>

              </div>} />

              <Route path="/search/requests" render={() => <div>
                <div>
                  {cardBlock(
                    <div className="search">
                      <Link to='/search' className="search__icon no-style"><i className="fas fa-search"></i></Link>
                      <input placeholder="Поиск" className="search__input" type="text" name="search" />
                    </div>,
                    <div className="no-padding">
                      <div className="mb-2 px-2">
                        <h2>Запросы</h2>
                      </div>
                      <div className="card-list row">
                        {Array(12).fill().map((item, index) => <div key={index} className="col-md-6">
                          <div className="card">
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
                        </div>)}
                      </div>
                    </div>)}
                </div>

              </div>} />

            </Switch>
          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              <div className="filter no-padding">
                <NavLink exact to='/search' className="no-style filter__item">Все</NavLink>
                <NavLink to='/search/people' className="no-style filter__item">Люди</NavLink>
                <NavLink to='/search/requests' className="no-style filter__item">Запросы</NavLink>
              </div>
            )}

            <Switch>

              <Route path="/search/requests" render={() => <div className="mt-2">
                {cardBlock(
                  <h2>Фильтр</h2>,
                  <div>

                    <p className="big">Локация</p>
                    <div>
                      <input className="w-100" type="text" placeholder="Страна" />
                    </div>
                    <div className="mt-1">
                      <input className="w-100" type="text" placeholder="Город" />
                    </div>

                    <p className="big">Категория</p>
                    <div>
                      <input className="w-100" type="text" placeholder="Категория" />
                    </div>

                    <div className="row no-gutters mt-1">
                      <button className="ml-auto">Фильтр</button>
                    </div>

                  </div>
                )}
              </div>} />

              <Route path="/search/people" render={() => <div className="mt-2">
                {cardBlock(
                  <h2>Фильтр</h2>,
                  <div>

                    <p className="big">Локация</p>
                    <div>
                      <input className="w-100" type="text" placeholder="Страна" />
                    </div>
                    <div className="mt-1">
                      <input className="w-100" type="text" placeholder="Город" />
                    </div>

                    <p className="big">Роль</p>
                    <div>
                      <input className="w-100" type="text" placeholder="Роль" />
                    </div>

                    <p className="big">Год выпуска</p>
                    <div>
                      <input className="w-100" type="text" placeholder="Год выпуска" />
                    </div>

                    <p className="big">Категория</p>
                    <div>
                      <input className="w-100" type="text" placeholder="Категория" />
                    </div>

                    <div className="row no-gutters mt-1">
                      <button className="ml-auto">Фильтр</button>
                    </div>

                  </div>
                )}
              </div>} />

            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
