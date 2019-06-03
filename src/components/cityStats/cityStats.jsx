import React, { useEffect, useState } from 'react'
import './cityStats.scss'

import { useStore } from 'easy-peasy';

export default function CityStats() {
  const statistics = useStore(store => store.statistics.statistics)

  return (
    <div className="city-stats">

      {statistics && statistics.cityCount
        ? statistics.cityCount.map((item, index) =>
          <div key={index} className="city-stats-item">
            <div className="city-stats__bar">
              <div className="city-stats__name">{item.city !== null ? item.city : 'Неизвестный город'}</div>
              <div className="city-stats__percent">{((item.count / statistics.totalCityCount) * 100).toFixed(2)}%</div>
              <div style={{ width: `${item.count / statistics.totalCityCount * 100}%` }} className="city-stats__bar-filled"></div>
            </div>
          </div>
        )
        : <p>loading...</p>
      }

    </div>
  )
}
