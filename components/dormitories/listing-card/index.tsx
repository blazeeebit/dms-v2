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

type ListingCardProps = {
  id: string
  title: string
  thumbnail: string
  active: boolean
  description: string
  payments: boolean
}

export const ListingCard = ({
  id,
  thumbnail,
  title,
  active,
  description,
  payments,
}: ListingCardProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0 flex">
        <Link href="#" className="flex-1 flex gap-10 p-5">
          <div className="w-1/12 relative aspect-square rounded-md overflow-hidden">
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
        <div className="p-5">
          <StatusSwitch payments={payments} id={id} active={active} />
        </div>
      </CardContent>
    </Card>
  )
}
