'use client'

import React from 'react'
import { Button } from '../ui/button'
import { UseFormSetValue } from 'react-hook-form'
import { useAiDescription } from '@/hooks/use-ai-hook'
import { Loader } from '../loader'

type DescriptionGenerationProps = {
  id: string
  name: string
  services: {
    name: string
    icon: string
  }[]
  setDescription: UseFormSetValue<any>
}

export const DescriptionGeneration = ({
  id,
  name,
  services,
  setDescription,
}: DescriptionGenerationProps) => {
  const { loading, onGenerateDescription } = useAiDescription(
    id,
    name,
    services,
    setDescription
  )
  return (
    <Button type="button" variant="outline" onClick={onGenerateDescription}>
      <Loader loading={loading}>Generate Description</Loader>
    </Button>
  )
}
