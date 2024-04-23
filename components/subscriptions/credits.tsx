'use client'
import { useSubscription } from '@/hooks/use-payment-hooks'
import React from 'react'
import { Card, CardDescription } from '../ui/card'
import { Loader } from '../loader'

type OwnerCreditsProps = {
  id: string
}

export const OwnerCredits = ({ id }: OwnerCreditsProps) => {
  const { isPlan, loading } = useSubscription(id)
  return (
    <div>
      <Loader loading={loading}>
        <Card className="p-2">
          <CardDescription>
            {isPlan?.credits}/
            {isPlan?.plan == 'STANDARD'
              ? '10'
              : isPlan?.plan == 'PRO'
              ? '25'
              : '60'}
          </CardDescription>
        </Card>
      </Loader>
    </div>
  )
}
