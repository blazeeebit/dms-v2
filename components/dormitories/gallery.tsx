'use client'
import React from 'react'
import { SwiperSlide } from 'swiper/react'
import { Slider } from '../slider'
import { Card } from '../ui/card'
import Image from 'next/image'

type EditCreateGalleryProps = {
  gallery: { id: string; image: string }[]
}

export const UserDormGallery = ({ gallery }: EditCreateGalleryProps) => {
  return (
    <div>
      <Slider
        offset={0}
        breakpoints={{
          300: {
            slidesPerView: 2.2,
          },
          700: {
            slidesPerView: 1.7,
          },
        }}
      >
        {gallery &&
          gallery.map((gal) => (
            <SwiperSlide key={gal.id}>
              <Card className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={gal.image} alt="img" fill />
              </Card>
            </SwiperSlide>
          ))}
      </Slider>
    </div>
  )
}
