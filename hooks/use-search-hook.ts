import { SearchQueryProps, SearchQuerySchema } from '@/schemas/search.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useSearchBar = () => {
  const [search, setSearch] = useState<string | undefined>('')
  const { register, watch } = useForm<SearchQueryProps>({
    resolver: zodResolver(SearchQuerySchema),
  })

  useEffect(() => {
    const search = watch((value) => {
      setSearch(value.query)
      console.log(value.query)
    })
    return () => search.unsubscribe()
  }, [watch])

  return { search, setSearch, register }
}
