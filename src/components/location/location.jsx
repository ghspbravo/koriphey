import React from 'react'

export default function location(
  selectedCountryId,
  countryChoiceHandler,
  countriesList,

  cities,
  cityId,
  cityChoiceHandler
) {
  return (
    <div>
      <div className="form-group mb-1">
        <select value={selectedCountryId} onChange={countryChoiceHandler} className="w-100">
          <option value="" defaultValue>Страна</option>
          {countriesList.length > 0 &&
            countriesList.map((item, index) => item && <option key={index} value={item.id}>
              {item.nameRU}
            </option>)}
        </select>
        <div className="form-hint">Начните вводить название при выборе</div>
      </div>

      {selectedCountryId !== 0 && cities && cities.length > 0 &&
        <div className="form-group mb-1">
          <select value={cityId} onChange={cityChoiceHandler} className="w-100">
            <option value="" defaultValue>Город</option>
            {cities.length > 0 &&
              cities.map((item, index) => item && <option key={index} value={item.id}>
                {item.nameRU}
              </option>)}
          </select>
        </div>}
    </div>
  )
}
