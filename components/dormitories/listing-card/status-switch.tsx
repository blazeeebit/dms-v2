'use client'
import { Tooltip } from '@/components/tooltip'
import { Switch } from '@/components/ui/switch'
import { usePublish } from '@/hooks/use-dormitories-hook'
import React from 'react'

type StatusSwitchProps = {
  active: boolean
  id: string
  payments: boolean
}

export const StatusSwitch = ({ active, id, payments }: StatusSwitchProps) => {
  const { onActivateListing } = usePublish(id)
  return !payments ? (
    <Tooltip trigger={<Switch disabled />}>
      You have not activated your payments
    </Tooltip>
  ) : (
    <Switch defaultChecked={active} onClick={(e) => onActivateListing(e)} />
  )
}
