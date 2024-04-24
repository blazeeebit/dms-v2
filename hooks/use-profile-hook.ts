import { DMS_CONTENT } from '@/constants/language'
import { useProfileContext } from '@/context/use-profile-context'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useTranslation = () => {
  const { onDispatch, user } = useProfileContext()
  const { language } = user
  const [loading, setLoading] = useState<boolean>(false)
  const onChangeLanguagePreference = async () => {
    setLoading(true)
    onDispatch('LANGUAGE', user)
    console.log(DMS_CONTENT.SEARCH[user.language]);
    setLoading(false)
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
