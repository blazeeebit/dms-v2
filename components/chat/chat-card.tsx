import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

type StudentCardProps = {
  name: string
  email: string
  image: string | null
  online: boolean
  onChat(): void
}

export const StudentChatCard = ({
  name,
  email,
  image,
  online,
  onChat,
}: StudentCardProps) => {
  return (
    <Card onClick={onChat}>
      <CardContent className="p-5 flex items-center gap-3 cursor-pointer hover:bg-muted">
        <Avatar>
          <AvatarImage src={image as string} alt="user" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2>{name}</h2>
          <CardDescription>{email}</CardDescription>
        </div>
        <div
          className={cn(
            'rounded-full w-3 h-3',
            online ? 'bg-green-500' : 'bg-gray-500'
          )}
        />
      </CardContent>
    </Card>
  )
}
