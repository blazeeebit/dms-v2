import {
  onBannedUser,
  onDeleteUserWithClerk,
  onGetAllUsers,
  onGetClerkUserEmailImage,
  onUnBannedUser,
} from '@/actions/admin'
import { useToast } from '@/components/ui/use-toast'
import {
  IntegrateCalenderProps,
  IntegrateCalenderSchema,
} from '@/schemas/admin.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

export const useAdminUsers = (
  user:
    | {
        id: string
        clerkId: string
        role: 'ADMIN' | 'OWNER' | 'STUDENT'
        name: string
        username: string | null
        image: string | null
        language: 'TURKISH' | 'ENGLISH'
        banned: boolean
      }[]
    | undefined,
  id: string
) => {
  const [users, setUsers] = useState<
    | {
        id: string
        clerkId: string
        role: 'ADMIN' | 'OWNER' | 'STUDENT'
        name: string
        username: string | null
        image: string | null
        language: 'TURKISH' | 'ENGLISH'
        banned: boolean
      }[]
    | undefined
  >(user)
  const [loading, setLoading] = useState<boolean>(false)

  const onPaginateUsers = async () => {
    try {
      setLoading(true)
      const moreUsers = await onGetAllUsers(users?.length!, id)
      if (moreUsers) {
        setUsers((prev: any) => [...prev, ...moreUsers])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    onPaginateUsers,
    users,
    loading,
  }
}

export const useAdminUserCard = (clerkId: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<{ image: string; email: string }>({
    image: '',
    email: '',
  })
  const [deleting, setDeleting] = useState<boolean>(false)
  const [banning, setBanning] = useState<boolean>(false)

  const { toast } = useToast()
  const router = useRouter()

  const onGetUserInfo = async () => {
    try {
      setLoading(true)
      const user = await onGetClerkUserEmailImage(clerkId)
      if (user) {
        setInfo(user)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteUser = async (id: string) => {
    try {
      setDeleting(true)
      const deleted = await onDeleteUserWithClerk(id, clerkId)
      if (deleted) {
        toast({
          title: 'Success',
          description: deleted.message,
        })
      }
      setDeleting(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  const onBanUser = async (id: string) => {
    try {
      setBanning(true)
      const banning = await onBannedUser(id)
      if (banning) {
        toast({
          title: 'Success',
          description: banning.message,
        })
        location.reload()
        setBanning(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onUnBanUser = async (id: string) => {
    try {
      setBanning(true)
      const banning = await onUnBannedUser(id)
      if (banning) {
        toast({
          title: 'Success',
          description: banning.message,
        })
        location.reload()
        setBanning(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onGetUserInfo()
  }, [])

  return {
    loading,
    info,
    deleting,
    onDeleteUser,
    onBanUser,
    banning,
    onUnBanUser,
    onGetUserInfo,
  }
}
