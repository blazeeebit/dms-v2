import {
  onActiveateDorm,
  onCreateNewListing,
  onGetSingleCompareDorm,
  onSearchDormToCompare,
} from '@/actions/dorms'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import {
  CreateDormListingProps,
  CreateDormListingSchema,
} from '@/schemas/list.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useCreateDorm = (id: string) => {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<CreateDormListingProps>({
    resolver: zodResolver(CreateDormListingSchema),
    defaultValues: {
      services: [],
    },
    mode: 'onChange',
  })
  const ACCEPTED_FILE_TYPE = ['image/png', 'image/jpg', 'image/jpeg']
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [services, setServices] = useState<{ name: string; icon: string }[]>([])
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const imagePreview = watch((value) => {
      if (value.thumbnail?.[0]) {
        if (ACCEPTED_FILE_TYPE.includes(value.thumbnail?.[0].type!)) {
          setPreview(URL.createObjectURL(value.thumbnail?.[0]!))
        }
      }
    })
    return () => imagePreview.unsubscribe()
  }, [watch])

  const onRemovePreview = () => {
    setValue('thumbnail', FileList)
    setPreview(undefined)
  }

  const onAddService = (service: { name: string; icon: string }) => {
    //check duplicates
    const foundItem = services.find((item) => item.name == service.name)
    if (foundItem) {
      setServices((prev) => prev.filter((item) => item.name !== service.name))
    } else {
      setServices((prev) => [...prev, service])
    }
  }

  useEffect(() => {
    setValue('services', services)
  }, [services])

  const onCreateListing = handleSubmit(
    async (values: CreateDormListingProps) => {
      setLoading(true)
      try {
        const imageForm = new FormData()
        imageForm.append('upload_preset', 'j9xoh6yu')
        imageForm.append('file', values.thumbnail[0])
        const upload = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_API_UPLOAD as string,
          imageForm
        )
        if (upload) {
          const dorm = await onCreateNewListing(id, {
            title: values.name,
            price: values.price,
            description: values.description,
            image: upload.data.secure_url,
            services: services,
          })
          if (dorm) {
            toast({
              title: dorm.status == 200 ? 'Success' : 'Error',
              description: dorm.message,
            })
            setPreview(undefined)
            reset()
            setLoading(false)
            router.refresh()
          }
        }
      } catch (error) {}
    }
  )

  return {
    register,
    errors,
    onCreateListing,
    preview,
    onRemovePreview,
    loading,
    services,
    onAddService,
  }
}

export const usePublish = (id: string) => {
  const { toast } = useToast()
  const onActivateListing = async (e: any) => {
    try {
      const dormState = await onActiveateDorm(
        id,
        e.target.ariaChecked == 'true' ? false : true
      )

      if (dormState) {
        toast({
          title: dormState.status == 200 ? 'Success' : 'Error',
          description: dormState.message,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { onActivateListing }
}

export const useCompare = () => {
  const [columns, setColumns] = useState<number[]>([])

  const onAddDormToCompare = () => setColumns((prev) => [...prev, 1])

  const onDeleteDormToCompare = (index: number) =>
    setColumns((prev) => prev.filter((col, i) => i !== index))

  return {
    columns,
    onAddDormToCompare,
    onDeleteDormToCompare,
  }
}

export const useCompareDorm = (userid: string) => {
  const { watch, register } = useForm()
  const [compareDorm, setCompareDorm] = useState<{
    service: {
      name: string
      icon: string
      rating: number
    }[]
    price: string
    featuredImage: string
    language: {
      name: string
      description: string
    }[]
  }>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingDorm, setLoadingDorm] = useState<boolean>(false)
  const { user } = useProfileContext()
  const { language } = user
  const [dormSearch, setDormSearch] = useState<
    | {
        id: string
        featuredImage: string
        language: {
          name: string
          description: string
        }[]
      }[]
  >([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const onSelectDorm = async (id: string) => {
    try {
      setLoadingDorm(true)
      const dorm = await onGetSingleCompareDorm(id, userid)
      if (dorm) {
        setCompareDorm(dorm)
        setLoadingDorm(false)
      }
    } catch (error) {}
  }

  useEffect(() => {
    const compare = watch(async (values) => {
      try {
        setSearchQuery(values.query)
        setLoading(true)
        const dorms = await onSearchDormToCompare(values.query, userid)
        if (dorms) {
          setDormSearch(dorms)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })
    return () => compare.unsubscribe()
  }, [watch])

  return {
    onSelectDorm,
    compareDorm,
    loading,
    searchQuery,
    loadingDorm,
    dormSearch,
    register,
  }
}
