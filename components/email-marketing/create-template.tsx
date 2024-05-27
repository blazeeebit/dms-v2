'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useCreateEmail } from '@/hooks/use-email-hook'
import { Loader } from '../loader'

type CreateTemplateProps = {
  id: string
  label: string
}

export const CreateTemplate = ({ id, label }: CreateTemplateProps) => {
  const { onCreateNewTemplate, loading } = useCreateEmail(id)
  return (
    <Button variant="outline" className="py-6" onClick={onCreateNewTemplate}>
      <Loader loading={loading}>
        <Plus />
        {label}
      </Loader>
    </Button>
  )
}
