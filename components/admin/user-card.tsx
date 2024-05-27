'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Ban, User } from 'lucide-react'
import { useAdminUserCard } from '@/hooks/use-admin-hook'
import { Loader } from '../loader'
import { DeleteUser } from './delete-user'
import Link from 'next/link'

type UserCard = {
  id: string
  clerkId: string
  role: 'ADMIN' | 'OWNER' | 'STUDENT'
  name: string
  username: string | null
  image: string | null
  language: 'TURKISH' | 'ENGLISH'
  userId: string
  banned: boolean
}

export const UserCard = ({
  name,
  image,
  clerkId,
  id,
  role,
  userId,
  banned,
}: UserCard) => {
  const {
    loading,
    info,
    onDeleteUser,
    deleting,
    onBanUser,
    banning,
    onUnBanUser,
  } = useAdminUserCard(clerkId)
  return (
    <Card className="p-10 hover:bg-muted">
      <Loader loading={loading}>
        <CardContent className="p-0 relative">
          <Link
            href={`/profile/${userId}/${id}`}
            className="flex flex-col gap-5"
          >
            <Avatar>
              <AvatarImage src={image || info.image} alt="user" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-2">
                <CardTitle>{name}</CardTitle>
                {banned && <Ban className="text-red-500" />}
              </div>
              <CardDescription>{info.email}</CardDescription>
            </div>
          </Link>
          <DeleteUser
            banned={banned}
            role={role}
            banning={banning}
            {...(banned
              ? {
                  onBan: () => onUnBanUser(id),
                }
              : {
                  onBan: () => onBanUser(id),
                })}
            onDelete={() => onDeleteUser(id)}
            loading={deleting}
          />
        </CardContent>
      </Loader>
    </Card>
  )
}
