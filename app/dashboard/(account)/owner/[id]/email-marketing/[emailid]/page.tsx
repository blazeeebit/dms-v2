import { onGetDormsNameAndIds, onGetEmailTemplate } from '@/actions/mail'
import { onGetUserLanguagePreference } from '@/actions/profile'
import { CreateEmail } from '@/components/email-marketing/create-email'
import { EmailDorm } from '@/components/email-marketing/email-dorm'
import { EmailName } from '@/components/email-marketing/email-title'
import { redirect } from 'next/navigation'
import React from 'react'

const EmailTemplate = async ({
  params,
}: {
  params: { emailid: string; id: string }
}) => {
  const template = await onGetEmailTemplate(params.emailid)
  const language = await onGetUserLanguagePreference(params.id)
  const dorms = await onGetDormsNameAndIds(params.id, language!)

  if (!template) redirect('/dashboard')

  return (
    <div className="flex-1 flex h-0 pb-10 w-full">
      <div className="overflow-auto h-full flex flex-col no-scroll-window w-full">
        <EmailName
          id={params.emailid}
          language={language!}
          english={template.enName!}
          turkish={template.trName!}
        />
        <EmailDorm
          dorms={dorms?.dorms!}
          emailId={params.emailid}
          dormId={template.dormId!}
        />
        <CreateEmail
          enContent={template.english!}
          trContent={template.turkish!}
          emailId={params.emailid}
          language={language!}
          userId={params.id}
        />
      </div>
    </div>
  )
}

export default EmailTemplate
