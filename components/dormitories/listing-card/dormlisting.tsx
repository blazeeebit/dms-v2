import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StatusSwitch } from './status-switch'
import { PATH_URLS } from '@/constants/routes'

type ListingCardProps = {
  id: string
  title: string
  thumbnail: string

  description: string
}

export const DormCard = ({
  id,
  thumbnail,
  title,

  description,
}: ListingCardProps) => {
  return (
    <Card className="w-full dark:hover:bg-gray-900 hover:bg-cream transition duration-150 ease-in-out">
      <CardContent className="p-0 flex">
        <Link
          href={`/dorms/${id}`}
          className="flex-1 flex-col sm:flex-row flex gap-10 p-5"
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
      </CardContent>
    </Card>
  )
}
