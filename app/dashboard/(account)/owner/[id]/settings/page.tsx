import { onGetUserProfile } from '@/actions/profile'
import { AccountSettings } from '@/components/settings/account'
import { UpdatePassword } from '@/components/settings/update-password'
import React from 'react'

const StudentAccountSettings = async ({
  params,
}: {
  params: { id: string }
}) => {
  const user = await onGetUserProfile(params.id)
  return (
    <div className="flex flex-col p-10 gap-10">
      <AccountSettings {...user} />
      <UpdatePassword />
    </div>
  )
}

export default StudentAccountSettings
