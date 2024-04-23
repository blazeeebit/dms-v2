'use client'
import React from 'react'
import { AuthHeader } from '../header'
import { FormGenerator } from '@/components/forms/generator'
import { USER_SIGNIN_FORM, UserAuthFormProps } from '@/constants/form'
import { Button } from '@/components/ui/button'
import { useAuthSignIn } from '@/hooks/use-auth-hook'
import Link from 'next/link'
import { Loader } from '@/components/loader'

export const SignInForm = () => {
  const { onCompleteLoginWithEmailPassword, loading, register, errors } =
    useAuthSignIn()

  return (
    <form
      onSubmit={onCompleteLoginWithEmailPassword}
      className="flex flex-col gap-8"
    >
      <AuthHeader
        title="Login to account"
        text="Looks like you already joined! Welcome back."
      />
      <div className="flex flex-col gap-3">
        {USER_SIGNIN_FORM.map((fields: UserAuthFormProps) => (
          <FormGenerator
            key={fields.id}
            {...fields}
            register={register}
            errors={errors}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <Button type="submit" variant="outline">
          <Loader loading={loading}>Login</Loader>
        </Button>
      </div>
      <p>
        Dont have an account?{' '}
        <Link href="/sign-up" className="font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  )
}
