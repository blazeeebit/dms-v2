import { onGetAllDorms } from '@/actions/dorms'
import { onGetUserLanguagePreference } from '@/actions/profile'
import { DormCard } from '@/components/dormitories/listing-card/dormlisting'
import { CardDescription } from '@/components/ui/card'
import React from 'react'

const DormsAdmin = async ({ params }: { params: { id: string } }) => {
  const languagePreference = await onGetUserLanguagePreference(params.id)
  const dorms = await onGetAllDorms(params.id)
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {languagePreference == 'ENGLISH' ? 'All Dorms' : 'Tüm yurtlar'}
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        {dorms && dorms.length ? (
          dorms.map((dorm) => (
            <DormCard
              admin
              userId={params.id}
              id={dorm.id}
              description={dorm.language[0].description}
              key={dorm.id}
              thumbnail={dorm.featuredImage}
              title={dorm.language[0].name}
            />
          ))
        ) : (
          <CardDescription>There are no dorms on the system</CardDescription>
        )}
      </div>
    </div>
  )
}

export default DormsAdmin
