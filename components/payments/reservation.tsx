'use client'
import React from 'react'
import { Modal } from '../modal'
import { Card } from '../ui/card'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useReservations } from '@/hooks/use-payment-hooks'
import { FormGenerator } from '../forms/generator'
import { Loader } from '../loader'
import { CalendarPicker } from '../calendar'

type ReservationButtonProps = {
  id: string
  bookings:
    | {
        id: string
        price: string
        period: Date
      }
    | undefined
}

export const ReservationButton = ({ bookings, id }: ReservationButtonProps) => {
  const { loading, onCreateBookingButton, register, errors, date, setDate } =
    useReservations(id)
  return (
    <div className="mt-5">
      {bookings ? (
        <Card className="w-full py-3 flex justify-center bg-muted">
          Reservation Button Added
        </Card>
      ) : (
        <Modal
          className="max-w-xl"
          title="Booking"
          description="booking"
          trigger={
            <Card className="w-full py-3 flex gap-3 justify-center hover:bg-muted cursor-pointer">
              <Plus />
              Add a booking button
            </Card>
          }
        >
          <form
            onSubmit={onCreateBookingButton}
            className="flex flex-col gap-5"
          >
            <CalendarPicker label="Last Date" date={date} setDate={setDate} />
            <FormGenerator
              inputType="input"
              type="text"
              label="Price"
              name="price"
              register={register}
              errors={errors}
              placeholder="Add a booking price"
            />
            <Button>
              <Loader loading={loading}>Add Button</Loader>
            </Button>
          </form>
        </Modal>
      )}
    </div>
  )
}
