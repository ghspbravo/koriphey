import React from 'react'

export default function SearchInput(searchQuery, searchChangeHandler, router) {
  const submitHandler = e => {
    e.preventDefault()

    router.history.push(`/search/${searchQuery}`)
  }
  return (
    <form onSubmit={submitHandler} className="row no-gutters align-items-center w-100">
      {/* <button style={{ fontSize: "18px" }}
        className="search__icon no-style"><i className="fas fa-search"></i></button> */}
      <input
        value={searchQuery} onChange={searchChangeHandler}
        placeholder="Поиск" className="search__input col ml-1" type="text" name="search" />
      {/* <div className="ml-auto pr-1"><button onClick={() => searchChangeHandler({
        target: { value: '' }
      })}
        className="no-style search__clear"><i className="fas fa-times"></i></button></div> */}

      <div className="ml-auto pr-1">
        <button style={{ fontSize: "18px" }}
          className="search__icon no-style"><i className="fas fa-search"></i></button>
      </div>
    </form>
  )
}
