import { z } from 'zod'

export type EmailTemplateNameProps = {
  name: string
}

export const EmailTemplateNameSchema = z.object({
  name: z.string().min(1, { message: 'You must give a name to your template' }),
})
