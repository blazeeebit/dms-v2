'use client'
import { AuthHeader } from '@/components/auth/header'
import { TypeSelectionForm } from '@/components/auth/sign-up/type-selection'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useOnBoarding } from '@/hooks/use-auth-hook'
import React from 'react'

export const OnBoardingForm = () => {
  const { register, onUserType, setOnUserType, onCompleteOnBoarding, loading } =
    useOnBoarding()
  return (
    <form onSubmit={onCompleteOnBoarding} className="flex flex-col gap-8">
      <AuthHeader
        title="Finish Your OnBoarding"
        text="Lets complete your registration! What do you do? Let’s tailor your experience so it best suits you."
      />
      <TypeSelectionForm
        register={register}
        userType={onUserType}
        setUserType={setOnUserType}
      />
      <Button type="submit" variant="outline" className="py-6">
        <Loader loading={loading}>Complete Onboarding</Loader>
      </Button>
    </form>
  )
}
