'use client'
import React from 'react'
import { UISkeletons } from '../skeletons'
import { Tooltip } from '../tooltip'
import { IconRenderer } from '../icon-renderer'
import { Card, CardDescription } from '../ui/card'
import { useResults } from '@/hooks/use-search-hook'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ResultItems = dynamic(
  () => import('./result-items').then((component) => component.ResultItems),
  { ssr: false }
)

type ResultsProps = {
  results?: any[]
  loading: boolean
  activeFilter?: string
  onFilter(filter: string): void
}

export const Results = ({
  results,
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
        ) : (
          results?.length &&
          results.map((result) => (
            <ResultItems
              key={result.id}
              name={result.language[0].name}
              id={result.id}
              email={result.email}
              image={result.featuredImage}
              description={result.language[0].description}
              type={activeFilter}
            />
          ))
        )}
      </div>
    </div>
  )
}
