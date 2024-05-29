import { Card } from '@/components/ui/card'
import React from 'react'

const StudentDashboardPage = async () => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card className="rounded-2xl overflow-hidden no-scroll-window">
        <iframe
          src="https://www.emu.edu.tr/en/prospective-students/online-application-registration/752"
          className="w-full h-[500px]"
        />
      </Card>
      <Card className="rounded-2xl overflow-hidden no-scroll-window">
        <iframe
          src="https://www.emu.edu.tr/announcements"
          className="w-full h-[500px]"
        />
      </Card>
    </div>
  )
}

export default StudentDashboardPage
