'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

type PlanCardProps = {
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  active: 'STANDARD' | 'PRO' | 'ULTIMATE'
  onActive(): void
}

export const PlanCard = ({ plan, active, onActive }: PlanCardProps) => {
  return (
    <Card
      onClick={onActive}
      className={cn(
        plan === active ? 'border-orange' : '',
        'p-10 rounded-2xl cursor-pointer'
      )}
    >
      <CardContent className="p-0">
        <CardTitle className="font-bold text-3xl">{plan}</CardTitle>
        <CardDescription className="text-xl">
          {plan === 'STANDARD' ? 10 : plan === 'PRO' ? 50 : 100} credits
        </CardDescription>
      </CardContent>
    </Card>
  )
}
