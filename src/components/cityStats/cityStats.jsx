import React, { useEffect, useState } from 'react'
import './cityStats.scss'

import { useStore } from 'easy-peasy';

export default function CityStats() {
  const statistics = useStore(store => store.statistics.statistics)

  const [counter, counterSet] = useState(0)
  const [filteredStats, filteredStatsSet] = useState([])
  useEffect(() => {
    
    if (Object.entries(statistics).length === 0) return
    let count = 0
    const filteredList = statistics.cityCount.filter(item => item.city !== null && item.count !== 0)

    filteredStatsSet(filteredList)
    filteredList.forEach(item => count += item.count)

    counterSet(count)

  }, [statistics])

  return (
    <div className="city-stats">

      {statistics && statistics.cityCount
        ? filteredStats.map((item, index) =>
          <div key={index} className="city-stats-item">
            <div className="city-stats__bar">
              <div className="city-stats__name">{item.city !== null ? item.city : 'Неизвестный город'}</div>
              <div className="city-stats__percent">{((item.count / counter) * 100).toFixed(2)}%</div>
              <div style={{ width: `${item.count / counter * 100}%` }} className="city-stats__bar-filled"></div>
            </div>
          </div>
        )
        : <p>loading...</p>
      }

    </div>
  )
}
