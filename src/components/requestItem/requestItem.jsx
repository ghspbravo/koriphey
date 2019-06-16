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
    <div className="request d-flex flex-column" style={{ height: '100%' }}>
      {mediaPerson(
        person.photo,
        person.name,
        <span>{person.location}</span>
      )}

      <div className="request-meta">
        {meta.category &&
          <p className="small"><b>Категория: </b>{meta.category}</p>}
        {meta.location &&
          <p className="small"><b>Локация: </b>{meta.location}</p>}
        {meta.expiredAt &&
          <p className="small"><b>Окончание необходимости: </b>{meta.expiredAt}</p>}
      </div>

      <div className="request-body mt-1">
        <p>{content}</p>
        <div style={{ position: 'relative' }}>
          {thumbnail &&
            <img src={thumbnail} alt="thumbnail" />}
          <Link className="expanded" to={`/requests/${id}`} />
        </div>
      </div>

      <div className="mt-2">
        <Link className="button button_expanded-xs" to={`/requests/${id}`}>Смотреть полностью</Link>
      </div>
      {person.id &&
        <div className="mt-1">
          <Link className="button button_expanded-xs button_secondary" to={`/profile/${person.id}`}>Ответить</Link>
        </div>}
    </div>
  )
}
