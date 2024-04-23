import { v4 as uuidv4 } from 'uuid'

import {
  Building,
  LayoutDashboard,
  CreditCard,
  Settings,
  Users,
} from 'lucide-react'

type MediaUrlProps = {
  BRAND_LOGO: string
}

export type PathUrlProps = {
  DASHBOARD_OWNER: string
  DASHBOARD_STUDENT: string
  DASHBOARD_ADMIN: string
}

export type AccountPagesMenuProps = {
  id: string
  page: string
  path: string
  icon: JSX.Element
}

export type UserCommandsProps = {
  command: string
}

export const MEDIA_URLS: MediaUrlProps = {
  BRAND_LOGO: '/assets/images/logo.png',
}

export const PATH_URLS: PathUrlProps = {
  DASHBOARD_OWNER: '/dashboard/owner',
  DASHBOARD_STUDENT: '/dashboard/student',
  DASHBOARD_ADMIN: '/dashboard/admin',
}

export const ACCOUNT_PAGES_MENU_OWNER: AccountPagesMenuProps[] = [
  {
    id: uuidv4(),
    page: 'overview',
    path: `${PATH_URLS.DASHBOARD_OWNER}/`,
    icon: <LayoutDashboard size={30} />,
  },
  {
    id: uuidv4(),
    page: 'dormitories',
    path: `${PATH_URLS.DASHBOARD_OWNER}/`,
    icon: <Building size={30} />,
  },
  {
    id: uuidv4(),
    page: 'billing',
    path: `${PATH_URLS.DASHBOARD_OWNER}/`,
    icon: <CreditCard size={30} />,
  },
  {
    id: uuidv4(),
    page: 'settings',
    path: `${PATH_URLS.DASHBOARD_OWNER}/`,
    icon: <Settings size={30} />,
  },
  {
    id: uuidv4(),
    page: 'community',
    path: `${PATH_URLS.DASHBOARD_OWNER}/`,
    icon: <Users size={30} />,
  },
]
