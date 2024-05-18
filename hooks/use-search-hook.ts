import { onGetFilters, onSearchQuery } from '@/actions/search'
import { SearchQueryProps, SearchQuerySchema } from '@/schemas/search.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useSearchBar = (language: 'ENGLISH' | 'TURKISH') => {
  const [search, setSearch] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const [userSearch, setUserSearch] = useState<
    {
      name: string
      id: string
      clerkId: string
      image: string | null
    }[]
  >([])
  const [dormSearch, setDormSearch] = useState<
    {
      id: string
      language: {
        name: string
        description: string
      }[]
      featuredImage: string
    }[]
  >([])
  const { register, watch } = useForm<SearchQueryProps>({
    resolver: zodResolver(SearchQuerySchema),
  })

  const onSetFilter = (current: string) => {
    if (current == filter) {
      setFilter(undefined)
    } else {
      setFilter(current)
    }
  }

  useEffect(() => {
    const search = watch(async (value) => {
      try {
        if (value.query || value.query !== '') {
          setLoading(true)
          setSearch(true)
          const results = await onSearchQuery(value.query, filter, language)
          if (results && results.users) {
            setUserSearch(results.users)
          }
          if (results && results.dorms) {
            setDormSearch(results.dorms)
          }
          setLoading(false)
        }
        if (value.query == '') {
          setSearch(false)
          setFilter(undefined)
        }
      } catch (error) {
        console.log(error)
      }
    })
    return () => search.unsubscribe()
  }, [watch, filter])

  return {
    search,
    setSearch,
    register,
    loading,
    filter,
    onSetFilter,
    userSearch,
    dormSearch,
  }
}

export const useResults = () => {
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false)
  const [filters, setFilters] = useState<
    { id: string; name: string; icon: string }[]
  >([])
  const onFilters = async () => {
    try {
      setLoadingFilters(true)
      const filters = await onGetFilters()
      if (filters) {
        setFilters(filters)
        setLoadingFilters(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onFilters()
  }, [])
  return { filters, loadingFilters }
}
