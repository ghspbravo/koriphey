import React from 'react'
import cardBlock from '../components/cardBlock/cardBlock';

import cityStats from '../components/cityStats/cityStats';
import cityStatsMap from '../components/cityStats/cityStatsMap';

import { WorkDoughnutChart, HobbiesDoughnutChart } from '../components/charts/charts'

export default function Welcome() {

  return (
    <div className="container">
      <div className="row">

        <div className="col-lg-4">
          {cardBlock(
            <h2>Цель проекта</h2>,
            <p><b>Цель проекта</b> – создать платформу для выпускников разных лет, чтобы разрозненные поколения  объединились в сообщество благодарных выпускников, готовых поддерживать школу, способствовать её развитию.</p>
          )}
        </div>

        <div className="col-lg-4 col-md-6 mt-2 mt-lg-0">
          {cardBlock(
            <h2>Области занятости</h2>,
            WorkDoughnutChart()
          )}
        </div>

        <div className="col-lg-4 col-md-6 mt-2 mt-lg-0">
          {cardBlock(
            <h2>Увлечения</h2>,
            HobbiesDoughnutChart()
          )}
        </div>

        <div className="col-12 mt-2">
          {cardBlock(
            <h2>Карта выпускников</h2>,
            <div className="row">
              <div className="col-md-3 order-2 order-md-1">
                {cityStats()}
              </div>

              <div className="col-md-9 order-1 order-md-2 mb-2 mb-md-0">
                {cityStatsMap()}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
