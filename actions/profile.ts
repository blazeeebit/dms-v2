'use server'

import { client } from '@/lib/prisma'

export const onGetUserProfile = async (id: string) => {
  try {
    const profile = await client.user.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        student: true,
      },
    })

    if (profile) {
      return profile
    }
  } catch (error) {
    console.log(error)
  }
}
