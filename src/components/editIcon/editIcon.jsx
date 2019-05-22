import React from 'react'
import { Link } from 'react-router-dom'
import './editIcon.scss'

export default function editIcon(link) {
  return (
    <Link className="edit-icon" to={link}>
      <i className="fas fa-edit"></i>
    </Link>
  )
}
