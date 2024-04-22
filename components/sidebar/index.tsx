'use client'
import React from 'react'
import { AnimatedSideBarBody, AnimatedSideBarMenuItem } from './sidebar-motion'
import { useSideBar } from '@/hooks/use-sidebar-hook'
import { Card } from '../ui/card'
import Image from 'next/image'

export const SideBar = () => {
  const { onSideBarRef, onResize } = useSideBar()
  return (
    <AnimatedSideBarBody>
      <Card
        ref={onSideBarRef}
        className="w-full flex flex-col gap-y-5 h-full relative rounded-none"
      >
        <div className="absolute z-0 shadow-lg dark:shadow-sm dark:shadow-white w-full h-full animate-pulse"></div>
        <div className="px-4 py-3 flex gap-x-5 items-center">
          <Image
            src="/assets/images/logo.png"
            alt="LOGO"
            width={40}
            height={40}
          />
          <AnimatedSideBarMenuItem onView={onResize}>
            <div className="flex-col flex">
              <p className="text-sm leading-none">Dorm Management</p>
              <p className="leading-none">System</p>
            </div>
          </AnimatedSideBarMenuItem>
        </div>
      </Card>
    </AnimatedSideBarBody>
  )
}
