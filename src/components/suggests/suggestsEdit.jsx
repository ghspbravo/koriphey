import React from 'react'

export default function suggestsEdit(
  suggests,
  suggestsList,
  suggestsChangeHandler,
  suggestsCommentChangeHandler,
  suggestsRemoveHandler,
  suggestsErrorSet
) {
  return (
    <div>
      <select onBlur={() => suggestsErrorSet('')} required className="w-100" onChange={suggestsChangeHandler}>
        <option value="0">Выберите категорию*</option>
        {suggestsList.map((suggest, index) => <option key={index} value={suggest.id}>
          {suggest.name}
        </option>)}
      </select>

      {suggests.length !== 0 &&
        suggests.map((suggest, index) => <div className="mt-1" key={index}>
          <div>
            {suggest.name}
            <button type='button' style={{ float: 'right' }} onClick={() => suggestsRemoveHandler(suggest)} className="no-style"><i className="fas fa-times"></i></button>
          </div>
          <input onChange={(e) => suggestsCommentChangeHandler(suggest, e)} value={suggest.comment} className="w-100" placeholder="Комментарий" type="text" />
        </div>)
      }
    </div>
  )
}
