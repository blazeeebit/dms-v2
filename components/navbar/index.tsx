import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import Link from 'next/link'
import { Button } from '../ui/button'
import { FadeIn } from '../animation/fade-in'
import { MEDIA_URLS } from '@/constants/routes'
import Image from 'next/image'

export const Navbar = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <div className="px-4 py-3 z-10 flex gap-x-5 items-center">
          <Image
            src={MEDIA_URLS.BRAND_LOGO}
            alt="LOGO"
            width={60}
            height={60}
          />
        </div>
      </div>
      <FadeIn className="col-span-1 flex justify-end items-center gap-4">
        <ThemeToggle language="ENGLISH" />
        <div className="flex">
          <Link href="/sign-up">
            <Button
              className="font-bold rounded-full px-6 py-3"
              variant="default"
            >
              Sign Up
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="font-bold dark:hover:bg-black rounded-full hover:bg-white hover:text-gray-600"
            >
              Login
            </Button>
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
