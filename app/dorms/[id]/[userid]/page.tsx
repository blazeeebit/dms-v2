import { onGetUserInfo } from '@/actions/auth'
import {
  onCheckIfBooked,
  onCheckIfStudentRented,
  onGetDormProfile,
} from '@/actions/dorms'
import { UserDormGallery } from '@/components/dormitories/gallery'
import { PaymentPlansSection } from '@/components/payments'
import { MakeBookingButton } from '@/components/payments/make-booking-button'

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

const DormPage = async ({
  params,
}: {
  params: { id: string; userid: string }
}) => {
  const dorm = await onGetDormProfile(params.id, params.userid)
  const user = await onGetUserInfo(params.userid)
  const bookings = await onCheckIfBooked(params.userid, params.id)
  const rented = await onCheckIfStudentRented(params.userid, params.id)

  if (!dorm) redirect('/dashboard')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
                />
              ))}
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col gap-10">
        <CardTitle className="text-6xl font-bold pl-5">
          {dorm.language[0].name}
        </CardTitle>
        <CardDescription className="text-lg leading-none pl-5">
          {dorm.language[0].description}
        </CardDescription>
        {rented ? (
          <Card className="lg:ml-5 flex justify-center py-5 bg-muted">
            <CardDescription>You have already paid for a room</CardDescription>
          </Card>
        ) : (
          <PaymentPlansSection
            booked={bookings}
            booking={dorm.bookingPlan[0]?.price}
            stripeId={dorm.Owner?.stripeId!}
            studentId={params.userid}
            payment
            id={params.id}
            rooms={dorm.rooms!}
          />
        )}
      </div>
    </div>
  )
}

export default DormPage
