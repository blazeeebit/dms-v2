import { onUpdateDormDescription, onUpdateDormTitle } from '@/actions/dorms'
import {
  onUpdatePhoneNumber,
  onUpdateStudentDepartment,
  onUpdateStudentStudentId,
  onUpdateUserAddress,
  onUpdateUserCountry,
  onUpdateUserFullName,
  onUpdateUserImage,
  onUpdateUserPassword,
  onUpdateUserUserName,
} from '@/actions/profile'
import { onSetLanguagePreference } from '@/actions/translate'
import { useToast } from '@/components/ui/use-toast'
import { useProfileContext } from '@/context/use-profile-context'
import { supabaseClient } from '@/lib/utils'
import {
  EditDormContentProps,
  EditDormContentSchema,
} from '@/schemas/list.schema'
import {
  ProfileUpdateSettingsProps,
  ProfileUpdateSettingsSchema,
  StudentProfileSettingsUpdateProps,
  StudentProfileSettingsUpdateSchema,
  UpdateUserPasswordProps,
  UpdateUserPasswordSchema,
} from '@/schemas/profile.schema'
import { useClerk, useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
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

export const useAccountInfo = (
  userId: string,
  fullname: string,
  address?: string,
  image?: string,
  phone?: string,
  country?: string,
  username?: string
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const user = useUser()

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ProfileUpdateSettingsProps>({
    resolver: zodResolver(ProfileUpdateSettingsSchema),
    defaultValues: {
      fullname,
      address: address || '',
      phone: phone || '',
      country: country || '',
      username: username || '',
    },
  })

  const { toast } = useToast()

  const router = useRouter()

  const onUpdateInfo = handleSubmit(async (values) => {
    try {
      setLoading(true)
      if (values.image[0]) {
        const imageForm = new FormData()
        imageForm.append('upload_preset', 'j9xoh6yu')
        imageForm.append('file', values.image[0])
        const upload = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_API_UPLOAD as string,
          imageForm
        )

        if (upload) {
          const uploaded = await onUpdateUserImage(
            userId,
            upload.data.secure_url
          )

          if (uploaded) {
            toast({
              title: 'Success',
              description: uploaded.message,
            })
            setValue('image', upload.data.secure_url)
          }
        }
      }
      if (values.username && values.username !== username) {
        const usernameUpdated = await onUpdateUserUserName(
          userId,
          values.username
        )
        if (usernameUpdated) {
          toast({
            title: 'Success',
            description: usernameUpdated.message,
          })
          setValue('username', values.username)
        }
      }
      if (values.fullname && values.fullname !== fullname) {
        const fullnameUpdated = await onUpdateUserFullName(
          userId,
          values.fullname
        )
        if (fullnameUpdated) {
          toast({
            title: 'Success',
            description: fullnameUpdated.message,
          })
          setValue('fullname', values.fullname)
        }
      }
      if (values.country && values.country !== country) {
        const countryUpdated = await onUpdateUserCountry(userId, values.country)
        if (countryUpdated) {
          toast({
            title: 'Success',
            description: countryUpdated.message,
          })
          setValue('country', values.country)
        }
      }
      if (values.phone && values.phone !== phone) {
        const phoneUpdated = await onUpdatePhoneNumber(userId, values.phone)
        if (phoneUpdated) {
          toast({
            title: 'Success',
            description: phoneUpdated.message,
          })
          setValue('phone', values.phone)
        }
      }
      if (values.address && values.address !== address) {
        const addressUpdated = await onUpdateUserAddress(userId, values.address)
        if (addressUpdated) {
          toast({
            title: 'Success',
            description: addressUpdated.message,
          })
          setValue('address', values.address)
        }
      }
      reset()
      setLoading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return { loading, onUpdateInfo, register, errors, user }
}

export const useStudentInfo = (
  id: string,
  department?: string,
  studentId?: number
) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<StudentProfileSettingsUpdateProps>({
    resolver: zodResolver(StudentProfileSettingsUpdateSchema),
    defaultValues: {
      department: department || '',
      studentId: studentId?.toString() || '',
    },
  })

  const onUpdateStudentInfo = handleSubmit(async (values) => {
    try {
      setLoading(true)
      if (values.department && values.department !== department) {
        const updated = await onUpdateStudentDepartment(id, values.department)
        if (updated) {
          toast({
            title: 'Success',
            description: updated.message,
          })
          setValue('department', values.department)
        }
      }
      if (values.studentId && values.studentId !== studentId?.toString()) {
        const updated = await onUpdateStudentStudentId(id, values.studentId)
        if (updated) {
          toast({
            title: 'Success',
            description: updated.message,
          })
          setValue('studentId', values.studentId)
        }
      }
      reset()
      setLoading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return { loading, register, errors, onUpdateStudentInfo }
}

export const usePassword = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { toast } = useToast()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPasswordProps>({
    resolver: zodResolver(UpdateUserPasswordSchema),
  })

  const user = useUser()

  const onUpdatePassword = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const updated = await onUpdateUserPassword(values.password)
      if (updated) {
        toast({
          title: 'Success',
          description: updated.message,
        })
      }
      reset()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  })

  return {
    loading,
    onUpdatePassword,
    register,
    errors,
    user,
  }
}
