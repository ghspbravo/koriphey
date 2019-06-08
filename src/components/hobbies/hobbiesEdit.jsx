import React from 'react'

export default function hobbiesEdit(
  hobbies,
  hobbiesList,
  hobbiesChangeHandler,
  hobbiesRemoveHandler,
  hobbiesErrorSet
) {
  return (
    <div>
      <select onBlur={() => hobbiesErrorSet('')} required className="w-100" onChange={hobbiesChangeHandler}>
        <option value="0">Выберите хобби/увлечение*</option>
        {hobbiesList.map((hobbie, index) => <option key={index} value={hobbie.id}>
          {hobbie.name}
        </option>)}
      </select>

      {hobbies.length !== 0 &&
        hobbies.map((hobbie, index) => <div className="mt-1" key={index}>
          {hobbie.name}
          <button type='button' style={{ float: 'right' }} onClick={() => hobbiesRemoveHandler(hobbie)} className="no-style"><i className="fas fa-times"></i></button>
        </div>)
      }

    </div>
  )
}
