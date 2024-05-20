import React from 'react'
import { Modal } from '../modal'
import { Card } from '../ui/card'
import { IntegrationModalBody } from './modal-body'
import { Separator } from '../ui/separator'
import { CloudIcon } from 'lucide-react'

type IntegrationTriggerProps = {
  name: 'stripe'
  logo: string
  title: string
  descrioption: string
  connections: {
    [key in 'stripe']: boolean
  }
  id: string
  state: {
    [key in 'connected' | 'connect']: string
  }
}

export const IntegrationTrigger = ({
  name,
  logo,
  title,
  descrioption,
  connections,
  id,
  state,
}: IntegrationTriggerProps) => {
  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={descrioption}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name] ? state['connected'] : state['connect']}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModalBody
        state={state}
        id={id}
        connections={connections}
        type={name}
      />
    </Modal>
  )
}
