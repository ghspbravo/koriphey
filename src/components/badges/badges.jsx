import React from 'react'
import './badges.scss'

export default function badges(type, customText = '') {

  switch (type) {
    case 'develop':
      return <div className="badge badge_develop">
        <span>dev</span>
      </div>

    default:
      return <div className="badge">
        {customText}
      </div>
  }
}
