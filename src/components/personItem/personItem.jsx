import React from 'react'
import { Link } from 'react-router-dom'
import './personItem.scss'

import userThumb from '../userThumb.png'
/**
 * 
 * @param {number} id 
 * @param {string} name 
 * @param {string} location 
 * @param {{graduationYear: number, categories: string}} info 
 * @param {string} photo 
 */
export default function personItem(id, name, location, info, photo) {
  return (
    <div className="person row no-gutters">
      <div className="person__photo">
        <img src={photo || userThumb} alt="person thumb" />
        <Link to={`/profile/${id}`} className="mt-2 expanded"></Link>
      </div>

      <div className="person__content">
        <p className="big mb-1">{name}</p>
        {location !== 'null, null' &&
          <p className="small secondary mt-1">{location}</p>}

        <div className="person__info">
          {info.graduationYear && 
          <p className='small'><b>Выпуск: </b>{info.graduationYear}</p>}
          {info.categories &&
            <p className='small'><b>Категории: </b>{info.categories}</p>}
        </div>

        <Link to={`/profile/${id}`} className="mt-2 button d-none d-sm-inline-block">Подробнее</Link>
      </div>

      <div className="mt-2 d-sm-none col-12">
        <Link to={`/profile/${id}`} className="button button_expanded">Подробнее</Link>
      </div>
    </div>
  )
}
