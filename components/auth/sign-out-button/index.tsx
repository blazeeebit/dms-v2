'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

type SignOutProps = {
  logout(): void
}

export const SignOutButton = ({ logout }: SignOutProps) => {
  return (
    <Button variant="ghost" onClick={logout}>
      <LogOut className="text-gray-400" />
    </Button>
  )
}
