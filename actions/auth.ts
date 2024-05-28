'use server'

import { PATH_URLS } from '@/constants/routes'
import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const onBoardOauthUser = async () => {
  const user = await currentUser()

  if (!user) redirect('/sign-in')

  if (user) {
    const role = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        role: true,
        id: true,
      },
    })

    if (!role) redirect(`/onboarding/${user.id}`)

    if (role?.role == 'ADMIN')
      redirect(`${PATH_URLS.DASHBOARD_ADMIN}/${role.id}/overview`)

    if (role.role == 'OWNER')
      redirect(`${PATH_URLS.DASHBOARD_OWNER}/${role.id}/overview`)

    if (role.role == 'STUDENT')
      redirect(`${PATH_URLS.DASHBOARD_STUDENT}/${role.id}/overview`)
  }
}

export const completeOnBoarding = async (role: 'OWNER' | 'STUDENT') => {
  try {
    const user = await currentUser()
    if (user) {
      if (role == 'OWNER') {
        const onBoarded = await client.user.create({
          data: {
            clerkId: user.id,
            name: user.fullName as string,
            role: role,
            owner: {
              create: {
                subscription: {
                  create: {},
                },
              },
            },
          },
          select: {
            id: true,
            role: true,
          },
        })

        if (onBoarded) {
          return {
            status: 200,
            message: 'Owner Onboarding Complete',
            id: onBoarded.id,
            role: onBoarded.role,
          }
        }
      }

      if (role == 'STUDENT') {
        const onBoarded = await client.user.create({
          data: {
            clerkId: user.id,
            name: user.fullName as string,
            role: role,
            student: {
              create: {},
            },
          },
          select: {
            id: true,
            role: true,
          },
        })

        if (onBoarded) {
          return {
            status: 200,
            message: 'Student Onboarding Complete',
            id: onBoarded.id,
            role: onBoarded.role,
          }
        }
      }

      return { status: 400, message: 'Oops something went wrong!' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCompleteEmailPasswordSignUp = async (
  clerkid: string,
  name: string,
  username: string,
  role: 'OWNER' | 'STUDENT'
) => {
  try {
    if (role == 'OWNER') {
      const registered = await client.user.create({
        data: {
          clerkId: clerkid,
          username: username || '',
          name,
          role,
          owner: {
            create: {
              subscription: {
                create: {},
              },
            },
          },
        },
      })

      if (registered) {
        return {
          status: 200,
          message: 'Owner Account Created',
        }
      }
    }
    if (role == 'STUDENT') {
      const registered = await client.user.create({
        data: {
          clerkId: clerkid,
          username: username || '',
          name,
          role,
          student: {
            create: {},
          },
        },
      })

      if (registered) {
        return {
          status: 200,
          message: 'Student Account Created',
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetUserInfo = async (id: string) => {
  try {
    const loggedInUser = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
        username: true,
        role: true,
        image: true,
        banned: true,
        student: {
          select: {
            id: true,
          },
        },
        owner: {
          select: {
            id: true,
          },
        },
      },
    })

    if (loggedInUser) {
      return loggedInUser
    }
  } catch (error) {
    console.log(error)
  }
}
