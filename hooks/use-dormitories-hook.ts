import {
  CreateDormListingProps,
  CreateDormListingSchema,
} from '@/schemas/list.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useCreateDorm = (id: string) => {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateDormListingProps>({
    resolver: zodResolver(CreateDormListingSchema),
    defaultValues: {
      services: [],
    },
    mode: 'onChange',
  })
  const ACCEPTED_FILE_TYPE = ['image/png', 'image/jpg', 'image/jpeg']
  const [preview, setPreview] = useState<string | undefined>(undefined)

  useEffect(() => {
    const imagePreview = watch((value) => {
      if (ACCEPTED_FILE_TYPE.includes(value.thumbnail?.[0].type!)) {
        setPreview(URL.createObjectURL(value.thumbnail?.[0]!))
      }
    })
    return () => imagePreview.unsubscribe()
  }, [watch])

  const onRemovePreview = () => setPreview(undefined)

  const onCreateListing = handleSubmit(
    async (values: CreateDormListingProps) => {
      console.log(values)
    }
  )

  return { register, errors, onCreateListing, preview, onRemovePreview }
}
