import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { IconRenderer } from '../icon-renderer'

type ServiceChipProps = {
  name: string
  icon: string
}

export const ServiceChip = ({ name, icon }: ServiceChipProps) => {
  return (
    <Card className="rounded-full dark:bg-gray-800 bg-white">
      <CardContent className="py-3 dark:text-gray-400 text-gray-700 px-5 flex items-center gap-2">
        <IconRenderer icon={icon} />
        <p className="text-sm">{name}</p>
      </CardContent>
    </Card>
  )
}
