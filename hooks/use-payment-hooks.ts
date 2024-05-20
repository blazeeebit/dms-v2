import { onCreateDormBookingButton, onCreateRoomPlan } from '@/actions/dorms'
import { onGetUserSubscription } from '@/actions/payment'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import {
  CreateBookingButtonSchema,
  CreateDormRoomPlanProps,
  CreateDormRoomPlanSchema,
  CreateReservationButtonProps,
} from '@/schemas/list.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

export const usePaymentPlan = (id: string) => {
  const { user } = useProfileContext()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CreateDormRoomPlanProps>({
    resolver: zodResolver(CreateDormRoomPlanSchema),
  })
  const router = useRouter()
  const { toast } = useToast()
  const { language } = user

  const onCreateARoom = handleSubmit(async (values) => {
    try {
      reset()
      setLoading(true)
      const plan = await onCreateRoomPlan(id, values.room, values.price)
      if (plan) {
        toast({
          title: 'Success',
          description: plan.message,
        })
        setLoading(false)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  })

  return { language, register, errors, onCreateARoom, loading }
}

export const useReservations = (id: string) => {
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<CreateReservationButtonProps>({
    resolver: zodResolver(CreateBookingButtonSchema),
  })
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const onCreateBookingButton = handleSubmit(async (values) => {
    try {
      reset()
      setLoading(true)
      const button = await onCreateDormBookingButton(
        id,
        values.price,
        values.period
      )
      if (button) {
        toast({
          title: 'Success',
          description: button.message,
        })
        setLoading(false)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if (date) {
      setValue('period', date)
    }
  }, [date])

  return {
    loading,
    onCreateBookingButton,
    register,
    errors,
    setDate,
    date,
  }
}
