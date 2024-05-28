'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Modal } from '../modal'
import { usePaymentPlan } from '@/hooks/use-payment-hooks'
import { DMS_CONTENT } from '@/constants/language'
import { CircleDollarSign, Plus } from 'lucide-react'
import { Tooltip } from '../tooltip'
import { CREATE_DORM_ROOM_PAYMENT_PLAN } from '@/constants/form'
import { FormGenerator } from '../forms/generator'
import { Button } from '../ui/button'
import { Loader } from '../loader'
import { Slider } from '../slider'
import { SwiperSlide } from 'swiper/react'
import { StripeElements } from '../stripe/stripe-elements'

type PaymentPlansSectionProps = {
  id: string
  rooms: {
    id: string
    price: string
    type: string
  }[]
  payment?: boolean
  booking?: string
  booked?: boolean
  stripeId?: string
  studentId?: string
  promo?: {
    discount: number
  }
}

export const PaymentPlansSection = ({
  id,
  rooms,
  payment,
  stripeId,
  studentId,
  booking,
  booked,
  promo,
}: PaymentPlansSectionProps) => {
  const { language, register, errors, onCreateARoom, loading } =
    usePaymentPlan(id)

  let discount: number = 0

  if (promo) {
    discount = parseFloat((1 - promo.discount / 100).toFixed(1))
  }

  return (
    <div className="flex gap-5 my-5">
      {!payment && (
        <div>
          <Modal
            className="max-w-xl"
            title={DMS_CONTENT.PAYMENT_PLANS[language].content.modal.title}
            description={
              DMS_CONTENT.PAYMENT_PLANS[language].content.modal.description
            }
            trigger={
              <div>
                <Tooltip
                  trigger={
                    <Card className="bg-muted cursor-pointer">
                      <CardContent className="p-12">
                        <Plus />
                      </CardContent>
                    </Card>
                  }
                >
                  {DMS_CONTENT.PAYMENT_PLANS[language].content.modal.title}
                </Tooltip>
              </div>
            }
          >
            <form onSubmit={onCreateARoom} className="flex flex-col gap-3">
              {CREATE_DORM_ROOM_PAYMENT_PLAN.map((form) => (
                <FormGenerator
                  key={form.id}
                  {...form}
                  register={register}
                  errors={errors}
                />
              ))}
              <Button>
                <Loader loading={loading}>Create a room</Loader>
              </Button>
            </form>
          </Modal>
        </div>
      )}
      {rooms && (
        <div className="flex-1 w-0">
          <Slider
            offset={0}
            breakpoints={{
              300: {
                slidesPerView: 2.2,
              },
              1200: {
                slidesPerView: payment ? 2.6 : 3.3,
              },
            }}
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id}>
                <Card className="flex items-center p-5 cursor-pointer">
                  <CardContent className="p-0 flex w-full">
                    <div>
                      <CircleDollarSign />
                      <div className="mt-3">
                        <CardDescription>{room.type} Room</CardDescription>
                        <CardTitle>
                          $
                          {promo?.discount
                            ? booked
                              ? (parseInt(room.price) - parseInt(booking!)) *
                                discount
                              : parseInt(room.price) * discount
                            : booked
                            ? parseInt(room.price) - parseInt(booking!)
                            : room.price}
                        </CardTitle>
                      </div>
                    </div>
                    {payment && (
                      <div className="flex items-end justify-end flex-1">
                        <Modal
                          className="max-w-xl"
                          trigger={
                            <Card className="cursor-pointer hover:bg-muted py-2 px-5">
                              <CardDescription>Pay now</CardDescription>
                            </Card>
                          }
                          title={
                            DMS_CONTENT.PAYMENT_PLANS[language].content.modal
                              .title
                          }
                          description={
                            DMS_CONTENT.PAYMENT_PLANS[language].content.modal
                              .description
                          }
                        >
                          <StripeElements
                            price={room.price}
                            id={id}
                            roomId={room.id}
                            room={payment}
                            booked={booked}
                            booking={booking}
                            stripeId={stripeId!}
                            studentId={studentId!}
                            promo={promo}
                          />
                        </Modal>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}
