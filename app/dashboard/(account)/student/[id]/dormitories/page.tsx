import { onGetAllDorms } from '@/actions/dorms'
import { DormCard } from '@/components/dormitories/listing-card/dormlisting'
import { CardDescription } from '@/components/ui/card'
import React from 'react'

const StudentDormitoriesPage = async ({
  params,
}: {
  params: { id: string }
}) => {
  const dorms = await onGetAllDorms(params.id)

  return (
    <div className="flex flex-col flex-1 h-0 overflow-auto no-scroll-window mb-5 gap-10">
      <div className="flex flex-col gap-5">
        {dorms && dorms.length ? (
          dorms.map((dorm) => (
            <DormCard
              userId={params.id}
              id={dorm.id}
              description={dorm.language[0].description}
              key={dorm.id}
              thumbnail={dorm.featuredImage}
              title={dorm.language[0].name}
            />
          ))
        ) : (
          <CardDescription>There is no dorms yet</CardDescription>
        )}
      </div>
    </div>
  )
}

export default StudentDormitoriesPage
