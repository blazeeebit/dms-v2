'use client'
import React from 'react'
import { CardTitle } from '../ui/card'
import { DMS_CONTENT } from '@/constants/language'
import { Edit, X } from 'lucide-react'
import { useEmailName } from '@/hooks/use-email-hook'
import { FormGenerator } from '../forms/generator'
import { Loader } from '../loader'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

type EmailNameProps = {
  language: 'ENGLISH' | 'TURKISH'
  english: string
  turkish: string
  id: string
}

export const EmailName = ({
  language,
  english,
  turkish,
  id,
}: EmailNameProps) => {
  const { edit, onEditName, register, onEditTemplateName, loading } =
    useEmailName(id)
  return (
    <div
      className={cn(
        'w-full gap-5 group cursor-pointer p-5 rounded-lg',
        !edit ? 'hover:bg-muted' : ''
      )}
    >
      {edit ? (
        <div className="w-full">
          <form className="flex w-full" onSubmit={onEditTemplateName}>
            <Input
              {...register('name')}
              className="text-4xl border-none font-bold py-6"
              placeholder={
                english && turkish
                  ? language === 'ENGLISH'
                    ? english
                    : turkish
                  : DMS_CONTENT.EMAIL_TEMPLATE[language!].content.template
              }
            />
            <div className="flex gap-3">
              <Button type="submit" variant="outline">
                <Loader loading={loading}>Update</Loader>
              </Button>
              <Button type="button" onClick={onEditName}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="w-full flex justify-between items-center"
          onClick={onEditName}
        >
          <CardTitle className="text-4xl">
            {!english && !turkish
              ? `${DMS_CONTENT.EMAIL_TEMPLATE[language].content.template}`
              : language === 'ENGLISH'
              ? english
              : language === 'TURKISH' && turkish}
          </CardTitle>
          <Edit className="group-hover:flex hidden" />
        </div>
      )}
    </div>
  )
}
