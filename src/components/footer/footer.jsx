import React from 'react'
import { socialVkontakte, socialFacebook, socialInstagram } from '../socials/socials';
import vsvoiLogo from './vsvoi.svg'
import './footer.scss'

import { Link } from "react-router-dom";
import { useStore } from 'easy-peasy';

export default function Footer() {

  const resources = useStore(store => store.settings.Recources);

  const companyName = useStore(store => store.settings.Footer);

  const socials_fb = useStore(store => store.settings.Fb);
  const socials_insta = useStore(store => store.settings.Insta);
  const socials_vk = useStore(store => store.settings.Vk);

  return (
    <div className="footer mt-3">
      <div className="container">
        <div className="mb-1 row">
          <div className="col-lg-10 col-md-9">
            <span className='footer-title'>Наши ресурсы: </span>
            <div className="sources">
              {resources && resources.map(source => <div key={source.id} className="sources-item">
                <a className="social-item" href={source.link} target="_blank" rel="noopener noreferrer">{source.name}</a>
              </div>)}
            </div>
          </div>
          <div className="col-lg-2 col-md-3">
            <span className='footer-title'>Мы в соц. сетях:</span>
            <div className="row justify-content-center justify-content-md-start no-gutters mt-2">
              {socials_vk &&
                <div className="mr-1">
                  {socialVkontakte(socials_vk)}
                </div>}
              {socials_fb &&
                <div className="mr-1">
                  {socialFacebook(socials_fb)}
                </div>}
              {socials_insta &&
                <div className="mr-1">
                  {socialInstagram(socials_insta)}
                </div>}
            </div>
          </div>
        </div>

        <div className="mt-1">
          <p style={{ textAlign: 'center' }} className="m-0">
            Сервис Клуба выпускников
            {` ${companyName || ""} `}
            <br className="d-sm-none" /> размещен на платформе
              <a className="ml-1" href="https://vsvoi.ru" target='_blank' rel="noopener noreferrer">VСВОИ <img style={{ marginBottom: '-10px' }} className="ml-1 not-responsive" width={30} height={30} src={vsvoiLogo} alt="vsvoi logo" /></a>

            <br /><br /> <Link to="/policy">Политика конфиденциальности</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
