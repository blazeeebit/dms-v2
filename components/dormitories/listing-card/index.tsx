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
import { DeleteDormListing } from './delete-listing'

type ListingCardProps = {
  id: string
  title: string
  thumbnail: string
  active: boolean
  description: string
  payments: string
  userId: string
}

export const ListingCard = ({
  id,
  thumbnail,
  title,
  active,
  description,
  payments,
  userId,
}: ListingCardProps) => {
  return (
    <Card className="w-full dark:hover:bg-gray-900 hover:bg-cream transition duration-150 ease-in-out">
      <CardContent className="p-0 flex">
        <Link
          href={`${PATH_URLS.DASHBOARD_OWNER}/${userId}/edit/${id}`}
          className="flex-1 flex-col sm:flex-row flex gap-10 p-5"
        >
          <div className="min-w-[100px] w-[100px] h-[100px] relative rounded-md overflow-hidden">
            <Image src={thumbnail} fill loading="lazy" alt="thumbnail" />
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="w-full lg:w-8/12">
              {description.length > 30
                ? description.substring(0, 100) + '...'
                : description}
            </CardDescription>
          </div>
        </Link>
        <div className="p-5 flex">
          <StatusSwitch
            payments={payments ? true : false}
            id={id}
            active={active}
          />
          <DeleteDormListing id={id} />
        </div>
      </CardContent>
    </Card>
  )
}
