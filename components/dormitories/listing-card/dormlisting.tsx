import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteDormListing } from './delete-listing'

type ListingCardProps = {
  id: string
  title: string
  thumbnail: string
  userId: string
  description: string
  admin?: boolean
}

export const DormCard = ({
  id,
  thumbnail,
  title,
  userId,
  description,
  admin,
}: ListingCardProps) => {
  return (
    <Card className="w-full dark:hover:bg-gray-900 hover:bg-cream transition duration-150 ease-in-out">
      <CardContent className="p-5 flex">
        <Link
          href={`/dorms/${id}/${userId}`}
          className="flex-1 flex-col sm:flex-row flex gap-10"
        >
          <div className="min-w-[100px] w-[100px] h-[100px] relative rounded-md overflow-hidden">
            <Image src={thumbnail} fill loading="lazy" alt="thumbnail" />
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="w-8/12">
              {description.length > 30
                ? description.substring(0, 100) + '...'
                : description}
            </CardDescription>
          </div>
        </Link>
        {admin && (
          <div>
            <DeleteDormListing id={id} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
