import React from 'react'
import mediaPerson from '../mediaPerson/mediaPerson';
// import { feedbackLike } from '../feedback/feedback';
// import timeRelate from '../timeRelate/timeRelate';

/**
 * 
 * @param {{photo: string, name: string, location: string}} person 
 * @param {srting} commentBody 
 * @param {number} likesCount 
 * @param {Date} postDate 
 */
export default function comment(person, commentBody, /*likesCount,*/ /*postDate*/) {
  return (
    <div className="comment">
      {mediaPerson(
        person.photo,
        person.name,
        <span>{person.location}</span>
      )}

      <div className="comment__content">
        <p>{commentBody}</p>
      </div>

      {/* <div className="row no-gutters">
        <div>
          {feedbackLike(likesCount)}
        </div>
        <div className="ml-auto">
          {timeRelate(postDate)}
        </div>
      </div> */}

    </div>
  )
}
