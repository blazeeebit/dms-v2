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
  promo?: {
    discount: number
  }
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
  promo,
}: StripeElementsProps) => {
  const StripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!,
    {
      stripeAccount: stripeId!,
    }
  )

  let discount = 0

  if (promo) {
    discount = parseFloat((1 - promo.discount / 100).toFixed(1))
  }

  const { stripeSecret, loadForm } = useStripeCustomer(
    promo
      ? booked
        ? (parseInt(price) - parseInt(booking!)) * discount
        : parseInt(price) * discount
      : booked
      ? parseInt(price) - parseInt(booking!)
      : parseInt(price),
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
            price={
              promo
                ? booked
                  ? `${parseInt(price) - parseInt(booking!) * discount}`
                  : `${parseInt(price) * discount}`
                : booked
                ? `${parseInt(price) - parseInt(booking!)}`
                : price
            }
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
