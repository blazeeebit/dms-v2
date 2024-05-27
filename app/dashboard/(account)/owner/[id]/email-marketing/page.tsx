import { onGetUserLanguagePreference } from '@/actions/profile'
import { CreateTemplate } from '@/components/email-marketing/create-template'
import { CardTitle } from '@/components/ui/card'
import { DMS_CONTENT } from '@/constants/language'
import React from 'react'

const EmailMarketingPage = async ({ params }: { params: { id: string } }) => {
  const language = await onGetUserLanguagePreference(params.id)
  return (
    <div className="flex justify-between">
      <CardTitle>
        {DMS_CONTENT.EMAIL_TEMPLATE[language!].content.title}
      </CardTitle>
      <CreateTemplate />
    </div>
  )
}

export default EmailMarketingPage
