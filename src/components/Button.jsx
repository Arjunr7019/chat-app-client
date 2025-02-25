import React from 'react'

export default function Button({ name,onClick }) {
  return (
    <button
    onClick={onClick}
      className='px-2 py-1 rounded-md cursor-pointer buttonTheme'
      style={name === "Send" ? { border: "1px solid #1515154d", height: "100%", marginLeft: "0.5rem" } : { border: "1px solid #1515154d" }}
    >{name}</button>
  )
}
