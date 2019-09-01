import { useState } from 'react'

export default function useWork(defaultWorks = []) {
  const [works, worksSet] = useState(defaultWorks)

  const addWorkHandler = () => worksSet([...works, {
    place: '',
    position: '',
    yearsStart: '',
    yearsEnd: '',
    isCurrent: false
  }])

  const removeWorkHandler = e => {
    const id = e.target.dataset.id

    worksSet((prev) => {
      prev.splice(id, 1)
      return [...prev]
    })
  }

  const changeHandler = e => {
    const property = e.target.name,
      id = e.target.dataset.id,
      type = e.target.type

    switch (type) {
      case 'text':
        const value = e.target.value
        worksSet((prev) => {
          prev[id][property] = value
          return [...prev]
        })
        break;

      case 'checkbox':
        const isChecked = e.target.checked
        worksSet((prev) => {
          prev[id][property] = isChecked
          return [...prev]
        })
        break

      default:
        break;
    }
  }

  return {
    works, worksSet,
    addWorkHandler,
    changeHandler,
    removeWorkHandler
  }
}