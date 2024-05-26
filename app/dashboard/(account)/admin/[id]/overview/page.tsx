import { onTotalUsers } from '@/actions/admin'
import { AnalyticCard } from '@/components/dashboard/analytics/card'
import { Building, User } from 'lucide-react'
import React from 'react'

const OverViewPageAdmin = async () => {
  const users = await onTotalUsers()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <AnalyticCard
        icon={<User />}
        value={users?.users || 0}
        label="Total Users"
      />
      <AnalyticCard
        icon={<User />}
        value={users?.student || 0}
        label="Total Students"
      />
      <AnalyticCard
        icon={<User />}
        value={users?.owners || 0}
        label="Total Owners"
      />
      <AnalyticCard
        icon={<Building />}
        value={users?.dorms || 0}
        label="Total Dorms"
      />
    </div>
  )
}

export default OverViewPageAdmin
