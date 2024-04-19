import React from 'react'

const multiply = (a: number, b: number) => a * b

const ImpliedReturn = () => {
  return (
    <div>
      <h2>Implied Return</h2>
      fourTimesFive: {multiply(4, 5)}
      <br />
      multiply(4, 5): {multiply(4, 5)}
    </div>
  )
}

export default ImpliedReturn;