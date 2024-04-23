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
}

export const CreateListing = ({ id }: CreateListingProps) => {
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
      <ListingForm id={id} />
    </SideDrawer>
  )
}
