import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { StripeConnect } from '../stripe/connect-button'

type IntegrationModalBodyProps = {
  type: string
  connections: {
    [key in 'stripe']: boolean
  }
  id: string
}

export const IntegrationModalBody = ({
  type,
  connections,
  id,
}: IntegrationModalBodyProps) => {
  switch (type) {
    case 'stripe':
      return (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Stripe would like to access</h2>
          {[
            'Payment and bank information',
            'Products and services you sell',
            'Business and tax information',
            'Create and update Products',
          ].map((item, key) => (
            <div key={key} className="flex gap-2 items-center pl-3">
              <CheckCircle2Icon />
              <p>{item}</p>
            </div>
          ))}
          <div className="flex justify-between mt-10">
            <Button variant="outline">Learn more</Button>
            <StripeConnect id={id} connected={connections['stripe']} />
          </div>
        </div>
      )
    default:
      return <></>
  }
}
