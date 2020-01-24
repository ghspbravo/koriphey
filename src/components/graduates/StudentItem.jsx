import React from 'react'
import { Link } from 'react-router-dom';

export default function StudentItem(props) {
  const { id, name, location, photo } = props.contents;

  const studentInner = <div className="row no-gutters">
    <div className="mr-2"><img style={{ width: '50px', height: '50px' }} src={photo} alt="Фотография ученика" className="class-item__photo" /></div>
    <div>
      <h3 className="mb-1 student-name">{name}</h3>
      <span className="secondary">{location}</span>
    </div>
  </div>
  return id
    ? <Link to={`/profile/${id}`} className="class-item class-item_active">
      {studentInner}
    </Link>
    : <div className="class-item">
      {studentInner}
    </div>

}
