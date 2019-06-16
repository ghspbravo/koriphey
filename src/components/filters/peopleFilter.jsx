import React from 'react'
import graduationYearOptions from '../graduationYear/graduationYearOptions';

export default function peopleFilter(
  submitHandler,
  competencesBind, fetchedCompetencesList,

  suggestsBind, fetchedSuggestsList,

  hobbiesBind, fetchedHobbiesList,

  graduationYearBind,

  resetHandler
) {
  return (
    <form onSubmit={submitHandler}>

      <p className="big">Сфера деятельности</p>
      <select className="w-100" {...competencesBind}>
        <option value="0">Выберите сферу деятельности</option>
        {fetchedCompetencesList.map((competence, index) => <option key={index} value={competence.id}>
          {competence.name}
        </option>)}
      </select>

      <p className="big">Польза</p>
      <select className="w-100" {...suggestsBind}>
        <option value="0">Выберите категорию</option>
        {fetchedSuggestsList.map((suggest, index) => <option key={index} value={suggest.id}>
          {suggest.name}
        </option>)}
      </select>

      <p className="big">Хобби/увлечения</p>
      <select className="w-100" {...hobbiesBind}>
        <option value="0">Выберите хобби/увлечение</option>
        {fetchedHobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
          {hobbie.name}
        </option>)}
      </select>

      <p className="big">Год выпуска</p>
      <select className="w-100" {...graduationYearBind}>
        <option value="0">Выберите год выпуска</option>
        {graduationYearOptions()}
      </select>


      <div className="row no-gutters mt-1">
        <button className="ml-auto">Фильтр</button>
      </div>

      <div className="row no-gutters mt-1">
        <button type="button" onClick={resetHandler} className="button_secondary ml-auto">Сбросить</button>
      </div>

    </form>
  )
}
