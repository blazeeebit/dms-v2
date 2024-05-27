'use client'

import { useAdminUsers } from '@/hooks/use-admin-hook'
import React from 'react'
import { CardDescription } from '../ui/card'
import { UserCard } from './user-card'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Loader } from '../loader'

type UserListProps = {
  user:
    | {
        id: string
        clerkId: string
        role: 'ADMIN' | 'OWNER' | 'STUDENT'
        name: string
        username: string | null
        image: string | null
        language: 'TURKISH' | 'ENGLISH'
        banned: boolean
      }[]
    | undefined
  id: string
}

export const UserList = ({ user, id }: UserListProps) => {
  const { users, onPaginateUsers, loading } = useAdminUsers(user, id)
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 xl:grid-cols-4 gap-5">
      {users ? (
        users.map((user) => <UserCard key={user.id} {...user} userId={id} />)
      ) : (
        <CardDescription>No Users on the system</CardDescription>
      )}
      <Button onClick={onPaginateUsers} className="h-full" variant="outline">
        <Loader loading={loading}>
          <Plus /> Load More
        </Loader>
      </Button>
    </div>
  )
}
