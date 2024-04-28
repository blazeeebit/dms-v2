import { onGetAllServices, onGetDormListings } from '@/actions/dorms'
import { CreateListing } from '@/components/dormitories/create-listing'
import { ListingCard } from '@/components/dormitories/listing-card'
import { CardDescription } from '@/components/ui/card'
import React from 'react'

const OwnerDormitoriesPage = async ({ params }: { params: { id: string } }) => {
  const ownerDorms = await onGetDormListings(params.id)
  const activeServices = await onGetAllServices()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {ownerDorms?.preference == 'ENGLISH'
            ? 'Create a listing'
            : 'İlan Oluştur'}
        </h2>
        <CreateListing services={activeServices} id={params.id} />
      </div>
      <div className="flex flex-col gap-5">
        {ownerDorms?.dorms.length ? (
          ownerDorms.dorms.map((dorm) => (
            <ListingCard
              userId={params.id}
              payments={ownerDorms.payments}
              id={dorm.id}
              description={dorm.language[0].description}
              key={dorm.id}
              thumbnail={dorm.featuredImage}
              active={dorm.active}
              title={dorm.language[0].name}
            />
          ))
        ) : (
          <CardDescription>You havent posted any dorms yet</CardDescription>
        )}
      </div>
    </div>
  )
}

export default OwnerDormitoriesPage
