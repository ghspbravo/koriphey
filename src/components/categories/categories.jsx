import React from 'react'

export default function categories(
  categoryBind,
  categoriesList
) {
  return (
    <div>
      <select {...categoryBind} className="w-100" id="request-category">
        <option value="" defaultChecked>Выберите категорию</option>
        {categoriesList &&
          categoriesList.map((category, index) => <option key={index} value={category.id}>{category.name}</option>)
        }
      </select>
    </div>
  )
}
