import { onGetSubscriptionPlan } from '@/actions/payment'
import { SubscriptionForm } from '@/components/subscriptions/form'
import React from 'react'

const SubscriptionPage = async ({ params }: { params: { id: string } }) => {
  const plan = await onGetSubscriptionPlan(params.id)

  return <SubscriptionForm plan={plan?.subscription!} userId={params.id} />
}

export default SubscriptionPage
