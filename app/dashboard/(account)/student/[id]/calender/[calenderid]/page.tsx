import { onGetCalender, onGetCalenders } from '@/actions/scrapper'
import { EmuCalenderForm } from '@/components/calendar/emu-calender'
import { Modal } from '@/components/modal'
import { Tooltip } from '@/components/tooltip'
import { Card, CardDescription } from '@/components/ui/card'
import { PATH_URLS } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CalenderPage = async ({
  params,
}: {
  params: { calenderid: string; id: string }
}) => {
  const calenders = await onGetCalenders()
  const calender = await onGetCalender(params.calenderid)

  return (
    <div className="flex-1 flex gap-5 h-0 mb-10">
      <div className="flex flex-col gap-2">
        {calenders ? (
          calenders?.map((calendar) => (
            <Link
              href={`${PATH_URLS.DASHBOARD_STUDENT}/${params.id}/calender/${calendar.id}`}
              key={calendar.id}
            >
              <Card
                className={cn(
                  'p-5 hover:bg-muted',
                  calendar.id === params.calenderid && 'bg-muted'
                )}
              >
                <CardDescription>{calendar.year}</CardDescription>
              </Card>
            </Link>
          ))
        ) : (
          <CardDescription>No calenders have been integrated</CardDescription>
        )}
      </div>

      <Card className="flex-1 h-full flex flex-col overflow-auto no-scroll-window p-5">
        {calender &&
          calender.calender.map(
            (cal, key) =>
              key > 0 && (
                <div key={key} className="border-t-2 px-3 py-5">
                  <CardDescription className="text-lg font-medium">
                    {cal}
                  </CardDescription>
                </div>
              )
          )}
      </Card>
    </div>
  )
}

export default CalenderPage
