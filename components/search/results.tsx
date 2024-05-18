'use client'
import React from 'react'
import { UISkeletons } from '../skeletons'
import { Tooltip } from '../tooltip'
import { IconRenderer } from '../icon-renderer'
import { Card } from '../ui/card'
import { useResults } from '@/hooks/use-search-hook'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ResultItems = dynamic(
  () => import('./result-items').then((component) => component.ResultItems),
  { ssr: false }
)

type ResultsProps = {
  users: {
    name: string
    id: string
    clerkId: string
    image: string | null
  }[]
  dorms: {
    id: string
    language: {
      name: string
      description: string
    }[]
    featuredImage: string
  }[]
  loading: boolean
  activeFilter?: string
  onFilter(filter: string): void
}

export const Results = ({
  users,
  dorms,
  loading,
  activeFilter,
  onFilter,
}: ResultsProps) => {
  const { loadingFilters, filters } = useResults()
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        {loadingFilters ? (
          <UISkeletons skeleton="filters" />
        ) : (
          filters.map((filter) => (
            <Tooltip
              trigger={
                <Card
                  onClick={() => onFilter(filter.name)}
                  className={cn(
                    'p-3 opacity-70 hover:opacity-100 cursor-pointer transition duration-150 ease-in-out text-gray-500',
                    activeFilter == filter.name &&
                      'dark:bg-gray-800 bg-cream opacity-100'
                  )}
                >
                  <IconRenderer icon={filter.icon} />
                </Card>
              }
              key={filter.id}
            >
              {filter.name}
            </Tooltip>
          ))
        )}
      </div>
      <div className="flex flex-col gap-3">
        {loading ? (
          <UISkeletons skeleton="search" />
        ) : activeFilter ? (
          dorms.map((dorm) => (
            <ResultItems
              type="dorm"
              key={dorm.id}
              name={dorm.language[0].name}
              description={dorm.language[0].description}
              id={dorm.id}
              image={dorm.featuredImage}
            />
          ))
        ) : (
          users.map((user) => (
            <ResultItems
              type="user"
              key={user.id}
              name={user.name}
              description=""
              image={user.image!}
              id={user.id}
            />
          ))
        )}
      </div>
    </div>
  )
}
