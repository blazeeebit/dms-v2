'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useStripe } from '@/hooks/use-payment-hooks'
import { Loader } from '../loader'

type StripeConnectProps = {
  connected: boolean
  id: string
  state: {
    [key in 'connected' | 'connect']: string
  }
}

export const StripeConnect = ({ connected, id, state }: StripeConnectProps) => {
  const { onStripeConnect, onStripeAccountPending } = useStripe(id)
  return (
    <div>
      <Button disabled={connected} onClick={onStripeConnect}>
        <Loader loading={onStripeAccountPending}>
          {connected ? state['connected'] : state['connect']}
        </Loader>
      </Button>
    </div>
  )
}
