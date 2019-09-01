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

  const educations = {
    0: "Бакалавриат",
    1: "Специалитет",
    2: "Магистратура",
    3: "Аспирантура",
    4: "Докторантура",
    5: "МБА",
    6: "Курсы повышения квалификации",
    7: "Ученая степень",
    8: "кандидат наук",
    9: "доктор наук"
  }

  return (
    <div key={id} className='mb-1'>
      <h3 className='mb-2'>{educations[educationType]} {educationName} {educationPlace && `(${educationPlace})`}</h3>
      <div className="form-group mb-1">
        <label>Выберите вид</label>
        <select className='w-100' name="educationType"
          value={educationType}
          onChange={changeHandler}
          data-id={id} >
          <option value="">
            Выберите вид
          </option>
          <option value={0}>
            Бакалавриат
          </option>
          <option value={1}>
            Специалитет
          </option>
          <option value={2}>
            Магистратура
          </option>
          <option value={3}>
            Аспирантура
          </option>
          <option value={4}>
            Докторантура
          </option>
          <option value={5}>
            МБА
          </option>
          <option value={6}>
            Курсы повышения квалификации
          </option>
          <option value={7}>
            Ученая степень
          </option>
          <option value={8}>
            кандидат наук
          </option>
          <option value={9}>
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

      {/* <div className="form-group mb-1">
        <label>Город</label>
        <input className='w-100' name='educationPlace'
          onChange={changeHandler}
          value={educationPlace}
          data-id={id}
          placeholder="Город" type="text" />
      </div> */}

    </div>
  )
}