import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import { SignOutButton } from '../auth/sign-out-button'
import { SearchBar } from '../search'

export const DashboardNavBar = () => {
  return (
    <div className="flex py-5">
      <div className="flex-1 flex justify-start">
        <SearchBar />
      </div>
      <div className="flex justify-end gap-1">
        <SignOutButton />
        <ThemeToggle />
      </div>
    </div>
  )
}
