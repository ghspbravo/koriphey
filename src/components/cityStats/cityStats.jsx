import React from 'react'
import './cityStats.scss'

export default function cityStats() {
  return (
    <div className="city-stats">

      {Array(12).fill().map((item, index) =>
        <div key={index} className="city-stats-item">
          <div className="city-stats__bar">
            <div className="city-stats__name">Город</div>
            <div className="city-stats__percent">49%</div>
            <div style={{ width: `${Math.random()*100}%` }} className="city-stats__bar-filled"></div>
          </div>
        </div>
      )}

    </div>
  )
}
