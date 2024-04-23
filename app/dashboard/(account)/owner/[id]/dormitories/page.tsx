import { CreateListing } from '@/components/dormitories/create-listing'
import React from 'react'

const OwnerDormitoriesPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create A Listing</h2>
        <CreateListing id={params.id} />
      </div>
    </div>
  )
}

export default OwnerDormitoriesPage
