'use client'
import React from 'react'
import { Slider } from '../slider'
import { SwiperSlide } from 'swiper/react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useActivatePromos } from '@/hooks/use-dormitories-hook'
import { Loader } from '../loader'

type PromoSliderProps = {
  promos: {
    id: string
    name: string
    discount: number
    createdAt: Date
    dormitoriesId: string | null
    active: boolean
  }[]
  dormId: string
}

export const PromoSlider = ({ promos, dormId }: PromoSliderProps) => {
  const { loading, onActivatePromo, onDeactivePromo, active } =
    useActivatePromos(dormId)
  return (
    <div className="w-full flex">
      <div className="flex-1 w-0">
        <Slider
          offset={0}
          breakpoints={{
            300: {
              slidesPerView: 2.2,
            },
            1200: {
              slidesPerView: 3.3,
            },
          }}
        >
          {promos.map((promo) => (
            <SwiperSlide key={promo.id}>
              <Card className="p-10 cursor-pointer">
                <CardContent className="p-0 flex gap-4">
                  <div>
                    <CardTitle className="text-4xl font-bold">
                      {promo.discount}%
                    </CardTitle>
                    <CardDescription className="text-xl">
                      {promo.name}
                    </CardDescription>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      {...(promo.active
                        ? {
                            onClick: () => onDeactivePromo(promo.id),
                          }
                        : {
                            onClick: () => onActivatePromo(promo.id),
                          })}
                    >
                      <Loader loading={loading && active === promo.id}>
                        {promo.active ? 'Deactivate' : 'Active'}
                      </Loader>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </div>
  )
}
