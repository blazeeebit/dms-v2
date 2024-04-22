import { DashboardNavBar } from '@/components/navbar/dashboard-navbar'
import { SideBar } from '@/components/sidebar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container h-screen 2xl:p-0 lg:pl-28">
      <SideBar />
      <DashboardNavBar />
      {children}
    </div>
  )
}

export default DashboardLayout
