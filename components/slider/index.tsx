'use client'
import { Swiper } from 'swiper/react'
import 'swiper/css'

type SliderProps = {
  children: React.ReactNode
  offset: number
  breakpoints: {}
  loop?: boolean
  auto?: boolean
}

export const Slider = ({
  children,
  offset,
  breakpoints,
  loop,
  auto,
}: SliderProps) => {
  return (
    <Swiper
      autoplay={auto}
      loop={loop}
      spaceBetween={10}
      className="h-full"
      slidesOffsetBefore={offset}
      slidesOffsetAfter={offset}
      breakpoints={breakpoints}
    >
      {children}
    </Swiper>
  )
}
