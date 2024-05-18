import { PATH_URLS } from '@/constants/routes'
import { redirect } from 'next/navigation'

const StripeIntegratedPage = ({ params }: { params: { id: string } }) => {
  redirect(`${PATH_URLS.DASHBOARD_OWNER}/${params.id}/integrations`)
}

export default StripeIntegratedPage
