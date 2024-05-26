'use server'

import { client } from '@/lib/prisma'

export const onTotalUsers = async () => {
  try {
    const users = await client.user.count()
    const student = await client.student.count()
    const owners = await client.owner.count()
    const dorms = await client.dormitories.count()
    return {
      users,
      student,
      owners,
      dorms,
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllUsers = async (skip: number) => {
  try {
    const users = await client.user.findMany({
      include: {
        owner: true,
        student: true,
      },
      take: 5,
      skip,
    })

    if (users) {
      return users
    }
  } catch (error) {
    console.log(error)
  }
}
