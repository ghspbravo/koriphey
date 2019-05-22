import React from 'react'
import moment from 'moment'
import './timeRelate.scss'

/**
 * uses momentjs to render time from current string
 * @param {Date} date 
 */
export default function timeRelate(date) {
  return (
    <div className="time-relate">
      <span>{moment(date).fromNow()}</span>
    </div>
  )
}
