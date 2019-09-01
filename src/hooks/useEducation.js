import { useState } from 'react'

export default function useEducation(defaultEducations = []) {
  const [educations, educationsSet] = useState(defaultEducations)

  const addEducationHandler = () => educationsSet([...educations, {
    educationType: '', educationName: '', educationPlace: ''
  }])

  const changeHandler = e => {
    const property = e.target.name,
      id = e.target.dataset.id,
      type = e.target.type

    switch (type) {
      case 'text':
        const value = e.target.value
        educationsSet((prev) => {
          prev[id][property] = value
          return [...prev]
        })
        break;

      case 'select-one':
        const selectValue = e.target.value

        educationsSet((prev) => {
          prev[id][property] = selectValue
          return [...prev]
        })
        break

      default:
        break;
    }
  }

  return {
    educations, educationsSet,
    addEducationHandler,
    changeHandler
  }
}