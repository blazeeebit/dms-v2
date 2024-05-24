import { onGetCalenders } from '@/actions/scrapper'
import { Card, CardDescription } from '@/components/ui/card'
import { PATH_URLS } from '@/constants/routes'
import Link from 'next/link'
import React from 'react'

const StudentCalender = async ({ params }: { params: { id: string } }) => {
  const calenders = await onGetCalenders()
  return (
    <div className="flex-1 flex gap-5 h-0 mb-10 overflow-auto">
      <div className="flex flex-col gap-2">
        {calenders ? (
          calenders?.map((calendar) => (
            <Link
              href={`${PATH_URLS.DASHBOARD_STUDENT}/${params.id}/calender/${calendar.id}`}
              key={calendar.id}
            >
              <Card className="p-5 hover:bg-muted">
                <CardDescription>{calendar.year}</CardDescription>
              </Card>
            </Link>
          ))
        ) : (
          <CardDescription>No calenders have been integrated</CardDescription>
        )}
      </div>
      <div className="flex-1 h-full flex justify-center items-center">
        <CardDescription>You need to pick a calender</CardDescription>
      </div>
    </div>
  )
}

export default StudentCalender
