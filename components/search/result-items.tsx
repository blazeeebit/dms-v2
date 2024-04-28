import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'

type ResultItemsProps = {
  id: string
  type?: string
  name: string
  image: string
  email?: string
  description?: string
}

export const ResultItems = ({
  type,
  image,
  name,
  id,
  description,
}: ResultItemsProps) => {
  switch (type) {
    case 'dorm':
      return (
        <Link href={`/dorms/${id}`}>
          <Card>
            <CardContent className="p-3 flex gap-3 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
              <div className="w-16 rounded-lg overflow-hidden h-16 relative">
                <Image src={image} alt="thumbnail" fill />
              </div>
              <div>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>
                  {description && description.length > 30
                    ? description.substring(0, 30) + '...'
                    : description}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>
      )
      break

    default:
      return <CardDescription>No Results Found</CardDescription>
  }
}
