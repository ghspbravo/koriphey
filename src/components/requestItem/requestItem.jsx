import React from 'react'
import { Link } from 'react-router-dom'
import mediaPerson from '../mediaPerson/mediaPerson';

/**
 * 
 * @param {{photo: string, name: string, location: string}} person 
 * @param {{category: string, location: string}} meta 
 * @param {string} content request description
 */
export default function requestItem(person, meta, content, thumbnail, id) {
  return (
    <div className="request">
      {mediaPerson(
        person.photo,
        person.name,
        <span>{person.location}</span>
      )}

      <div className="request-meta">
        <p className="small"><b>Категория: </b>{meta.category}</p>
        <p className="small"><b>Локация: </b>{meta.location}</p>
      </div>

      <div className="request-body mt-1">
        <p>{content}</p>
        <div style={{ position: 'relative' }}>
          {thumbnail &&
            <img src={thumbnail} alt="thumbnail" />}
          <Link className="expanded" to={`/requests/${id}`} />
        </div>
      </div>

      <div className="mt-1">
        <Link className="button button_expanded-xs" to={`/requests/${id}`}>Смотреть полностью</Link>
      </div>
      <div className="mt-1">
        <Link className="button button_expanded-xs button_secondary" to={`/profile/${person.id}`}>Ответить</Link>
      </div>
    </div>
  )
}
