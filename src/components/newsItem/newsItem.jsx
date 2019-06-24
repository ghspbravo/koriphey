import React from 'react'
import { Link } from 'react-router-dom'
import { feedbackLike, feedbackComment } from '../feedback/feedback';
import timeRelate from '../timeRelate/timeRelate';

/**
 * 
 * @param {number} id 
 * @param {string} title 
 * @param {string} content 
 * @param {string} thumbnail 
 * @param {{likesCount: number, commentsCount: number}} feedback 
 * @param {Date} postDate 
 */
export default function newsItem(id, title, content, thumbnail, feedback, postDate, likeHandler, hasUserLike) {
  return (
    <div className="news">
      <div className="news-title">
        <Link className="big alternative" to={`/news/${id}`}>{title}</Link>
      </div>

      <div className="news-body my-1">
        {/* <p>{content}</p> */}
        {content}

        {thumbnail &&
          <div style={{position: 'relative'}}>
            <img src={thumbnail} alt="" />
            <Link to={`/news/${id}`} className="expanded" />
          </div>}
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
            {postDate ? timeRelate(postDate) : '...'}
          </div>
        </div>
      </div>
    </div>
  )
}
