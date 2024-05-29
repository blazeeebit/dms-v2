import { onGetUserProfile } from '@/actions/profile'
import { TextReveal } from '@/components/animation/text-reveal'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { clerkClient } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const ProfilePage = async ({ params }: { params: { profileid: string } }) => {
  const profile = await onGetUserProfile(params.profileid)

  if (!profile) redirect('/')

  const user = await clerkClient.users.getUser(profile?.clerkId!)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-y-0 gap-y-10 lg:gap-10">
      <Card className="col-span-1 p-10 rounded-xl">
        <CardContent className="p-0 flex flex-col gap-5">
          <div className="flex justify-center">
            <Image
              className="rounded-full border-2"
              width={150}
              height={150}
              src={profile.image || user.imageUrl}
              alt="img"
            />
          </div>
          <div className="flex flex-col items-center">
            <CardTitle className="text-xl text-center">
              {profile?.country || 'No Country provided'}
            </CardTitle>
            <CardDescription className="text-lg">
              {profile?.address || 'No Address provided'}
            </CardDescription>
          </div>
          {profile.student && (
            <div className="flex flex-col items-center">
              <CardTitle className="text-lg">
                {profile.student[0]?.department || 'No department added'}
              </CardTitle>
              <CardDescription className="text-lg">
                {profile.student[0]?.studentId || 'No student Id Added'}
              </CardDescription>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="md:col-span-3">
        <TextReveal
          className="font-bold text-[100px]"
          text={profile.name.split('')[0] + profile.name.slice(1).toLowerCase()}
        />
        <TextReveal
          text={user.emailAddresses[0].emailAddress}
          className="text-4xl text-gray-500 font-medium"
        />
      </div>
    </div>
  )
}

export default ProfilePage
