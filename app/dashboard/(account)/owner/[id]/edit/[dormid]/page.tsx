import {
  onGetAllPromos,
  onGetDormProfile,
  onGetRentedStudents,
  onGetReviewCount,
  onGetTotalRating,
} from '@/actions/dorms'
import { EditContent } from '@/components/edit-content'
import { EditCreateGallery } from '@/components/edit-content/gallery'
import { PaymentPlansSection } from '@/components/payments'
import { ReservationButton } from '@/components/payments/reservation'
import { CreatePromos } from '@/components/promos/create-promo'
import { PromoSlider } from '@/components/promos/promos-slider'
import { RentedStudentsCard } from '@/components/rentedStudents/rended-students-card'
import { ServiceChip } from '@/components/services/service-chip'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const EditDormitory = async ({
  params,
}: {
  params: { dormid: string; id: string }
}) => {
  const dormProfile = await onGetDormProfile(params.dormid, params.id)
  const promos = await onGetAllPromos(params.dormid)
  const rating = await onGetTotalRating(params.dormid)
  const reviewCount = await onGetReviewCount(params.dormid)
  const rentedStudents = await onGetRentedStudents(params.dormid)

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
            {rating ? (
              <Label className="flex flex-col gap-2">
                Rating
                <div className="flex gap-2">
                  <CardDescription>{rating.toFixed(1)}</CardDescription>
                  <Star fill="#f2c246" className="text-[#f2c246]" />
                  {reviewCount && (
                    <CardDescription className="text-[#f2c246]">
                      {reviewCount} Reviews
                    </CardDescription>
                  )}
                </div>
              </Label>
            ) : (
              ''
            )}
            <ReservationButton
              id={params.dormid}
              bookings={dormProfile.bookingPlan[0]}
            />
            <CreatePromos id={params.dormid} />
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
              promo={dormProfile.promo[0]}
              rooms={dormProfile.rooms!}
            />
            {promos && promos.length ? (
              <PromoSlider promos={promos} dormId={params.dormid} />
            ) : (
              <CardDescription>This dorm has no promos</CardDescription>
            )}
          </div>
          <div className="w-full mt-5">
            {rentedStudents && rentedStudents.length ? (
              <div className="flex flex-col gap-5">
                <Label>Rented Students</Label>
                {rentedStudents.map((student) => (
                  <RentedStudentsCard key={student.id} {...student} />
                ))}
              </div>
            ) : (
              <CardDescription>No Students Renting</CardDescription>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDormitory
