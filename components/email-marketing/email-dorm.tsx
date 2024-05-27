'use client'
import { useEmailDorm } from '@/hooks/use-email-hook'
import React from 'react'
import { CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Edit } from 'lucide-react'

type EmailDormProps = {
  dorms: {
    language: {
      name: string
    }[]
    id: string
  }[]
  emailId: string
  dormId?: string
}

export const EmailDorm = ({ dorms, emailId, dormId }: EmailDormProps) => {
  const { loading, onEditing, editing } = useEmailDorm(emailId)
  return (
    <div className="hover:bg-muted rounded-lg group cursor-pointer">
      {editing ? (
        <div className="p-5 w-full flex justify-between">
          <select className="bg-transparent text-sm border-2 px-5">
            {dorms.map((dorm) =>
              dorm.language.map((lan) => (
                <option key={dorm.id} value={dorm.id} className="bg-gray-500">
                  {lan.name}
                </option>
              ))
            )}
          </select>
          <div>
            <Button onClick={onEditing}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div onClick={onEditing} className="p-5 w-full flex justify-between">
          <CardDescription className="text-base">
            {dormId || 'No dorm assigned'}
          </CardDescription>
          <Edit className="group-hover:flex hidden text-gray-500" />
        </div>
      )}
    </div>
  )
}
