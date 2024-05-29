'use client'
import { useSubscriptionPlan } from '@/hooks/use-payment-hooks'
import React from 'react'
import { PlanCard } from './plan-card'
import { SubscriptionElements } from '../stripe/subscription-elements'
import { Button } from '../ui/button'
import { Loader } from '../loader'
import { Card, CardTitle } from '../ui/card'

type SubscriptionFormProps = {
  plan: {
    id: string
    plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  }
  userId: string
}

export const SubscriptionForm = ({ plan, userId }: SubscriptionFormProps) => {
  const { currentPlan, onSetActivePlan, onUpdatetToFreeTier, loading } =
    useSubscriptionPlan(plan.plan, userId)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
      <PlanCard
        onActive={() => onSetActivePlan('STANDARD')}
        plan="STANDARD"
        active={currentPlan}
      />
      <PlanCard
        onActive={() => onSetActivePlan('PRO')}
        plan="PRO"
        active={currentPlan}
      />
      <PlanCard
        onActive={() => onSetActivePlan('ULTIMATE')}
        plan="ULTIMATE"
        active={currentPlan}
      />
      <div className="col-span-1 md:col-span-3">
        {currentPlan !== 'STANDARD' && plan.plan !== currentPlan && (
          <Card className="bg-muted p-10">
            <CardTitle>
              {currentPlan === 'PRO' ? '$15 USD' : '$35 USD'}
            </CardTitle>
            <SubscriptionElements payment={currentPlan} id={userId} />
          </Card>
        )}
        {currentPlan === 'STANDARD' && (
          <Button className="w-full" onClick={onUpdatetToFreeTier}>
            <Loader loading={loading}>Update</Loader>
          </Button>
        )}
      </div>
    </div>
  )
}
