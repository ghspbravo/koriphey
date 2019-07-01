import React from 'react'
import location from '../location/location';
// import categories from '../categories/categories';
// import competencesChoice from '../competences/competencesChoice';
// import hobbiesChoice from '../hobbies/hobbiesChoice';
import suggestsChoice from '../suggests/suggestsChoice';

export default function requestFilter(
  submitHandler,

  selectedCountryId, countryChoiceHandler, countriesList,
  cities, cityId, cityChoiceHandler,

  categoryBind, categoriesList,

  competenceBind, competencesList,

  hobbieBind, hobbiesList,

  suggestBind, suggestsList,

  resetHandler
) {
  return (
    <form onSubmit={submitHandler}>

      <p className="big">Локация</p>

      <div>
        {location(
          selectedCountryId,
          countryChoiceHandler,
          countriesList,

          cities,
          cityId,
          cityChoiceHandler
        )}
      </div>

      {/* <p className="big">Категория</p>
      <div className="form-group mb-1">
        {categories(
          categoryBind,
          categoriesList
        )}
      </div> */}

      <p className="big">Категория</p>
      <div className="form-group mb-1">
        {suggestsChoice(suggestBind, suggestsList, 'Какая помощь/поддержка Вам нужна')}
      </div>

      {/* <p className="big">Сфера деятельности</p>
      <div className="form-group mb-1">
        {competencesChoice(competenceBind, competencesList)}
      </div>

      <p className="big">Хобби/увлечения</p>
      <div className="form-group mb-1">
        {hobbiesChoice(hobbieBind, hobbiesList)}
      </div> */}

      <div className="row no-gutters mt-1">
        <button className="ml-auto">Искать</button>
      </div>

      <div className="row no-gutters mt-1">
        <button type="button" onClick={resetHandler} className="ml-auto button_secondary">Сбросить</button>
      </div>

    </form>
  )
}
