import React from 'react'
import { ThemeToggle } from '../theme-toggle'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Navbar = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1"></div>
      <div className="col-span-1 flex justify-end gap-4">
        <ThemeToggle />
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
              className="font-bold rounded-full hover:bg-white hover:text-gray-600"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
