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
  id: string
}

export const SearchBar = ({ className, language, id }: SearchBarProps) => {
  const {
    search,
    register,
    loading,
    filter,
    onSetFilter,
    userSearch,
    dormSearch,
  } = useSearchBar(language)

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
          userId={id}
          onFilter={onSetFilter}
          activeFilter={filter}
          users={userSearch}
          dorms={dormSearch}
          loading={loading}
        />
      </SearchResults>
    </Card>
  )
}
