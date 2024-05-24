import { useToast } from '@/components/ui/use-toast'
import {
  IntegrateCalenderProps,
  IntegrateCalenderSchema,
} from '@/schemas/admin.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
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
      const integrated = await axios.post('/api/calender', {
        url: values.url.split('www.')[1],
        title: values.title,
      })
      if (integrated.data) {
        toast({
          title: 'Success',
          description: integrated.data,
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
