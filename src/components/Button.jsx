import React from 'react'

export default function Button({ name,onClick,extraClassNames }) {
  const nameCheck = ["Send","Find","Add New User","Back To Chats","Add"]
  return (
    <button
    onClick={onClick}
      className={`px-2 py-1 rounded-md cursor-pointer buttonTheme ${extraClassNames}`}
      style={nameCheck.includes(name) ? { border: "1px solid #1515154d", height: "100%" } : { border: "1px solid #1515154d" }}
    >{name}</button>
  )
}
