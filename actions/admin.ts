'use server'

import { client } from '@/lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
import { m } from 'framer-motion'

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

export const onGetAllUsers = async (skip: number, current: string) => {
  try {
    const users = await client.user.findMany({
      where: {
        NOT: {
          id: current,
        },
      },
      select: {
        clerkId: true,
        id: true,
        image: true,
        name: true,
        username: true,
        role: true,
        language: true,
        banned: true,
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

export const onGetClerkUserEmailImage = async (clerkId: string) => {
  try {
    const user = await clerkClient.users.getUser(clerkId)
    if (user) {
      return {
        image: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onDeleteUserWithClerk = async (id: string, clerkId: string) => {
  try {
    const deletedUser = await client.user.delete({
      where: {
        id,
      },
    })

    if (deletedUser) {
      const deleteClerkInstance = await clerkClient.users.deleteUser(clerkId)

      if (deleteClerkInstance) {
        return {
          status: 200,
          message: 'User has been deleted',
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onBannedUser = async (id: string) => {
  try {
    const banned = await client.user.update({
      where: {
        id,
      },
      data: {
        banned: true,
      },
    })

    if (banned) {
      return {
        status: 200,
        message: 'This user has been banned',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUnBannedUser = async (id: string) => {
  try {
    const banned = await client.user.update({
      where: {
        id,
      },
      data: {
        banned: false,
      },
    })

    if (banned) {
      return {
        status: 200,
        message: 'This user has been unbanned',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
