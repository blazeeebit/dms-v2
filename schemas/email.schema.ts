import { z } from 'zod'

export type EmailTemplateNameProps = {
  name: string
}

export type EmailTemplateDormProps = {
  dorm: string
}

export type EmailAiPromptProps = {
  prompt: string
}

export type EmailTemplateSaveProps = {
  template: string
}

export const EmailTemplateNameSchema = z.object({
  name: z.string().min(1, { message: 'You must give a name to your template' }),
})

export const EmailTemplateDormSchema = z.object({
  dorm: z
    .string()
    .min(1, { message: 'You must give a domain to your template' }),
})

export const EmailAiPromptSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: 'You must give a domain to your template' }),
})

export const EmailTemplateSaveSchema = z.object({
  template: z
    .string()
    .min(1, { message: 'You must give a domain to your template' }),
})
