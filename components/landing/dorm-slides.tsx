'use client'
import React from 'react'
import { Slider } from '../slider'
import { DORM_LANDING_SLIDE } from '@/constants/dorms'
import { SwiperSlide } from 'swiper/react'
import { Card, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const DormSlider = () => {
  return (
    <Slider
      auto
      loop
      breakpoints={{
        200: {
          slidePerView: 1.6,
        },
        1200: {
          slidesPerView: 3.7,
        },
      }}
      offset={0}
    >
      {DORM_LANDING_SLIDE.map((slide, key) => (
        <SwiperSlide key={key}>
          <Card className="px-16 py-6 hover:bg-muted">
            <div className="relative aspect-square w-3/12">
              <Image src={slide.img} alt="img" fill objectFit="contain" />
            </div>
            <CardTitle className="text-xl font-bold mb-5">
              {slide.label}
            </CardTitle>
            <Link href={slide.link} target="_blank">
              <Button>
                View More
                <ArrowRight className="ml-5" />
              </Button>
            </Link>
          </Card>
        </SwiperSlide>
      ))}
    </Slider>
  )
}
