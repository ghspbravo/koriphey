import React from 'react'

export default function Education(educations, addEducationHandler, changeHandler) {
  return (
    <div>
      {educations.map((education, index) => educationForm(index, education, changeHandler))}

      <button type="button" className="link" onClick={addEducationHandler}><i className="fas fa-plus"></i> Добавить обазование</button>
    </div>
  )
}


function educationForm(id, { educationType, educationName, educationPlace }, changeHandler) {
  return (
    <div key={id} className='mb-1'>
      <h3 className='mb-2'>{educationType} {educationName} {educationPlace && `(${educationPlace})`}</h3>
      <div className="form-group mb-1">
        <label>Выберите вид</label>
        <select className='w-100' name="educationType"
          value={educationType}
          onChange={changeHandler}
          data-id={id} >
          <option value="">
            Выберите вид
          </option>
          <option value="Бакалавриат">
            Бакалавриат
          </option>
          <option value="Специалитет">
            Специалитет
          </option>
          <option value="Магистратура">
            Магистратура
          </option>
          <option value="Аспирантура">
            Аспирантура
          </option>
          <option value="Докторантура">
            Докторантура
          </option>
          <option value="МБА">
            МБА
          </option>
          <option value="Курсы повышения квалификации">
            Курсы повышения квалификации
          </option>
          <option value="Ученая степень">
            Ученая степень
          </option>
          <option value="кандидат наук">
            кандидат наук
          </option>
          <option value="доктор наук">
            доктор наук
          </option>
        </select>
      </div>

      <div className="form-group mb-1">
        <label>Название учебного заведения</label>
        <input className='w-100' name='educationName'
          onChange={changeHandler}
          value={educationName}
          data-id={id}
          placeholder="Название учебного заведения" type="text" />
      </div>

      <div className="form-group mb-1">
        <label>Город</label>
        <input className='w-100' name='educationPlace'
          onChange={changeHandler}
          value={educationPlace}
          data-id={id}
          placeholder="Город" type="text" />
      </div>
    </div>
  )
}