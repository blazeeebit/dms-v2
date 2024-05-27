import {
  onCreateNewEmailTemplate,
  onUpdateEmailTemplateName,
} from '@/actions/mail'
import { useToast } from '@/components/ui/use-toast'
import {
  EmailTemplateNameProps,
  EmailTemplateNameSchema,
} from '@/schemas/email.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import exp from 'constants'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const useCreateEmail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { toast } = useToast()
  const router = useRouter()

  const onCreateNewTemplate = async () => {
    try {
      setLoading(true)
      const template = await onCreateNewEmailTemplate(id)
      if (template) {
        toast({
          title: 'Success',
          description: template.message,
        })
      }
      setLoading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loading,
    onCreateNewTemplate,
  }
}

export const useEmailName = (id: string) => {
  const [edit, setEdit] = useState<boolean>(false)
  const { register, reset, handleSubmit } = useForm<EmailTemplateNameProps>({
    resolver: zodResolver(EmailTemplateNameSchema),
  })
  const [loading, setLoading] = useState<boolean>(false)

  const { toast } = useToast()

  const onEditName = () => setEdit((prev) => !prev)

  const onEditTemplateName = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const template = await onUpdateEmailTemplateName(id, values.name)
      if (template) {
        toast({
          title: 'Success',
          description: template.message,
        })
      }
      reset()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  })

  return {
    edit,
    onEditName,
    register,
    loading,
    onEditTemplateName,
  }
}

export const useEmailDorm = (emailId: string) => {
  const [loading, setloading] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(false)

  const onEditing = () => setEditing((prev) => !prev)

  return {
    onEditing,
    loading,
    editing,
  }
}
