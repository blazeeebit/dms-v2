'use client'
import { usePassword } from '@/hooks/use-profile-hook'
import React from 'react'
import { CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { FormGenerator } from '../forms/generator'
import { Loader } from '../loader'
import { Button } from '../ui/button'

export const UpdatePassword = () => {
  const { onUpdatePassword, loading, register, errors, user } = usePassword()

  if (user.user?.externalAccounts.length) {
    return <></>
  }
  return (
    <form onSubmit={onUpdatePassword} className="flex flex-col gap-5">
      <CardTitle>Account Password</CardTitle>
      <Separator orientation="horizontal" />
      <Loader loading={loading}>
        <FormGenerator
          register={register}
          errors={errors}
          name="password"
          type="password"
          inputType="input"
          placeholder="New password..."
        />
        <FormGenerator
          register={register}
          errors={errors}
          name="confirmPassword"
          type="password"
          inputType="input"
          placeholder="Confirm password..."
        />
        <Button variant="outline">Update</Button>
      </Loader>
    </form>
  )
}
