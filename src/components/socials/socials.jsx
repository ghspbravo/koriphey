import React from 'react';
import './socials.scss';

/**
 * social item vkontakte
 * @param {string} url 
 */
export function socialVkontakte(url) {
  return (
    <div className="social-item-vk">
      <a className="no-style" target="_blank" rel="noopener noreferrer"
        href={url}><i className="fab fa-vk"></i></a>
    </div>
  )
}

/**
 * social item facebook
 * @param {string} url 
 */
export function socialFacebook(url) {
  return (
    <div className="social-item-fb">
      <a className="no-style" target="_blank" rel="noopener noreferrer"
        href={url}><i className="fab fa-facebook-f"></i></a>
    </div>
  )
}

/**
 * social item instagram
 * @param {string} url 
 */
export function socialInstagram(url) {
  return (
    <div className="social-item-insta">
      <a className="no-style" target="_blank" rel="noopener noreferrer"
        href={url}><i className="fab fa-instagram"></i></a>
    </div>
  )
}