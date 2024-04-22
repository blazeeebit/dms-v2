import { OAuthButton } from '@/components/auth/oauth-buttons'
import { SignInForm } from '@/components/auth/sign-in'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const SignInPage = async () => {
  const user = await currentUser()

  if (user) redirect('/dashboard')
  return (
    <div>
      <SignInForm />
      <Separator orientation="horizontal" className="my-5" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        <OAuthButton method="signin" strategy="google" />
        <OAuthButton method="signin" strategy="microsoft" />
      </div>
    </div>
  )
}

export default SignInPage
