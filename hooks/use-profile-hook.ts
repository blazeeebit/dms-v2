import { onSetLanguagePreference } from '@/actions/translate'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
