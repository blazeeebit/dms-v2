import { onGenerateEmailTemplate } from '@/actions/ai'
import {
  onAssignDomainToEmail,
  onCreateNewEmailTemplate,
  onDeleteEmailTemplate,
  onSaveEmailTemplateContent,
  onSendBulkEmailsToStudents,
  onUpdateEmailTemplateName,
} from '@/actions/mail'
import { useToast } from '@/components/ui/use-toast'
import { PATH_URLS } from '@/constants/routes'
import {
  EmailAiPromptProps,
  EmailAiPromptSchema,
  EmailTemplateDormProps,
  EmailTemplateDormSchema,
  EmailTemplateNameProps,
  EmailTemplateNameSchema,
  EmailTemplateSaveProps,
  EmailTemplateSaveSchema,
} from '@/schemas/email.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import exp from 'constants'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  const router = useRouter()

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
      setEdit(false)
      setLoading(false)
      router.refresh()
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

  const { register, handleSubmit } = useForm<EmailTemplateDormProps>({
    resolver: zodResolver(EmailTemplateDormSchema),
  })

  const { toast } = useToast()

  const router = useRouter()

  const onEditing = () => setEditing((prev) => !prev)

  const onAssignDorm = handleSubmit(async (values) => {
    try {
      setloading(true)
      const assigned = await onAssignDomainToEmail(values.dorm, emailId)
      if (assigned) {
        toast({
          title: 'Success',
          description: assigned.message,
        })
      }
      setEditing(false)
      setloading(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return {
    onEditing,
    loading,
    editing,
    onAssignDorm,
    register,
  }
}

export const useEmailTemplate = (
  id: string,
  emailId: string,
  language: 'ENGLISH' | 'TURKISH',
  enTemplate?: string,
  trTemplate?: string
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [processing, setProccessing] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const { toast } = useToast()

  const router = useRouter()

  const { register, handleSubmit, reset } = useForm<EmailAiPromptProps>({
    resolver: zodResolver(EmailAiPromptSchema),
  })

  const {
    register: RegMail,
    handleSubmit: SaveMail,
    reset: ResetMail,
    setValue,
  } = useForm<EmailTemplateSaveProps>({
    resolver: zodResolver(EmailTemplateSaveSchema),
  })

  const CreateEmailTemplate = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const template = await onGenerateEmailTemplate(values.prompt)
      if (template && template.message) {
        setValue('template', template.message)
      }
      reset()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  })

  const onSaveEmailTemplate = SaveMail(async (values) => {
    try {
      setProccessing(true)
      const template = await onSaveEmailTemplateContent(
        emailId,
        values.template
      )
      if (template) {
        toast({
          title: 'Success',
          description: template.message,
        })
      }
      setProccessing(false)
    } catch (error) {
      console.log(error)
    }
  })

  const onDeleteTemplate = async () => {
    try {
      setDeleting(true)
      const deleted = await onDeleteEmailTemplate(emailId)
      if (deleted) {
        toast({
          title: 'Success',
          description: deleted.message,
        })
      }
      router.push(`${PATH_URLS.DASHBOARD_OWNER}/${id}/email-marketing`)
      router.refresh()
      setDeleting(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (enTemplate && trTemplate) {
      if (language === 'ENGLISH') {
        setValue('template', enTemplate)
      }
      if (language === 'TURKISH') {
        setValue('template', trTemplate)
      }
    } else {
      setValue('template', '')
    }
  }, [language])

  return {
    loading,
    CreateEmailTemplate,
    register,
    RegMail,
    processing,
    onSaveEmailTemplate,
    onDeleteTemplate,
    deleting,
  }
}

export const useSendMail = (emailId: string) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { toast } = useToast()

  const router = useRouter()

  const onBulkEmails = async () => {
    try {
      setLoading(true)
      const mailed = await onSendBulkEmailsToStudents(emailId)
      if (mailed) {
        toast({
          title: 'Success',
          description: mailed.message,
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
    onBulkEmails,
  }
}
