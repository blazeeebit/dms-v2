import { onGetUserSubscription } from '@/actions/payment'
import axios from 'axios'
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

export const useStripe = (id: string) => {
  const [onStripeAccountPending, setOnStripeAccountPending] =
    useState<boolean>(false)
  const onStripeConnect = async () => {
    try {
      setOnStripeAccountPending(true)
      const account = await axios.get(`/api/stripe/create?id=${id}`)
      if (account) {
        setOnStripeAccountPending(false)
        if (account) {
          window.location.href = account.data.url
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { onStripeConnect, onStripeAccountPending }
}
