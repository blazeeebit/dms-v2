import { MEDIA_URLS } from '@/constants/routes'
import Image from 'next/image'

export const EmuDmsLogo = () => {
  return (
    <div className="flex mb-10 gap-x-5 items-center">
      <Image src={MEDIA_URLS.BRAND_LOGO} alt="LOGO" width={40} height={40} />
      <div className="flex-col flex">
        <p className="text-sm leading-none">Dorm Management</p>
        <p className="leading-none">System</p>
      </div>
    </div>
  )
}
