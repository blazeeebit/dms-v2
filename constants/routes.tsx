import {
  ChevronRightSquare,
  User,
  GanttChartSquare,
  Building,
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
  page: string
  path: string
  icon: JSX.Element
  type?: 'OWNER' | 'STUDENT'
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

export const ACCOUNT_PATHS: AccountPagesMenuProps[] = [
  { page: 'overview', path: '/overview', icon: <GanttChartSquare /> },
  { page: 'profile', path: '/profile', icon: <User /> },
  { page: 'more', path: '/more', icon: <ChevronRightSquare /> },
  { page: 'dorms', path: '/dorms', icon: <Building />, type: 'OWNER' },
]

export const ADMIN_ACCOUNT_PATHS: AccountPagesMenuProps[] = [
  {
    page: 'overview',
    path: '/overview',
    icon: <User />,
  },
]
