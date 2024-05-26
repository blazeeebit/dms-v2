import { onGetAllUsers } from '@/actions/admin'
import { UserList } from '@/components/admin/user-list'
import React from 'react'

const UsersAdmin = async () => {
  const users = await onGetAllUsers(0)
  return (
    <div>
      <UserList />
    </div>
  )
}

export default UsersAdmin
