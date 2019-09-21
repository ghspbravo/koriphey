import React from 'react'
import badges from '../badges/badges';

export default function Work(works, addWorkHandler, changeHandler, removeHandler) {

  return (
    <div>
      {works.map((work, index) => workForm(index, work, changeHandler, removeHandler))}

      <button type="button" className="link" onClick={addWorkHandler}><i className="fas fa-plus"></i> Добавить место работы</button>
    </div>
  )
}


function workForm(id, { place, position, yearsStart, yearsEnd, isCurrent }, changeHandler, removeHandler) {

  return (
    <div key={id} className='mb-1'>
      <h3 className='mb-2'>{position || ""} {place && `в ${place}`} <button type="button" data-id={id}
        className="link no-style" onClick={removeHandler}>
        <i style={{ pointerEvents: 'none' }} className="fas fa-trash-alt"></i></button> </h3>
      <div className="form-group mb-1">
        <label>Место работы</label>
        <input className='w-100'
          onChange={changeHandler}
          value={place || ""}
          data-id={id}
          placeholder='Место работы' name='place' type="text" />
      </div>
      <div className="form-group mb-1">
        <label>Должность</label>
        <input className='w-100'
          onChange={changeHandler}
          value={position || ""}
          data-id={id}
          placeholder='Должность' name='position' type="text" />
      </div>
      <div className="form-group mb-1">
        <label>Год начала работы</label>
        <input className='w-100'
          onChange={changeHandler}
          value={yearsStart}
          data-id={id}
          placeholder='Год начала работы' name='yearsStart' type="text" />
      </div>
      <div className="form-group mb-1">
        {badges('develop')}
        <input className='mr-1'
          onChange={changeHandler}
          checked={isCurrent}
          data-id={id}
          name='isCurrent' type="checkbox" />
        <span>Текущее место работы?</span>
      </div>
      {!isCurrent &&
        <div className="form-group mb-1">
          <label>Год окончания работы</label>
          <input className='w-100'
            onChange={changeHandler}
            value={yearsEnd}
            data-id={id}
            placeholder='Год окончания работы' name='yearsEnd' type="text" />
        </div>}
    </div>
  )
}