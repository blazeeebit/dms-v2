'use client'

import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => signOut(() => router.push('/'))}>
      <LogOut className="text-gray-400" />
    </Button>
  )
}
