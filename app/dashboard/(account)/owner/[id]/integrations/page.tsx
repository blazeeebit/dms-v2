import { onGetStripeIntegration } from '@/actions/payment'
import { IntegrationsList } from '@/components/integration'
import React from 'react'

const OwnerIntegration = async ({ params }: { params: { id: string } }) => {
  const stripeId = await onGetStripeIntegration(params.id)
  return (
    <div>
      <IntegrationsList
        id={params.id}
        connections={{
          stripe: stripeId?.stripeId! ? true : false,
        }}
        language={stripeId?.User?.language!}
      />
    </div>
  )
}

export default OwnerIntegration
