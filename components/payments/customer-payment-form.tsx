'use client'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'
import { FormGenerator } from '../forms/generator'
import { useStudentBooking } from '@/hooks/use-payment-hooks'
import { CREATE_DORM_ROOM_PAYMENT_PLAN } from '@/constants/form'
import { Label } from '../ui/label'
import { CardTitle } from '../ui/card'

type CustomerPaymentFormProps = {
  id: string
  price: string
  studentId: string
  room?: boolean
  roomId?: string
}

export const CustomerPaymentForm = ({
  id,
  price,
  studentId,
  room,
  roomId,
}: CustomerPaymentFormProps) => {
  const { register, errors, loading, onBookRoom } = useStudentBooking(
    id,
    studentId,
    room,
    roomId
  )
  return (
    <form className="flex flex-col gap-5 mt-5" onSubmit={onBookRoom}>
      <Label>
        Fee
        <CardTitle className="mt-2">${price}</CardTitle>
      </Label>
      <PaymentElement />
      <Button type="submit" className="w-full mt-5">
        <Loader loading={loading}>Pay</Loader>
      </Button>
    </form>
  )
}
