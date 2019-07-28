import React from 'react'
import { Link } from 'react-router-dom'

import './newsItem.scss'

import { feedbackLike, feedbackComment } from '../feedback/feedback';
import formatDate from '../../functions/formatDate';

/**
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} content 
 * @param {string} thumbnail 
 * @param {{likesCount: number, commentsCount: number}} feedback 
 * @param {Date} postDate 
 */
export default function newsListItem(id, title, content, thumbnail, feedback, postDate, likeHandler, hasUserLike) {
  return (
    <div className="news">

      <div className="news-body row align-items-center no-gutters my-1">
        <div className="col-md-3 d-none d-md-block">
          {thumbnail &&
            <div style={{ position: 'relative', padding: '25px', paddingLeft: 0 }}>
              <img src={thumbnail} alt="" />
              <Link to={`/news/${id}`} className="expanded" />
            </div>}
        </div>
        <div className="col-md-9">
          <div className="news-title">
            <Link className="big alternative" to={`/news/${id}`}>{title}</Link>
          </div>

          {content}

          {thumbnail &&
            <div className="d-md-none" style={{ position: 'relative' }}>
              <img src={thumbnail} alt="" />
              <Link to={`/news/${id}`} className="expanded" />
            </div>}
        </div>
      </div>

      <div className="news-meta">
        <div className="row no-gutters">
          <button className="no-style" onClick={likeHandler}>
            {feedbackLike(feedback.likesCount, hasUserLike)}
          </button>
          <div className="ml-2">
            {feedbackComment(feedback.commentsCount)}
          </div>

          <div className="ml-auto">
            {postDate ? formatDate(postDate) : '...'}
          </div>
        </div>
      </div>
    </div>
  )
}
