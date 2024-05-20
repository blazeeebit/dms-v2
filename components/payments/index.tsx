'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Modal } from '../modal'
import { usePaymentPlan } from '@/hooks/use-payment-hooks'
import { DMS_CONTENT } from '@/constants/language'
import { CircleDollarSign, Plus } from 'lucide-react'
import { Tooltip } from '../tooltip'
import { EditContent } from '../edit-content'
import { CREATE_DORM_ROOM_PAYMENT_PLAN } from '@/constants/form'
import { FormGenerator } from '../forms/generator'
import { Button } from '../ui/button'
import { Loader } from '../loader'
import { Slider } from '../slider'
import { SwiperSlide } from 'swiper/react'

type PaymentPlansSectionProps = {
  id: string
  rooms: {
    id: string
    price: string
    type: string
  }[]
}

export const PaymentPlansSection = ({
  id,
  rooms,
}: PaymentPlansSectionProps) => {
  const { language, register, errors, onCreateARoom, loading } =
    usePaymentPlan(id)
  return (
    <div className="flex gap-5 my-5 pl-5">
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
      {rooms && (
        <div className="flex-1 w-0">
          <Slider
            offset={0}
            breakpoints={{
              300: {
                slidesPerView: 2.2,
              },
              1200: {
                slidesPerView: 3.3,
              },
            }}
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id}>
                <Card className="flex items-center pl-5 py-5 cursor-pointer">
                  <CardContent className="p-0">
                    <CircleDollarSign />
                    <div className="mt-3">
                      <CardDescription>{room.type} Room</CardDescription>
                      <CardTitle>${room.price}</CardTitle>
                    </div>
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
