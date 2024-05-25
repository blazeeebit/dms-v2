import {
  onCreateBooking,
  onCreateDormBookingButton,
  onCreateRoomPlan,
} from '@/actions/dorms'
import {
  onCreateCustomerPaymentIntentSecret,
  onCreateTransaction,
  onGetUserSubscription,
  onRoomRented,
} from '@/actions/payment'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import {
  CreateBookingButtonSchema,
  CreateBookingButtonStudentProps,
  CreateBookingButtonStudentSchema,
  CreateDormRoomPlanProps,
  CreateDormRoomPlanSchema,
  CreateReservationButtonProps,
} from '@/schemas/list.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useElements,
  useStripe as useStripeHook,
} from '@stripe/react-stripe-js'

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

export const useStudentBooking = (
  id: string,
  studentId: string,
  room?: boolean,
  roomId?: string
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const stripe = useStripeHook()
  const elements = useElements()
  const { handleSubmit } = useForm<CreateBookingButtonStudentProps>({
    resolver: zodResolver(CreateBookingButtonStudentSchema),
    defaultValues: {
      room: '1+1',
    },
  })
  const { toast } = useToast()
  const router = useRouter()
  const onBookRoom = handleSubmit(async (values) => {
    try {
      if (!stripe || !elements) {
        return null
      }

      setLoading(true)

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/dashboard',
        },
        redirect: 'if_required',
      })

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
        })
      }

      if (paymentIntent?.status === 'succeeded') {
        if (!room) {
          const booking = await onCreateBooking(id, studentId, values.room)
          if (booking) {
            const transaction = await onCreateTransaction(
              studentId,
              id,
              paymentIntent.amount.toString(),
              'BOOKING'
            )
            if (transaction) {
              toast({
                title: 'Success',
                description: booking.message,
              })
            }
          }
        }
        if (room && roomId) {
          const rented = await onRoomRented(roomId, studentId)
          if (rented) {
            const transaction = await onCreateTransaction(
              studentId,
              id,
              paymentIntent.amount.toString(),
              'RENTED'
            )

            if (transaction) {
              toast({
                title: 'Success',
                description: rented.message,
              })
            }
          }
        }
      }

      setLoading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return { loading, onBookRoom }
}

export const useStripeCustomer = (amount: number, stripeId: string) => {
  const [stripeSecret, setStripeSecret] = useState<string>('')
  const [loadForm, setLoadForm] = useState<boolean>(false)
  const onGetCustomerIntent = async (amount: number) => {
    try {
      setLoadForm(true)
      const intent = await onCreateCustomerPaymentIntentSecret(amount, stripeId)
      if (intent) {
        setLoadForm(false)
        setStripeSecret(intent.secret!)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onGetCustomerIntent(amount)
  }, [])

  return { stripeSecret, loadForm }
}
