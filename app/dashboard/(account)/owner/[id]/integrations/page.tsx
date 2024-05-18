import { IntegrationsList } from '@/components/integration'
import React from 'react'

const OwnerIntegration = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <IntegrationsList
        id={params.id}
        connections={{
          stripe: false,
        }}
      />
    </div>
  )
}

export default OwnerIntegration
