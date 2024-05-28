'use client'
import React from 'react'
import { Input } from '../ui/input'
import { CircleArrowUpIcon, Trash } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { useEmailTemplate } from '@/hooks/use-email-hook'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type CreateEmailProps = {
  emailId: string
  language: 'ENGLISH' | 'TURKISH'
  enContent?: string
  trContent?: string
  userId: string
}

export const CreateEmail = ({
  emailId,
  language,
  enContent,
  trContent,
  userId,
}: CreateEmailProps) => {
  const {
    CreateEmailTemplate,
    loading,
    register,
    RegMail,
    processing,
    onSaveEmailTemplate,
    onDeleteTemplate,
    deleting,
  } = useEmailTemplate(userId, emailId, language, enContent, trContent)
  return (
    <div className="flex-1 flex px-5 flex-col w-full h-0 gap-5 pt-5">
      <form
        onSubmit={onSaveEmailTemplate}
        className="flex-1 flex flex-col border-2 rounded-lg p-10"
      >
        <Textarea
          {...RegMail('template')}
          className="flex-1 text-xl border-none"
          placeholder="Your email template..."
        />
        <Button className="self-end">
          <Loader loading={processing}>Save</Loader>
        </Button>
      </form>
      <form
        onSubmit={CreateEmailTemplate}
        className="border-2 rounded-full overflow-hidden flex gap-3 items-center px-5"
      >
        <Input
          {...register('prompt')}
          className="border-none font-bold py-7"
          placeholder="Write your email template...."
        />
        <Button
          onClick={onDeleteTemplate}
          type="button"
          variant="ghost"
          className="rounded-full p-0"
        >
          <Loader loading={deleting}>
            <Trash className="text-red-500 cursor-pointer" />
          </Loader>
        </Button>
        <Button variant="ghost" className="rounded-full p-0">
          <Loader loading={loading}>
            <CircleArrowUpIcon className="cursor-pointer" />
          </Loader>
        </Button>
      </form>
    </div>
  )
}
