import { onGetUserInfo } from '@/actions/auth'
import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import React from 'react'

const DormPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userid: string }
}) => {
  const loggedInUser = await onGetUserInfo(params.userid)
  return (
    <div className="container">
      <DashboardNavBar
        menu
        id={params.userid}
        user={{
          username: loggedInUser?.username!,
          language: loggedInUser?.language!,
          role: loggedInUser?.role!,
        }}
      />
      {children}
    </div>
  )
}

export default DormPageLayout
