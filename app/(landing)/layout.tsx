import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const LandingPageLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await currentUser()

  if (user) redirect('/dashboard')

  return <div className="container">{children}</div>
}

export default LandingPageLayout
