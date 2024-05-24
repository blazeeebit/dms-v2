'use server'

import { client } from '@/lib/prisma'

export const onGetCalenders = async () => {
  try {
    const calenders = await client.calender.findMany({
      select: {
        id: true,
        year: true,
      },
    })
    if (calenders) {
      return calenders
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetCalender = async (id: string) => {
  try {
    const calender = await client.calender.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        year: true,
        calender: true,
      },
    })

    if (calender) {
      return { ...calender, calender: calender.calender.split('\\n') }
    }
  } catch (error) {
    console.log(error)
  }
}
