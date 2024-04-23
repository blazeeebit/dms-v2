'use client'
import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import { SignOutButton } from '../auth/sign-out-button'
import { SearchBar } from '../search'
import { MobileDrawer } from '../mobile-drawer/mobile-drawer'
import { useProfile } from '@/hooks/use-profile-hook'

type DashboardNavBarProps = {
  user: {
    username: string
    language: 'TURKISH' | 'ENGLISH'
    role: 'OWNER' | 'STUDENT' | 'ADMIN'
  }
}

export const DashboardNavBar = ({ user }: DashboardNavBarProps) => {
  const { onLogout } = useProfile(user)
  return (
    <div className="flex py-5">
      <div className="flex-1 flex justify-start items-center">
        <MobileDrawer />
        <SearchBar className="lg:inline hidden" />
      </div>
      <div className="flex justify-end items-center gap-1">
        <SignOutButton logout={onLogout} />
        <ThemeToggle />
      </div>
    </div>
  )
}
