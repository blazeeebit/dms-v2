'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TabsMenuProsp = {
  header: string[]
  children: React.ReactNode
}

export const TabsMenu = ({ header, children }: TabsMenuProsp) => {
  return (
    <Tabs defaultValue={header[0]} className="w-full">
      <TabsList>
        {header.map((head) => (
          <TabsTrigger className="capitalize" key={head} value={head}>
            {head}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
