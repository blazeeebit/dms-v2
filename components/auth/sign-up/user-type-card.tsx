'use client'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type UserTypeCardProps = {
  value: string
  title: string
  text: string
  register: UseFormRegister<any>
  userType: 'OWNER' | 'STUDENT'
  setUserType: React.Dispatch<React.SetStateAction<'OWNER' | 'STUDENT'>>
}

export const UserTypeCard = ({
  value,
  title,
  text,
  userType,
  setUserType,
  register,
}: UserTypeCardProps) => {
  return (
    <Label htmlFor={value} className="flex-1">
      <Card
        className={cn(
          'w-full cursor-pointer',
          userType == value && 'border-grandis'
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                'flex justify-center p-3',
                userType == value && 'border-grandis'
              )}
            >
              <User
                size={30}
                className={cn(
                  userType == value ? 'text-grandis' : 'text-gray-400'
                )}
              />
            </Card>
            <div className="">
              <CardDescription className="font-bold">{title}</CardDescription>
              <CardDescription className="font-light">{text}</CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                'w-4 h-4 rounded-full',
                userType == value ? 'bg-peach' : 'bg-platinum'
              )}
            />
            <Input
              {...register('role', {
                onChange: (event) => setUserType(event.target.value),
              })}
              value={value}
              id={value}
              className="hidden"
              type="radio"
            />
          </div>
        </CardContent>
      </Card>
    </Label>
  )
}
