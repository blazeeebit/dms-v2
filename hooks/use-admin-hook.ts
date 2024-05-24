import { onIntegrateCalender } from '@/actions/scrapper'
import { useToast } from '@/components/ui/use-toast'
import {
  IntegrateCalenderProps,
  IntegrateCalenderSchema,
} from '@/schemas/admin.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const useAdminCalender = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<IntegrateCalenderProps>({
    resolver: zodResolver(IntegrateCalenderSchema),
  })

  const router = useRouter()

  const { toast } = useToast()

  const onCreateCalender = handleSubmit(async (values) => {
    try {
      setLoading(true)
      reset()
      const integrated = await onIntegrateCalender(
        values.url.split('www.')[1],
        values.title
      )
      if (integrated) {
        toast({
          title: 'Success',
          description: integrated.message,
        })
      }
      setLoading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return {
    onCreateCalender,
    loading,
    register,
    errors,
  }
}
