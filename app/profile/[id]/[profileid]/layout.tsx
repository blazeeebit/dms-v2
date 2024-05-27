import { onGetUserInfo } from '@/actions/auth'
import { onGetStudentDetails } from '@/actions/realtime'
import { StudentChatList } from '@/components/chat'
import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import { SideBar } from '@/components/sidebar'
import {
  ACCOUNT_PAGES_MENU_ADMIN,
  ACCOUNT_PAGES_MENU_OWNER,
  ACCOUNT_PAGES_MENU_STUDENT,
} from '@/constants/routes'
import React from 'react'

const ProfilePageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) => {
  const loggedInUser = await onGetUserInfo(params.id)

  let student

  if (loggedInUser?.role === 'STUDENT') {
    student = await onGetStudentDetails(params.id)
  }

  return (
    <div className="container">
      <SideBar
        language={loggedInUser?.language!}
        menu={
          loggedInUser?.role === 'STUDENT'
            ? ACCOUNT_PAGES_MENU_STUDENT
            : loggedInUser?.role === 'OWNER'
            ? ACCOUNT_PAGES_MENU_OWNER
            : ACCOUNT_PAGES_MENU_ADMIN
        }
        id={params.id}
      />
      <DashboardNavBar
        id={params.id}
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

export default ProfilePageLayout
