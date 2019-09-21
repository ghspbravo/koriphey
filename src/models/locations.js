import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

export const locations = {
  countriesList: [],

  loadCountries: thunk(async (actions, payload) => {
    const success = await fetch(API[CURRENT_PROFILE] + 'countries', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.appendInCountriesList(data)
      })
      .catch(console.error)

    return success
  }),

  loadCities: thunk(async (actions, payload) => {
    const cities = await fetch(API[CURRENT_PROFILE] + `cities?countryId=${payload}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        return data
      })
      .catch(console.error)

    return cities
  }),

  appendInCountriesList: action((state, payload) => {
		payload.forEach(country => state.countriesList.push(country))
	}),

}

export default locations