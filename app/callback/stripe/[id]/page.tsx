import { PATH_URLS } from '@/constants/routes'
import { redirect } from 'next/navigation'

const StripeCallBackPage = ({ params }: { params: { id: string } }) => {
  return redirect(`${PATH_URLS.DASHBOARD_OWNER}/${params.id}/integrations`)
}

export default StripeCallBackPage
