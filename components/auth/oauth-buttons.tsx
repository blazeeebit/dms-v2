'use client'

import { Button } from '@/components/ui/button'
import { useOAuth } from '@/hooks/use-auth-hook'
import { GoogleIcon } from '@/icons/google'
import { MicrosoftIcon } from '@/icons/microsoft'
import React from 'react'

type OAuthButtonProps = {
  strategy: 'google' | 'microsoft'
  method: 'signin' | 'signup'
}

export const OAuthButton = ({ strategy, method }: OAuthButtonProps) => {
  const { signUpWith, signInWith } = useOAuth()
  switch (strategy) {
    case 'google':
      return (
        <Button
          variant="outline"
          className="font-bold flex gap-5"
          {...(method == 'signin'
            ? {
                onClick: () => signInWith('oauth_google'),
              }
            : {
                onClick: () => signUpWith('oauth_google'),
              })}
        >
          <GoogleIcon />
          Login with Google
        </Button>
      )
    case 'microsoft':
      return (
        <Button
          {...(method == 'signin'
            ? {
                onClick: () => signInWith('oauth_microsoft'),
              }
            : {
                onClick: () => signUpWith('oauth_microsoft'),
              })}
          variant="outline"
          className="font-bold flex gap-5"
        >
          <MicrosoftIcon />
          Login with Microsoft
        </Button>
      )
    default:
      return <></>
  }
}
