import React from 'react';
import './socials.scss';

/**
 * social item vkontakte
 * @param {string} url 
 * @param {Object=} params 
 * @param {function=} params.handler
 * @param {boolean=} params.useBlank
 */
export function socialVkontakte(url, params = {}) {
  return (
    <div className="social-item-vk">
      {params.handler && <button className="no-style"
        onClick={params.handler}><i className="fab fa-vk"></i></button>}
      {url && <a className="no-style" target={params.useBlank ? "_blank" : ""} rel={params.useBlank ? "noopener noreferrer": ""}
        href={url}><i className="fab fa-vk"></i></a>}
    </div>
  )
}

/**
 * social item facebook
 * @param {string} url 
 * @param {Object=} params 
 * @param {function=} params.handler
 * @param {boolean=} params.useBlank
 */
export function socialFacebook(url, params = {}) {
  return (
    <div className="social-item-fb">
      {!url && params.handler && <button className="no-style"
        onClick={params.handler}><i className="fab fa-facebook-f"></i></button>}
      {url && <a className="no-style" target={params.useBlank ? "_blank" : ""} rel={params.useBlank ? "noopener noreferrer": ""}
        href={url}><i className="fab fa-facebook-f"></i></a>}
    </div>
  )
}

/**
 * social item instagram
 * @param {string} url 
 * @param {Object=} params 
 * @param {function=} params.handler
 * @param {boolean=} params.useBlank
 */
export function socialInstagram(url, params = {}) {
  return (
    <div className="social-item-insta">
      {!url && params.handler && <button className="no-style"
        onClick={params.handler}><i className="fab fa-instagram"></i></button>}
      {url && <a className="no-style" target={params.useBlank ? "_blank" : ""} rel={params.useBlank ? "noopener noreferrer": ""}
        href={url}><i className="fab fa-instagram"></i></a>}
    </div>
  )
}

/**
 * social item Google
 * @param {string} url 
 * @param {Object=} params 
 * @param {function=} params.handler
 * @param {boolean=} params.useBlank
 */
export function socialGoogle(url, params = {}) {
  return (
    <div className="social-item-insta">
      {!url && params.handler && <button className="no-style"
        onClick={params.handler}><i className="fab fa-google"></i></button>}
      {url && <a className="no-style" target={params.useBlank ? "_blank" : ""} rel={params.useBlank ? "noopener noreferrer": ""}
        href={url}><i className="fab fa-google"></i></a>}
    </div>
  )
}