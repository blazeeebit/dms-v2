import { onGetDormProfile } from '@/actions/dorms'
import { EditContent } from '@/components/edit-content'
import { EditCreateGallery } from '@/components/edit-content/gallery'
import { PaymentPlansSection } from '@/components/payments'
import { ReservationButton } from '@/components/payments/reservation'
import { ServiceChip } from '@/components/services/service-chip'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const EditDormitory = async ({
  params,
}: {
  params: { dormid: string; id: string }
}) => {
  const dormProfile = await onGetDormProfile(params.dormid, params.id)

  if (!dormProfile) redirect('/dashboard')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-16 lg:gap-y-0">
      <div className="col-span-1 relative">
        <Card className="rounded-2xl sticky top-10">
          <CardContent className="py-5 flex flex-col gap-5">
            <div className="w-full aspect-square relative rounded-xl overflow-hidden">
              <Image src={dormProfile.featuredImage!} alt="featured" fill />
            </div>
            <EditCreateGallery
              id={params.dormid}
              gallery={dormProfile.gallery!}
            />
            <div className="flex flex-col gap-3 mt-5">
              <Label>Services</Label>
              <div className="flex flex-wrap gap-3 ">
                {dormProfile.service.map((service) => (
                  <ServiceChip
                    key={service.id}
                    name={service.name}
                    icon={service.icon}
                  />
                ))}
              </div>
            </div>
            <ReservationButton
              id={params.dormid}
              bookings={dormProfile.bookingPlan[0]}
            />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex">
        <div className="flex-1 h-0">
          <div className="flex flex-col">
            <EditContent
              id={params.dormid}
              name="name"
              title={dormProfile.language[0].name}
            >
              <CardTitle className="text-6xl font-bold">
                {dormProfile.language[0].name}
              </CardTitle>
            </EditContent>
            <EditContent
              id={params.dormid}
              name="description"
              description={dormProfile.language[0].description}
            >
              <CardDescription className="text-lg leading-none">
                {dormProfile.language[0].description}
              </CardDescription>
            </EditContent>
            <PaymentPlansSection
              id={params.dormid}
              rooms={dormProfile.rooms!}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDormitory
