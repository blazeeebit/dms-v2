'use client'
import { Swiper } from 'swiper/react'
import 'swiper/css'

type SliderProps = {
  children: React.ReactNode
  offset: number
  breakpoints: {}
}

export const Slider = ({ children, offset, breakpoints }: SliderProps) => {
  return (
    <Swiper
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
