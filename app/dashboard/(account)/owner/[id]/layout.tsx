import { onGetUserInfo } from '@/actions/auth'
import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import { SideBar } from '@/components/sidebar'
import { ACCOUNT_PAGES_MENU_OWNER } from '@/constants/routes'
import React from 'react'

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) => {
  const loggedInUser = await onGetUserInfo(params.id)

  return (
    <div className="container h-screen 2xl:p-0 lg:pl-28">
      <SideBar menu={ACCOUNT_PAGES_MENU_OWNER} id={params.id} />
      <DashboardNavBar user={loggedInUser!} />
      {children}
    </div>
  )
}

export default DashboardLayout
