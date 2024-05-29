'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { useRentedStudents } from '@/hooks/use-dormitories-hook'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import { Loader } from '../loader'

type RentedStudentsCardProps = {
  id: string
  student: string
  createdAt: Date
  roomId: string | null
}

export const RentedStudentsCard = ({
  student,
  roomId,
}: RentedStudentsCardProps) => {
  const { loading, studentInfo, roomType } = useRentedStudents(
    student,
    roomId as string
  )

  return (
    <Card className="p-10">
      <CardContent className="p-0">
        <Loader loading={loading}>
          <div className="flex gap-4 items-start">
            <Avatar>
              <AvatarImage
                src={studentInfo?.image!}
                alt="img"
                width={70}
                height={70}
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{studentInfo?.email}</CardTitle>
              <CardDescription>{studentInfo?.name}</CardDescription>
              <CardDescription>{roomType}</CardDescription>
            </div>
          </div>
        </Loader>
      </CardContent>
    </Card>
  )
}
