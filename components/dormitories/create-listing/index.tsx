import { SideDrawer } from '@/components/sheet'
import { UISkeletons } from '@/components/skeletons'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

const ListingForm = dynamic(
  () =>
    import('@/components/dormitories/listing-form').then(
      (components) => components.ListingForm
    ),
  {
    loading: () => <UISkeletons skeleton="form" />,
    ssr: true,
  }
)

type CreateListingProps = {
  id: string
  services:
    | {
        id: string
        name: string
        icon: string
      }[]
    | undefined
}

export const CreateListing = ({ id, services }: CreateListingProps) => {
  return (
    <SideDrawer
      title="Create a listing"
      description="Create new AI powered listings!"
      trigger={
        <Card className="p-4">
          <Plus />
        </Card>
      }
    >
      <ListingForm services={services} id={id} />
    </SideDrawer>
  )
}
