import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type SettingsLayoutProps = {
  children: React.ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:gap-10 pb-10">
      <div className="col-span-1 flex items-start">
        <Link
          href="#"
          className="font-medium bg-muted px-5 py-3 rounded-md w-full flex gap-3"
        >
          <User /> Account
        </Link>
      </div>
      <div className="col-span-3 border-2 rounded-xl">{children}</div>
    </div>
  )
}

export default SettingsLayout
