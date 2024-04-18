import React from 'react'

type ButtonProps = {
    text : string
}
export const Button = ({text}:ButtonProps) => {
  return (
    <div className='text-blue-900'>{text}</div>
  )
}
