import { z, ZodType } from 'zod'

export type SearchQueryProps = {
  query: string
}

export const SearchQuerySchema: ZodType<SearchQueryProps> = z.object({
  query: z.string(),
})
