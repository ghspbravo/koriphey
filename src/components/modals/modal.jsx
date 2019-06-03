import React, { useRef } from 'react'
import './modal.scss'

export default function Modal(props) {
  const wrapper = useRef()
  const closeButton = useRef()

  const closeHandler = (e) => {
    if (e.target !== wrapper.current
      && e.target !== closeButton.current) return
    props.close()
  }
  return (
    <div ref={wrapper} onClick={closeHandler} className={`modal ${props.isOpen && 'open'}`}>
      <div className="modal__inner">
        <button type="button" ref={closeButton} onClick={closeHandler} className="no-style modal__close"><i className="fas fa-times icon"></i></button>
        {props.children}
      </div>
    </div>
  )
}
