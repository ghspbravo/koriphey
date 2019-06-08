import React from 'react'
import './mediaPerson.scss'

import userThumb from '../userThumb.png'

/**
 * 
 * @param {string} photoUrl 
 * @param {string} name 
 * @param {JSX.Element} content 
 */
export default function mediaPerson(photoUrl, name, content) {
  return (
    <div className="media-person">
      <div className="media-person__photo">
        <img src={photoUrl || userThumb} alt="person" />
      </div>

      <div className="media-person__body">
        <div className="media-person__name">
          <span>{name}</span>
        </div>

        <div className="media-person__content">
          {content}
        </div>
      </div>
    </div>
  )
}
