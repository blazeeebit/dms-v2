import { TabLink } from '@/components/settings/link'
import { PATH_URLS } from '@/constants/routes'
import { DollarSign, User } from 'lucide-react'
import React from 'react'

type SettingsLayoutProps = {
  children: React.ReactNode
  params: { id: string }
}

const SettingsLayout = ({ children, params }: SettingsLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:gap-10 pb-10">
      <div className="col-span-1 flex flex-col justify-start gap-3">
        <TabLink
          href={`${PATH_URLS.DASHBOARD_OWNER}/${params.id}/settings`}
          type="settings"
          icon={<User />}
        />
        <TabLink
          href={`${PATH_URLS.DASHBOARD_OWNER}/${params.id}/settings/subscription`}
          type="subscription"
          icon={<DollarSign />}
        />
      </div>
      <div className="col-span-3 border-2 rounded-xl">{children}</div>
    </div>
  )
}

export default SettingsLayout
