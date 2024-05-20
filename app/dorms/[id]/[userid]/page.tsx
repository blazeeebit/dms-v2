import { onGetDormProfile } from '@/actions/dorms'
import { UserDormGallery } from '@/components/dormitories/gallery'

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
  if (!dorm) redirect('/dashboard')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="col-span-1 relative">
        <Card className="rounded-2xl sticky top-5">
          <CardContent className="py-5 flex flex-col gap-5">
            <div className="w-full aspect-square relative rounded-xl overflow-hidden">
              <Image src={dorm?.dorms[0].featuredImage!} alt="thumbnail" fill />
            </div>
            <UserDormGallery gallery={dorm.dorms[0].gallery} />
            <div className="flex flex-col gap-3 mt-5">
              <Label>Services</Label>
              <div className="flex flex-wrap gap-3">
                {dorm?.dorms[0].service.map((service) => (
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
      </div>
      <div className="col-span-2 flex">
        <div className="flex-1 bg-red-100 h-0">
          <div className="flex flex-col">
            <div className="flex flex-col gap-10">
              <CardTitle className="text-6xl font-bold">
                {dorm?.dorms[0].language[0].name}
              </CardTitle>
              <CardDescription className="text-lg leading-none">
                {dorm?.dorms[0].language[0].description}
              </CardDescription>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DormPage
