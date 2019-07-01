import React from 'react'

export default function SearchInput(searchQuery, searchChangeHandler) {
  return (
    <input
      value={searchQuery} onChange={searchChangeHandler}
      placeholder="Поиск" className="search__input" type="text" name="search" />
  )
}
