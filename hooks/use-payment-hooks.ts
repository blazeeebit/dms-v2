import { onGetUserSubscription } from '@/actions/payment'
import { useEffect, useState } from 'react'

export const useSubscription = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isPlan, setIsPlan] = useState<
    | {
        credits: number
        plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
      }
    | undefined
  >(undefined)
  const getSubscriptionPlan = async () => {
    const plan = await onGetUserSubscription(id)
    if (plan) {
      setIsPlan((prev) => ({
        ...prev,
        credits: plan.credits!,
        plan: plan.plan!,
      }))
      setLoading(false)
    }
  }

  useEffect(() => {
    getSubscriptionPlan()
  }, [])

  return { isPlan, loading }
}
