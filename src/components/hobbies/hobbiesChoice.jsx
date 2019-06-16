import React from 'react'

export default function hobbiesChoice(hobbiesBind, hobbiesList) {
  return (
    <select className="w-100" {...hobbiesBind}>
      <option value="">Выберите хобби/увлечение</option>
      {hobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
        {hobbie.name}
      </option>)}
    </select>
  )
}
