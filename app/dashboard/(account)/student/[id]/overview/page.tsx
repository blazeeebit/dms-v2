import { onStudentOnline } from '@/actions/realtime'
import React from 'react'

const StudentDashboardPage = async ({ params }: { params: { id: string } }) => {
  await onStudentOnline(params.id)

  return <div>StudentDashboardPage</div>
}

export default StudentDashboardPage
