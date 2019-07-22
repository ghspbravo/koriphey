import React from 'react'
import { socialVkontakte } from '../socials/socials';

export default function Footer() {
  return (
    <div className="container mt-3">
      <hr/>
      <div className="mb-1">
        <span>Мы в соц. сетях:</span>
      </div>
      <div className="row no-gutters">
        <div className="mr-1">
          {socialVkontakte('https://vk.com/koriphey_klub_vypusknikov')}
        </div>
      </div>
    </div>
  )
}
