import React from 'react'
import { Modal } from '../modal'
import { DMS_CONTENT } from '@/constants/language'
import { Card } from '../ui/card'
import { Plus } from 'lucide-react'
import { StripeElements } from '../stripe/stripe-elements'

type MakeBookingButtonProps = {
  language: 'ENGLISH' | 'TURKISH'
  bookingPrice: string
  id: string
  stripeId: string
  studentId: string
  promo?: {
    discount: number
  }
}

export const MakeBookingButton = ({
  language,
  bookingPrice,
  id,
  stripeId,
  studentId,
  promo,
}: MakeBookingButtonProps) => {
  return (
    <div className="mt-5">
      <Modal
        className="max-w-xl"
        trigger={
          <Card className="w-full py-3 flex gap-3 justify-center hover:bg-muted cursor-pointer">
            <Plus />
            Book a room
          </Card>
        }
        description={
          DMS_CONTENT.MAKE_BOOKING[language].content.modal.description
        }
        title={DMS_CONTENT.MAKE_BOOKING[language].content.modal.title}
      >
        <StripeElements
          studentId={studentId}
          stripeId={stripeId}
          price={bookingPrice}
          id={id}
          promo={promo}
        />
      </Modal>
    </div>
  )
}
