'use server'

import { client } from '@/lib/prisma'
import { RedirectToSignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const onAuthenticated = async () => {
  const user = await currentUser()

  if (!user) RedirectToSignIn

  return user
}

export const onBoardOauthUser = async () => {
  const user = await onAuthenticated()

  //check if user has selected a type
  //direct accordingly
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

    if (role.role == 'OWNER') redirect(`/dashboard/owner/${role.id}`)

    if (role.role == 'STUDENT') redirect(`/dashboard/student/${role.id}`)
  }
}

export const completeOnBoarding = async (role: 'OWNER' | 'STUDENT') => {
  const user = await onAuthenticated()

  try {
    if (user) {
      if (role == 'OWNER') {
        const onBoarded = await client.user.create({
          data: {
            clerkId: user.id,
            username: user.emailAddresses[0].emailAddress.split('@')[0],
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
          },
        })

        if (onBoarded) {
          return {
            status: 200,
            message: 'Owner Onboarding Complete',
            id: onBoarded.id,
          }
        }
      }

      if (role == 'STUDENT') {
        const onBoarded = await client.user.create({
          data: {
            clerkId: user.id,
            username: user.emailAddresses[0].emailAddress.split('@')[0],
            name: user.fullName as string,
            role: role,
            student: {
              create: {},
            },
          },
          select: {
            id: true,
          },
        })

        if (onBoarded) {
          return {
            status: 200,
            message: 'Student Onboarding Complete',
            id: onBoarded.id,
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
          username,
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
          username,
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
