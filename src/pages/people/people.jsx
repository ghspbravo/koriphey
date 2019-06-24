import React, { useState } from 'react'
import personItem from '../../components/personItem/personItem';
import cardBlock from '../../components/cardBlock/cardBlock';

import { useActions, useStore } from 'easy-peasy';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import peopleFilter from '../../components/filters/peopleFilter';

export default function Peoples() {
  const [currentPage, currentPageSet] = useState(1)
  const getUserList = useActions(actions => actions.profile.getUserList)
  const nextPageHandler = async (e) => {
    const target = e.target
    target.disabled = true
    currentPageSet(currentPage + 1)
    const hasNextPage = await getUserList(currentPage + 1)
    if (!hasNextPage) currentPageSet(null)
    target.disabled = false
  }

  const userList = useStore(store => store.profile.userList)
  const getFilterUserList = useActions(actions => actions.profile.getFilterUserList)

  const { value: graduationYear, bind: graduationYearBind, reset: graduationYearReset } = useInput('');

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
      hobbies, suggests, competences, graduationYear
    }

    getFilterUserList(payload).then(filteredPeopleSet)
  }

  const resetHandler = () => {
    showFilterResultsSet(false)
    hobbiesReset()
    suggestsReset()
    competencesReset()
    graduationYearReset()
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

            <div className="row justify-content-center">
              {currentPage === null
                ? null
                : <button onClick={nextPageHandler} className="mt-2">Показать больше</button>
              }
            </div>

          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-block">
          <div>
            {cardBlock(
              <h2>Фильтр</h2>,
              peopleFilter(
                submitHandler,
                competencesBind, fetchedCompetencesList,

                suggestsBind, fetchedSuggestsList,

                hobbiesBind, fetchedHobbiesList,

                graduationYearBind,

                resetHandler
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
