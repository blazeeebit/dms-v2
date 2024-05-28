'use client'
import React from 'react'
import { Mail } from 'lucide-react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { useSendMail } from '@/hooks/use-email-hook'
import { Loader } from '../loader'

type SendEmailsProps = {
  id: string
}

export const SendEmails = ({ id }: SendEmailsProps) => {
  const { onBulkEmails, loading } = useSendMail(id)
  return (
    <DropdownMenuItem onClick={onBulkEmails} className="cursor-pointer">
      <Loader loading={loading}>
        <Mail className="mr-3" /> Bulk Emails
      </Loader>
    </DropdownMenuItem>
  )
}
