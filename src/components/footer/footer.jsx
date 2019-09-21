import React from 'react'
import { socialVkontakte } from '../socials/socials';
import vsvoiLogo from './vsvoi.svg'
import './footer.scss'

import { Link } from "react-router-dom";
import { isKoriphey, isDla8 } from '../../constants';

export default function Footer() {
  return (
    <div className="footer mt-3">
      <div className="container">
        {isKoriphey &&
          <div className="mb-1 row">
            <div className="col-lg-10 col-md-9">
              <span className='footer-title'>Наши ресурсы: </span>
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <a className="social-item" href="http://www.koriphey.ru/" target="_blank" rel="noopener noreferrer">Сайт Гимназии</a>
                  <a className="social-item" href="http://bib.koriphey.ru/" target="_blank" rel="noopener noreferrer">Библиотека</a>
                  <a className="social-item" href="http://plus.koriphey.ru/" target="_blank" rel="noopener noreferrer">Интеллект-школа</a>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <a className="social-item" href="http://fund.koriphey.ru/" target="_blank" rel="noopener noreferrer">Эндаумент</a>
                  <a className="social-item" href="http://bonus.koriphey.ru/" target="_blank" rel="noopener noreferrer">Дисконтная система</a>

                  <a className="d-lg-none social-item" href="http://leaders.koriphey.ru/" target="_blank" rel="noopener noreferrer">Школа вожатых</a>
                  <a className="d-lg-none social-item" href="http://mbl.mba/" target="_blank" rel="noopener noreferrer">Молодежная бизнес лига</a>
                </div>
                <div className="d-none d-lg-block col-lg-4">
                  <a className="social-item" href="http://leaders.koriphey.ru/" target="_blank" rel="noopener noreferrer">Школа вожатых</a>
                  <a className="social-item" href="http://mbl.mba/" target="_blank" rel="noopener noreferrer">Молодежная бизнес лига</a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3">
              <span className='footer-title'>Мы в соц. сетях:</span>
              <div className="row justify-content-center justify-content-md-start no-gutters mt-2">
                {socialVkontakte('https://vk.com/koriphey_klub_vypusknikov')}
              </div>
            </div>
          </div>}

        <div className="mt-1">
          <p style={{ textAlign: 'center' }} className="m-0">
            Сервис Клуба выпускников
            {isKoriphey && " Гимназии “Корифей”"}
            {isDla8 && " Лицея им. С.П. Дягилева"}
            <br className="d-sm-none" /> размещен на платформе
              <a className="ml-1" href="https://vsvoi.ru" target='_blank' rel="noopener noreferrer">VСВОИ <img style={{ marginBottom: '-10px' }} className="ml-1 not-responsive" width={30} height={30} src={vsvoiLogo} alt="vsvoi logo" /></a>

            <br /><br/> <Link to="/policy">Политика конфиденциальности</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
