import { onSetLanguagePreference } from '@/actions/translate'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import {
  EditDormContentProps,
  EditDormContentSchema,
} from '@/schemas/list.schema'
import { useClerk } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useTranslation = (id: string) => {
  const { onDispatch, user } = useProfileContext()
  const { language } = user
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const onChangeLanguagePreference = async () => {
    try {
      setLoading(true)
      onDispatch('LANGUAGE', user)
      const updatedPreference = await onSetLanguagePreference(id)
      if (updatedPreference) {
        toast({
          title: updatedPreference.status == 200 ? 'Success' : 'Error',
          description: updatedPreference.message,
        })
        setLoading(false)
        router.refresh()
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return { onChangeLanguagePreference, language, loading }
}

export const useProfile = (user: {
  username: string
  language: 'TURKISH' | 'ENGLISH'
  role: 'OWNER' | 'STUDENT' | 'ADMIN'
}) => {
  const { signOut } = useClerk()
  const router = useRouter()

  const { onDispatch } = useProfileContext()

  useEffect(() => {
    if (user) onDispatch('LOGIN', { ...user })
  }, [])

  const onLogout = async () => {
    if (user) {
      signOut()
      onDispatch('LOGOUT', {
        language: 'ENGLISH',
        username: undefined,
        role: undefined,
      })
      router.push('/')
    }
  }

  return { onLogout }
}

export const useEditDorm = (id: string) => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<EditDormContentProps>({
    resolver: zodResolver(EditDormContentSchema),
    mode: 'onChange',
  })

  const [onEdit, setOnEdit] = useState<boolean>(false)

  const onEnableEdit = () => setOnEdit(true)

  const onDisableEdit = () => {
    setOnEdit(false)
    reset()
  }

  const onUpdateDorm = handleSubmit(async (value) => {
    console.log(value)
  })

  return { onUpdateDorm, register, errors, onEnableEdit, onEdit, onDisableEdit }
}
