import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container">
      <h2>Страницы не существует</h2>
      <img className="not-responsive" src="https://i.pinimg.com/originals/8e/7d/4d/8e7d4dd7924eb0855787235962b1105e.jpg" alt=""/>
      <p>Неприятная ситуация вышла.. 
        <br/> Может забудем все и вернемся на главную?</p>

      <Link to='/' className="button" >На главную</Link>
    </div>
  )
}
