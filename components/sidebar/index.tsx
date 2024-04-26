'use client'
import React from 'react'
import { AnimatedSideBarBody, AnimatedSideBarMenuItem } from './sidebar-motion'
import { useSideBar } from '@/hooks/use-navigation-hook'
import { Card } from '../ui/card'
import Image from 'next/image'
import { AccountPagesMenuProps, MEDIA_URLS } from '@/constants/routes'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LanguageToggle } from '../language-toggle'

type SideBarProps = {
  menu: AccountPagesMenuProps[]
  id: string
}

export const SideBar = ({ menu, id }: SideBarProps) => {
  const { onSideBarRef, onResize, currentPage } = useSideBar()
  return (
    <AnimatedSideBarBody>
      <Card
        ref={onSideBarRef}
        className="w-full flex flex-col gap-y-10 h-full relative rounded-none"
      >
        <div className="absolute z-0 shadow-lg dark:shadow-sm dark:shadow-white w-full h-full animate-pulse"></div>
        <div className="px-4 py-3 z-10 flex gap-x-5 items-center">
          <Image
            src={MEDIA_URLS.BRAND_LOGO}
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
        <div className="px-4 z-10 flex flex-col gap-3 flex-1">
          {menu.map((item) => (
            <Link
              href={`${item.path}${id}/${item.page}`}
              key={item.id}
              className={cn(
                'flex gap-x-5 cursor-pointer items-center p-2 rounded-md',
                currentPage == item.page &&
                  'bg-black dark:bg-white dark:text-black text-white'
              )}
            >
              {item.icon}
              <AnimatedSideBarMenuItem onView={onResize}>
                <p className="text-base leading-none font-semibold capitalize">
                  {item.page}
                </p>
              </AnimatedSideBarMenuItem>
            </Link>
          ))}
        </div>
        <div className="px-4 z-10 flex flex-col gap-3 mb-5">
          <LanguageToggle onResize={onResize} />
        </div>
      </Card>
    </AnimatedSideBarBody>
  )
}
