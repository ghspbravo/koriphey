import React from 'react'

const MIN_GRADUATION_YEAR = 2004

export default function graduationYearOptions() {
  return (
    Array(new Date().getFullYear() + 1 - MIN_GRADUATION_YEAR).fill().map((item, index) => <option key={index} value={MIN_GRADUATION_YEAR + index}>{MIN_GRADUATION_YEAR + index}</option>)
  )
}
