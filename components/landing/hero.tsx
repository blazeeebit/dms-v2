import React from 'react'
import { TextReveal } from '../animation/text-reveal'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { FadeIn } from '../animation/fade-in'
import { DormSlider } from './dorm-slides'

export const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-20">
      <div className="flex justify-start items-center">
        <FadeIn className="w-10/12 aspect-square relative">
          <div className="absolute z-50 -left-1/3 top-10">
            <div className="relative aspect-video w-[300px]">
              <Image
                src="https://res.cloudinary.com/dthhovsye/image/upload/v1716844698/obaq2asq4mp94i3dk8mi.jpg"
                alt="img"
                fill
                objectFit="contain"
                sizes="100vw"
                className="rounded-2xl"
              />
            </div>
          </div>
          <div className="absolute -right-20 z-50 top-1/2">
            <div className="relative aspect-video w-[400px]">
              <Image
                src="https://res.cloudinary.com/dthhovsye/image/upload/v1716844698/zyxuyxyeqizrlvv8f1nl.jpg"
                alt="img"
                fill
                objectFit="contain"
                sizes="100vw"
                className="rounded-2xl"
              />
            </div>
          </div>
          <Image
            src="https://res.cloudinary.com/dthhovsye/image/upload/v1716844580/zneotuo2emottsmzwrrf.jpg"
            alt="emu"
            fill
            loading="lazy"
            objectFit="cover"
            sizes="100vw"
            className="rounded-2xl"
          />
        </FadeIn>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <TextReveal
          text="EMU Dorm Management System"
          className="text-6xl font-bold leading-tight"
        />
        <TextReveal
          text="Simplifying Campus Living for a Better College Experience"
          className="text-xl font-medium text-gray-500"
        />
        <FadeIn>
          <Link href="/sign-in">
            <Button variant="outline" className="text-xl px-6 py-7">
              Get Started
            </Button>
          </Link>
        </FadeIn>
      </div>
      <FadeIn className="lg:col-span-2 mt-10">
        <DormSlider />
      </FadeIn>
    </div>
  )
}
