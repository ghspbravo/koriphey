import React from 'react'
import './feedback.scss'

/**
 * 
 * @param {number} count 
 * @param {boolean} liked 
 */
export function feedbackLike(count, liked = false) {
  return (
    <div className={`feedback-like ${liked ? "liked" : ""}`}>
      <div className="feedback__icon">
        <i className="fas fa-heart"></i>
      </div>

      <span>{count}</span>
    </div>
  )
}

/**
 * 
 * @param {number} count 
 */
export function feedbackComment(count) {
  return (
    <div className="feedback-comment">
      <div className="feedback__icon">
        <i className="fas fa-comment"></i>
      </div>

      <span>{count}</span>
    </div>
  )
}
