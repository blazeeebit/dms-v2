'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useStripe } from '@/hooks/use-payment-hooks'
import { Loader } from '../loader'

export const StripeConnect = () => {
  const { onStripeConnect, onStripeAccountPending } = useStripe()
  return (
    <div>
      <Button className="w-[300px] h-[50px]" onClick={onStripeConnect}>
        <Loader loading={onStripeAccountPending}>Connect to Stripe</Loader>
      </Button>
    </div>
  )
}
