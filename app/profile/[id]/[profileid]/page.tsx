import { onGetUserProfile } from '@/actions/profile'
import React from 'react'

const ProfilePage = async ({ params }: { params: { profileid: string } }) => {
  const profile = await onGetUserProfile(params.profileid)
  console.log(profile)
  return <div>ProfilePage</div>
}

export default ProfilePage
