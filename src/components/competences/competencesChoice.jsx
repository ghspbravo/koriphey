import React from 'react'

export default function competencesChoice(competencesBind, competencesList) {
  return (
    <select className="w-100" {...competencesBind}>
      <option value="">Выберите сферу деятельности</option>
      {competencesList.map((competence, index) => <option key={index} value={competence.id}>
        {competence.name}
      </option>)}
    </select>
  )
}
