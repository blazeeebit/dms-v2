'use server'
import { client } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const onGetUserSubscription = async (id: string) => {
  try {
    const plan = await client.user.findUnique({
      where: {
        id: id,
      },
      select: {
        owner: {
          select: {
            subscription: {
              select: {
                plan: true,
                credits: true,
              },
            },
          },
        },
      },
    })

    if (plan) {
      return { ...plan.owner[0].subscription }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetStripeIntegration = async (id: string) => {}
