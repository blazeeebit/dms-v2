'use client'
import { useSearchBar } from '@/hooks/use-search-hook'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { Card } from '../ui/card'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { DMS_CONTENT } from '@/constants/language'
import { Results } from './results'

const SearchResults = dynamic(
  () => import('./motion').then((component) => component.SearchResults),
  { ssr: false }
)

type SearchBarProps = {
  className?: string
  language: 'ENGLISH' | 'TURKISH'
}

export const SearchBar = ({ className, language }: SearchBarProps) => {
  const { search, register, loading, filter, onSetFilter, results } =
    useSearchBar(language)

  console.log(results)
  return (
    <Card className={cn('lg:w-[500px] relative rounded-sm', className)}>
      <div className="flex gap-2 items-center px-3">
        <Search size={20} />
        <Input
          {...register('query')}
          className="border-none"
          placeholder={DMS_CONTENT.SEARCH[language].content}
        />
      </div>
      <SearchResults state={search}>
        <Results
          onFilter={onSetFilter}
          activeFilter={filter}
          results={results}
          loading={loading}
        />
      </SearchResults>
    </Card>
  )
}
