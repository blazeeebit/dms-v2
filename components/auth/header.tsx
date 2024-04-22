import React from 'react'

type AuthHeaderProps = {
  title: string
  text: string
}

export const AuthHeader = ({ text, title }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-500">{text}</p>
    </div>
  )
}
