import React, { useState } from 'react'
import personItem from '../../components/personItem/personItem';
import cardBlock from '../../components/cardBlock/cardBlock';

import { useActions, useStore } from 'easy-peasy';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';

export default function Peoples() {
  const userList = useStore(store => store.profile.userList)
  const getFilterUserList = useActions(actions => actions.profile.getFilterUserList)


  const { value: hobbies, bind: hobbiesBind, reset: hobbiesReset } = useInput('');
  const fetchedHobbiesList = useStore(store => store.profile.hobbiesList)
  const getHobbiesList = useActions(actions => actions.profile.getHobbiesList)
  useFetch(fetchedHobbiesList, getHobbiesList)

  const { value: suggests, bind: suggestsBind, reset: suggestsReset } = useInput('');
  const fetchedSuggestsList = useStore(store => store.profile.suggestsList)
  const getSuggestsList = useActions(actions => actions.profile.getSuggestsList)
  useFetch(fetchedSuggestsList, getSuggestsList)

  const { value: competences, bind: competencesBind, reset: competencesReset } = useInput('');
  const fetchedCompetencesList = useStore(store => store.profile.competencesList)
  const getCompetencesList = useActions(actions => actions.profile.getCompetencesList)
  useFetch(fetchedCompetencesList, getCompetencesList)


  const [showFilterResults, showFilterResultsSet] = useState(false)
  const [filteredPeople, filteredPeopleSet] = useState([])
  const submitHandler = e => {
    e.preventDefault()

    showFilterResultsSet(true)
    const payload = {
      hobbies, suggests, competences
    }

    getFilterUserList(payload).then(filteredPeopleSet)
  }

  const resetHandler = () => {
    showFilterResultsSet(false)
    hobbiesReset()
    suggestsReset()
    competencesReset()
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <div>
            {cardBlock(
              <div className="search">
                {/* <Link to='/search/people' className="search__icon no-style disabled"><i className="fas fa-search"></i></Link>
                <input placeholder="Поиск по людям" className="search__input" type="text" name="search" /> */}
                <h2>Выпускники</h2>
              </div>,
              <div className="no-padding">
                <div className="card-list row">
                  {userList.length !== 0
                    ? showFilterResults === false
                      ? userList.map((item, index) => <div key={index} className="col-md-6">
                        <div style={{ height: '100%' }} className="card">
                          {personItem(
                            item.id,
                            `${item.firstName} ${item.surName}`,
                            `${item.city && item.city.country.nameRU}, ${item.city && item.city.nameRU}`,
                            {
                              graduationYear: item.graduationYear,
                              categories: ""
                            },
                            item.photo,
                          )}
                        </div>
                      </div>)
                      : filteredPeople.length > 0
                        ? filteredPeople.map((item, index) => <div key={index} className="col-md-6">
                          <div style={{ height: '100%' }} className="card">
                            {personItem(
                              item.id,
                              `${item.firstName} ${item.surName}`,
                              `${item.city && item.city.country.nameRU}, ${item.city && item.city.nameRU}`,
                              {
                                graduationYear: item.graduationYear,
                                categories: ""
                              },
                              item.photo,
                            )}
                          </div>
                        </div>)
                        : <p className="px-2">...</p>
                    : <div className="px-2">
                      <p>Loading...</p>
                    </div>}
                </div>
              </div>)}
          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              <form onSubmit={submitHandler}>

                <p className="big">Сфера деятельности</p>
                <select required className="w-100" {...competencesBind}>
                  <option value="0">Выберите сферу деятельности</option>
                  {fetchedCompetencesList.map((competence, index) => <option key={index} value={competence.id}>
                    {competence.name}
                  </option>)}
                </select>

                <p className="big">Польза</p>
                <select required className="w-100" {...suggestsBind}>
                  <option value="0">Выберите категорию</option>
                  {fetchedSuggestsList.map((suggest, index) => <option key={index} value={suggest.id}>
                    {suggest.name}
                  </option>)}
                </select>

                <p className="big">Хобби/увлечения</p>
                <select required className="w-100" {...hobbiesBind}>
                  <option value="0">Выберите хобби/увлечение</option>
                  {fetchedHobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
                    {hobbie.name}
                  </option>)}
                </select>

                <div className="row no-gutters mt-1">
                  <button className="ml-auto">Фильтр</button>
                </div>

                <div className="row no-gutters mt-1">
                  <button type="button" onClick={resetHandler} className="button_secondary ml-auto">Сбросить</button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
