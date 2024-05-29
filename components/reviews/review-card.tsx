'use client'
import { useProfileReview } from '@/hooks/use-dormitories-hook'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Loader } from '../loader'
import Image from 'next/image'
import { Star } from 'lucide-react'

type ReviewCardProps = {
  review: string
  id: string
  studentId: string | null
}

export const ReviewCard = ({ review, id, studentId }: ReviewCardProps) => {
  const { loading, review: profileReview } = useProfileReview(studentId!)
  return (
    <Card className="p-5">
      <CardContent className="p-0 flex gap-5">
        <Loader loading={loading}>
          <div>
            <Image
              src={profileReview?.user.image! || profileReview?.clerkImg!}
              alt="img"
              width={60}
              height={60}
              className="rounded-full border-2"
            />
          </div>
          <div>
            <div className="flex flex-col mb-3">
              <CardTitle>{profileReview?.user.name}</CardTitle>
              <CardDescription className="flex gap-2 text-[#f2c246] font-bold">
                {profileReview?.total.toFixed(2)}
              </CardDescription>
            </div>
            <CardDescription>{review}</CardDescription>
          </div>
        </Loader>
      </CardContent>
    </Card>
  )
}
