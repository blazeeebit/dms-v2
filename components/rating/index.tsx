import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { ServiceItem } from './service-item'
import { DMS_CONTENT } from '@/constants/language'
import { PostReview } from './post-review'

type RatingSystemProps = {
  service: {
    rating: {
      id: string
      rating: number
      serviceId: string | null
      studentId: string | null
    }[]
    id: string
    name: string
    icon: string
  }[]
  language: 'ENGLISH' | 'TURKISH'
  dormId: string
  studentId: string
  review?: string
}

export const RatingSystem = ({
  service,
  language,
  dormId,
  studentId,
  review,
}: RatingSystemProps) => {
  return (
    <Card>
      <CardContent className="p-5">
        <CardTitle className="font-bold text-lg">
          {DMS_CONTENT.RATING[language].content.title}
        </CardTitle>
        <CardDescription>
          {DMS_CONTENT.RATING[language].content.description}
        </CardDescription>
        <div className="grid lg:grid-cols-3 grid-cols-1 pt-10 gap-5">
          <div className="flex flex-col gap-5 col-span-1">
            {service.map((s) => (
              <ServiceItem studentId={studentId} key={s.id} {...s} />
            ))}
          </div>
          <PostReview review={review} studentId={studentId} dormId={dormId} />
        </div>
      </CardContent>
    </Card>
  )
}
