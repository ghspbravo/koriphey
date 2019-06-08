import { useEffect, useState } from 'react'
import { useStore, useActions } from 'easy-peasy';
import useFetch from './useFetch';

/**
 * hobbie
 * @typedef {Object} Hobbie
 * @property {Number} id
 * @property {String} name
 */

/**
 * hobbies model 
 * @typedef {Object} HobbiesModel
 * @property {Hobbie[]} hobbies - chosen hobbies list
 * @property {} hobbiesSet - function to directly change hobbiesList 
 * @property {Hobbie[]} hobbiesList - hobbiest list
 * @property {} hobbiesChangeHandler - function to bind onChange 
 * @property {} hobbiesRemoveHandler - function to bind on remove
 */

 /**
  * hobbies model hook
  * @returns {HobbiesModel} hobbies model interface
  */
export default function useHobbies() {

  const [hobbies, hobbiesSet] = useState([])
  const [hobbiesList, hobbiesListSet] = useState([])

  const fetchedHobbiesList = useStore(store => store.profile.hobbiesList)
  const getHobbiesList = useActions(actions => actions.profile.getHobbiesList)
  useFetch(fetchedHobbiesList, getHobbiesList)


  useEffect(() => {
    hobbiesListSet(fetchedHobbiesList.filter((item) => {
      let valid = true
      hobbies.forEach(hobbie => {
        if (item.id === parseInt(hobbie.id))
          valid = false
      })
      return valid
    }))
  }, [fetchedHobbiesList, hobbies])

  const hobbiesChangeHandler = (e) => {
    const valueObj = {
      id: parseInt(e.target.value),
      name: e.target.options[e.target.selectedIndex].text
    }

    hobbiesSet((prevState) => {
      return [...prevState, valueObj]
    })

    e.target.value = 0
  }

  const hobbiesRemoveHandler = (hobbie) => {
    hobbiesSet((prevState) => prevState
      .filter((item) => item.id !== parseInt(hobbie.id)))
  }

  return {
    hobbies, hobbiesList,
    hobbiesSet,
    hobbiesChangeHandler,
    hobbiesRemoveHandler
  }

}