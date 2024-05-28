import { onGetUserInfo } from '@/actions/auth'
import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import { SideBar } from '@/components/sidebar'
import { ACCOUNT_PAGES_MENU_OWNER } from '@/constants/routes'
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

  if (loggedInUser?.role !== 'OWNER') redirect('/dashboard')

  if (loggedInUser.banned) redirect('/banned')

  return (
    <div className="container h-screen 2xl:p-0 lg:pl-28 flex flex-col">
      <SideBar
        language={loggedInUser?.language!}
        menu={ACCOUNT_PAGES_MENU_OWNER}
        id={params.id}
      />
      <DashboardNavBar
        id={params.id}
        user={{
          username: loggedInUser?.username!,
          language: loggedInUser?.language!,
          role: loggedInUser?.role!,
          image: loggedInUser?.image!,
        }}
      />
      {children}
    </div>
  )
}

export default DashboardLayout
