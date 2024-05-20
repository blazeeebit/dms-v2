'use client'
import { INTEGRATION_LIST_ITEMS } from '@/constants/integration'
import React from 'react'
import { IntegrationTrigger } from './modal-trigger'
import { Card, CardContent, CardDescription } from '../ui/card'
import Image from 'next/image'
import { DMS_CONTENT } from '@/constants/language'

type IntegrationsListProps = {
  connections: {
    stripe: boolean
  }
  id: string
  language: 'TURKISH' | 'ENGLISH'
}

export const IntegrationsList = ({
  connections,
  id,
  language,
}: IntegrationsListProps) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-20">
              <div className="">
                <div className="w-10 h-10 relative">
                  <Image sizes="100vw" src={item.logo} alt="Logo" fill />
                </div>
                <h2 className="font-bold capitalize">{item.name}</h2>
              </div>
              <IntegrationTrigger
                id={id}
                connections={connections}
                title={DMS_CONTENT.INTEGRATIONS[language].content.title}
                descrioption={
                  DMS_CONTENT.INTEGRATIONS[language].content.modelDescription
                }
                logo={item.logo}
                name={item.name}
                state={DMS_CONTENT.INTEGRATIONS[language].content}
              />
            </div>
            <CardDescription>
              {DMS_CONTENT.INTEGRATIONS[language].content.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
