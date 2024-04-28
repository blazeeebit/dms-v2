'use client'
import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import { SignOutButton } from '../auth/sign-out-button'
import { SearchBar } from '../search'
import { MobileDrawer } from '../mobile-drawer/mobile-drawer'
import { useProfile } from '@/hooks/use-profile-hook'
import { OwnerCredits } from '../subscriptions/credits'

type DashboardNavBarProps = {
  id: string
  user: {
    username: string
    language: 'TURKISH' | 'ENGLISH'
    role: 'OWNER' | 'STUDENT' | 'ADMIN'
  }
}

export const DashboardNavBar = ({ user, id }: DashboardNavBarProps) => {
  const { onLogout } = useProfile(user)
  return (
    <div className="flex py-5 mb-10">
      <div className="flex-1 flex justify-start items-center">
        <MobileDrawer language={user.language} />
        <SearchBar language={user.language} className="lg:inline hidden" />
      </div>
      <div className="flex justify-end items-center gap-1">
        <OwnerCredits id={id} />
        <SignOutButton logout={onLogout} />
        <ThemeToggle language={user.language} />
      </div>
    </div>
  )
}
