'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type TabLinkProps = {
  type: 'settings' | 'subscription'
  href: string
  icon: JSX.Element
}

export const TabLink = ({ href, type, icon }: TabLinkProps) => {
  const pathname = usePathname()

  const currentPage = pathname.split('/').pop()
  return (
    <Link
      href={href}
      className={cn(
        'font-medium px-5 py-3 rounded-md w-full flex gap-3 capitalize',
        currentPage === type ? 'bg-muted' : ''
      )}
    >
      {icon} {type === 'settings' ? 'account' : type}
    </Link>
  )
}
