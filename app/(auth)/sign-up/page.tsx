import React from 'react'
import { SignUpForm } from '../../../components/auth/sign-up'
import { OAuthButton } from '../../../components/auth/oauth-buttons'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
  const user = await currentUser()

  if (user) redirect('/dashboard')
  return (
    <div>
      <SignUpForm />
      <Separator orientation="horizontal" className="my-5" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <OAuthButton method="signup" strategy="google" />
        <OAuthButton method="signup" strategy="microsoft" />
      </div>
    </div>
  )
}

export default SignUpPage
