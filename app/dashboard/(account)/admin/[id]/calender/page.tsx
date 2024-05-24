import { onGetCalenders } from '@/actions/scrapper'
import { EmuCalenderForm } from '@/components/calendar/emu-calender'
import { Modal } from '@/components/modal'
import { Tooltip } from '@/components/tooltip'
import { Card, CardDescription } from '@/components/ui/card'
import { PATH_URLS } from '@/constants/routes'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AdminCalender = async ({ params }: { params: { id: string } }) => {
  const calenders = await onGetCalenders()
  return (
    <div className="flex-1 flex gap-5 h-0 mb-10 overflow-auto">
      <div className="flex flex-col items-start gap-3">
        <Modal
          className="max-w-xl"
          title="Integrate Calender"
          description="Add the academic calender url to integrate calender"
          trigger={
            <span>
              <Tooltip
                trigger={
                  <Card className="p-5 cursor-pointer">
                    <Plus />
                  </Card>
                }
              >
                Integrate calender
              </Tooltip>
            </span>
          }
        >
          <EmuCalenderForm />
        </Modal>
        <div className="flex flex-col gap-2">
          {calenders ? (
            calenders?.map((calendar) => (
              <Link
                href={`${PATH_URLS.DASHBOARD_ADMIN}/${params.id}/calender/${calendar.id}`}
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
      </div>
      <div className="flex-1 h-full flex justify-center items-center">
        <CardDescription>You need to pick a calender</CardDescription>
      </div>
    </div>
  )
}

export default AdminCalender
