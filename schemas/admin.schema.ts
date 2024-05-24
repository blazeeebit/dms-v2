import { z } from 'zod'

export type IntegrateCalenderProps = {
  url: string
  title: string
}

export const IntegrateCalenderSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'You must give a valid link' })
    .refine(
      (url) =>
        url.match(
          /https?:\/\/(.+?\.)?emu\.edu.tr(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/
        ),
      {
        message: 'This is not a valid university url',
      }
    ),
  title: z.string().min(1, { message: 'Add a valid calender title' }),
})
