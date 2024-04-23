'use client'
import { useSearchBar } from '@/hooks/use-search-hook'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { Card } from '../ui/card'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const SearchResults = dynamic(
  () => import('./motion').then((component) => component.SearchResults),
  { ssr: false }
)

type SearchBarProps = {
  className?: string
}

export const SearchBar = ({ className }: SearchBarProps) => {
  const { search, register } = useSearchBar()
  return (
    <Card className={cn('lg:w-[500px] relative rounded-sm', className)}>
      <div className="flex gap-2 items-center px-3">
        <Search size={20} />
        <Input
          {...register('query')}
          className="border-none"
          placeholder="Search..."
        />
      </div>
      <SearchResults state={search !== ''}>yo</SearchResults>
    </Card>
  )
}
