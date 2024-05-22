'use client'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useStripeCustomer } from '@/hooks/use-payment-hooks'
import { Elements } from '@stripe/react-stripe-js'
import { CustomerPaymentForm } from '../payments/customer-payment-form'
import { Loader } from '../loader'

type StripeElementsProps = {
  stripeId: string
  price: string
  id: string
  studentId: string
  booked?: boolean
  booking?: string
  room?: boolean
  roomId?: string
}

export const StripeElements = ({
  stripeId,
  price,
  id,
  studentId,
  booked,
  room,
  booking,
  roomId,
}: StripeElementsProps) => {
  const StripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!,
    {
      stripeAccount: stripeId!,
    }
  )

  const { stripeSecret, loadForm } = useStripeCustomer(
    booked ? parseInt(price) - parseInt(booking!) : parseInt(price),
    stripeId
  )

  return (
    <Loader loading={loadForm}>
      {stripeSecret && StripePromise && (
        <Elements
          stripe={StripePromise}
          options={{
            clientSecret: stripeSecret,
          }}
        >
          <CustomerPaymentForm
            price={booked ? `${parseInt(price) - parseInt(booking!)}` : price}
            id={id}
            roomId={roomId}
            studentId={studentId}
            room={room}
          />
        </Elements>
      )}
    </Loader>
  )
}
