import React from 'react'
import './cardBlock.scss'

/**
 * card wrapper for <div>
 * 
 * use className="no-padding" to prevent horizontal padding
 * @param {JSX.Element} header 
 * @param {JSX.Element} body 
 */
export default function cardBlock(header, body) {
  return (
    <div className="card-block">
      {header && <div className="card-block__header">
        {header}
      </div>}

      {body && <div className="card-block__inner">
        {body}
      </div>}
    </div>
  )
}
