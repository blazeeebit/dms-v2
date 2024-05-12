import { onGetUserInfo } from '@/actions/auth'
import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import { SideBar } from '@/components/sidebar'
import { ACCOUNT_PAGES_MENU_STUDENT } from '@/constants/routes'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) => {
  const loggedInUser = await onGetUserInfo(params.id)

  if (loggedInUser?.role !== 'STUDENT') redirect('/dashboard')

  return (
    <div className="container h-screen flex flex-col 2xl:p-0 lg:pl-28">
      <SideBar
        language={loggedInUser?.language!}
        menu={ACCOUNT_PAGES_MENU_STUDENT}
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
    </div>
  )
}

export default DashboardLayout
