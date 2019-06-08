import { useEffect, useState } from 'react'
import { useStore, useActions } from 'easy-peasy';
import useFetch from './useFetch';

/**
 * suggest
 * @typedef {Object} Suggest
 * @property {Number} id
 * @property {String} name
 * @property {String} comment
 */

/**
 * suggests model 
 * @typedef {Object} SuggestsModel
 * @property {Suggest[]} suggests - chosen suggests list
 * @property {} suggestsSet - function to directly change suggestsList 
 * @property {Suggest[]} suggestsList - suggestst list
 * @property {} suggestsChangeHandler - function to bind onChange 
 * @property {} suggestsCommentChangeHandler - function to bind onChange on comment
 * @property {} suggestsRemoveHandler - function to bind on remove
 */

/**
 * suggests model hook
 * @returns {SuggestsModel} suggests model interface
 */
export default function useSuggests() {

  const [suggests, suggestsSet] = useState([])
  const [suggestsList, suggestsListSet] = useState([])

  const fetchedSuggestsList = useStore(store => store.profile.suggestsList)
  const getSuggestsList = useActions(actions => actions.profile.getSuggestsList)
  useFetch(fetchedSuggestsList, getSuggestsList)


  useEffect(() => {
    suggestsListSet(fetchedSuggestsList.filter((item) => {
      let valid = true
      suggests.forEach(suggest => {
        if (item.id === parseInt(suggest.id))
          valid = false
      })
      return valid
    }))

  }, [fetchedSuggestsList, suggests])

  const suggestsChangeHandler = (e) => {
    const valueObj = {
      id: parseInt(e.target.value),
      name: e.target.options[e.target.selectedIndex].text,
      comment: ''
    }

    suggestsSet((prevState) => {
      return [...prevState, valueObj]
    })

    e.target.value = 0
  }

  const suggestsRemoveHandler = (suggest) => {

    suggestsSet((prevState) => prevState
      .filter((item) => item.id !== parseInt(suggest.id)))
  }

  const suggestsCommentChangeHandler = (suggest, e) => {
    const value = e.target.value
    suggestsSet(suggests.map(item => (
      item === suggest ? { ...item, comment: value } : item
    )))
  }

  return {
    suggests, suggestsList,
    suggestsSet,
    suggestsChangeHandler,
    suggestsCommentChangeHandler,
    suggestsRemoveHandler
  }

}