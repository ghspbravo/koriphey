import React from 'react'
import { socialVkontakte } from '../socials/socials';

export default function Footer() {
  return (
    <div className="container mt-3">
      <hr />
      <div className="mb-1">
        <span>Наши ресурсы: </span>
        <a href="http://www.koriphey.ru/" target="_blank" rel="noopener noreferrer">
          Сайт Гимназии</a>, <a href="http://bib.koriphey.ru/" target="_blank" rel="noopener noreferrer">
          Библиотека</a>, <a href="http://plus.koriphey.ru/" target="_blank" rel="noopener noreferrer">
          Интеллект-школа</a>, <a href="http://fund.koriphey.ru/" target="_blank" rel="noopener noreferrer">
          Эндаумент</a>, <a href="http://bonus.koriphey.ru/" target="_blank" rel="noopener noreferrer">
          Дисконтная система</a>, <a href="http://leaders.koriphey.ru/" target="_blank" rel="noopener noreferrer">
          Школа вожатых</a>, <a href="http://mbl.mba/" target="_blank" rel="noopener noreferrer">
          Молодежная бизнес лига</a>
      </div>

      <div className="mb-1">
        <span>Мы в соц. сетях:</span>
      </div>
      <div className="row no-gutters">
        <div className="mr-1">
          {socialVkontakte('https://vk.com/koriphey_klub_vypusknikov')}
        </div>
      </div>

      <div className="mt-1">
        <p className='small'>
          Сервис Клуба выпускников Гимназии “Корифей”  размещен на
          платформе <a href="https://vsvoi.ru" target='_blank' rel="noopener noreferrer">VСВОИ</a>
        </p>
      </div>
    </div>
  )
}
