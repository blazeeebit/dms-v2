'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

type UserWidgetProps = {
  image?: string
}

export const UserWidget = ({ image }: UserWidgetProps) => {
  const { user } = useUser()
  return (
    <Avatar>
      <AvatarImage src={image || user?.imageUrl} alt="Image" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  )
}
