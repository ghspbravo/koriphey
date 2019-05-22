import React from 'react'
import './notification.scss'

/**
 * 
 * @param {number} notificationsCount number of notifications
 */
export default function notification(notificationsCount) {
  return (
    <div className={`notification ${notificationsCount > 0 ? "has-notifications" : ""}`}>
      <div className="notification__icon">
        <i className="fas fa-bell"></i>

        {notificationsCount > 0 &&
          <div className="notification__badge">
            <span>{notificationsCount}</span>
          </div>}
      </div>
    </div>
  )
}
