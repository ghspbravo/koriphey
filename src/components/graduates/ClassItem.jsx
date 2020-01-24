import React, { useState } from 'react'
import StudentItem from './StudentItem'

export default function ClassItem(props) {
  const [expandClass, expandClassSet] = useState(false);
  const { classLetter, teacher, students } = props.contents;
  const previewStudents = expandClass ? [...students] : [...students].slice(0, 6);

  const onExpandClick = () => { expandClassSet(true) }
  const onHideClick = () => { expandClassSet(false) }
  return (
    <div className="class-wrapper">
      <div className="class-header">
        <h3>Класс {classLetter}</h3>
        <div className="row no-gutters align-items-center">
          <div className="mr-2">
            <img style={{ width: '70px', height: '70px' }} src={teacher.photo} alt="Фотография учителя" />
          </div>
          <div>
            <h3 className="mb-1">{teacher.name}</h3>
            <span className="secondary">{teacher.location}</span>
          </div>
        </div>
      </div>

      <div className="row">
        {previewStudents.map((student, index) => {
          return <div key={index} className="col-lg-4 col-md-6 col-12 mb-1">
            <StudentItem contents={student} />
          </div>
        })}
      </div>

      {students.length > 6 && !expandClass && <button onClick={onExpandClick} style={{ minWidth: '240px', marginLeft: '25px' }} className="mt-2 button_secondary">Показать всех</button>}
      {expandClass && <button onClick={onHideClick} style={{ minWidth: '240px', marginLeft: '25px' }} className="mt-2">Свернуть</button>}
    </div>
  )
}
