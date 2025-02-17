import React from 'react'

export default function Button({name}) {
  return (
    <button className='px-2 py-1 rounded-md cursor-pointer buttonTheme' style={{ border: "1px solid #1515154d" }}>{name}</button>
  )
}
