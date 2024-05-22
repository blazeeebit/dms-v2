import { onGetUserInfo } from '@/actions/auth'
import { onGetStudentDetails } from '@/actions/realtime'
import { StudentChatList } from '@/components/chat'
import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import { SideBar } from '@/components/sidebar'
import {
  ACCOUNT_PAGES_MENU_OWNER,
  ACCOUNT_PAGES_MENU_STUDENT,
} from '@/constants/routes'
import React from 'react'

const DormPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userid: string }
}) => {
  const loggedInUser = await onGetUserInfo(params.userid)
  const student = await onGetStudentDetails(params.userid)
  return (
    <div className="container">
      <SideBar
        language={loggedInUser?.language!}
        menu={
          loggedInUser?.role === 'STUDENT'
            ? ACCOUNT_PAGES_MENU_STUDENT
            : ACCOUNT_PAGES_MENU_OWNER
        }
        id={params.userid}
      />
      <DashboardNavBar
        id={params.userid}
        user={{
          username: loggedInUser?.username!,
          language: loggedInUser?.language!,
          role: loggedInUser?.role!,
        }}
      />
      {children}
      {loggedInUser?.role === 'STUDENT' && (
        <StudentChatList student={student!} />
      )}
    </div>
  )
}

export default DormPageLayout
