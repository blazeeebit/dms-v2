import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

type AnalyticCardProps = {
  value: number
  label: string
  icon: React.ReactNode
  cash?: boolean
}

export const AnalyticCard = ({
  value,
  label,
  icon,
  cash,
}: AnalyticCardProps) => {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <p className="text-sm">{label}</p>
          {icon}
        </div>
        <CardTitle className="font-bold text-3xl">
          {cash && '$'}
          {value}
        </CardTitle>
      </CardContent>
    </Card>
  )
}
