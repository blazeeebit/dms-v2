import { onUpdateDormDescription, onUpdateDormTitle } from '@/actions/dorms'
import { onSetLanguagePreference } from '@/actions/translate'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import { supabaseClient } from '@/lib/utils'
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

  const untrackPresence = async () => {
    await supabaseClient.channel('tracking').untrack()
  }

  const onLogout = async () => {
    untrackPresence()
    signOut()
    onDispatch('LOGOUT', {
      language: 'ENGLISH',
      username: undefined,
      role: undefined,
    })
    router.push('/')
  }

  return { onLogout }
}

export const useEditDorm = (id: string, type: string, text?: string) => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
    setValue,
  } = useForm<EditDormContentProps>({
    resolver: zodResolver(EditDormContentSchema),
    mode: 'onChange',
  })

  const router = useRouter()

  const { toast } = useToast()

  const [onEdit, setOnEdit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (type == 'name') {
      setValue('name', text)
    }
    if (type == 'description') {
      setValue('description', text)
    }
  }, [])

  const onEnableEdit = () => setOnEdit(true)

  const onDisableEdit = () => {
    setOnEdit(false)
    reset()
  }

  const onUpdateDorm = handleSubmit(async (value) => {
    try {
      setLoading(true)
      if (value.name && type == 'name') {
        const update = await onUpdateDormTitle(id, value.name)
        if (update) {
          toast({
            title: 'Success',
            description: update.message,
          })
        }
      }
      if (value.description && type == 'description') {
        const update = await onUpdateDormDescription(id, value.description)
        if (update) {
          toast({
            title: 'Success',
            description: update.message,
          })
        }
      }
      setLoading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return {
    onUpdateDorm,
    register,
    errors,
    onEnableEdit,
    onEdit,
    onDisableEdit,
    loading,
  }
}
