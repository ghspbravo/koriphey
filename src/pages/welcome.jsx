import React, { useState } from 'react'
import cardBlock from '../components/cardBlock/cardBlock';

import cityStats from '../components/cityStats/cityStats';
import cityStatsMap from '../components/cityStats/cityStatsMap';

import { useStore } from 'easy-peasy';

import { WorkDoughnutChart, HobbiesDoughnutChart } from '../components/charts/charts'

export default function Welcome() {
  const isAuth = useStore(store => store.auth.isAuth)
  const user = useStore(store => store.profile.user)

  return (
    <div className="container">
      {isAuth && user && user.status === 0 &&
        <div className="mb-1">
          <p className="form-hint"><i className="fas fa-info-circle icon"></i> Ваша заявка на регистрацию обрабатывается. После подтверждения Вы получите доступ ко всем разделам сервиса</p>
        </div>}
      {isAuth && user && user.status === 2 &&
        <div className="mb-1">
          <p className="form-error"><i className="fas fa-info-circle icon"></i> Ваша заявка на регистрацию была отклонена. Обратитесь в поддержку для получения подробной информации</p>
        </div>}
      <div className="row">

        <div className="col-xl-4">
          {cardBlock(
            <h2>Клуб выпускников</h2>,
            <p>Эта платформа создана для сообщества выпускников <b>Гимназии «Корифей»</b>, чтобы помочь выпускникам разных лет знакомиться, обмениваться идеями и помогать друг другу в любой точке мира</p>
          )}
        </div>

        <div className="col-xl-4 col-md-6 mt-2 mt-xl-0">
          {cardBlock(
            <h2>Области занятости</h2>,
            WorkDoughnutChart()
          )}
        </div>

        <div className="col-xl-4 col-md-6 mt-2 mt-xl-0">
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
