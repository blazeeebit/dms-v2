import { onGetDProfile } from '@/actions/dorms'

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

const DormPage = async ({ params }: { params: { id: string } }) => {
  const dorm = await onGetDProfile(params.id)
  if (!dorm) redirect('/dashboard')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 container">
      <Card className="col-span-1 rounded-2xl h-screen">
        <CardContent className="py-5 items-center justify-center">
          <div className="w-full aspect-square relative rounded-xl shadow-md overflow-hidden">
            <Image src={dorm.featuredImage} alt="thumbnail" fill />
          </div>
          <CardTitle className="text-3xl m-3">${dorm?.price}</CardTitle>
          <div className="flex flex-col gap-3 mt-6">
            <div className="font-semibold">Services</div>
            <div className="flex flex-wrap gap-3 ">
              {dorm?.service.map((service) => (
                <ServiceChip
                  key={service.id}
                  name={service.name}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="col-span-2 flex overflow-auto no-scroll-window">
        <div className="flex-1 bg-red-100 h-0">
          <div className="flex flex-col">
            <div className="flex flex-col gap-10">
              <CardTitle className="text-6xl font-bold p-2">
                {dorm.language[0].name}
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed w-3/4">
                {dorm.language[0].description}
              </CardDescription>

              <Label className="text-2xl font-bold">Reviews</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DormPage
