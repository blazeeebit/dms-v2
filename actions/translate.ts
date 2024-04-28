'use server'

import { client } from '@/lib/prisma'

export const onSetLanguagePreference = async (id: string) => {
  try {
    const currentPreference = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
      },
    })

    if (currentPreference) {
      const updatePreference = await client.user.update({
        where: {
          id,
        },
        data: {
          language:
            currentPreference.language == 'ENGLISH' ? 'TURKISH' : 'ENGLISH',
        },
      })

      if (updatePreference) {
        return { status: 200, message: 'Language successfully updated' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
