import { onGetUserInfo } from '@/actions/auth'
import {
  onCheckIfBooked,
  onCheckIfStudentRented,
  onGetDormProfile,
  onGetDormReviewForUser,
  onGetTotalRating,
} from '@/actions/dorms'
import { UserDormGallery } from '@/components/dormitories/gallery'
import { PaymentPlansSection } from '@/components/payments'
import { MakeBookingButton } from '@/components/payments/make-booking-button'
import { RatingSystem } from '@/components/rating'

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

const DormPage = async ({
  params,
}: {
  params: { id: string; userid: string }
}) => {
  const dorm = await onGetDormProfile(params.id, params.userid)
  const user = await onGetUserInfo(params.userid)
  const bookings = await onCheckIfBooked(params.userid, params.id)
  const rented = await onCheckIfStudentRented(params.userid, params.id)
  const userReview = await onGetDormReviewForUser(params.id, params.userid)
  const rating = await onGetTotalRating(params.id)

  if (!dorm) redirect('/dashboard')

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 xl:gap-y-0 xl:gap-16">
      <div className="col-span-1 relative">
        <Card className="rounded-2xl sticky top-5">
          <CardContent className="py-5 flex flex-col gap-5">
            <div className="w-full aspect-square relative rounded-xl overflow-hidden">
              <Image src={dorm.featuredImage!} alt="thumbnail" fill />
            </div>
            <UserDormGallery gallery={dorm.gallery} />
            <div className="flex flex-col gap-3 mt-5">
              <Label>Services</Label>
              <div className="flex flex-wrap gap-3">
                {dorm.service.map((service) => (
                  <ServiceChip
                    key={service.id}
                    name={service.name}
                    icon={service.icon}
                  />
                ))}
              </div>
            </div>
            {dorm.bookingPlan.length > 0 &&
              user?.role === 'STUDENT' &&
              !rented &&
              (bookings ? (
                <Card className="w-full py-3 flex justify-center bg-muted mt-5">
                  <CardDescription>Room already booked</CardDescription>
                </Card>
              ) : (
                <MakeBookingButton
                  studentId={params.userid}
                  id={dorm.id}
                  stripeId={dorm.Owner?.stripeId!}
                  bookingPrice={dorm.bookingPlan[0].price}
                  language={user.language}
                  promo={dorm.promo[0]}
                />
              ))}
            {rating ? (
              <Label className="flex flex-col gap-2">
                Rating
                <div className="flex gap-2">
                  <CardDescription>{rating.toFixed(1)}</CardDescription>
                  <Star fill="#f2c246" className="text-[#f2c246]" />
                </div>
              </Label>
            ) : (
              ''
            )}
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col gap-10 pl-5">
        <CardTitle className="text-6xl font-bold">
          {dorm.language[0].name}
        </CardTitle>
        <CardDescription className="text-lg leading-none">
          {dorm.language[0].description}
        </CardDescription>
        {user?.role === 'STUDENT' &&
          (rented ? (
            <div className="flex flex-col gap-10">
              <Card className="flex justify-center py-5 bg-muted">
                <CardDescription>
                  You have already paid for a room
                </CardDescription>
              </Card>
              <RatingSystem
                review={userReview?.[0]?.review}
                studentId={params.userid}
                dormId={params.id}
                language={user.language}
                service={dorm.service}
              />
            </div>
          ) : (
            <PaymentPlansSection
              booked={bookings}
              booking={dorm.bookingPlan[0]?.price}
              stripeId={dorm.Owner?.stripeId!}
              studentId={params.userid}
              payment
              id={params.id}
              promo={dorm.promo[0]}
              rooms={dorm.rooms!}
            />
          ))}
      </div>
    </div>
  )
}

export default DormPage
