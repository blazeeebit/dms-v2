import { onGetAllEmailTemplates } from '@/actions/mail'
import { onGetUserLanguagePreference } from '@/actions/profile'
import { CreateTemplate } from '@/components/email-marketing/create-template'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { DMS_CONTENT } from '@/constants/language'
import { PATH_URLS } from '@/constants/routes'
import { Edit } from 'lucide-react'
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
            <Link
              key={template.id}
              href={`${PATH_URLS.DASHBOARD_OWNER}/${params.id}/email-marketing/${template.id}`}
            >
              <Card className="p-10 hover:bg-muted group">
                <CardContent className="p-0 flex flex-col gap-3 relative">
                  <Edit className="absolute right-0 hidden group-hover:flex top-0 text-gray-500" />
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
                      ? `${template.english?.slice(0, 10)[0]}...`
                      : `${template.turkish?.slice(0, 10)[0]}...`}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
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
