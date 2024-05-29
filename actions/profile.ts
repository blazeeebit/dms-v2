'use server'

import { client } from '@/lib/prisma'
import { clerkClient, currentUser } from '@clerk/nextjs/server'

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

export const onGetUserLanguagePreference = async (id: string) => {
  try {
    const language = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
      },
    })

    if (language) {
      return language.language
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateUserFullName = async (id: string, name: string) => {
  try {
    const fullname = await client.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
    if (fullname) {
      return {
        status: 200,
        message: 'Full name successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateUserUserName = async (id: string, username: string) => {
  try {
    const userName = await client.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    })

    if (userName) {
      return { status: 200, message: 'Username successfully updated' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateUserAddress = async (id: string, address: string) => {
  try {
    const userAddress = await client.user.update({
      where: {
        id,
      },
      data: {
        address,
      },
    })

    if (userAddress) {
      return {
        status: 200,
        message: 'User address successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateUserImage = async (id: string, image: string) => {
  try {
    const userImage = await client.user.update({
      where: {
        id,
      },
      data: {
        image,
      },
    })

    if (userImage) {
      return {
        status: 200,
        message: 'User image successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateUserCountry = async (id: string, country: string) => {
  try {
    const userCountry = await client.user.update({
      where: {
        id,
      },
      data: {
        country,
      },
    })
    if (userCountry) {
      return {
        status: 200,
        message: 'User country successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdatePhoneNumber = async (id: string, phone: string) => {
  try {
    const userPhone = await client.user.update({
      where: {
        id,
      },
      data: {
        phone,
      },
    })
    if (userPhone) {
      return {
        status: 200,
        message: 'User phone successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateStudentDepartment = async (
  studentId: string,
  department: string
) => {
  try {
    const studentDepartment = await client.student.update({
      where: {
        id: studentId,
      },
      data: {
        department,
      },
    })

    if (studentDepartment) {
      return {
        status: 200,
        message: 'Student department successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateStudentStudentId = async (
  id: string,
  studentId: string
) => {
  try {
    console.log(id)
    const studentID = await client.student.update({
      where: {
        id,
      },
      data: {
        studentId: parseInt(studentId),
      },
    })

    console.log(studentID)
    if (studentID) {
      return {
        status: 200,
        message: 'Student id successfully updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateUserPassword = async (password: string) => {
  try {
    const user = await currentUser()

    if (!user)
      return {
        status: 404,
        message: 'No user found',
      }

    const updated = await clerkClient.users.updateUser(user.id, { password })
    if (updated) {
      return {
        status: 200,
        message: 'Password updated',
      }
    }
    return {
      status: 404,
      message: 'Oops something went wrong',
    }
  } catch (error) {
    console.log(error)
  }
}
