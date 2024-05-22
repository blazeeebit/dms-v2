'use client'
import React from 'react'
import { Label } from '../ui/label'
import { Star } from 'lucide-react'
import { IconRenderer } from '../icon-renderer'
import { useRating } from '@/hooks/use-dormitories-hook'
import { Loader } from '../loader'

type ServiceItemProps = {
  rating: {
    id: string
    rating: number
    serviceId: string | null
    studentId: string | null
  }[]
  id: string
  name: string
  icon: string
  studentId: string
}

export const ServiceItem = ({
  rating,
  id,
  icon,
  name,
  studentId,
}: ServiceItemProps) => {
  const rated = rating
    .filter((r) => r.studentId === studentId && r.serviceId === id)
    .reduce((total, next) => {
      return total + next.rating
    }, 0)
  const {
    onHighLightStars,
    onMouseOver,
    onLeaveRatingStar,
    loading,
    onRateService,
  } = useRating(rated, id, studentId)
  return (
    <Label className="flex flex-col gap-2">
      <div className="flex gap-2 items-end">
        <IconRenderer icon={icon} />
        {name}
      </div>
      <div
        className="flex gap-2"
        {...(!rated && {
          onMouseLeave: onLeaveRatingStar,
        })}
      >
        <Loader loading={loading}>
          {[1, 2, 3, 4, 5].map((r) =>
            r <= onMouseOver ? (
              <Star
                key={r}
                fill="#f2c246"
                className="text-[#f2c246] cursor-pointer"
                {...(!rated && {
                  onMouseEnter: () => onHighLightStars(r),
                  onClick: () => onRateService(r),
                })}
              />
            ) : (
              <Star
                key={r}
                className="text-[#f2c246] cursor-pointer"
                {...(!rated && {
                  onMouseEnter: () => onHighLightStars(r),
                })}
              />
            )
          )}
        </Loader>
      </div>
    </Label>
  )
}
