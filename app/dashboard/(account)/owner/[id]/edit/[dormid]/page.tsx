import { onGetDormProfile } from '@/actions/dorms'
import { EditContent } from '@/components/edit-content'
import { EditCreateGallery } from '@/components/edit-content/gallery'
import { ServiceChip } from '@/components/services/service-chip'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'

const EditDormitory = async ({
  params,
}: {
  params: { dormid: string; id: string }
}) => {
  const dormProfile = await onGetDormProfile(params.dormid, params.id)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      <Card className="col-span-1 rounded-2xl">
        <CardContent className="py-5 ">
          <div className="w-full aspect-square relative rounded-xl shadow-md overflow-hidden">
            <Image
              src={dormProfile?.dorms[0].featuredImage!}
              alt="featured"
              fill
            />
          </div>
          <EditCreateGallery gallery={dormProfile?.dorms[0].gallery!} />
          <div className="flex flex-col gap-3 mt-5">
            <Label>Services</Label>
            <div className="flex flex-wrap gap-3 ">
              {dormProfile?.dorms[0].service.map((service) => (
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
            <EditContent id={params.dormid} name="name">
              <CardTitle className="text-6xl font-bold">
                {dormProfile?.dorms[0].language[0].name}
              </CardTitle>
            </EditContent>
            <EditContent id={params.dormid} name="description">
              <CardDescription className="text-lg leading-none">
                {dormProfile?.dorms[0].language[0].description}
              </CardDescription>
            </EditContent>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDormitory
