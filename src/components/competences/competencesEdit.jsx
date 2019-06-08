import React from 'react'

export default function competencesEdit(
  competences,
  competencesList,
  competencesChangeHandler,
  competencesRemoveHandler,
  competensesErrorSet
) {
  return (
    <div>
      <select onBlur={() => competensesErrorSet('')} required className="w-100" onChange={competencesChangeHandler}>
        <option value="0">Выберите сферу деятельности*</option>
        {competencesList.map((competence, index) => <option key={index} value={competence.id}>
          {competence.name}
        </option>)}
      </select>


      {competences.length !== 0 &&
        competences.map((competence, index) => <div className="mt-1" key={index}>
          {competence.name}
          <button type='button' style={{ float: 'right' }} onClick={() => competencesRemoveHandler(competence)} className="no-style"><i className="fas fa-times"></i></button>
        </div>)
      }
    </div>
  )
}
