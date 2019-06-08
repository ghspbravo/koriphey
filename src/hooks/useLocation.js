import { useEffect, useState } from 'react'
import { useStore, useActions } from 'easy-peasy';
import useFetch from './useFetch';

/**
 * location model 
 * @typedef {Object} LocationModel
 * @property {Number} selectedCountryId
 * @property {} setSelectedCountryId - function to directly change selectedCountryId 
 * @property {Number} cityId
 * @property {} setCityId - function to directly change cityId 
 * @property {[]} countriesList
 * @property {[]} cities
 * @property {} countryChoiceHandler - function to bind onChange 
 * @property {} cityChoiceHandler - function to bind onChange 
 */

/**
 * location model hook
 * @returns {LocationModel} location model interface
 */
export default function useLocation() {

  const countriesList = useStore(store => store.locations.countriesList)
  const loadCountries = useActions(actions => actions.locations.loadCountries)
  const loadCities = useActions(actions => actions.locations.loadCities)
  useFetch(countriesList, loadCountries)

  const [selectedCountryId, setSelectedCountryId] = useState()
  const [cities, setCities] = useState([])
  const [cityId, setCityId] = useState()

  // load city list 
  useEffect(() => {
    if (!selectedCountryId) return

    setCities([])
    loadCities(selectedCountryId).then(setCities)
  }, [selectedCountryId, loadCities])

  const countryChoiceHandler = (e) => {
    setSelectedCountryId(e.target.value)
  }

  const cityChoiceHandler = (e) => {
    setCityId(e.target.value)
  }

  return {
    selectedCountryId, cityId,
    setSelectedCountryId, setCityId,
    countriesList, cities,
    countryChoiceHandler,
    cityChoiceHandler
  }

}