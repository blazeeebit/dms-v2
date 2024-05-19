'use server'

import { client } from '@/lib/prisma'
import { encryptionHandler } from '@/lib/utils'
import { clerkClient, currentUser } from '@clerk/nextjs/server'

export const onStudentOnline = async (id: string) => {
  try {
    await client.student.update({
      where: {
        userId: id,
      },
      data: {
        online: true,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const onStudentOffline = async (id: string) => {
  try {
    await client.student.update({
      where: {
        userId: id,
      },
      data: {
        online: false,
      },
    })
  } catch (error) {}
}

export const onGetStudentDetails = async (id: string) => {
  try {
    const student = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        clerkId: true,
        image: true,
        student: {
          select: {
            id: true,
          },
        },
      },
    })

    if (student) {
      const userDetails = await clerkClient.users.getUser(student.clerkId)
      return {
        name: student.name,
        email: userDetails.emailAddresses[0].emailAddress,
        image: student.image || userDetails.imageUrl,
        id: student.student[0].id,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetOnlineStudents = async (id: string) => {
  try {
    console.log(id)
    const students = await client.student.findMany({
      where: {
        online: true,
        NOT: {
          id,
        },
      },
      select: {
        online: true,
        id: true,
        User: {
          select: {
            name: true,
            image: true,
            clerkId: true,
            id: true,
          },
        },
      },
    })

    if (students) {
      let i = 0
      const studentsList: {
        name: string
        email: string
        image: string
        online: boolean
        id: string
      }[] = []
      while (i < students.length) {
        const userDetails = await clerkClient.users.getUser(
          students[i].User!.clerkId
        )
        studentsList.push({
          name: students[i].User!.name,
          id: students[i].id,
          email: userDetails.emailAddresses[i].emailAddress,
          image: students[i].User!.image || userDetails.imageUrl,
          online: students[i].online,
        })
        i++
      }

      return studentsList
    }
  } catch (error) {
    console.log(error)
  }
}

export const onStoreMessage = async (
  senderId: string,
  message: string,
  recieverId: string
) => {
  try {
    await client.student.update({
      where: {
        id: senderId,
      },
      data: {
        message: {
          create: {
            message,
            recieverId,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const onGetMessages = async (senderId: string, recieverId: string) => {
  try {
    console.log(senderId, recieverId)
    const messages = await client.message.findMany({
      where: {
        studentId: {
          in: [senderId, recieverId],
        },
        recieverId: {
          in: [senderId, recieverId],
        },
      },
      select: {
        studentId: true,
        message: true,
        createdAt: true,
        recieverId: true,
        id: true,
      },
    })

    if (messages) {
      return messages
    }
  } catch (error) {
    console.log(error)
  }
}
