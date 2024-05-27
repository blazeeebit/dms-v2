import { onGetAllUsers } from '@/actions/admin'
import { UserList } from '@/components/admin/user-list'
import React from 'react'

const UsersAdmin = async ({ params }: { params: { id: string } }) => {
  const users = await onGetAllUsers(0, params.id)
  return <UserList user={users} id={params.id} />
}

export default UsersAdmin
