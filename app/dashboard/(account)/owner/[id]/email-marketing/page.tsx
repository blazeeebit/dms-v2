import { onGetAllEmailTemplates } from '@/actions/mail'
import { onGetUserLanguagePreference } from '@/actions/profile'
import { DropDown } from '@/components/dropdown'
import { CreateTemplate } from '@/components/email-marketing/create-template'
import { SendEmails } from '@/components/email-marketing/send-mail'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { DMS_CONTENT } from '@/constants/language'
import { PATH_URLS } from '@/constants/routes'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmailMarketingPage = async ({ params }: { params: { id: string } }) => {
  const language = await onGetUserLanguagePreference(params.id)
  const templates = await onGetAllEmailTemplates(params.id)
  return (
    <div>
      <div className="flex justify-between">
        <CardTitle>
          {DMS_CONTENT.EMAIL_TEMPLATE[language!].content.title}
        </CardTitle>
        <CreateTemplate
          label={DMS_CONTENT.EMAIL_TEMPLATE[language!].content.button}
          id={params.id}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {templates && templates.length > 0 ? (
          templates.map((template, index) => (
            <Card key={template.id} className="p-10 hover:bg-muted">
              <CardContent className="p-0 flex items-start">
                <Link
                  className="flex flex-col gap-3 flex-1"
                  href={`${PATH_URLS.DASHBOARD_OWNER}/${params.id}/email-marketing/${template.id}`}
                >
                  <CardTitle>
                    {!template.enName && !template.trName
                      ? `${
                          DMS_CONTENT.EMAIL_TEMPLATE[language!].content.template
                        } ${index + 1}`
                      : language === 'ENGLISH'
                      ? template.enName
                      : language === 'TURKISH' && template.trName}
                  </CardTitle>
                  <CardDescription>
                    {!template.english && !template.turkish
                      ? 'The template has no content'
                      : language === 'ENGLISH'
                      ? `${template.english?.slice(0, 20)}...`
                      : `${template.turkish?.slice(0, 20)}...`}
                  </CardDescription>
                </Link>
                <DropDown
                  label="Options"
                  trigger={<Ellipsis />}
                  className="text-gray-500 outline-none p-0"
                >
                  <SendEmails id={template.id} />
                </DropDown>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex justify-center py-20 lg:col-span-3 xl:col-span-4 h-full">
            <CardDescription>
              You have not created any templates
            </CardDescription>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailMarketingPage
