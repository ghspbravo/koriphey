import React, { useState } from 'react'

import { useActions } from 'easy-peasy';
import useInput from '../../hooks/useInput';

import { createPortal } from 'react-dom'
import Modal from '../../components/modals/modal';

export default function Recover() {
  const recover = useActions(actions => actions.auth.requestChangePassword)
  const recoverHandler = async (e) => {
    processingSet(true)
    e.preventDefault()
    const payload = { email }
    const success = await recover(payload.email)
    if (success === true) {
      successSet(true)
      processingSet(false)
    }
    else {
      try {
        if (success === 'invalid') {
          setEmailError('Пользователь с указанными данными не найден')
        }
      } catch (error) {
        window.alert(error)
      }
    }
  }
  const [success, successSet] = useState(false)
  const [processing, processingSet] = useState(false)
  const [emailError, setEmailError] = useState('')
  const { value: email, bind: emailBind } = useInput('');
  return (
    <div className="container">
      {
        document.getElementById('modal-root') && createPortal(
          <Modal isOpen={success} close={() => successSet(false)}>
            <h2>Заявка на смену пароля отправлена</h2>
            <p>В ближайшее время на указанную почту придет письмо с дальнейшими указаниями</p>
          </Modal>, document.getElementById('modal-root'))
      }
      <div className="mt-0 mt-md-5 mx-auto col-xl-5 col-lg-6 col-md-8 col-sm-10 px-0">
        <div className="card-auth">

          <div className="mb-2">
            <h2 style={{ textAlign: 'center' }}>Восстановление доступа</h2>
          </div>

          <form onSubmit={recoverHandler}>
            <div className="form-group mb-1">
              <input onBlur={() => setEmailError('')} {...emailBind} className="w-100" placeholder="Email" type="text" />
            </div>

            <div className="form-error mb-1">{emailError}</div>

            <button disabled={processing} className="mt-3 button_expanded">{processing ? '...' : 'Запросить'}</button>
          </form>

        </div>
      </div>
    </div>
  )
}
