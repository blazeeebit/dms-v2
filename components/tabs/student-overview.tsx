'use client'
import React from 'react'
import { UserBarChart } from '../bar-chart'
import { TabsContent } from '../ui/tabs'

type StudentOverViewProps = {
  data: {
    month: string
    count: number
  }[]
}

export const StudentOverView = ({ data }: StudentOverViewProps) => {
  return (
    <TabsContent value="student">
      <UserBarChart data={data} />
    </TabsContent>
  )
}
