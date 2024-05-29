'use client'
import React from 'react'
import { CardTitle } from '../ui/card'
import { useAccountInfo } from '@/hooks/use-profile-hook'
import { UPDATE_USER_INFO } from '@/constants/form'
import { FormGenerator } from '../forms/generator'
import { Separator } from '../ui/separator'
import { Loader } from '../loader'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import Image from 'next/image'
import { Input } from '../ui/input'

type AccountSettingsProps = {
  image?: string | null
  name?: string
  username?: string | null
  address?: string | null
  phone?: string | null
  id?: string
  country?: string | null
}

export const AccountSettings = ({
  image,
  name,
  username,
  address,
  phone,
  id,
  country,
}: AccountSettingsProps) => {
  const { register, errors, onUpdateInfo, loading, user } = useAccountInfo(
    id!,
    name!,
    address!,
    image!,
    phone!,
    country!,
    username!
  )
  return (
    <form onSubmit={onUpdateInfo} className="flex flex-col gap-5">
      <CardTitle>Account Information</CardTitle>
      <Separator orientation="horizontal" />
      <Loader loading={loading}>
        <div className="flex flex-col gap-5 mt-5">
          <Label htmlFor="image-avatar" className="mb-5">
            <span>
              <Image
                width={150}
                height={150}
                className="rounded-full cursor-pointer"
                alt="avatar"
                src={image ? image! : user.user?.imageUrl!}
              />
              <Input
                type="file"
                id="image-avatar"
                className="hidden"
                {...register('image')}
              />
            </span>
          </Label>
          <div className="flex flex-col gap-2">
            <Label>User Email</Label>
            <div className="border-[1px] px-4 py-2 bg-muted">
              {user.user?.emailAddresses[0].emailAddress}
            </div>
          </div>
          {UPDATE_USER_INFO.map(
            (field) => (
              // field.name == 'country' ? (
              //   <div
              //     className="grid md:grid-cols-4 grid-cols-1 gap-3"
              //     key={field.id}
              //   >
              //     <div className="col-span-1 flex items-center">
              //       <CardTitle className="capitalize">{country}</CardTitle>
              //     </div>
              //     <div className="col-span-3">
              //       <FormGenerator
              //         key={field.id}
              //         {...field}
              //         register={register}
              //         errors={errors}
              //       />
              //     </div>
              //   </div>
              // ) : (
              <FormGenerator
                key={field.id}
                {...field}
                register={register}
                errors={errors}
              />
            )
            // )
          )}
        </div>
        <Button variant="outline">Update</Button>
      </Loader>
    </form>
  )
}
