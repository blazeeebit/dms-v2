'use client'
import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import { SignOutButton } from '../auth/sign-out-button'
import { SearchBar } from '../search'
import { MobileDrawer } from '../mobile-drawer/mobile-drawer'
import { useProfile } from '@/hooks/use-profile-hook'
import { OwnerCredits } from '../subscriptions/credits'
import Link from 'next/link'
import { LanguageToggle } from '../language-toggle'
import { CardDescription } from '../ui/card'

type DashboardNavBarProps = {
  id: string
  user: {
    username: string
    language: 'ENGLISH' | 'TURKISH'
    role: 'OWNER' | 'STUDENT' | 'ADMIN'
  }
  menu?: boolean
}

export const DashboardNavBar = ({ user, id, menu }: DashboardNavBarProps) => {
  const { onLogout } = useProfile(user)
  return (
    <div className="flex py-5 gap-5 mb-10">
      <div className="flex-1 flex justify-start items-center">
        <MobileDrawer id={id} language={user.language} />
        <SearchBar
          id={id}
          language={user.language}
          className="lg:inline hidden"
        />
      </div>
      {menu && (
        <div className="flex-1 flex items-center">
          <Link href={'/dashboard'}>
            <CardDescription className="font-normal text-lg">
              Dashboard
            </CardDescription>
          </Link>
        </div>
      )}
      <div className="flex justify-end items-center gap-1">
        {user.role == 'OWNER' && <OwnerCredits id={id} />}
        <SignOutButton logout={onLogout} />
        <ThemeToggle language={user.language} />
      </div>
    </div>
  )
}
