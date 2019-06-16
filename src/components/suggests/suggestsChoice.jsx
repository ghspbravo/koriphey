import React from 'react'

export default function suggestsChoice(suggestsBind, suggestsList, placeholder = 'Выберите что вы можете предложить') {
  return (
    <select className="w-100" {...suggestsBind}>
      <option value="">{placeholder}</option>
      {suggestsList.map((suggest, index) => <option key={index} value={suggest.id}>
        {suggest.name}
      </option>)}
    </select>
  )
}
