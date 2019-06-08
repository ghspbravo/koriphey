import { useEffect, useState } from 'react'
import { useStore, useActions } from 'easy-peasy';
import useFetch from './useFetch';

/**
 * competence
 * @typedef {Object} Competence
 * @property {Number} id
 * @property {String} name
 */

/**
 * competences model 
 * @typedef {Object} CompetencesModel
 * @property {Competence[]} competences - chosen competences list
 * @property {} competencesSet - function to directly change competencesList 
 * @property {Competence[]} competencesList - competencest list
 * @property {} competencesChangeHandler - function to bind onChange 
 * @property {} competencesRemoveHandler - function to bind on remove
 */

/**
 * competences model hook
 * @returns {CompetencesModel} competences model interface
 */
export default function useCompetences() {

  const [competences, competencesSet] = useState([])
  const [competencesList, setCompetensesList] = useState([])

  const fetchedCompetencesList = useStore(store => store.profile.competencesList)
  const getCompetencesList = useActions(actions => actions.profile.getCompetencesList)
  useFetch(fetchedCompetencesList, getCompetencesList)

  useEffect(() => {
    setCompetensesList(fetchedCompetencesList.filter((item) => {
      let valid = true
      competences.forEach(competence => {
        if (item.id === parseInt(competence.id))
          valid = false
      })
      return valid
    }))
  }, [fetchedCompetencesList, competences])

  const competencesChangeHandler = (e) => {
    const valueObj = {
      id: parseInt(e.target.value),
      name: e.target.options[e.target.selectedIndex].text
    }

    competencesSet((prevState) => {
      return [...prevState, valueObj]
    })

    e.target.value = 0
  }

  const competencesRemoveHandler = (competence) => {

    competencesSet((prevState) => prevState
      .filter((item) => item.id !== parseInt(competence.id)))
  }

  return {
    competences, competencesList,
    competencesSet,
    competencesChangeHandler,
    competencesRemoveHandler
  }

}